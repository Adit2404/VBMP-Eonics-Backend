import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CompanyUser from './company-user';
import CompanyUserDetail from './company-user-detail';
import CompanyUserUpdate from './company-user-update';
import CompanyUserDeleteDialog from './company-user-delete-dialog';

const CompanyUserRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CompanyUser />} />
    <Route path="new" element={<CompanyUserUpdate />} />
    <Route path=":id">
      <Route index element={<CompanyUserDetail />} />
      <Route path="edit" element={<CompanyUserUpdate />} />
      <Route path="delete" element={<CompanyUserDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CompanyUserRoutes;
