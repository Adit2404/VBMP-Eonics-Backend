import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExperience } from 'app/shared/model/experience.model';
import { getEntities } from './experience.reducer';

export const Experience = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const experienceList = useAppSelector(state => state.experience.entities);
  const loading = useAppSelector(state => state.experience.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="experience-heading" data-cy="ExperienceHeading">
        <Translate contentKey="secondApp.experience.home.title">Experiences</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="secondApp.experience.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/experience/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="secondApp.experience.home.createLabel">Create new Experience</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {experienceList && experienceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="secondApp.experience.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.experience.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.experience.company">Company</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.experience.location">Location</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.experience.sdate">Sdate</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.experience.edate">Edate</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.experience.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.experience.candidate">Candidate</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {experienceList.map((experience, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/experience/${experience.id}`} color="link" size="sm">
                      {experience.id}
                    </Button>
                  </td>
                  <td>{experience.title}</td>
                  <td>{experience.company}</td>
                  <td>{experience.location}</td>
                  <td>{experience.sdate ? <TextFormat type="date" value={experience.sdate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{experience.edate ? <TextFormat type="date" value={experience.edate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{experience.description}</td>
                  <td>{experience.candidate ? <Link to={`/candidate/${experience.candidate.id}`}>{experience.candidate.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/experience/${experience.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/experience/${experience.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/experience/${experience.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="secondApp.experience.home.notFound">No Experiences found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Experience;
