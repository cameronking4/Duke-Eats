import React, { Component } from "react";
import "../Item/item.css";
import ListItem from "../Deliver/item.js";
import { withFirebase } from "../Firebase";

class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.firebase.auth.currentUser.uid
    };
  }

  handleClick = () => {
    const orderID = this.props.orderID;
    this.props.firebase.db
      .ref('orders')
      .child(orderID)
      .set(null);
    window.location.reload();
  };

  render() {
    const total = this.props.total*1.075;
    return (
      <div className="item">
        <span>
          Order at {this.props.location}
        </span>
        <p style={{color: "white"}}>Status: {this.props.status}</p>
        <p style ={{color: "white"}}>Order total: ${total.toFixed(2)}</p>
        <p style={{color: "white"}}>Deliver to: {this.props.address}</p>
        {this.props.items.map(p => (
          <ListItem
            name={p.name}
            price={p.price}
            notes={p.notes}
            quantity={p.quantity}
          />
        ))}
        <button
          type="button"
          className="btn btn-light mx-auto"
          onClick={this.handleClick}
        >
          Cancel order :(
        </button>
      </div>
    );
  }
}

export default withFirebase(MyOrder);
