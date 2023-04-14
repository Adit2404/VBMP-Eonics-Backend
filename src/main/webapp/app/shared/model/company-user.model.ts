import { IAtsUser } from 'app/shared/model/ats-user.model';
import { IRemark } from 'app/shared/model/remark.model';
import { ICompany } from 'app/shared/model/company.model';

export interface ICompanyUser {
  id?: number;
  atsUser?: IAtsUser | null;
  remarks?: IRemark[] | null;
  company?: ICompany | null;
}

export const defaultValue: Readonly<ICompanyUser> = {};
