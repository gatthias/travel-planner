import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { Place } from '../models/Place';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const placesCollection = collection(db, 'places');

export class PlaceService {
  static async getPlaces(): Promise<Place[]> {
    const querySnapshot = await getDocs(placesCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })) as Place[];
  }

  static async addPlace(place: Place): Promise<void> {
    try {
      const placeDocRef = doc(db, 'places', place.id);
      await setDoc(placeDocRef, place);
    } catch (error) {
      alert('Error adding place');
    }
    
  }

  static async updatePlace(updatedPlace: Place): Promise<void> {
    const placeDocRef = doc(db, 'places', updatedPlace.id);
    await updateDoc(placeDocRef, updatedPlace as any);
  }

  static async deletePlace(placeId: string): Promise<void> {
    const placeDocRef = doc(db, 'places', placeId);
    await deleteDoc(placeDocRef);
  }
}
