import React, { Component } from 'react';

import { withFirebase } from '../Firebase';


  
  class VenmoChangeForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        error: null,
        uid: this.props.firebase.auth.currentUser.uid,
        venmo: '',
        submitted: false,
      };
    }
    
    componentDidMount() {
        this.getVenmo();
    }

    getVenmo(){
        const { uid } = this.state;
        const self = this;
        this.props.firebase.user(uid).once('value').then(function(snapshot) {
            const ven = snapshot.val().venmo;
            self.setState({ venmo: ven });
        })
    }

    onSubmit = event => {
      const { venmo, uid } = this.state;
      const self = this;
      this.props.firebase
        .db.ref('users/' + uid + '/venmo').set(
            venmo
        ) 
        .then(() => {
          self.getVenmo();
        })
        .catch(error => {
          this.setState({ error });
        });
        this.setState({ submitted: true })
      event.preventDefault();
    };
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {
      const { venmo, error, submitted } = this.state;
      const isInvalid =
        venmo === '';
      return (
        <form onSubmit={this.onSubmit} className="form-inline d-flex">
          <input
            name="venmo"
            value={venmo}
            className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
            onChange={this.onChange}
            type="text"
            placeholder= {venmo}
          />
          <button disabled={isInvalid} type="submit" className="btn btn-light mx-auto custom">
            Change My Venmo Handle
          </button>
  
          {error && <p>{error.message}</p>}
          {submitted && <h2 style={{ color: 'white' }}>Venmo Handle Changed</h2>}
        </form>
      );
    }
  }
  
  export default withFirebase(VenmoChangeForm);