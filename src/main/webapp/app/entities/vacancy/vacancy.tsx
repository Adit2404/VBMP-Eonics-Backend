import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IVacancy } from 'app/shared/model/vacancy.model';
import { getEntities } from './vacancy.reducer';

export const Vacancy = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const vacancyList = useAppSelector(state => state.vacancy.entities);
  const loading = useAppSelector(state => state.vacancy.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="vacancy-heading" data-cy="VacancyHeading">
        <Translate contentKey="secondApp.vacancy.home.title">Vacancies</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="secondApp.vacancy.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/vacancy/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="secondApp.vacancy.home.createLabel">Create new Vacancy</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {vacancyList && vacancyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="secondApp.vacancy.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.vacancy.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.vacancy.dateOfPosting">Date Of Posting</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.vacancy.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.vacancy.employmentType">Employment Type</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.vacancy.location">Location</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.vacancy.video">Video</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.vacancy.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.vacancy.isOpen">Is Open</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.vacancy.company">Company</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {vacancyList.map((vacancy, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/vacancy/${vacancy.id}`} color="link" size="sm">
                      {vacancy.id}
                    </Button>
                  </td>
                  <td>{vacancy.name}</td>
                  <td>
                    {vacancy.dateOfPosting ? <TextFormat type="date" value={vacancy.dateOfPosting} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{vacancy.description}</td>
                  <td>{vacancy.employmentType}</td>
                  <td>{vacancy.location}</td>
                  <td>
                    {vacancy.video ? (
                      <div>
                        {vacancy.videoContentType ? (
                          <a onClick={openFile(vacancy.videoContentType, vacancy.video)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {vacancy.videoContentType}, {byteSize(vacancy.video)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{vacancy.status}</td>
                  <td>{vacancy.isOpen ? 'true' : 'false'}</td>
                  <td>{vacancy.company ? <Link to={`/company/${vacancy.company.id}`}>{vacancy.company.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/vacancy/${vacancy.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/vacancy/${vacancy.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/vacancy/${vacancy.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="secondApp.vacancy.home.notFound">No Vacancies found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Vacancy;
