import dayjs from 'dayjs';
import { IRemark } from 'app/shared/model/remark.model';
import { ICandidate } from 'app/shared/model/candidate.model';
import { IVacancy } from 'app/shared/model/vacancy.model';
import { ICompanyApplicationStatus } from 'app/shared/model/company-application-status.model';

export interface IAtsApplication {
  id?: number;
  date?: string | null;
  remarks?: IRemark[] | null;
  candidate?: ICandidate | null;
  vacancy?: IVacancy | null;
  companyApplicationStatus?: ICompanyApplicationStatus | null;
}

export const defaultValue: Readonly<IAtsApplication> = {};
