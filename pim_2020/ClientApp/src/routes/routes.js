import React from 'react';
import { Switch, Route } from 'react-router-dom';


import ForgotPage from '../pages/ForgotPage';
import LoginPage from '../pages/LoginPage';
import Page404 from '../pages/Page404';
import ProductPage from '../pages/ProductPage';
import PurchasePage from '../pages/PurchasePage';
import RegistrationPage from '../pages/RegistrationPage';
import MyRoute from './mayRoute';




function Routes() {
    return (
        
        <Switch>
            <Route path="/" exact component={LoginPage}  />
            <Route path="/registrations" exact component={RegistrationPage} />
            <Route path="/forgots" exact component={ForgotPage} />
            <MyRoute path="/products/" exact component={ProductPage} />
            <MyRoute path="/purchases" exact component={PurchasePage} />
            <Route path="*" component={Page404} />
        </Switch>
        
    );
}

export default Routes