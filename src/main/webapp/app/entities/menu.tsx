import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/experience">
        <Translate contentKey="global.menu.entities.experience" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/vacancy">
        <Translate contentKey="global.menu.entities.vacancy" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/company">
        <Translate contentKey="global.menu.entities.company" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/education">
        <Translate contentKey="global.menu.entities.education" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/candidate">
        <Translate contentKey="global.menu.entities.candidate" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/company-user">
        <Translate contentKey="global.menu.entities.companyUser" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/ats-user">
        <Translate contentKey="global.menu.entities.atsUser" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/company-application-status">
        <Translate contentKey="global.menu.entities.companyApplicationStatus" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/ats-application">
        <Translate contentKey="global.menu.entities.atsApplication" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/remark">
        <Translate contentKey="global.menu.entities.remark" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
