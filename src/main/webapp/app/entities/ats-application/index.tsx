import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AtsApplication from './ats-application';
import AtsApplicationDetail from './ats-application-detail';
import AtsApplicationUpdate from './ats-application-update';
import AtsApplicationDeleteDialog from './ats-application-delete-dialog';

const AtsApplicationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AtsApplication />} />
    <Route path="new" element={<AtsApplicationUpdate />} />
    <Route path=":id">
      <Route index element={<AtsApplicationDetail />} />
      <Route path="edit" element={<AtsApplicationUpdate />} />
      <Route path="delete" element={<AtsApplicationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AtsApplicationRoutes;
