import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

  
  class CardNumChangeForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        error: null,
        uid: this.props.firebase.auth.currentUser.uid,
        cardNum: '',
        submitted: false,
      };
    }
    
    componentDidMount() {
        this.getCardNum();
    }

    getCardNum(){
        const { uid } = this.state;
        const self = this;
        this.props.firebase.user(uid).once('value').then(function(snapshot) {
            const cN = snapshot.val().cardnum;
            self.setState({ cardNum: cN });
        })
    }

    onSubmit = event => {
      const { cardNum, uid } = this.state;
      const self = this;
      this.props.firebase
        .db.ref('users/' + uid + '/cardnum').set(
            cardNum
        ) 
        .then(() => {
          self.getCardNum();
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
      const { cardNum, error, submitted } = this.state;
      const isInvalid =
        cardNum === '';
      return (
        <form onSubmit={this.onSubmit} className="form-inline d-flex">
          <input
            name="cardNum"
            value={cardNum}
            className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0"
            onChange={this.onChange}
            type="text"
            placeholder= {cardNum}
          />
          <button disabled={isInvalid} type="submit" className="btn btn-light mx-auto custom">
            Change My DukeCard Number
          </button>
  
          {error && <p>{error.message}</p>}
          {submitted && <h2 style={{ color: 'white' }}>Card Number Changed</h2>}
        </form>
      );
    }
  }
  
  export default withFirebase(CardNumChangeForm);