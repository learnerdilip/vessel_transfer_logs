export interface Vessel {
  id: string;
  vesselname: string;
  mmsi: number;
  nicename: string;
  client: string;
  operationsClass: "CTV" | "SOV";
  vessel_length: number;
  displacement: number;
  Propulsion_type: string;
  Site: string;
  Operator: string;
  onHire: number;
}
export interface Transfer {
  id: string;
  vesselname: string;
  mmsi: number;
  date: number; // MATLAB datenum (just the day)
  startTime: number; // MATLAB datenum (day + time)
  stopTime: number; // MATLAB datenum (day + time)
  duration: number; // minutes
  location: string; // turbine ID, e.g. "T01"
  fieldname: string; // wind farm name
  Hs: number; // wave height in meters
  score: number; // quality score 1-10
  detector: string;
  comment: string;
  impactForceNmax: number; // peak force in Newtons
  paxUp: number; // passengers embarked
  paxDown: number; // passengers disembarked
  cargoUp: number; // cargo loaded
  cargoDown: number; // cargo unloaded
  active: boolean;
}

export interface Turbine {
  name: string;
  lat: number;
  lon: number;
}

export interface WindFarm {
  id: string;
  filename: string;
  fieldname: string;
  SiteName: string;
  centroid: { lat: number; lon: number };
  turbines: Turbine[];
  outline: { lat: number[]; lon: number[] };
}

export interface DailyReport {
  id: string;
  date: number; // MATLAB datenum
  mmsi: number;
  vesselname: string;
  stats: {
    portDepartureTime: number;
    windFarmArrivalTime: number;
    sailedDistance: number;
    avgSpeedOutbound: number;
    avgSpeedInbound: number;
    msiOutbound: number;
    msiInbound: number;
    numDockings: number;
    totalFuel: number;
    averageDockedTime: string;
  };
  inputStats: {
    fuelConsumption: number;
    landedOil: number;
    landedGarbage: number;
    toolboxConducted: string[];
    customInput: string;
  };
  distancekm: number;
  fuelConsumed: number;
  minutesInField: number;
  lat: number[]; // GPS track
  lon: number[]; // GPS track
  time: number[]; // MATLAB datenums for each GPS point
}
