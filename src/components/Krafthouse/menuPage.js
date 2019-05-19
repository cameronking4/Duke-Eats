import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "../Menu";
import * as ROUTES from "../../constants/routes";
import "./../../scss/_buttons.scss";
import "./../../vendor/bootstrap/css/bootstrap.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { withFirebase } from "../Firebase";

class KrafthouseMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      descrips: []
    };
  }

  componentWillMount() {
    this.getCats();
  }

  getCats() {
    var { cats, descrips } = this.state;
    const self = this;
    var rootRef = this.props.firebase.db.ref("krafthouseMenu");
    rootRef.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        cats.push(child.key);
        descrips.push({
          cat: child.key,
          description: child.val().description
        });
        self.setState({ cats: cats, descrips: descrips });
      });
    });
  }

  makeList(cat) {
    var items = [];
    const { descrips } = this.state;
    var des = "";
    descrips.forEach(function(d) {
      if (d.cat === cat) {
        des = d.description;
      }
    });
    var rootRef = this.props.firebase.db.ref("krafthouseMenu");
    var catRef = rootRef.child(cat);
    catRef.once("value", function(snapshot) {
      snapshot.forEach(function(child) {
        if (child.key !== "description") {
          items.push({
            name: child.key,
            price: child.val().price,
            description: child.val().description
          });
        }
      });
    });
    return (
      <Tab eventKey={cat} title={cat}>
        <Menu items={items} description={des} location="krafthouse" />
      </Tab>
    );
  }

  render() {
    var { cats } = this.state;
    return (
      <div>
        <div className= "test">
        <div className="test2">
        <section id="signin" className="">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <h2
                  style={{
                    fontSize: "55px",
                    color: "#21295C",
                    fontFamily: "Nunito",
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  Devil's Krafthouse Menu
                </h2>
                <Tabs defaultActiveKey="profile" id="noanim-tab-example">
                  {cats.map(cat => this.makeList(cat.toString()))}
                </Tabs>
                <Link to={ROUTES.ORDER}>
                  <button type="submit" className="btn btn-light mx-auto">
                    Back
                  </button>{" "}
                  &nbsp;
                </Link>
                <Link to={ROUTES.CART}>
                  <button type="submit" className="btn btn-light mx-auto">
                    Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div> 
      </div>
    );
  }
}

export default withFirebase(KrafthouseMenu);
