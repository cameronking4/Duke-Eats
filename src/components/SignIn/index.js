import './../../vendor/singchange.css';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import "./../../vendor/bootstrap/css/bootstrap.css";

const SignInPage = () => (
<html>
 <head>
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
 </head>
     <style>{'body { background-color:#8EB8E5; }'}

    </style>
    <body>
    
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <h2 style={{fontSize: '34px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase', marginTop: '20%'}}> Sign In to Your Account</h2>
          <SignInForm /> &nbsp;
         < h2 style={{fontSize: '22px', color:'white', fontFamily:'Nunito', fontWeight: 'bold'}}>Need an Account? <Link to={ROUTES.SIGN_UP}> Sign Up </Link> </h2>
        < h2 style={{fontSize: '22px', color:'white', fontFamily:'Nunito', fontWeight: 'bold'}}><Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link> </h2>
        </div>
      </div>
      
    </div>
    </body>
  </html>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form class="form-inline d-flex" onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          class="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit" class="btn btn-light mx-auto">
          Sign In
        </button>

        {error && <p style={{fontSize: '18px', color:'white', fontFamily:'Nunito', fontWeight: 'bold'}}>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };