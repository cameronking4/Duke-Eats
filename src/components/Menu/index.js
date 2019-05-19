import React, { Component } from "react";
import Item from "./../Item";
import "./../../vendor/bootstrap/css/bootstrap.css";

class Menu extends Component {
    render(){
        return (
            <div>
              <h2 style={{fontSize: '20px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '0%'}}>{this.props.description}</h2>
              <h2 style={{fontSize: '20px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '0%'}}> {this.props.items.map(p => (
                <Item
                  key={p.name}
                  name={p.name}
                  price={p.price}
                  description={p.description}
                  location={this.props.location}
                />
              ))}</h2>

              
            </div>
          );
    }
  
}

export default Menu;
