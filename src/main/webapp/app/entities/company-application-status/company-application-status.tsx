import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICompanyApplicationStatus } from 'app/shared/model/company-application-status.model';
import { getEntities } from './company-application-status.reducer';

export const CompanyApplicationStatus = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const companyApplicationStatusList = useAppSelector(state => state.companyApplicationStatus.entities);
  const loading = useAppSelector(state => state.companyApplicationStatus.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="company-application-status-heading" data-cy="CompanyApplicationStatusHeading">
        <Translate contentKey="secondApp.companyApplicationStatus.home.title">Company Application Statuses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="secondApp.companyApplicationStatus.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/company-application-status/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="secondApp.companyApplicationStatus.home.createLabel">Create new Company Application Status</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {companyApplicationStatusList && companyApplicationStatusList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="secondApp.companyApplicationStatus.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.companyApplicationStatus.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.companyApplicationStatus.company">Company</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {companyApplicationStatusList.map((companyApplicationStatus, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/company-application-status/${companyApplicationStatus.id}`} color="link" size="sm">
                      {companyApplicationStatus.id}
                    </Button>
                  </td>
                  <td>{companyApplicationStatus.name}</td>
                  <td>
                    {companyApplicationStatus.company ? (
                      <Link to={`/company/${companyApplicationStatus.company.id}`}>{companyApplicationStatus.company.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/company-application-status/${companyApplicationStatus.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/company-application-status/${companyApplicationStatus.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/company-application-status/${companyApplicationStatus.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="secondApp.companyApplicationStatus.home.notFound">No Company Application Statuses found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CompanyApplicationStatus;
