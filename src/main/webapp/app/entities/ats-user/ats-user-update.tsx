import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICandidate } from 'app/shared/model/candidate.model';
import { getEntities as getCandidates } from 'app/entities/candidate/candidate.reducer';
import { ICompanyUser } from 'app/shared/model/company-user.model';
import { getEntities as getCompanyUsers } from 'app/entities/company-user/company-user.reducer';
import { IAtsUser } from 'app/shared/model/ats-user.model';
import { getEntity, updateEntity, createEntity, reset } from './ats-user.reducer';

export const AtsUserUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const candidates = useAppSelector(state => state.candidate.entities);
  const companyUsers = useAppSelector(state => state.companyUser.entities);
  const atsUserEntity = useAppSelector(state => state.atsUser.entity);
  const loading = useAppSelector(state => state.atsUser.loading);
  const updating = useAppSelector(state => state.atsUser.updating);
  const updateSuccess = useAppSelector(state => state.atsUser.updateSuccess);

  const handleClose = () => {
    navigate('/ats-user');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCandidates({}));
    dispatch(getCompanyUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...atsUserEntity,
      ...values,
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
          ...atsUserEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="secondApp.atsUser.home.createOrEditLabel" data-cy="AtsUserCreateUpdateHeading">
            <Translate contentKey="secondApp.atsUser.home.createOrEditLabel">Create or edit a AtsUser</Translate>
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
                  id="ats-user-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('secondApp.atsUser.firstName')}
                id="ats-user-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.atsUser.lastName')}
                id="ats-user-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
              />
              <ValidatedField label={translate('secondApp.atsUser.email')} id="ats-user-email" name="email" data-cy="email" type="text" />
              <ValidatedField
                label={translate('secondApp.atsUser.phoneNumber')}
                id="ats-user-phoneNumber"
                name="phoneNumber"
                data-cy="phoneNumber"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.atsUser.userId')}
                id="ats-user-userId"
                name="userId"
                data-cy="userId"
                type="text"
              />
              <ValidatedBlobField
                label={translate('secondApp.atsUser.video')}
                id="ats-user-video"
                name="video"
                data-cy="video"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedBlobField
                label={translate('secondApp.atsUser.cv')}
                id="ats-user-cv"
                name="cv"
                data-cy="cv"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('secondApp.atsUser.password')}
                id="ats-user-password"
                name="password"
                data-cy="password"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.atsUser.usertype')}
                id="ats-user-usertype"
                name="usertype"
                data-cy="usertype"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.atsUser.streetAddress')}
                id="ats-user-streetAddress"
                name="streetAddress"
                data-cy="streetAddress"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.atsUser.postalCode')}
                id="ats-user-postalCode"
                name="postalCode"
                data-cy="postalCode"
                type="text"
              />
              <ValidatedField label={translate('secondApp.atsUser.city')} id="ats-user-city" name="city" data-cy="city" type="text" />
              <ValidatedField
                label={translate('secondApp.atsUser.stateProvince')}
                id="ats-user-stateProvince"
                name="stateProvince"
                data-cy="stateProvince"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ats-user" replace color="info">
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

export default AtsUserUpdate;
