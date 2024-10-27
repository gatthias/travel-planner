import React, { useState } from 'react';
import { Place } from '../models/Place';

interface AddPlaceFormProps {
  onAddPlace: (place: Place) => void;
}

const AddPlaceForm: React.FC<AddPlaceFormProps> = ({ onAddPlace }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState('');
  const [constraints, setConstraints] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlace: Place = {
      id: crypto.randomUUID(),
      title,
      description,
      coordinates: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" />
      <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" />
      <input type="date" value={date ? date.toISOString().slice(0, 10) : ''} onChange={(e) => setDate(new Date(e.target.value))} />
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />
      <textarea value={constraints} onChange={(e) => setConstraints(e.target.value)} placeholder="Constraints" />
      <button type="submit">Add Place</button>
    </form>
  );
};

export default AddPlaceForm;
