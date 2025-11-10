import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/admin/Dashboard';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App" style={{ padding: 24 }}>
        <h1>CHIFFONated — test render</h1>
        <p>If you see this, React is mounting correctly.</p>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:id" component={ProductDetails} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/admin" component={AdminDashboard} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;