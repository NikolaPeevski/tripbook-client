import { User } from './user.model';

export interface Local {
  id: string,
  available: boolean,
  available_from: string,
  available_to: string,
  city_id: string,
  country_id: string,
  description: string,
  quote: string,
  user:User

}
