import React from 'react';
import AddPlaceForm from '../components/AddPlaceForm';
import { Place } from '../models/Place';

interface AddPlacePageProps {
  onAddPlace: (place: Place) => void;
}

const AddPlace: React.FC<AddPlacePageProps> = ({ onAddPlace }) => {
  return (
    <div>
      <h1>Add New Place</h1>
      <AddPlaceForm onAddPlace={onAddPlace} />
    </div>
  );
};

export default AddPlace;
