import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import "./item.css";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: "",
      prev: "",
      added: false,
      notes: "",
      uid: this.props.firebase.auth.currentUser.uid
    };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { quantity, notes, uid } = this.state;
    const userRef = this.props.firebase.db.ref("users/" + uid);

    //add item to cart
    userRef.child("cart").push({
          name: this.props.name,
          price: this.props.price,
          quantity: quantity,
          notes: notes,
          location: this.props.location
        });

    this.setState({ added: true, prev: quantity, quantity: '', notes: '' });
    event.preventDefault();
  };

  render() {
    const { quantity, added, notes, prev } = this.state;
    const isInvalid = quantity === "" || quantity === 0 || isNaN(quantity);
    return (
      <div className="item">
        <span>{this.props.name}</span>
        <p>${this.props.price.toFixed(2)}</p>
        <p>{this.props.description}</p>
        <form onSubmit={this.onSubmit} className="form-inline d-flex">
          <input
            name="quantity"
            value={quantity}
            className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
            onChange={this.onChange}
            type="text"
            placeholder="Quantity"
          />
          <input
            name="notes"
            value={notes}
            className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
            onChange={this.onChange}
            type="text"
            placeholder="Notes"
          />
          <button
            disabled={isInvalid}
            type="submit"
            className="btn btn-light mx-auto"
          >
            Add to cart
          </button>
          
          {added && <h2>{prev} item(s) added to cart!</h2>}
        </form>
      </div>
    );
  }
}

export default withFirebase(Item);
