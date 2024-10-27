import React, { useState, useRef, useEffect } from 'react';
import { Place } from '../models/Place';
import crypto from 'crypto';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

interface AddPlaceFormProps {
  onAddPlace: (place: Place) => void;
  initialPlace?: Place;
}

const AddPlaceForm: React.FC<AddPlaceFormProps> = ({ onAddPlace, initialPlace }) => {
  const [title, setTitle] = useState(initialPlace?.title || '');
  const [description, setDescription] = useState(initialPlace?.description || '');
  const [latitude, setLatitude] = useState((initialPlace?.coordinates.latitude || '').toString());
  const [longitude, setLongitude] = useState((initialPlace?.coordinates.longitude || '').toString());
  const [date, setDate] = useState(initialPlace?.date || null);
  const [notes, setNotes] = useState(initialPlace?.notes || '');
  const [constraints, setConstraints] = useState(initialPlace?.constraints || '');
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
    //@ts-ignore
    libraries,
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autocompleteRef.current && isLoaded) {
      const autocomplete = new window.google.maps.places.Autocomplete(autocompleteRef.current);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setSelectedLocation(place.geometry.location?.toJSON() ?? null);
          setLatitude(place.geometry.location?.lat().toString() ?? '');
          setLongitude(place.geometry.location?.lng().toString() ?? '');
        }
      });
    }
  }, [isLoaded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlace: Place = {
      id: initialPlace ? initialPlace.id : crypto.randomUUID(),
      title,
      description,
      coordinates: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
      date,
      notes,
      constraints,
    };
    onAddPlace(newPlace);
    setTitle('');
    setDescription('');
    setLatitude('');
    setLongitude('');
    setDate(null);
    setNotes('');
    setConstraints('');
    setSelectedLocation(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="text" ref={autocompleteRef} placeholder="Search Location" />
      <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" />
      <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" />
      <input type="date" value={date ? new Date(date).toISOString().slice(0, 10) : ''} onChange={(e) => setDate(new Date(e.target.value))} />
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />
      <textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} placeholder="Constraints" />
      <button type="submit">Save Place</button>
      {isLoaded && (
        <div ref={mapRef} style={{ height: '300px', width: '100%' }}>
          <GoogleMap
            center={selectedLocation || { lat: 0, lng: 0 }}
            zoom={10}
            mapContainerStyle={{ height: '100%', width: '100%' }}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
          </GoogleMap>
        </div>
      )}
    </form>
  );
};

export default AddPlaceForm;
