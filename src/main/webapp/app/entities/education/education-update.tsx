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
import { IEducation } from 'app/shared/model/education.model';
import { getEntity, updateEntity, createEntity, reset } from './education.reducer';

export const EducationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const candidates = useAppSelector(state => state.candidate.entities);
  const educationEntity = useAppSelector(state => state.education.entity);
  const loading = useAppSelector(state => state.education.loading);
  const updating = useAppSelector(state => state.education.updating);
  const updateSuccess = useAppSelector(state => state.education.updateSuccess);

  const handleClose = () => {
    navigate('/education');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCandidates({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...educationEntity,
      ...values,
      candidate: candidates.find(it => it.id.toString() === values.candidate.toString()),
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
          ...educationEntity,
          candidate: educationEntity?.candidate?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="secondApp.education.home.createOrEditLabel" data-cy="EducationCreateUpdateHeading">
            <Translate contentKey="secondApp.education.home.createOrEditLabel">Create or edit a Education</Translate>
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
                  id="education-id"
                  label={translate('secondApp.education.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('secondApp.education.title')}
                id="education-title"
                name="title"
                data-cy="title"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.education.company')}
                id="education-company"
                name="company"
                data-cy="company"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.education.location')}
                id="education-location"
                name="location"
                data-cy="location"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.education.sdate')}
                id="education-sdate"
                name="sdate"
                data-cy="sdate"
                type="date"
              />
              <ValidatedField
                label={translate('secondApp.education.edate')}
                id="education-edate"
                name="edate"
                data-cy="edate"
                type="date"
              />
              <ValidatedField
                label={translate('secondApp.education.description')}
                id="education-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                id="education-candidate"
                name="candidate"
                data-cy="candidate"
                label={translate('secondApp.education.candidate')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/education" replace color="info">
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

export default EducationUpdate;
