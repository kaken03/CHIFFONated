import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Navbar from '../components/common/Navbar';
import './Profile.css';

const Profile = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [mode, setMode] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // phone states (display + edit)
  const [phone, setPhone] = useState('—');
  const [editing, setEditing] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!user) return;

    // fetch user record from Firestore (users collection)
    const fetchUser = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          setPhone(data?.phone || '—');
        } else {
          setPhone('—');
        }
      } catch (err) {
        console.error('Failed to fetch user doc:', err);
        setPhone('—');
      }
    };

    fetchUser();
  }, [user]);

  const handleSignOut = async () => {
    setLoading(true);
    setError('');
    try {
      await signOut(auth);
      setLoading(false);
      history.push('/');
    } catch (err) {
      setError(err.message || 'Failed to sign out.');
      setLoading(false);
    }
  };

  const startEditPhone = () => {
    setPhoneError('');
    setSuccessMsg('');
    setPhoneInput(phone === '—' ? '' : phone);
    setEditing(true);
  };

  const cancelEditPhone = () => {
    setEditing(false);
    setPhoneInput('');
    setPhoneError('');
  };

  const handlePhoneChange = (e) => {
    // Keep only digits and limit to 11
    const v = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhoneInput(v);
    setPhoneError('');
  };

  const validatePhone = (p) => {
    // Exactly 11 digits, starting with 09
    return /^09\d{9}$/.test(p);
  };

  const savePhone = async (e) => {
    e.preventDefault();
    setPhoneError('');
    setSuccessMsg('');
    const normalized = phoneInput.trim();
    
    if (!validatePhone(normalized)) {
      setPhoneError('Please enter a valid phone number (11 digits, starting with 09)');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { phone: normalized }, { merge: true });
      setPhone(normalized);
      setEditing(false);
      setSuccessMsg('Phone number updated successfully');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Failed to update phone:', err);
      setPhoneError('Unable to save phone number. Please try again.');
    }
  };

  if (!auth) {
    return (
      <div className="home-page">
        <Navbar />
        <div className="profile-page container">
          <h2>Profile</h2>
          <p className="muted">
            Firebase is not configured. Login / Signup are disabled until Firebase is set up.
          </p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="home-page">
        <Navbar />
        <div className="profile-page container">
          <h2>Your Account</h2>

          <div className="profile-card profile-grid">
            <div className="profile-avatar" aria-hidden>
              {/* simple initial avatar */}
              <div className="avatar-circle">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-row">
                <div className="label">Name</div>
                <div className="value">{user.displayName || '—'}</div>
              </div>

              <div className="profile-row">
                <div className="label">Email</div>
                <div className="value">{user.email}</div>
              </div>

              <div className="profile-row">
                <div className="label">Phone</div>
                <div className="value">
                  {editing ? (
                    <form className="edit-phone-form" onSubmit={savePhone}>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={11}
                        value={phoneInput}
                        onChange={handlePhoneChange}
                        placeholder="09123456789"
                        className="input-inline"
                        required
                      />
                      <div className="edit-actions">
                        <button type="submit" className="btn btn-primary small">
                          Save
                        </button>
                        <button type="button" className="btn btn-secondary small" onClick={cancelEditPhone}>
                          Cancel
                        </button>
                      </div>
                      {phoneError && <div className="field-error">{phoneError}</div>}
                    </form>
                  ) : (
                    <>
                      <span className="phone-text">{phone}</span>
                      <button className="btn btn-outline small" onClick={startEditPhone}>
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>

              {successMsg && <div className="auth-success">{successMsg}</div>}
              {error && <div className="auth-error" role="alert">{error}</div>}

              <div className="profile-actions">
                <button className="btn btn-secondary" onClick={() => history.push('/orders')}>
                  My Orders
                </button>
                <button className="btn btn-primary" onClick={handleSignOut} disabled={loading}>
                  {loading ? 'Signing out…' : 'Sign Out'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not signed in => show Login or Signup component
  return (
    <div className="home-page">
      <Navbar />
      <div className="profile-page container">
        <div className="auth-wrapper">
          {mode === 'login' ? (
            <Login onSwitch={(m) => setMode(m)} />
          ) : (
            <Signup onSwitch={(m) => setMode(m)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;