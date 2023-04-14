import { IAtsUser } from 'app/shared/model/ats-user.model';
import { IExperience } from 'app/shared/model/experience.model';
import { IEducation } from 'app/shared/model/education.model';
import { IAtsApplication } from 'app/shared/model/ats-application.model';
import { IRemark } from 'app/shared/model/remark.model';

export interface ICandidate {
  id?: number;
  atsUser?: IAtsUser | null;
  experiences?: IExperience[] | null;
  educations?: IEducation[] | null;
  atsApplications?: IAtsApplication[] | null;
  remarks?: IRemark[] | null;
}

export const defaultValue: Readonly<ICandidate> = {};
