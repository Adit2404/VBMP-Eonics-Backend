import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAtsApplication } from 'app/shared/model/ats-application.model';
import { getEntities } from './ats-application.reducer';

export const AtsApplication = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const atsApplicationList = useAppSelector(state => state.atsApplication.entities);
  const loading = useAppSelector(state => state.atsApplication.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="ats-application-heading" data-cy="AtsApplicationHeading">
        <Translate contentKey="secondApp.atsApplication.home.title">Ats Applications</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="secondApp.atsApplication.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/ats-application/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="secondApp.atsApplication.home.createLabel">Create new Ats Application</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {atsApplicationList && atsApplicationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="secondApp.atsApplication.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsApplication.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsApplication.candidate">Candidate</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsApplication.vacancy">Vacancy</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsApplication.companyApplicationStatus">Company Application Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {atsApplicationList.map((atsApplication, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/ats-application/${atsApplication.id}`} color="link" size="sm">
                      {atsApplication.id}
                    </Button>
                  </td>
                  <td>
                    {atsApplication.date ? <TextFormat type="date" value={atsApplication.date} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {atsApplication.candidate ? (
                      <Link to={`/candidate/${atsApplication.candidate.id}`}>{atsApplication.candidate.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {atsApplication.vacancy ? <Link to={`/vacancy/${atsApplication.vacancy.id}`}>{atsApplication.vacancy.id}</Link> : ''}
                  </td>
                  <td>
                    {atsApplication.companyApplicationStatus ? (
                      <Link to={`/company-application-status/${atsApplication.companyApplicationStatus.id}`}>
                        {atsApplication.companyApplicationStatus.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/ats-application/${atsApplication.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/ats-application/${atsApplication.id}/edit`}
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
                        to={`/ats-application/${atsApplication.id}/delete`}
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
              <Translate contentKey="secondApp.atsApplication.home.notFound">No Ats Applications found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AtsApplication;
