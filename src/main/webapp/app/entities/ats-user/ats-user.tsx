import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAtsUser } from 'app/shared/model/ats-user.model';
import { getEntities } from './ats-user.reducer';

export const AtsUser = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const atsUserList = useAppSelector(state => state.atsUser.entities);
  const loading = useAppSelector(state => state.atsUser.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="ats-user-heading" data-cy="AtsUserHeading">
        <Translate contentKey="secondApp.atsUser.home.title">Ats Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="secondApp.atsUser.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/ats-user/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="secondApp.atsUser.home.createLabel">Create new Ats User</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {atsUserList && atsUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="secondApp.atsUser.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.userId">User Id</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.video">Video</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.cv">Cv</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.usertype">Usertype</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.streetAddress">Street Address</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.postalCode">Postal Code</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="secondApp.atsUser.stateProvince">State Province</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {atsUserList.map((atsUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/ats-user/${atsUser.id}`} color="link" size="sm">
                      {atsUser.id}
                    </Button>
                  </td>
                  <td>{atsUser.firstName}</td>
                  <td>{atsUser.lastName}</td>
                  <td>{atsUser.email}</td>
                  <td>{atsUser.phoneNumber}</td>
                  <td>{atsUser.userId}</td>
                  <td>
                    {atsUser.video ? (
                      <div>
                        {atsUser.videoContentType ? (
                          <a onClick={openFile(atsUser.videoContentType, atsUser.video)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {atsUser.videoContentType}, {byteSize(atsUser.video)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {atsUser.cv ? (
                      <div>
                        {atsUser.cvContentType ? (
                          <a onClick={openFile(atsUser.cvContentType, atsUser.cv)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {atsUser.cvContentType}, {byteSize(atsUser.cv)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{atsUser.password}</td>
                  <td>{atsUser.usertype}</td>
                  <td>{atsUser.streetAddress}</td>
                  <td>{atsUser.postalCode}</td>
                  <td>{atsUser.city}</td>
                  <td>{atsUser.stateProvince}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/ats-user/${atsUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ats-user/${atsUser.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ats-user/${atsUser.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="secondApp.atsUser.home.notFound">No Ats Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AtsUser;
