import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import "./../../scss/_about.scss";
import "./../../scss/_signup.scss";
import "./../../scss/_buttons.scss";
import "./../../vendor/bootstrap/css/bootstrap.css";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => (
  <html>
     <head>
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
 </head>
    <style>{'body { background-color:#8EB8E5; }'}</style>
    <body>
    
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2 style={{fontSize: '34px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '20%'}}> Sign Up for Duke Eats !</h2>
          <SignUpForm /> &nbsp;
         
        </div>
      </div>
      
    </div>
    </body>
  </html>

    
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  cardnum: "",
  address: "",
  venmo: "",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {
      username,
      email,
      passwordOne,
      cardnum,
      address,
      venmo
    } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email, 
          venmo,
          cardnum,
          address
        });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      cardnum,
      address,
      venmo
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "" ||
      cardnum === "" ||
      address === "" ||
      venmo=== "";

    return (
      <form class="form-inline d-flex" onSubmit={this.onSubmit}>
        <input
          name="username"
          class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0 mx-auto"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0 mx-auto"
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0 mx-auto"
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0 mx-auto"
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <input
          name="cardnum"
          value={cardnum}
          class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0 mx-auto"
          onChange={this.onChange}
          type="text"
          placeholder="DukeCard Number"
        />
        <input
          name="venmo"
          value={venmo}
          class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0 mx-auto"
          onChange={this.onChange}
          type="text"
          placeholder="Venmo Handle"
        />
        <input
          name="address"
          value={address}
          class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0 mx-auto"
          onChange={this.onChange}
          type="text"
          placeholder="Default Address"
        />
        <button
          disabled={isInvalid}
          type="submit"
          class="btn btn-light mx-auto"
        >
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
