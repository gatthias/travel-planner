import React from 'react';
import { Place } from '../models/Place';
import { IonItem, IonLabel, IonButton } from '@ionic/react';

interface PlaceItemProps {
  place: Place;
  onSelectPlace?: (place: Place) => void;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place, onSelectPlace }) => {
  return (
    <IonItem>
      <IonLabel onClick={() => onSelectPlace?.(place)}>
        <h3>{place.title}</h3>
        <p>{place.description}</p>
        <p>Date: {place.date ? new Date(place.date).toDateString() : 'N/A'}</p>
      </IonLabel>
      <IonButton routerLink={`/edit/${place.id}`}>Edit</IonButton>
    </IonItem>
  );
};

export default PlaceItem;
