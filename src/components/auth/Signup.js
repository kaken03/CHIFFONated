import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import '../../pages/Profile.css'; // reuse profile styles

const Signup = ({ onSwitch }) => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // normalize input to digits only (or allow a single leading +)
  const handlePhoneChange = (e) => {
    let v = e.target.value;
    // Keep only digits and limit to 11
    v = v.replace(/\D/g, '').slice(0, 11);
    setPhone(v);
  };

  const validatePhone = (p) => {
    // Exactly 11 digits, starting with 09
    return /^09\d{9}$/.test(p);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!name || !email || !password || !phone) {
      setError('Please fill in all fields');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number (11 digits, starting with 09)');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // 1. Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update auth profile with display name
      await updateProfile(user, { displayName: name });

      // 3. Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        phone: phone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: 'customer' // default role
      });

      setLoading(false);
      history.push('/profile'); // or '/orders' depending on your flow

    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account');
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      {error && <div className="auth-error" role="alert">{error}</div>}

      <form className="auth-form" onSubmit={handleSignup}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Full name"
          />
        </label>

        <label>
          Phone
          <input
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={11}
            value={phone}
            onChange={handlePhoneChange}
            placeholder="09123456789"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </label>
    
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="Minimum 6 characters"
          />
        </label>

        <div className="auth-actions">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Create Account'}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setError('');
              onSwitch && onSwitch('login');
            }}
          >
            Already have an account?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;