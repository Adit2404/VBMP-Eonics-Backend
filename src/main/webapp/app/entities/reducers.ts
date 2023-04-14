import experience from 'app/entities/experience/experience.reducer';
import vacancy from 'app/entities/vacancy/vacancy.reducer';
import company from 'app/entities/company/company.reducer';
import education from 'app/entities/education/education.reducer';
import candidate from 'app/entities/candidate/candidate.reducer';
import companyUser from 'app/entities/company-user/company-user.reducer';
import atsUser from 'app/entities/ats-user/ats-user.reducer';
import companyApplicationStatus from 'app/entities/company-application-status/company-application-status.reducer';
import atsApplication from 'app/entities/ats-application/ats-application.reducer';
import remark from 'app/entities/remark/remark.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  experience,
  vacancy,
  company,
  education,
  candidate,
  companyUser,
  atsUser,
  companyApplicationStatus,
  atsApplication,
  remark,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
