import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Remark from './remark';
import RemarkDetail from './remark-detail';
import RemarkUpdate from './remark-update';
import RemarkDeleteDialog from './remark-delete-dialog';

const RemarkRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Remark />} />
    <Route path="new" element={<RemarkUpdate />} />
    <Route path=":id">
      <Route index element={<RemarkDetail />} />
      <Route path="edit" element={<RemarkUpdate />} />
      <Route path="delete" element={<RemarkDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default RemarkRoutes;
