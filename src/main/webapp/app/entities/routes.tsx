import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Experience from './experience';
import Vacancy from './vacancy';
import Company from './company';
import Education from './education';
import Candidate from './candidate';
import CompanyUser from './company-user';
import AtsUser from './ats-user';
import CompanyApplicationStatus from './company-application-status';
import AtsApplication from './ats-application';
import Remark from './remark';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="experience/*" element={<Experience />} />
        <Route path="vacancy/*" element={<Vacancy />} />
        <Route path="company/*" element={<Company />} />
        <Route path="education/*" element={<Education />} />
        <Route path="candidate/*" element={<Candidate />} />
        <Route path="company-user/*" element={<CompanyUser />} />
        <Route path="ats-user/*" element={<AtsUser />} />
        <Route path="company-application-status/*" element={<CompanyApplicationStatus />} />
        <Route path="ats-application/*" element={<AtsApplication />} />
        <Route path="remark/*" element={<Remark />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
