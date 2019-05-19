import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import MyOrder from "./order.js";

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      uid: this.props.firebase.auth.currentUser.uid
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders() {
    var { orders, uid } = this.state;
    const self = this;
    this.props.firebase.db.ref('orders').once("value", function(snapshot) {
      snapshot.forEach(function(item) {
        var ordererID = item.val().ordererID;
        if (ordererID === uid) {
          var ID = item.key;
          var items = item.val().items;
          var name = item.val().name;
          var address = item.val().address;
          var venmo = item.val().venmo;
          var cardnum = item.val().cardnum;
          var total = item.val().total;
          var location = item.val().location;
          var status = item.val().status;

          orders.push({
            ordererID: ordererID,
            orderID: ID,
            items: items,
            name: name,
            address: address,
            venmo: venmo,
            cardnum: cardnum,
            total: total,
            location: location,
            status: status
          });
          self.setState({ orders: orders });
        }
      });
    });
  }

  render() {
    const { orders } = this.state;
    return (
      <div>
        {orders.map(p => (
          <MyOrder
            orderID={p.orderID}
            ordererID={p.ordererID}
            items={p.items}
            name={p.name}
            address={p.address}
            venmo={p.venmo}
            cardnum={p.cardnum}
            total={p.total}
            location={p.location}
            status={p.status}
          />
        ))}
        {orders.length === 0 && (
            <h2 style={{fontSize: '20px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '1%'}}> No orders placed right now.</h2>
        )}
      </div>
    );
  }
}

export default withFirebase(OrdersList);
