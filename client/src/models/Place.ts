export interface Place {
  id: string;
  title: string;
  description: string;
  gcpPlaceId?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  date: Date | null;
  notes: string;
  constraints: string;
}
