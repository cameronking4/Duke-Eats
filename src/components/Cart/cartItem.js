import React, { Component } from "react";
import "../Item/item.css";
import { withFirebase } from "../Firebase";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.firebase.auth.currentUser.uid
    };
  }

  handleClick = () => {
    const id = this.props.ID;
    const { uid } = this.state;
    this.props.firebase.db
      .ref("users/" + uid + "/cart")
      .child("/" + id)
      .set(null);
    window.location.reload();
  };

  render() {
    return (
      <div className="item">
        <span>{this.props.name}</span>
        <p>${this.props.price.toFixed(2)}</p>
        <p>{this.props.quantity}</p>
        <p>Ordered from: {this.props.location}</p>
        <p>{this.props.notes}</p>
        <button type="button" className="btn btn-light mx-auto" onClick={this.handleClick}>
          Remove Item
        </button>
      </div>
    );
  }
}

export default withFirebase(CartItem);
