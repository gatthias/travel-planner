import { Place } from '../models/Place';

export class PlaceService {
  static getPlaces(): Place[] {
    const storedPlaces = localStorage.getItem('places');
    return storedPlaces ? JSON.parse(storedPlaces) : [];
  }

  static getPlace(id: string): Place | null {
    const places = this.getPlaces();
    const foundPlace = places.find((p: Place) => p.id === id);
    return foundPlace || null;
  }

  static addPlace(place: Place): void {
    const places = this.getPlaces();
    localStorage.setItem('places', JSON.stringify([...places, place]));
  }

  static updatePlace(updatedPlace: Place): void {
    const places = this.getPlaces();
    const updatedPlaces = places.map((place) =>
      place.id === updatedPlace.id ? updatedPlace : place
    );
    localStorage.setItem('places', JSON.stringify(updatedPlaces));
  }

  static deletePlace(placeId: string): void {
    const places = this.getPlaces();
    const updatedPlaces = places.filter((place) => place.id !== placeId);
    localStorage.setItem('places', JSON.stringify(updatedPlaces));
  }
}
