export interface Region {
  id: number;
  name: string;
  hidden: boolean;
}

export interface District {
  id: number;
  name: string;
  hidden: boolean;
  region: number;
}

export interface Neighbourhood {
  id: number;
  name: string;
  hidden: boolean;
  districts: number;
}
