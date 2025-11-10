import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link to="/" className="brand" onClick={close}>
          CHIFFONated
        </Link>

        <button
          className={`nav-toggle${open ? ' open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className={`nav-links${open ? ' open' : ''}`} aria-label="Main navigation">
          <NavLink exact to="/" className="nav-link" activeClassName="active" onClick={close}>
            Home
          </NavLink>
          <NavLink to="/products" className="nav-link" activeClassName="active" onClick={close}>
            Products
          </NavLink>
          <NavLink to="/cart" className="nav-link" activeClassName="active" onClick={close}>
            Cart
          </NavLink>
          <NavLink to="/orders" className="nav-link" activeClassName="active" onClick={close}>
            Orders
          </NavLink>
          <NavLink to="/profile" className="nav-link" activeClassName="active" onClick={close}>
            Profile
          </NavLink>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;