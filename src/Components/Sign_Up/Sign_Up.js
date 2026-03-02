import React, { useState } from 'react';

import { NavLink, useNavigate } from "react-router-dom";
import { API_URL } from '../../config';
import "./Sign_Up.css"


const hasError = (errors, paramName)=> errors?.find(e => e.param === paramName);
const findMyError = (errors, paramName)=>{
    if (!errors) return '';
    const entry = errors.find(e => e.param === paramName);
    if (!entry) return '';
    return entry ? entry.msg : '';
};

const Sign_Up = () =>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    // const [showerr, setShowerr] = useState(''); // State to show error messages
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate(); // Navigation hook from react-router


    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            setErrors(json.error);
            // if (json.errors) {
            //     for (const error of json.errors) {
            //         setShowerr(error.msg); // Show error messages
            //     }
            // } else {
            //     setShowerr(json.error);
            // }
        }
    };

    return <section className="auth-card" style={{marginTop:20}}>
    <h1 className="auth-title">Sign Up</h1>
    <p className="auth-subtitle">
      Already a member?&nbsp;
      <NavLink href="/login" className="auth-link">Login</NavLink>
    </p>

    <form className="auth-form" action="#" method="post" novalidate  onSubmit={register}>

      <div className="field">
        <label className="label" for="role">Role</label>
        <div className="select-wrapper">
          <select id="role" name="role" className="input select">
            <option value="" disabled selected>Select role</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label" for="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="input"
          placeholder="Enter your name"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        {hasError(errors, 'name') && <p className="error">{findMyError(errors, 'name')}</p>}
      </div>

      <div className="field">
        <label className="label" for="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="input"
          placeholder="Enter your phone number"
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
        {hasError(errors, 'phone') && <p className="error">{findMyError(errors, 'phone')}</p>}
      </div>

      <div className="field">
        <label className="label" for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          placeholder="Enter your email address"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          aria-describedby="helpId"
        />
        {hasError(errors, 'email') && <p className="error">{findMyError(errors, 'email')}</p>}
      </div>

      <div className="field">
        <label className="label" for="password">Password</label>
        <div className="input-with-icon">
          <input
            type="password"
            id="password"
            name="password"
            className="input input--with-icon"
            placeholder="Enter your password"
            value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="button" className="icon-btn" aria-label="Toggle password visibility">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M12 5c5.5 0 9.5 5.2 10.6 6.9.2.3.2.9 0 1.2C21.5 14.8 17.5 20 12 20S2.5 14.8 1.4 13.1a1.2 1.2 0 0 1 0-1.2C2.5 10.2 6.5 5 12 5z"
                fill="currentColor"
              />
            </svg>
          </button>
        {hasError(errors, 'password') && <p className="error">{findMyError(errors, 'password')}</p>}

        </div>
      </div>

      <div className="actions">
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="reset" className="btn btn-danger">Reset</button>
      </div>

      <p className="error error--center">Email already registered.</p>

    </form>
  </section>
}

export default Sign_Up;