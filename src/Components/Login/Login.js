import {useCallback, useState, useEffect } from 'react'
import { NavLink, useNavigate  } from "react-router-dom";
import "./Login.css"
import { API_URL } from '../../config';

const Login = () =>{
    const [error, setError] = useState(''); // Invalid email or address provided

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword ] = useState(false);
    
    // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

    // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);

      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
            setError(error.msg);
        }
      } else {
        setError(json.error);
      }
    }
  };

    return <section className="auth-card" aria-label="Login form">
        <h1 className="auth-title">Login</h1>

        <p className="auth-subtitle">
          Are you a new member?
          <NavLink className="auth-link" to="/sign-up">Sign Up Here</NavLink>
        </p>

        <form className="auth-form" action="#" method="post" novalidate onSubmit={login}>
          <div className="field">
            <label className="label" for="email">Email</label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              autocomplete="email"
              value={email} onChange={(e) => setEmail(e.target.value)} 
            />
            

            {!email.length && password.length ? <p className="error">Please provide a valid email address</p> : ''}
          </div>

          <div className="field">
            <label className="label" for="password">Password</label>

            <div className="input-with-icon">
              <input
                className="input input--with-icon"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                autocomplete="current-password"
                value={password} onChange={(e) => setPassword(e.target.value)} 
              />
              

              <button className="icon-btn" type="button" aria-label="Toggle password visibility"
               onClick={() => setShowPassword((prev) => !prev)}
              >
                
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 5c5.5 0 9.5 5.2 10.6 6.9.2.3.2.9 0 1.2C21.5 14.8 17.5 20 12 20S2.5 14.8 1.4 13.1a1.2 1.2 0 0 1 0-1.2C2.5 10.2 6.5 5 12 5zm0 3.2A3.8 3.8 0 1 0 12 16a3.8 3.8 0 0 0 0-7.6zm0 2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="submit">Submit</button>
            <button className="btn btn-danger" type="reset">Reset</button>
          </div>

          
          {error ? <p className="error error--center">{error}</p> : ''}

          <p className="auth-footer">
            <a className="auth-link" href="#">Forgot your password?</a>
          </p>
        </form>
      </section>
}

export default Login;