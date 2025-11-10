import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import '../../pages/Profile.css'; // reuse profile styles

const Login = ({ onSwitch }) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      history.push('/profile');
    } catch (err) {
      setError(err.message || 'Failed to sign in.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Sign In</h2>
      {error && <div className="auth-error" role="alert">{error}</div>}

      <form className="auth-form" onSubmit={handleLogin}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>

        <div className="auth-actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setError('');
              onSwitch && onSwitch('signup');
            }}
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;