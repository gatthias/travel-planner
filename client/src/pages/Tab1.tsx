import React from 'react';
import { Place } from '../models/Place';
import { IonList, IonFab, IonFabButton, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import PlaceItem from '../components/PlaceItem';

interface Tab1Props {
  places: Place[];
}

const Tab1: React.FC<Tab1Props> = ({ places }) => {
  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Places</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <h1>Travel Planner</h1>
          <IonList>
            {places.map((place) => (
              <PlaceItem place={place} key={place.id} />
            ))}
          </IonList>
        </IonContent>
        
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/add-place">
            <IonIcon icon={addCircleOutline} />
          </IonFabButton>
        </IonFab>
    </IonPage>
  );
};

export default Tab1;
