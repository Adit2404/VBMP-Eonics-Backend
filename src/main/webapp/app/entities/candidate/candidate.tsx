import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICandidate } from 'app/shared/model/candidate.model';
import { getEntities } from './candidate.reducer';

export const Candidate = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const candidateList = useAppSelector(state => state.candidate.entities);
  const loading = useAppSelector(state => state.candidate.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="candidate-heading" data-cy="CandidateHeading">
        <Translate contentKey="secondApp.candidate.home.title">Candidates</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="secondApp.candidate.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/candidate/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="secondApp.candidate.home.createLabel">Create new Candidate</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {candidateList && candidateList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="secondApp.candidate.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.candidate.atsUser">Ats User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {candidateList.map((candidate, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/candidate/${candidate.id}`} color="link" size="sm">
                      {candidate.id}
                    </Button>
                  </td>
                  <td>{candidate.atsUser ? <Link to={`/ats-user/${candidate.atsUser.id}`}>{candidate.atsUser.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/candidate/${candidate.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/candidate/${candidate.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/candidate/${candidate.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="secondApp.candidate.home.notFound">No Candidates found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Candidate;
