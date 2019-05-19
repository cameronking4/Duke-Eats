import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

  
  class AddressChangeForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        error: null,
        uid: this.props.firebase.auth.currentUser.uid,
        address: '',
        submitted: false,
      };
    }
    
    componentDidMount() {
        this.getAddress();
    }

    getAddress(){
        const { uid } = this.state;
        const self = this;
        this.props.firebase.user(uid).once('value').then(function(snapshot) {
            const add = snapshot.val().address;
            self.setState({ address: add });
        })
    }

    onSubmit = event => {
      const { address, uid } = this.state;
      const self = this;
      this.props.firebase
        .db.ref('users/' + uid + '/address').set(
            address
        ) 
        .then(() => {
          self.getAddress();
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
      const { address, error, submitted } = this.state;
      const isInvalid =
        address === '';
      return (
        <form onSubmit={this.onSubmit} className="form-inline d-flex">
          <input
            name="address"
            value={address}
            className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
            onChange={this.onChange}
            type="text"
            placeholder= {address}
          />
          <button disabled={isInvalid} type="submit" className="btn btn-light mx-auto custom">
            Change My Default Address
          </button>
  
          {error && <p>{error.message}</p>}
          {submitted && <h2 style={{ color: 'white' }}>Address Changed</h2>}
        </form>
      );
    }
  }
  
  export default withFirebase(AddressChangeForm);