import React from "react";
import { AuthUserContext, withAuthorization } from '../Session';
import ItemList from './itemList.js'


const CheckoutPage = () => (
    <AuthUserContext.Consumer>
    {authUser => (
        <div className="col-lg-8 mx-auto">
        <p style={{color: "white", fontSize: "60px", fontWeight: "bold", fontFamily: "Nunito", textTransform: "uppercase"}}> Checkout: </p>
            <ItemList />
        </div>
  )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;
export default withAuthorization(condition)(CheckoutPage);