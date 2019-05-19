import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <html>
    <head>
  <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet"></link>
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"></link>
 </head>
 
  <section id="forgotPassword" className="about-section text-center">
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h2 style={{fontSize: '34px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase'}}>Forgot my Password</h2>
           <h2 style={{fontSize: '18px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase'}}> Complete form below tor reset passsword</h2>
          <h2 style={{fontSize: '12px', color:'white', fontFamily:'Nunito', fontWeight: 'bold', textTransform:'uppercase'}}><PasswordForgetForm /> </h2>
        </div>
      </div>
     
    </div>
  </section>
  </html>


);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form className="form-inline d-flex" onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
          type="text"
          placeholder="Email Address"
        />
        <Button variant="light">
          Reset my Password
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };