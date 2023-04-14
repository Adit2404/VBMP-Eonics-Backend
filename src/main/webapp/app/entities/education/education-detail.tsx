import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './education.reducer';

export const EducationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const educationEntity = useAppSelector(state => state.education.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="educationDetailsHeading">
          <Translate contentKey="secondApp.education.detail.title">Education</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="secondApp.education.id">Id</Translate>
            </span>
          </dt>
          <dd>{educationEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="secondApp.education.title">Title</Translate>
            </span>
          </dt>
          <dd>{educationEntity.title}</dd>
          <dt>
            <span id="company">
              <Translate contentKey="secondApp.education.company">Company</Translate>
            </span>
          </dt>
          <dd>{educationEntity.company}</dd>
          <dt>
            <span id="location">
              <Translate contentKey="secondApp.education.location">Location</Translate>
            </span>
          </dt>
          <dd>{educationEntity.location}</dd>
          <dt>
            <span id="sdate">
              <Translate contentKey="secondApp.education.sdate">Sdate</Translate>
            </span>
          </dt>
          <dd>{educationEntity.sdate ? <TextFormat value={educationEntity.sdate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="edate">
              <Translate contentKey="secondApp.education.edate">Edate</Translate>
            </span>
          </dt>
          <dd>{educationEntity.edate ? <TextFormat value={educationEntity.edate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="secondApp.education.description">Description</Translate>
            </span>
          </dt>
          <dd>{educationEntity.description}</dd>
          <dt>
            <Translate contentKey="secondApp.education.candidate">Candidate</Translate>
          </dt>
          <dd>{educationEntity.candidate ? educationEntity.candidate.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/education" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/education/${educationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EducationDetail;
