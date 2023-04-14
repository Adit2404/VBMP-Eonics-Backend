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
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { ICompanyUser } from 'app/shared/model/company-user.model';
import { getEntity, updateEntity, createEntity, reset } from './company-user.reducer';

export const CompanyUserUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const atsUsers = useAppSelector(state => state.atsUser.entities);
  const companies = useAppSelector(state => state.company.entities);
  const companyUserEntity = useAppSelector(state => state.companyUser.entity);
  const loading = useAppSelector(state => state.companyUser.loading);
  const updating = useAppSelector(state => state.companyUser.updating);
  const updateSuccess = useAppSelector(state => state.companyUser.updateSuccess);

  const handleClose = () => {
    navigate('/company-user');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAtsUsers({}));
    dispatch(getCompanies({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...companyUserEntity,
      ...values,
      atsUser: atsUsers.find(it => it.id.toString() === values.atsUser.toString()),
      company: companies.find(it => it.id.toString() === values.company.toString()),
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
          ...companyUserEntity,
          atsUser: companyUserEntity?.atsUser?.id,
          company: companyUserEntity?.company?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="secondApp.companyUser.home.createOrEditLabel" data-cy="CompanyUserCreateUpdateHeading">
            <Translate contentKey="secondApp.companyUser.home.createOrEditLabel">Create or edit a CompanyUser</Translate>
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
                  id="company-user-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                id="company-user-atsUser"
                name="atsUser"
                data-cy="atsUser"
                label={translate('secondApp.companyUser.atsUser')}
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
              <ValidatedField
                id="company-user-company"
                name="company"
                data-cy="company"
                label={translate('secondApp.companyUser.company')}
                type="select"
              >
                <option value="" key="0" />
                {companies
                  ? companies.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/company-user" replace color="info">
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

export default CompanyUserUpdate;
