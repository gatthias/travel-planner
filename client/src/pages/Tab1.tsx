import React from 'react';
import { Place } from '../models/Place';
import { IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';

interface Tab1Props {
  places: Place[];
}

const Tab1: React.FC<Tab1Props> = ({ places }) => {
  return (
    <div>
      <h1>Travel Planner</h1>
      <h2>Places</h2>
      <IonList>
        {places.map((place) => (
          <IonItem key={place.id}>
            <IonLabel>
              <h3>{place.title}</h3>
              <p>{place.description}</p>
              <p>Coordinates: {place.coordinates.latitude}, {place.coordinates.longitude}</p>
              <p>Date: {place.date ? new Date(place.date).toDateString() : 'N/A'}</p>
              <p>Notes: {place.notes}</p>
              <p>Constraints: {place.constraints}</p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton href="/add-place">
          <IonIcon icon={addCircleOutline} />
        </IonFabButton>
      </IonFab>
    </div>
  );
};

export default Tab1;
