import React from 'react';
import { BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import Order from '../Order';
import Deliver from '../Deliver';
import Thrive from '../Thrive';
import Cart from '../Cart';
import Checkout from '../Checkout';
import Deliveries from '../Deliveries';
import Orders from '../Orders';
import Krafthouse from '../Krafthouse';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
    <Navigation />


      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ORDER} component={Order} />
      <Route path={ROUTES.DELIVER} component={Deliver} />
      <Route path={ROUTES.THRIVE} component={Thrive} />
      <Route path={ROUTES.CART} component={Cart} />
      <Route path={ROUTES.CHECKOUT} component={Checkout} />
      <Route path={ROUTES.DELIVERIES} component={Deliveries} />
      <Route path={ROUTES.ORDERS} component={Orders} />
      <Route path={ROUTES.KRAFTHOUSE} component={Krafthouse} />
    </div>
  </Router>
);

export default withAuthentication(App);