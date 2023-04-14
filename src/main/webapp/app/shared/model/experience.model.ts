import dayjs from 'dayjs';
import { ICandidate } from 'app/shared/model/candidate.model';

export interface IExperience {
  id?: string;
  title?: string | null;
  company?: string | null;
  location?: string | null;
  sdate?: string | null;
  edate?: string | null;
  description?: string | null;
  candidate?: ICandidate | null;
}

export const defaultValue: Readonly<IExperience> = {};
