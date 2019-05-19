import React, { Component } from "react";
import "../Item/item.css";


class ListItem extends Component {

  render() {
      const total = this.props.quantity*this.props.price;
    return (

      <div className="item">
      <style>{'body { background-color:#8EB8E5; }'}</style>
      <h2 style={{fontSize: '15px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '1%'}}> {this.props.name}</h2>
        <h2 style={{fontSize: '15px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '1%'}}> ${this.props.price.toFixed(2)}</h2>
        <h2 style={{fontSize: '15px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '1%'}}> Quantity: {this.props.quantity}</h2>
        <h2 style={{fontSize: '15px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '1%'}}> Item total: ${total.toFixed(2)}</h2>
        <h2 style={{fontSize: '15px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '1%'}}> {this.props.notes}</h2>

      </div>
    );
  }
}

export default ListItem;