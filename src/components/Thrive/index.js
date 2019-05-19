import React from "react";
import ThriveMenu from "./menuPage.js";
import { AuthUserContext, withAuthorization } from '../Session';


const ThrivePage = () => (
  

  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <ThriveMenu />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ThrivePage);
