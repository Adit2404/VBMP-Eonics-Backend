import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEducation } from 'app/shared/model/education.model';
import { getEntities } from './education.reducer';

export const Education = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const educationList = useAppSelector(state => state.education.entities);
  const loading = useAppSelector(state => state.education.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="education-heading" data-cy="EducationHeading">
        <Translate contentKey="secondApp.education.home.title">Educations</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="secondApp.education.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/education/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="secondApp.education.home.createLabel">Create new Education</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {educationList && educationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="secondApp.education.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.education.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.education.company">Company</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.education.location">Location</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.education.sdate">Sdate</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.education.edate">Edate</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.education.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.education.candidate">Candidate</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {educationList.map((education, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/education/${education.id}`} color="link" size="sm">
                      {education.id}
                    </Button>
                  </td>
                  <td>{education.title}</td>
                  <td>{education.company}</td>
                  <td>{education.location}</td>
                  <td>{education.sdate ? <TextFormat type="date" value={education.sdate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{education.edate ? <TextFormat type="date" value={education.edate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{education.description}</td>
                  <td>{education.candidate ? <Link to={`/candidate/${education.candidate.id}`}>{education.candidate.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/education/${education.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/education/${education.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/education/${education.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="secondApp.education.home.notFound">No Educations found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Education;
