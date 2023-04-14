import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { IVacancy } from 'app/shared/model/vacancy.model';
import { getEntity, updateEntity, createEntity, reset } from './vacancy.reducer';

export const VacancyUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const companies = useAppSelector(state => state.company.entities);
  const vacancyEntity = useAppSelector(state => state.vacancy.entity);
  const loading = useAppSelector(state => state.vacancy.loading);
  const updating = useAppSelector(state => state.vacancy.updating);
  const updateSuccess = useAppSelector(state => state.vacancy.updateSuccess);

  const handleClose = () => {
    navigate('/vacancy');
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
      ...vacancyEntity,
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
          ...vacancyEntity,
          company: vacancyEntity?.company?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="secondApp.vacancy.home.createOrEditLabel" data-cy="VacancyCreateUpdateHeading">
            <Translate contentKey="secondApp.vacancy.home.createOrEditLabel">Create or edit a Vacancy</Translate>
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
                  id="vacancy-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('secondApp.vacancy.name')} id="vacancy-name" name="name" data-cy="name" type="text" />
              <ValidatedField
                label={translate('secondApp.vacancy.dateOfPosting')}
                id="vacancy-dateOfPosting"
                name="dateOfPosting"
                data-cy="dateOfPosting"
                type="date"
              />
              <ValidatedField
                label={translate('secondApp.vacancy.description')}
                id="vacancy-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.vacancy.employmentType')}
                id="vacancy-employmentType"
                name="employmentType"
                data-cy="employmentType"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.vacancy.location')}
                id="vacancy-location"
                name="location"
                data-cy="location"
                type="text"
              />
              <ValidatedBlobField
                label={translate('secondApp.vacancy.video')}
                id="vacancy-video"
                name="video"
                data-cy="video"
                openActionLabel={translate('entity.action.open')}
              />
              <ValidatedField
                label={translate('secondApp.vacancy.status')}
                id="vacancy-status"
                name="status"
                data-cy="status"
                type="text"
              />
              <ValidatedField
                label={translate('secondApp.vacancy.isOpen')}
                id="vacancy-isOpen"
                name="isOpen"
                data-cy="isOpen"
                check
                type="checkbox"
              />
              <ValidatedField
                id="vacancy-company"
                name="company"
                data-cy="company"
                label={translate('secondApp.vacancy.company')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/vacancy" replace color="info">
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

export default VacancyUpdate;
