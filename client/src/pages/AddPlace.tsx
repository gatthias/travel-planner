import React from 'react';
import AddPlaceForm from '../components/AddPlaceForm';
import { Place } from '../models/Place';
import { IonPage, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from '@ionic/react';

interface AddPlacePageProps {
  onAddPlace: (place: Place) => void;
}

const AddPlace: React.FC<AddPlacePageProps> = ({ onAddPlace }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add New Place</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>
          <AddPlaceForm onAddPlace={onAddPlace} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddPlace;
