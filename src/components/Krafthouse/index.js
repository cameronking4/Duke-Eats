import React from "react";
import KrafthouseMenu from "./menuPage.js";
import { AuthUserContext, withAuthorization } from '../Session';

const KrafthousePage = () => (
  <html>
    <head>
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
 </head>
  <AuthUserContext.Consumer>
    {authUser => (
      <div> 
        <KrafthouseMenu />
      </div>
    )}
  </AuthUserContext.Consumer>
  </html>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(KrafthousePage);
