import React from "react";
import { AuthUserContext, withAuthorization } from '../Session';
import CartContents from './cartContents.js'

const CartPage = () => (
    <AuthUserContext.Consumer>
    {authUser => (
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
	          <h2 style={{fontSize: '50px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '10%', textAlign: 'center'}}> Items in cart:
	          <CartContents /> </h2>

	        </div>
	      </div>
	      
	    </div>
	    </body>
  </html>
  )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(CartPage);