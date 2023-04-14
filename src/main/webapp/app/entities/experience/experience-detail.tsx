import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './experience.reducer';

export const ExperienceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const experienceEntity = useAppSelector(state => state.experience.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="experienceDetailsHeading">
          <Translate contentKey="secondApp.experience.detail.title">Experience</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="secondApp.experience.id">Id</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.id}</dd>
          <dt>
            <span id="title">
              <Translate contentKey="secondApp.experience.title">Title</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.title}</dd>
          <dt>
            <span id="company">
              <Translate contentKey="secondApp.experience.company">Company</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.company}</dd>
          <dt>
            <span id="location">
              <Translate contentKey="secondApp.experience.location">Location</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.location}</dd>
          <dt>
            <span id="sdate">
              <Translate contentKey="secondApp.experience.sdate">Sdate</Translate>
            </span>
          </dt>
          <dd>
            {experienceEntity.sdate ? <TextFormat value={experienceEntity.sdate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="edate">
              <Translate contentKey="secondApp.experience.edate">Edate</Translate>
            </span>
          </dt>
          <dd>
            {experienceEntity.edate ? <TextFormat value={experienceEntity.edate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="description">
              <Translate contentKey="secondApp.experience.description">Description</Translate>
            </span>
          </dt>
          <dd>{experienceEntity.description}</dd>
          <dt>
            <Translate contentKey="secondApp.experience.candidate">Candidate</Translate>
          </dt>
          <dd>{experienceEntity.candidate ? experienceEntity.candidate.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/experience" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/experience/${experienceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExperienceDetail;
