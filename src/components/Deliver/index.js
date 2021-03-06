import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './../../scss/_buttons.scss';
import './../../vendor/bootstrap/css/bootstrap.css';
import { withAuthorization } from '../Session';
import OrdersList from './ordersList.js'

const DeliverPage = () => (
<html>
    <head>
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"></link>
    <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet"></link>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
   </head>
   <style>{'body { background-color:#8EB8E5; }'}</style>
  <body>
      
      <div class="container">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h2 style={{fontSize: '34px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '5%'}}> Here are the orders currently waiting for pickup:</h2>
           <OrdersList />
          <Link to={ROUTES.DELIVERIES}><button type="submit" className="btn btn-light mx-auto">My Deliveries</button></Link> &nbsp; &nbsp;
          <Link to={ROUTES.HOME}><button type="submit" className="btn btn-light mx-auto">Back</button></Link>

          </div>
        </div>
        
      </div>
      </body>
  </html>


);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(DeliverPage);