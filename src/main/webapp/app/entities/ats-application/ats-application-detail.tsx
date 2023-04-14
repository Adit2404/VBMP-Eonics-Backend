import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ats-application.reducer';

export const AtsApplicationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const atsApplicationEntity = useAppSelector(state => state.atsApplication.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="atsApplicationDetailsHeading">
          <Translate contentKey="secondApp.atsApplication.detail.title">AtsApplication</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{atsApplicationEntity.id}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="secondApp.atsApplication.date">Date</Translate>
            </span>
          </dt>
          <dd>
            {atsApplicationEntity.date ? <TextFormat value={atsApplicationEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="secondApp.atsApplication.candidate">Candidate</Translate>
          </dt>
          <dd>{atsApplicationEntity.candidate ? atsApplicationEntity.candidate.id : ''}</dd>
          <dt>
            <Translate contentKey="secondApp.atsApplication.vacancy">Vacancy</Translate>
          </dt>
          <dd>{atsApplicationEntity.vacancy ? atsApplicationEntity.vacancy.id : ''}</dd>
          <dt>
            <Translate contentKey="secondApp.atsApplication.companyApplicationStatus">Company Application Status</Translate>
          </dt>
          <dd>{atsApplicationEntity.companyApplicationStatus ? atsApplicationEntity.companyApplicationStatus.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/ats-application" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ats-application/${atsApplicationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AtsApplicationDetail;
