import React, { Component } from "react";
import "../Item/item.css";

class ListItem extends Component {

  render() {
      const total = this.props.quantity*this.props.price;
    return (
      <div className="item">
        <span style={{fontSize:"20px", color: "white"}}>{this.props.name}</span>
        <p style={{color: "white"}}>${this.props.price.toFixed(2)}</p>
        <p style={{color: "white"}}>{this.props.quantity}</p>
        <p style={{color: "white"}}>Item total: ${total.toFixed(2)}</p>
        <p style={{color: "white"}}>{this.props.notes}</p>
      </div>
    );
  }
}

export default ListItem;