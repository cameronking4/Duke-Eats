import React, { Component } from "react";
import "../Item/item.css";
import ListItem from "../Deliver/item.js";
import { withFirebase } from "../Firebase";

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.firebase.auth.currentUser.uid
    };
  }

  updateStatus() {
    const status = this.props.status;
    if (status === 'Accepted by deliverer') {
      return (
        <button
          type="button"
          className="btn btn-light mx-auto"
          onClick={this.orderPlaced}
        >
          Order placed!
        </button>
      );
    } else if (status === "Order placed!") {
      return (
        <button
          type="button"
          className="btn btn-light mx-auto"
          onClick={this.enRoute}
        >
          On the way!
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-light mx-auto"
          onClick={this.completed}
        >
          Order completed!
        </button>
      );
    }
  }

  orderPlaced = () => {
    const orderID = this.props.orderID;
    this.props.firebase.db
      .ref("orders/")
      .child(orderID)
      .update({ status: "Order placed!" });
    window.location.reload();
  };

  enRoute = () => {
    const orderID = this.props.orderID;
    this.props.firebase.db
      .ref("orders/")
      .child(orderID)
      .update({ status: "Deliverer en route!" });
    window.location.reload();
  };

  completed = () => {
    const orderID = this.props.orderID;
    this.props.firebase.db
      .ref("orders/")
      .child(orderID)
      .set(null);
    window.location.reload();
  };

  cancelDel = () => {
    const orderID = this.props.orderID;
    this.props.firebase.db
      .ref("orders/")
      .child(orderID)
      .update({ status: "Pending...", delivererID: "" });
    window.location.reload();
  };

  render() {
    const total = this.props.total * 1.075;
    return (
      <div className="item">
        <span>
          Order at {this.props.location} for {this.props.name}
        </span>
        <p style={{color: "white", paddingBottom: "0px"}}>Current status: {this.props.status}</p>
        <p style={{color: "white", paddingBottom: "0px"}}>Order total: ${total.toFixed(2)}</p>
        <p style={{color: "white", paddingBottom: "0px"}}>Deliver to: {this.props.address}</p>
        <p style={{color: "white", paddingBottom: "0px"}}>Venmo request delivery fee of $3 from @{this.props.venmo}</p>
        <p style={{color: "white", paddingBottom: "0px"}}>Pay using DukeCard number {this.props.cardnum}</p>
        {this.props.items.map(p => (
          <ListItem
            name={p.name}
            price={p.price}
            notes={p.notes}
            quantity={p.quantity}
          />
        ))}
        {this.updateStatus()} &nbsp;
        <button
          type="button"
          className="btn btn-light mx-auto"
          onClick={this.cancelDel}
        >
          Cancel delivery
        </button>
      </div>
    );
  }
}

export default withFirebase(Delivery);
