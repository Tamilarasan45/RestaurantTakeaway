import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleRegisterNavigate = () => {
    navigate('/register');
};
  const handleLogin = async (event) => {
      event.preventDefault();
     
      try { 
          await login(email, password);
         
      } catch (error) {
          setError('Invalid credentials or network error.'); 
          
      }
  };  

  return (
      <div className={styles.login}>
          <h1>Grab & Go</h1>
          <div className={styles.logincontainer}>
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                  <div className={styles.formgroup}>
                      <label htmlFor="email">Email:</label>
                      <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className={styles.formgroup}>
                      <label htmlFor="password">Password:</label>
                      <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  {error && <div className={styles.error}>{error}</div>}
                  <div className={styles.formgroup}>
                      <button type="submit">Login</button>
                  </div>
              </form>
              <div className={styles.registerlink}>
              <p>New to Grab & Go? <button onClick={handleRegisterNavigate} className={styles.registerButton}>Register here</button></p>
              </div>
          </div>
      </div>
  );
};

export default Login;