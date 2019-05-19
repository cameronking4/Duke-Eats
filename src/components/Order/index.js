import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './../../scss/_buttons.scss';
import './../../vendor/bootstrap/css/bootstrap.css';
import { withFirebase } from "../Firebase";

import { withAuthorization } from '../Session';



const OrderPage = () => (
    <html>
    <head>
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
 </head>
    <div className="">
      <div className="row2">
        <div className=" mx-auto">
          <h2 style={{fontSize: '45px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '20%'}}>Where do you want to order from?</h2>
          <Link to={ROUTES.THRIVE}><button type="submit" className="btn btn-light mx-auto">Thrive</button></Link> &nbsp; &nbsp; &nbsp;
          <Link to={ROUTES.KRAFTHOUSE}><button type="submit" className="btn btn-light mx-auto">Krafthouse</button></Link> &nbsp; &nbsp; &nbsp;
          <Link to={ROUTES.HOME}><button type="submit" className="btn btn-light mx-auto">Back</button></Link>
          </div>
      </div>
      
    </div>
    </html>
);

const condition = authUser => !!authUser;

export default withFirebase(withAuthorization(condition)(OrderPage));