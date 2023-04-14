import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAtsUser } from 'app/shared/model/ats-user.model';
import { getEntities as getAtsUsers } from 'app/entities/ats-user/ats-user.reducer';
import { ICandidate } from 'app/shared/model/candidate.model';
import { getEntity, updateEntity, createEntity, reset } from './candidate.reducer';

export const CandidateUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const atsUsers = useAppSelector(state => state.atsUser.entities);
  const candidateEntity = useAppSelector(state => state.candidate.entity);
  const loading = useAppSelector(state => state.candidate.loading);
  const updating = useAppSelector(state => state.candidate.updating);
  const updateSuccess = useAppSelector(state => state.candidate.updateSuccess);

  const handleClose = () => {
    navigate('/candidate');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAtsUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...candidateEntity,
      ...values,
      atsUser: atsUsers.find(it => it.id.toString() === values.atsUser.toString()),
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
          ...candidateEntity,
          atsUser: candidateEntity?.atsUser?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="secondApp.candidate.home.createOrEditLabel" data-cy="CandidateCreateUpdateHeading">
            <Translate contentKey="secondApp.candidate.home.createOrEditLabel">Create or edit a Candidate</Translate>
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
                  id="candidate-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                id="candidate-atsUser"
                name="atsUser"
                data-cy="atsUser"
                label={translate('secondApp.candidate.atsUser')}
                type="select"
              >
                <option value="" key="0" />
                {atsUsers
                  ? atsUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/candidate" replace color="info">
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

export default CandidateUpdate;
