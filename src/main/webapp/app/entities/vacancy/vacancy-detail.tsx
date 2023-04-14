import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './vacancy.reducer';

export const VacancyDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const vacancyEntity = useAppSelector(state => state.vacancy.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="vacancyDetailsHeading">
          <Translate contentKey="secondApp.vacancy.detail.title">Vacancy</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{vacancyEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="secondApp.vacancy.name">Name</Translate>
            </span>
          </dt>
          <dd>{vacancyEntity.name}</dd>
          <dt>
            <span id="dateOfPosting">
              <Translate contentKey="secondApp.vacancy.dateOfPosting">Date Of Posting</Translate>
            </span>
          </dt>
          <dd>
            {vacancyEntity.dateOfPosting ? (
              <TextFormat value={vacancyEntity.dateOfPosting} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="description">
              <Translate contentKey="secondApp.vacancy.description">Description</Translate>
            </span>
          </dt>
          <dd>{vacancyEntity.description}</dd>
          <dt>
            <span id="employmentType">
              <Translate contentKey="secondApp.vacancy.employmentType">Employment Type</Translate>
            </span>
          </dt>
          <dd>{vacancyEntity.employmentType}</dd>
          <dt>
            <span id="location">
              <Translate contentKey="secondApp.vacancy.location">Location</Translate>
            </span>
          </dt>
          <dd>{vacancyEntity.location}</dd>
          <dt>
            <span id="video">
              <Translate contentKey="secondApp.vacancy.video">Video</Translate>
            </span>
          </dt>
          <dd>
            {vacancyEntity.video ? (
              <div>
                {vacancyEntity.videoContentType ? (
                  <a onClick={openFile(vacancyEntity.videoContentType, vacancyEntity.video)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {vacancyEntity.videoContentType}, {byteSize(vacancyEntity.video)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="status">
              <Translate contentKey="secondApp.vacancy.status">Status</Translate>
            </span>
          </dt>
          <dd>{vacancyEntity.status}</dd>
          <dt>
            <span id="isOpen">
              <Translate contentKey="secondApp.vacancy.isOpen">Is Open</Translate>
            </span>
          </dt>
          <dd>{vacancyEntity.isOpen ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="secondApp.vacancy.company">Company</Translate>
          </dt>
          <dd>{vacancyEntity.company ? vacancyEntity.company.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/vacancy" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/vacancy/${vacancyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default VacancyDetail;
