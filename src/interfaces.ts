export interface ApiResponse<Data> {
  count: number;
  next: string;
  previous: null;
  results: Data[];
}

export interface PlanetsResponse {
  name: string;
  diameter: string;
  population: string;
}
