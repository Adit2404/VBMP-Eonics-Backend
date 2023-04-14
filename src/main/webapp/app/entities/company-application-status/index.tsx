import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CompanyApplicationStatus from './company-application-status';
import CompanyApplicationStatusDetail from './company-application-status-detail';
import CompanyApplicationStatusUpdate from './company-application-status-update';
import CompanyApplicationStatusDeleteDialog from './company-application-status-delete-dialog';

const CompanyApplicationStatusRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CompanyApplicationStatus />} />
    <Route path="new" element={<CompanyApplicationStatusUpdate />} />
    <Route path=":id">
      <Route index element={<CompanyApplicationStatusDetail />} />
      <Route path="edit" element={<CompanyApplicationStatusUpdate />} />
      <Route path="delete" element={<CompanyApplicationStatusDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CompanyApplicationStatusRoutes;
