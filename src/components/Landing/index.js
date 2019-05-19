import React from 'react';
import './../../scss/_landing.scss';
import './../../scss/_buttons.scss';
import './../../vendor/bootstrap/css/bootstrap.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';



const Landing = () => (
<html>

<head>

  <meta charset="utf-8"></meta>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
  <meta name="description" content=""></meta>
  <meta name="author" content=""></meta>

  <title>Duke Eats</title>


  
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>


</head>
    <body>
    <div class="container d-flex h-100 align-items-center">
      <div class="mx-auto text-center">
        <h1 class="mx-auto my-0 text-uppercase">Duke Eats </h1> 
        <h2 class="text-white-50 mx-auto mt-2 mb-5">An easy way to have Thrive delivered to your central campus apartment!</h2>
        <Link to={ROUTES.SIGN_IN}><button class="btn btn-light mx-auto">Sign In</button></Link>&nbsp;
        <Link to={ROUTES.SIGN_UP}><button type="submit" class="btn btn-light mx-auto">Sign Up</button></Link>
      </div>
    </div>
    </body>
  </html>   
);

export default Landing;
