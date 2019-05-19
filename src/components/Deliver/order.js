import React, { Component } from "react";
import "../Item/item.css";
import ListItem from "./item.js";
import { withFirebase } from "../Firebase";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.firebase.auth.currentUser.uid
    };
  }

  handleClick = () => {
    const { uid } = this.state;
    const orderID = this.props.orderID;
    this.props.firebase.db
      .ref("orders/")
      .child(orderID)
      .update({ status: 'Accepted by deliverer', delivererID: uid });
    window.location.reload();
  };

  render() {
    const total = this.props.total*1.075;
    return (
      <div className="item">
      <h2 style={{fontSize: '20px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '0%'}}> Order at {this.props.location} for {this.props.name}</h2>
      <h2 style={{fontSize: '20px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '0%'}}> Order total: ${total.toFixed(2)}</h2>
      <h2 style={{fontSize: '20px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '0%'}}> Deliver to: {this.props.address}</h2>

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
          Deliver this order!
        </button>
      </div>
    );
  }
}

export default withFirebase(Order);
