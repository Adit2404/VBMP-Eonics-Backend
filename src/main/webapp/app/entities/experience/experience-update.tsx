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
import { IExperience } from 'app/shared/model/experience.model';
import { getEntity, updateEntity, createEntity, reset } from './experience.reducer';

export const ExperienceUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const candidates = useAppSelector(state => state.candidate.entities);
  const experienceEntity = useAppSelector(state => state.experience.entity);
  const loading = useAppSelector(state => state.experience.loading);
  const updating = useAppSelector(state => state.experience.updating);
  const updateSuccess = useAppSelector(state => state.experience.updateSuccess);

  const handleClose = () => {
    navigate('/experience');
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
      ...experienceEntity,
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
          ...experienceEntity,
          candidate: experienceEntity?.candidate?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="secondApp.experience.home.createOrEditLabel" data-cy="ExperienceCreateUpdateHeading">
            <Translate contentKey="secondApp.experience.home.createOrEditLabel">Create or edit a Experience</Translate>
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
                  id="experience-id"
                  label={translate('secondApp.experience.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('secondApp.experience.title')}
                id="experience-title"
                name="title"
                data-cy="title"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.experience.company')}
                id="experience-company"
                name="company"
                data-cy="company"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.experience.location')}
                id="experience-location"
                name="location"
                data-cy="location"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.experience.sdate')}
                id="experience-sdate"
                name="sdate"
                data-cy="sdate"
                type="date"
              />
              <ValidatedField
                label={translate('secondApp.experience.edate')}
                id="experience-edate"
                name="edate"
                data-cy="edate"
                type="date"
              />
              <ValidatedField
                label={translate('secondApp.experience.description')}
                id="experience-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                id="experience-candidate"
                name="candidate"
                data-cy="candidate"
                label={translate('secondApp.experience.candidate')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/experience" replace color="info">
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

export default ExperienceUpdate;
