import React, { useState, useEffect } from 'react';
import { Place } from '../models/Place';
import { useParams } from 'react-router-dom';
import AddPlaceForm from '../components/AddPlaceForm';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonBackButton, IonContent, IonButtons } from '@ionic/react';
import { useLocation } from 'react-router-dom';
import { PlaceService } from '../services/PlaceService';

interface EditPlaceProps {
  onUpdatePlace: (place: Place) => void;
}

const EditPlace: React.FC<EditPlaceProps> = ({ onUpdatePlace }) => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<Place | null>(null);
  useEffect(() => {
    const fetchPlace = async () => {
      const places = await PlaceService.getPlaces();
      const foundPlace = places.find((p: Place) => p.id === id);
      setPlace(foundPlace || null);
    };
    fetchPlace();
  }, [id]);

  const handleUpdatePlace = (updatedPlace: Place) => {
    onUpdatePlace(updatedPlace);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Edit Place</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          !place && <h1>Loading... or Place not found</h1>
        }
        {
          place && <AddPlaceForm onAddPlace={handleUpdatePlace} initialPlace={place} />
        }
      </IonContent>
    </IonPage>
  );
};

export default EditPlace;
