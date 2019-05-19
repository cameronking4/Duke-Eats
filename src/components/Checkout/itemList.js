import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { Link } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import ListItem from "./item.js";
import { withRouter } from "react-router-dom";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      total: 0,
      uid: this.props.firebase.auth.currentUser.uid,
      address: "",
      venmo: "",
      cardnum: "",
      name: '',
      location: ''
    };
  }

  componentDidMount() {
    this.getCardNum();
    this.getAddress();
    this.getVenmo();
    this.getName();
    this.getCart();
  }

  getCart() {
    var { items, uid, location } = this.state;
    const self = this;
    var total = 0;
    var cartRef = this.props.firebase.db.ref("users/" + uid).child("/cart");
    cartRef.once("value", function(snapshot) {
      snapshot.forEach(function(item) {
        if (location === ''){
          location = item.val().location;
          location = location.charAt(0).toUpperCase() + location.slice(1);
        }
        var name = item.val().name;
        var price = item.val().price;
        var quantity = item.val().quantity;
        var notes = item.val().notes;
        total += quantity * price;
        items.push({
          name: name,
          price: price,
          quantity: quantity,
          notes: notes
        });
        self.setState({ items: items, total: total, location: location });
      });
    });
  }

  getAddress() {
    const { uid } = this.state;
    const self = this;
    this.props.firebase
      .user(uid)
      .once("value")
      .then(function(snapshot) {
        const add = snapshot.val().address;
        self.setState({ address: add });
      });
  }

  getName() {
    const { uid } = this.state;
    const self = this;
    this.props.firebase
      .user(uid)
      .once("value")
      .then(function(snapshot) {
        const name = snapshot.val().username;
        self.setState({ name: name });
      });
  }

  getCardNum() {
    const { uid } = this.state;
    const self = this;
    this.props.firebase
      .user(uid)
      .once("value")
      .then(function(snapshot) {
        const cN = snapshot.val().cardnum;
        self.setState({ cardnum: cN });
      });
  }

  getVenmo() {
    const { uid } = this.state;
    const self = this;
    this.props.firebase
      .user(uid)
      .once("value")
      .then(function(snapshot) {
        const ven = snapshot.val().venmo;
        self.setState({ venmo: ven });
      });
  }

  order = () => {
    const { name, uid, items, total, address, cardnum, venmo, location } = this.state;
    this.props.firebase.db.ref("/orders/").push({
      ordererID: uid,
      items: items,
      total: total,
      location: location,
      address: address,
      venmo: venmo,
      cardnum: cardnum,
      name: name,
      status: 'Pending...',
      delivererID: ''
    });
    this.props.firebase.db
      .ref("users/" + uid)
      .child("/cart")
      .set(null);
    this.props.history.push(ROUTES.ORDERS);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    var { items, total, address, venmo, cardnum } = this.state;
    const isInvalid =
        cardnum === '' || address ==='' || venmo==='' || items.length === 0;
    const subtotal = total;
    const tax = total*0.075;
    total = total*1.075;
    return (
      <div>
        {items.map(p => (
          <ListItem
            ID={p.ID}
            name={p.name}
            price={p.price}
            notes={p.notes}
            quantity={p.quantity}
          />
        ))}
        {items.length === 0 && <h2>Cart is empty. :( </h2>}
        <p style={{color: "white", paddingBottom: "0px", fontFamily: "Nunito"}}>Cart subtotal: ${subtotal.toFixed(2)}</p>
        <p style={{color: "white", paddingBottom: "0px"}}>Sales tax: ${tax.toFixed(2)}</p>
        <p style={{color: "white", paddingBottom: "0px", fontWeight: "bold", fontSize: "20px"}}>Cart total: ${total.toFixed(2)}</p>
        <p style={{fontSize: "11px", color: "white", paddingBottom: "0px"}}>This total might be slightly different from expected 
          if you made additions or substitutions in the notes. 
          Please check your item notes to ensure they are correct.</p>
        <p style={{color: "white", fontSize: "20px"}}>Check that your info is correct:</p>
        <form onSubmit={this.order}>
          <p style={{color: "white"}}>DukeCard Number: </p>
          <input
            name="cardnum"
            value={cardnum}
            className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
            onChange={this.onChange}
            type="text"
            placeholder={cardnum}
          />

          <p style={{color: "white"}}>Delivery Address: </p>
          <input
            name="address"
            value={address}
            className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
            onChange={this.onChange}
            type="text"
            placeholder={address}
          />
          <p style={{color: "white"}}>Venmo Handle: </p>
          <input
            name="venmo"
            value={venmo}
            className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
            onChange={this.onChange}
            type="text"
            placeholder={venmo}
          />
          <p style={{color: "white"}}>When your order is claimed by a deliverer, 
            they will Venmo request the delivery fee of $3.</p>
          <button
            disabled={isInvalid}
            type="submit"
            className="btn btn-light mx-auto"
          >
            Place Order!
          </button>&nbsp;
          <Link to={ROUTES.CART}><button type="submit" className="btn btn-light mx-auto">Back</button></Link>
        </form>
      </div>
    );
  }
}

export default withFirebase(withRouter(ItemList));
