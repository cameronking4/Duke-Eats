import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import CartItem from "./cartItem.js";
import * as ROUTES from '../../constants/routes';
import { withRouter } from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      total: 0,
      uid: this.props.firebase.auth.currentUser.uid,
      difLoc: false,
      loc: ''
    };
    this.getCart();
  }

  getCart() {
    var { items, uid, difLoc, loc } = this.state;
    const self = this;
    var cartRef = this.props.firebase.db.ref("users/" + uid).child("/cart");
    cartRef.once("value", function(snapshot) {
      snapshot.forEach(function(item) {
        var location = item.val().location;
        if (loc === ''){
          loc = location;
          self.setState({loc: loc});
        }
        if (difLoc === false && location !== loc){
          difLoc = true;
        }
        location = location.charAt(0).toUpperCase() + location.slice(1);
        var key = item.key;
        var name = item.val().name;
        var price = item.val().price;
        var quantity = item.val().quantity;
        var notes = item.val().notes;
        items.push({
          ID: key,
          name: name,
          price: price,
          quantity: quantity,
          notes: notes, 
          location: location
        });
        self.setState({ items: items, difLoc: difLoc });
      });
    });
  }

  clearCart = () => {
    const { uid } = this.state;
    this.props.firebase.db
      .ref("users/" + uid)
      .child("/cart")
      .set(null);
    window.location.reload();
  };

  checkOut = () => {
    this.props.history.push(ROUTES.CHECKOUT);
  }


  render() {
    const { items, difLoc } = this.state;
    const empty = (items.length===0);
    return (
      <div>
        {items.map(p => (
          <CartItem
            ID={p.ID}
            name={p.name}
            price={p.price}
            notes={p.notes}
            quantity={p.quantity}
            location={p.location}
          />
        ))}
        {items.length === 0 && <h2>Cart is empty. :( </h2>}
        {difLoc===true && <h2>All items in cart must be from same restaurant.</h2>}
        <button type="submit" className="btn btn-light mx-auto" onClick={this.clearCart}>
          Clear Cart
        </button> &nbsp;
        <button disabled={difLoc || empty} type="submit" className="btn btn-light mx-auto" onClick={this.checkOut}>Check Out!</button>
      </div>
    );
  }
}

export default withRouter(withFirebase(Cart));
