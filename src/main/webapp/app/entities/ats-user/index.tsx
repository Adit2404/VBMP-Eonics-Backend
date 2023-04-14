import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AtsUser from './ats-user';
import AtsUserDetail from './ats-user-detail';
import AtsUserUpdate from './ats-user-update';
import AtsUserDeleteDialog from './ats-user-delete-dialog';

const AtsUserRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AtsUser />} />
    <Route path="new" element={<AtsUserUpdate />} />
    <Route path=":id">
      <Route index element={<AtsUserDetail />} />
      <Route path="edit" element={<AtsUserUpdate />} />
      <Route path="delete" element={<AtsUserDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AtsUserRoutes;
