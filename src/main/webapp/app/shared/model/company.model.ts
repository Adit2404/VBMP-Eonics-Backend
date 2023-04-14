import { IVacancy } from 'app/shared/model/vacancy.model';
import { ICompanyUser } from 'app/shared/model/company-user.model';
import { ICompanyApplicationStatus } from 'app/shared/model/company-application-status.model';

export interface ICompany {
  id?: string;
  companySize?: number | null;
  type?: string | null;
  videoContentType?: string | null;
  video?: string | null;
  vacancies?: IVacancy[] | null;
  companyUsers?: ICompanyUser[] | null;
  companyApplicationStatuses?: ICompanyApplicationStatus[] | null;
}

export const defaultValue: Readonly<ICompany> = {};
