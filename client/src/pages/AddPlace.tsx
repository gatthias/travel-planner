import React from 'react';
import AddPlaceForm from '../components/AddPlaceForm';
import { Place } from '../models/Place';
import { IonPage, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

interface AddPlacePageProps {
  onAddPlace: (place: Place) => void;
}

const AddPlace: React.FC<AddPlacePageProps> = ({ onAddPlace }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton />
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
