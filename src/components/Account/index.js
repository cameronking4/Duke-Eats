import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import CardNumChangeForm from './cardNum.js';
import PasswordChangeForm from './passwordChange.js';
import AddressChangeForm from './address.js';
import VenmoChangeForm from './venmo.js';
import NameChangeForm from './name.js';


const AccountPage = () => (
  <AuthUserContext.Consumer>
  {authUser => (
    
  <html>
  <head>
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
 </head>


<body>
    
    <div class="">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2 style={{fontSize: '34px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '1%'}}> Account Page</h2>
          <h2 style={{fontSize: '18px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase'}}> Manage your account details here !</h2>
          <PasswordForgetForm />
          <PasswordChangeForm />
          <NameChangeForm />
          <CardNumChangeForm />
          <AddressChangeForm />
          <VenmoChangeForm />

        </div>
      </div>
      
    </div>
    </body>
  </html>


  )}
  </AuthUserContext.Consumer>
);


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);