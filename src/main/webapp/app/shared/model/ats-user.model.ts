import { ICandidate } from 'app/shared/model/candidate.model';
import { ICompanyUser } from 'app/shared/model/company-user.model';

export interface IAtsUser {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  userId?: string | null;
  videoContentType?: string | null;
  video?: string | null;
  cvContentType?: string | null;
  cv?: string | null;
  password?: string | null;
  usertype?: string | null;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  stateProvince?: string | null;
  candidate?: ICandidate | null;
  companyUser?: ICompanyUser | null;
}

export const defaultValue: Readonly<IAtsUser> = {};
