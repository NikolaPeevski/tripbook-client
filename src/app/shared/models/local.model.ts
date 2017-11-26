import { User } from './user.model';

export interface Local {
  id: string,
  available: boolean,
  city_id: string,
  description: string,
  quote: string,
  user:User,
  rating: string,
  review_count: number
}
