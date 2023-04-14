import { IAtsApplication } from 'app/shared/model/ats-application.model';
import { ICompany } from 'app/shared/model/company.model';

export interface ICompanyApplicationStatus {
  id?: number;
  name?: string | null;
  atsApplications?: IAtsApplication[] | null;
  company?: ICompany | null;
}

export const defaultValue: Readonly<ICompanyApplicationStatus> = {};
