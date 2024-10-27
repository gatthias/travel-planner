import React from 'react';
import { Place } from '../models/Place';
import { IonItem, IonLabel, IonButton } from '@ionic/react';

interface PlaceItemProps {
  place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  return (
    <IonItem>
      <IonLabel>
        <h3>{place.title}</h3>
        <p>{place.description}</p>
        <p>Coordinates: {place.coordinates.latitude}, {place.coordinates.longitude}</p>
        <p>Date: {place.date ? new Date(place.date).toDateString() : 'N/A'}</p>
        <p>Notes: {place.notes}</p>
        <p>Constraints: {place.constraints}</p>
      </IonLabel>
      <IonButton routerLink={`/edit/${place.id}`}>Edit</IonButton>
    </IonItem>
  );
};

export default PlaceItem;
