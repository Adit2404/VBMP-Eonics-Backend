import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ats-user.reducer';

export const AtsUserDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const atsUserEntity = useAppSelector(state => state.atsUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="atsUserDetailsHeading">
          <Translate contentKey="secondApp.atsUser.detail.title">AtsUser</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="secondApp.atsUser.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="secondApp.atsUser.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="secondApp.atsUser.email">Email</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.email}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="secondApp.atsUser.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.phoneNumber}</dd>
          <dt>
            <span id="userId">
              <Translate contentKey="secondApp.atsUser.userId">User Id</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.userId}</dd>
          <dt>
            <span id="video">
              <Translate contentKey="secondApp.atsUser.video">Video</Translate>
            </span>
          </dt>
          <dd>
            {atsUserEntity.video ? (
              <div>
                {atsUserEntity.videoContentType ? (
                  <a onClick={openFile(atsUserEntity.videoContentType, atsUserEntity.video)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {atsUserEntity.videoContentType}, {byteSize(atsUserEntity.video)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="cv">
              <Translate contentKey="secondApp.atsUser.cv">Cv</Translate>
            </span>
          </dt>
          <dd>
            {atsUserEntity.cv ? (
              <div>
                {atsUserEntity.cvContentType ? (
                  <a onClick={openFile(atsUserEntity.cvContentType, atsUserEntity.cv)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {atsUserEntity.cvContentType}, {byteSize(atsUserEntity.cv)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="password">
              <Translate contentKey="secondApp.atsUser.password">Password</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.password}</dd>
          <dt>
            <span id="usertype">
              <Translate contentKey="secondApp.atsUser.usertype">Usertype</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.usertype}</dd>
          <dt>
            <span id="streetAddress">
              <Translate contentKey="secondApp.atsUser.streetAddress">Street Address</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.streetAddress}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="secondApp.atsUser.postalCode">Postal Code</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.postalCode}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="secondApp.atsUser.city">City</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.city}</dd>
          <dt>
            <span id="stateProvince">
              <Translate contentKey="secondApp.atsUser.stateProvince">State Province</Translate>
            </span>
          </dt>
          <dd>{atsUserEntity.stateProvince}</dd>
        </dl>
        <Button tag={Link} to="/ats-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ats-user/${atsUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AtsUserDetail;
