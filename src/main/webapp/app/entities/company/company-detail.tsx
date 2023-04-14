import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './company.reducer';

export const CompanyDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const companyEntity = useAppSelector(state => state.company.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="companyDetailsHeading">
          <Translate contentKey="secondApp.company.detail.title">Company</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="secondApp.company.id">Id</Translate>
            </span>
          </dt>
          <dd>{companyEntity.id}</dd>
          <dt>
            <span id="companySize">
              <Translate contentKey="secondApp.company.companySize">Company Size</Translate>
            </span>
          </dt>
          <dd>{companyEntity.companySize}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="secondApp.company.type">Type</Translate>
            </span>
          </dt>
          <dd>{companyEntity.type}</dd>
          <dt>
            <span id="video">
              <Translate contentKey="secondApp.company.video">Video</Translate>
            </span>
          </dt>
          <dd>
            {companyEntity.video ? (
              <div>
                {companyEntity.videoContentType ? (
                  <a onClick={openFile(companyEntity.videoContentType, companyEntity.video)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {companyEntity.videoContentType}, {byteSize(companyEntity.video)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/company" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/company/${companyEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CompanyDetail;
