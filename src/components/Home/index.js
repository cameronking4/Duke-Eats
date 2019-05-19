import React from 'react';
import './../../scss/_masthead.scss';
import './../../scss/_buttons.scss';
import './../../vendor/bootstrap/bootstrap.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';



import { withAuthorization } from '../Session';

const HomePage = () => (
    <html>
    <head>
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
 </head>
 
    <body>
  <div class="firstcont">
   <div class="container d-flex align-items-center">
      <div class="mx-auto text-center">
        <div class="">
        <h1 class="mx-auto my-0 text-uppercase" >Duke Eats </h1> 
        <h2 style={{fontSize: '20px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', textAlign: 'center'}}>I want to.....</h2>
    
    

      <Link to={ROUTES.ORDER}> <Button variant="light"> ORDER</Button></Link>
         <Link to={ROUTES.DELIVER}> <Button variant="light"> DELIVER </Button></Link> 
 
    

      </div>
    </div> 
    </div>
    </div>
    </body>
    </html>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);