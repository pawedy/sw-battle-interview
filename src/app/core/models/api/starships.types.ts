import { GeneralEntryProperties } from './api.types';

export interface StarshipsDisplayedProperties {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: string[];
}

export interface StarshipsProperties
  extends StarshipsDisplayedProperties,
    GeneralEntryProperties {}
