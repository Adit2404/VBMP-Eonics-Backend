import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { ICompanyApplicationStatus } from 'app/shared/model/company-application-status.model';
import { getEntity, updateEntity, createEntity, reset } from './company-application-status.reducer';

export const CompanyApplicationStatusUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const companies = useAppSelector(state => state.company.entities);
  const companyApplicationStatusEntity = useAppSelector(state => state.companyApplicationStatus.entity);
  const loading = useAppSelector(state => state.companyApplicationStatus.loading);
  const updating = useAppSelector(state => state.companyApplicationStatus.updating);
  const updateSuccess = useAppSelector(state => state.companyApplicationStatus.updateSuccess);

  const handleClose = () => {
    navigate('/company-application-status');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCompanies({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...companyApplicationStatusEntity,
      ...values,
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
          ...companyApplicationStatusEntity,
          company: companyApplicationStatusEntity?.company?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="secondApp.companyApplicationStatus.home.createOrEditLabel" data-cy="CompanyApplicationStatusCreateUpdateHeading">
            <Translate contentKey="secondApp.companyApplicationStatus.home.createOrEditLabel">
              Create or edit a CompanyApplicationStatus
            </Translate>
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
                  id="company-application-status-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('secondApp.companyApplicationStatus.name')}
                id="company-application-status-name"
                name="name"
                data-cy="name"
                type="text"
              />
              <ValidatedField
                id="company-application-status-company"
                name="company"
                data-cy="company"
                label={translate('secondApp.companyApplicationStatus.company')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/company-application-status" replace color="info">
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

export default CompanyApplicationStatusUpdate;
