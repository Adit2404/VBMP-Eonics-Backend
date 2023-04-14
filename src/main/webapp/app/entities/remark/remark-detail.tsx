import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './remark.reducer';

export const RemarkDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const remarkEntity = useAppSelector(state => state.remark.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="remarkDetailsHeading">
          <Translate contentKey="secondApp.remark.detail.title">Remark</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{remarkEntity.id}</dd>
          <dt>
            <span id="message">
              <Translate contentKey="secondApp.remark.message">Message</Translate>
            </span>
          </dt>
          <dd>{remarkEntity.message}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="secondApp.remark.date">Date</Translate>
            </span>
          </dt>
          <dd>{remarkEntity.date ? <TextFormat value={remarkEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="secondApp.remark.atsApplication">Ats Application</Translate>
          </dt>
          <dd>{remarkEntity.atsApplication ? remarkEntity.atsApplication.id : ''}</dd>
          <dt>
            <Translate contentKey="secondApp.remark.companyUser">Company User</Translate>
          </dt>
          <dd>{remarkEntity.companyUser ? remarkEntity.companyUser.id : ''}</dd>
          <dt>
            <Translate contentKey="secondApp.remark.candidate">Candidate</Translate>
          </dt>
          <dd>{remarkEntity.candidate ? remarkEntity.candidate.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/remark" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/remark/${remarkEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default RemarkDetail;
