import dayjs from 'dayjs';
import { IAtsApplication } from 'app/shared/model/ats-application.model';
import { ICompany } from 'app/shared/model/company.model';

export interface IVacancy {
  id?: number;
  name?: string | null;
  dateOfPosting?: string | null;
  description?: string | null;
  employmentType?: string | null;
  location?: string | null;
  videoContentType?: string | null;
  video?: string | null;
  status?: string | null;
  isOpen?: boolean | null;
  atsApplications?: IAtsApplication[] | null;
  company?: ICompany | null;
}

export const defaultValue: Readonly<IVacancy> = {
  isOpen: false,
};
