import dayjs from 'dayjs';
import { IAtsApplication } from 'app/shared/model/ats-application.model';
import { ICompanyUser } from 'app/shared/model/company-user.model';
import { ICandidate } from 'app/shared/model/candidate.model';

export interface IRemark {
  id?: number;
  message?: string | null;
  date?: string | null;
  atsApplication?: IAtsApplication | null;
  companyUser?: ICompanyUser | null;
  candidate?: ICandidate | null;
}

export const defaultValue: Readonly<IRemark> = {};
