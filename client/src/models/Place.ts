export interface Place {
  id: string;
  title: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  date: Date | null;
  notes: string;
  constraints: string;
}
