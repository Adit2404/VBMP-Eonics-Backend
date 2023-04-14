import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICompanyUser } from 'app/shared/model/company-user.model';
import { getEntities } from './company-user.reducer';

export const CompanyUser = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const companyUserList = useAppSelector(state => state.companyUser.entities);
  const loading = useAppSelector(state => state.companyUser.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="company-user-heading" data-cy="CompanyUserHeading">
        <Translate contentKey="secondApp.companyUser.home.title">Company Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="secondApp.companyUser.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/company-user/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="secondApp.companyUser.home.createLabel">Create new Company User</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {companyUserList && companyUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="secondApp.companyUser.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.companyUser.atsUser">Ats User</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.companyUser.company">Company</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {companyUserList.map((companyUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/company-user/${companyUser.id}`} color="link" size="sm">
                      {companyUser.id}
                    </Button>
                  </td>
                  <td>{companyUser.atsUser ? <Link to={`/ats-user/${companyUser.atsUser.id}`}>{companyUser.atsUser.id}</Link> : ''}</td>
                  <td>{companyUser.company ? <Link to={`/company/${companyUser.company.id}`}>{companyUser.company.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/company-user/${companyUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/company-user/${companyUser.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/company-user/${companyUser.id}/delete`}
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
              <Translate contentKey="secondApp.companyUser.home.notFound">No Company Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CompanyUser;
