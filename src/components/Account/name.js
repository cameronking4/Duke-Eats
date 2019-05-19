import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import './../../vendor/changed.css';
  
  class NameChangeForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        error: null,
        uid: this.props.firebase.auth.currentUser.uid,
        name: '',
        submitted: false,
      };
    }
    
    componentDidMount() {
        this.getName();
    }

    getName(){
        const { uid } = this.state;
        const self = this;
        this.props.firebase.user(uid).once('value').then(function(snapshot) {
            const n = snapshot.val().username;
            self.setState({ name: n });
        })
    }

    onSubmit = event => {
      const { name, uid } = this.state;
      const self = this;
      this.props.firebase
        .db.ref('users/' + uid + '/username').set(
            name
        ) 
        .then(() => {
          self.getName();
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
      const { name, error, submitted } = this.state;
      const isInvalid =
        name === '';
      return (
        <form onSubmit={this.onSubmit} className="form-inline d-flex">
          <input
            name="name"
            value={name}
            className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
            onChange={this.onChange}
            type="text"
            placeholder= {name}
          />
          <button disabled={isInvalid} type="submit" className="btn btn-light mx-auto custom">
            Change My Name
          </button> 
  
          {error && <p>{error.message}</p>}
          {submitted && <h2 style={{ color: 'white' }}>Name Changed</h2>}
        </form>
      );
    }
  }
  
  export default withFirebase(NameChangeForm);