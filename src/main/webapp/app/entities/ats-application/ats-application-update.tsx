import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICandidate } from 'app/shared/model/candidate.model';
import { getEntities as getCandidates } from 'app/entities/candidate/candidate.reducer';
import { IVacancy } from 'app/shared/model/vacancy.model';
import { getEntities as getVacancies } from 'app/entities/vacancy/vacancy.reducer';
import { ICompanyApplicationStatus } from 'app/shared/model/company-application-status.model';
import { getEntities as getCompanyApplicationStatuses } from 'app/entities/company-application-status/company-application-status.reducer';
import { IAtsApplication } from 'app/shared/model/ats-application.model';
import { getEntity, updateEntity, createEntity, reset } from './ats-application.reducer';

export const AtsApplicationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const candidates = useAppSelector(state => state.candidate.entities);
  const vacancies = useAppSelector(state => state.vacancy.entities);
  const companyApplicationStatuses = useAppSelector(state => state.companyApplicationStatus.entities);
  const atsApplicationEntity = useAppSelector(state => state.atsApplication.entity);
  const loading = useAppSelector(state => state.atsApplication.loading);
  const updating = useAppSelector(state => state.atsApplication.updating);
  const updateSuccess = useAppSelector(state => state.atsApplication.updateSuccess);

  const handleClose = () => {
    navigate('/ats-application');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCandidates({}));
    dispatch(getVacancies({}));
    dispatch(getCompanyApplicationStatuses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...atsApplicationEntity,
      ...values,
      candidate: candidates.find(it => it.id.toString() === values.candidate.toString()),
      vacancy: vacancies.find(it => it.id.toString() === values.vacancy.toString()),
      companyApplicationStatus: companyApplicationStatuses.find(it => it.id.toString() === values.companyApplicationStatus.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...atsApplicationEntity,
          candidate: atsApplicationEntity?.candidate?.id,
          vacancy: atsApplicationEntity?.vacancy?.id,
          companyApplicationStatus: atsApplicationEntity?.companyApplicationStatus?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="secondApp.atsApplication.home.createOrEditLabel" data-cy="AtsApplicationCreateUpdateHeading">
            <Translate contentKey="secondApp.atsApplication.home.createOrEditLabel">Create or edit a AtsApplication</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="ats-application-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('secondApp.atsApplication.date')}
                id="ats-application-date"
                name="date"
                data-cy="date"
                type="date"
              />
              <ValidatedField
                id="ats-application-candidate"
                name="candidate"
                data-cy="candidate"
                label={translate('secondApp.atsApplication.candidate')}
                type="select"
              >
                <option value="" key="0" />
                {candidates
                  ? candidates.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="ats-application-vacancy"
                name="vacancy"
                data-cy="vacancy"
                label={translate('secondApp.atsApplication.vacancy')}
                type="select"
              >
                <option value="" key="0" />
                {vacancies
                  ? vacancies.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="ats-application-companyApplicationStatus"
                name="companyApplicationStatus"
                data-cy="companyApplicationStatus"
                label={translate('secondApp.atsApplication.companyApplicationStatus')}
                type="select"
              >
                <option value="" key="0" />
                {companyApplicationStatuses
                  ? companyApplicationStatuses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ats-application" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AtsApplicationUpdate;
