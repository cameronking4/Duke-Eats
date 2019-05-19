import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
  <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul>

      <Link to={ROUTES.HOME}> <Button variant="outline-light"> Home </Button></Link> &nbsp; &nbsp; 
      <Link to={ROUTES.ACCOUNT}><Button variant="outline-light"> Account </Button></Link> &nbsp; &nbsp; 
      <Link to={ROUTES.CART}><Button variant="outline-light"> Cart </Button></Link> &nbsp; &nbsp; 
      <Link to={ROUTES.ORDERS}><Button variant="outline-light"> My Orders </Button></Link> &nbsp; &nbsp; 
      <Link to={ROUTES.DELIVERIES}><Button variant="outline-light"> My Deliveries </Button></Link> &nbsp; &nbsp; 
       <SignOutButton /> 
<hr style={{width: "90%", alignContent: 'center'}}/>
  </ul>
);

const NavigationNonAuth = () => (<ul />);

export default Navigation;