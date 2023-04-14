import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAtsApplication } from 'app/shared/model/ats-application.model';
import { getEntities as getAtsApplications } from 'app/entities/ats-application/ats-application.reducer';
import { ICompanyUser } from 'app/shared/model/company-user.model';
import { getEntities as getCompanyUsers } from 'app/entities/company-user/company-user.reducer';
import { ICandidate } from 'app/shared/model/candidate.model';
import { getEntities as getCandidates } from 'app/entities/candidate/candidate.reducer';
import { IRemark } from 'app/shared/model/remark.model';
import { getEntity, updateEntity, createEntity, reset } from './remark.reducer';

export const RemarkUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const atsApplications = useAppSelector(state => state.atsApplication.entities);
  const companyUsers = useAppSelector(state => state.companyUser.entities);
  const candidates = useAppSelector(state => state.candidate.entities);
  const remarkEntity = useAppSelector(state => state.remark.entity);
  const loading = useAppSelector(state => state.remark.loading);
  const updating = useAppSelector(state => state.remark.updating);
  const updateSuccess = useAppSelector(state => state.remark.updateSuccess);

  const handleClose = () => {
    navigate('/remark');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getAtsApplications({}));
    dispatch(getCompanyUsers({}));
    dispatch(getCandidates({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...remarkEntity,
      ...values,
      atsApplication: atsApplications.find(it => it.id.toString() === values.atsApplication.toString()),
      companyUser: companyUsers.find(it => it.id.toString() === values.companyUser.toString()),
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
          ...remarkEntity,
          atsApplication: remarkEntity?.atsApplication?.id,
          companyUser: remarkEntity?.companyUser?.id,
          candidate: remarkEntity?.candidate?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="secondApp.remark.home.createOrEditLabel" data-cy="RemarkCreateUpdateHeading">
            <Translate contentKey="secondApp.remark.home.createOrEditLabel">Create or edit a Remark</Translate>
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
                  id="remark-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('secondApp.remark.message')}
                id="remark-message"
                name="message"
                data-cy="message"
                type="text"
              />
              <ValidatedField label={translate('secondApp.remark.date')} id="remark-date" name="date" data-cy="date" type="date" />
              <ValidatedField
                id="remark-atsApplication"
                name="atsApplication"
                data-cy="atsApplication"
                label={translate('secondApp.remark.atsApplication')}
                type="select"
              >
                <option value="" key="0" />
                {atsApplications
                  ? atsApplications.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="remark-companyUser"
                name="companyUser"
                data-cy="companyUser"
                label={translate('secondApp.remark.companyUser')}
                type="select"
              >
                <option value="" key="0" />
                {companyUsers
                  ? companyUsers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="remark-candidate"
                name="candidate"
                data-cy="candidate"
                label={translate('secondApp.remark.candidate')}
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
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/remark" replace color="info">
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

export default RemarkUpdate;
