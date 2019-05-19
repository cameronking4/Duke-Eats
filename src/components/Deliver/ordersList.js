import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import Order from "./order.js";

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    this.getOrders();
  }

  getOrders() {
    const ordersRef = this.props.firebase.db.ref("orders");
    var { orders } = this.state;
    const self = this;
    ordersRef.once("value", function(snapshot) {
      snapshot.forEach(function(item) {
        var status =item.val().status;
        if (status === 'Pending...'){
        var ID = item.key;
        var items = item.val().items;
        var ordererID = item.val().ordererID;
        var name = item.val().name;
        var address = item.val().address;
        var venmo = item.val().venmo;
        var cardnum = item.val().cardnum;
        var total = item.val().total;
        var location = item.val().location;
        orders.push({
          orderID: ID,
          ordererID: ordererID,
          items: items,
          name: name,
          address: address,
          venmo: venmo,
          cardnum: cardnum,
          total: total,
          location: location
        });
        self.setState({ orders: orders });
      }});
    });
  }

  render() {
    const { orders } = this.state;
    return (
      <div>
        {orders.map(p => (
          <Order
            orderID={p.orderID}
            ordererID={p.ordererID}
            items={p.items}
            name={p.name}
            address={p.address}
            venmo={p.venmo}
            cardnum={p.cardnum}
            total={p.total}
            location={p.location}
          />
        ))}
        {orders.length===0 && <p className="text-white mb-4">No orders to pick up right now.</p>}
      </div>
    );
  }
}

export default withFirebase(OrdersList);
