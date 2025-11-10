import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/admin/Dashboard';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" exact component={Products} />
                <Route path="/products/:id" component={ProductDetails} />
                <Route path="/cart" component={Cart} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/admin/dashboard" component={AdminDashboard} />
            </Switch>
        </Router>
    );
};

export default Routes;