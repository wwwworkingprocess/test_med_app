import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"

function BrandIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000">
    <g>
      <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
      <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
      <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44.0,77.2-88.0V580.4c-90.2-15.8-158.6-94.1-158.6-188.0l0-19.8h49.6v19.8c0,77.1,62.6,139.7,139.7,139.7c77.1,0,139.7-62.6,139.7-139.7v-19.8h49.6V395z"></path>
    </g>
  </svg>
}

export default function Navbar()  {
  const navigate = useNavigate();
  const handleClick = ()=>{
        const toggleBtn = document.querySelector(".nav__toggle");
    const links = document.querySelector(".nav__links");
    const actions = document.querySelector(".nav__actions");
    const icon = toggleBtn.querySelector("i");

        const isOpen = links.classList.toggle("is-open");
        actions.classList.toggle("is-open", isOpen);
        toggleBtn.setAttribute("aria-expanded", String(isOpen));
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-times", isOpen);
    }

    const isLoggedIn = sessionStorage.getItem('auth-token');
    const onLogout = ()=>{
        sessionStorage.clear();
        navigate("/");

    }


    return <nav className="nav" aria-label="Primary navigation">
    <NavLink className="nav__brand" to="/" aria-label="StayHealthy Home">
      <span className="nav__brandIcon" aria-hidden="true">
        <BrandIcon />
      </span>
      <span className="nav__brandText">StayHealthy</span>
    </NavLink>

    <button className="nav__toggle" type="button" aria-label="Toggle menu" aria-expanded="false" onClick={handleClick}>
      <i className="fa fa-bars" aria-hidden="true"></i>
    </button>

    <ul className="nav__links" id="primaryNav">
        <li className="nav__item"><NavLink className="nav__link" to={"/"}>Home</NavLink></li>
        <li className="nav__item"><NavLink className="nav__link" to={"/"}>Appointments</NavLink></li>
        
    </ul>

    <div className="nav__actions">
      {isLoggedIn ? <span style={{minWidth:'140px'}}>Welcome {sessionStorage.getItem('name')}</span>:null}
      <NavLink className="btn btn--outline" to={"/sign-up"}>Sign up</NavLink>
      {!isLoggedIn ? <NavLink className="btn btn--primary" to={"/login"}>Login</NavLink> :
      <button className="btn btn--primary" onClick={onLogout}>Log out</button>}
    </div>
  </nav>
}