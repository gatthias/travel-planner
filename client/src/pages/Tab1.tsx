import React, { useRef } from 'react';
import { Place } from '../models/Place';
import { IonList, IonFab, IonFabButton, IonIcon, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButton, IonButtons } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import PlaceItem from '../components/PlaceItem';

interface Tab1Props {
  places: Place[];
}

const Tab1: React.FC<Tab1Props> = ({ places }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [selectedPlace, setSelectedPlace] = React.useState<Place | null>(null);

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
              <PlaceItem place={place} key={place.id} onSelectPlace={(selectedPlace) => setSelectedPlace(selectedPlace)} />
            ))}
          </IonList>
        </IonContent>

        <IonModal
          ref={modal}
          trigger="open-modal"
          isOpen={!!selectedPlace}
          initialBreakpoint={0.25}
          breakpoints={[0.25, 0.5, 0.75]}
          backdropDismiss={false}
          backdropBreakpoint={0.5}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedPlace?.title}</IonTitle>
              <IonButtons slot="end">
                <IonButton routerLink={`/edit/${selectedPlace?.id}`} onClick={() => setSelectedPlace(null)}>Edit</IonButton>
                <IonButton onClick={() => setSelectedPlace(null)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>{selectedPlace?.description}</p>
            <p>Coordinates: {selectedPlace?.coordinates.latitude}, {selectedPlace?.coordinates.longitude}</p>
            <p>Date: {selectedPlace?.date ? new Date(selectedPlace?.date).toDateString() : 'N/A'}</p>
            <p>Notes: {selectedPlace?.notes}</p>
            <p>Constraints: {selectedPlace?.constraints}</p>
          </IonContent>
        </IonModal>
        
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/add-place">
            <IonIcon icon={addCircleOutline} />
          </IonFabButton>
        </IonFab>
    </IonPage>
  );
};

export default Tab1;
