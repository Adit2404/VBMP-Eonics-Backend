import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IRemark } from 'app/shared/model/remark.model';
import { getEntities } from './remark.reducer';

export const Remark = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const remarkList = useAppSelector(state => state.remark.entities);
  const loading = useAppSelector(state => state.remark.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="remark-heading" data-cy="RemarkHeading">
        <Translate contentKey="secondApp.remark.home.title">Remarks</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="secondApp.remark.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/remark/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="secondApp.remark.home.createLabel">Create new Remark</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {remarkList && remarkList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="secondApp.remark.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.remark.message">Message</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.remark.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.remark.atsApplication">Ats Application</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.remark.companyUser">Company User</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.remark.candidate">Candidate</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {remarkList.map((remark, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/remark/${remark.id}`} color="link" size="sm">
                      {remark.id}
                    </Button>
                  </td>
                  <td>{remark.message}</td>
                  <td>{remark.date ? <TextFormat type="date" value={remark.date} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    {remark.atsApplication ? (
                      <Link to={`/ats-application/${remark.atsApplication.id}`}>{remark.atsApplication.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{remark.companyUser ? <Link to={`/company-user/${remark.companyUser.id}`}>{remark.companyUser.id}</Link> : ''}</td>
                  <td>{remark.candidate ? <Link to={`/candidate/${remark.candidate.id}`}>{remark.candidate.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/remark/${remark.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/remark/${remark.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/remark/${remark.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="secondApp.remark.home.notFound">No Remarks found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Remark;
