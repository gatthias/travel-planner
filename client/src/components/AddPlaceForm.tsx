import React, { useState, useRef, useEffect } from 'react';
import { Place } from '../models/Place';
import { v4 as uuidv4 } from 'uuid';
import { GoogleMap, useLoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';
import { IonAccordionGroup, IonAccordion, IonItem, IonLabel } from '@ionic/react';

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
  const [placeId, setPlaceId] = useState(initialPlace?.gcpPlaceId);
  const [placeJson, setPlaceJson] = useState('');

  useEffect(() => {
    if (initialPlace && initialPlace.coordinates) {
      setSelectedLocation({
        lat: initialPlace.coordinates.latitude,
        lng: initialPlace.coordinates.longitude,
      });
    }
  }, [initialPlace]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '',
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
        setPlaceJson(JSON.stringify(place, null, 2));
        setPlaceId(place.place_id);
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
      id: initialPlace ? initialPlace.id : uuidv4(),
      title,
      description,
      coordinates: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
      date,
      notes,
      constraints,
      gcpPlaceId: placeId,
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
    setPlaceId(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
        <input type="text" id="location" ref={autocompleteRef} placeholder="Search Location" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
        <input type="date" id="date" value={date ? new Date(date).toISOString().slice(0, 10) : ''} onChange={(e) => setDate(new Date(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="notes" className="block text-gray-700 font-bold mb-2">Notes</label>
        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="constraints" className="block text-gray-700 font-bold mb-2">Constraints</label>
        <textarea id="constraints" value={constraints} onChange={(e) => setConstraints(e.target.value)} placeholder="Constraints" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Place</button>
      {isLoaded && (
        <div ref={mapRef} className="mt-4" style={{ height: '300px', width: '100%' }}>
          <GoogleMap
            center={selectedLocation || { lat: 0, lng: 0 }}
            zoom={10}
            mapContainerStyle={{ height: '100%', width: '100%' }}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
          </GoogleMap>
        </div>
      )}
      <IonAccordionGroup>
        <IonAccordion value="first">
          <IonItem slot="header" color="light">
            <IonLabel>Place details</IonLabel>
          </IonItem>
          <div className="ion-padding" slot="content">
            <pre>{placeJson}</pre>
          </div>
        </IonAccordion>
      </IonAccordionGroup>

    </form>
  );
};

export default AddPlaceForm;
