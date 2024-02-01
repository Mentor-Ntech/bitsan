import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../image/logo.jpg";
import { GoThreeBars } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import { links } from "../data";
import { userCOntext } from "../context/context";
// import { getUser } from "../utils/userRetrieve";

const Navbar = () => {
  const [isNavShowing, setIsNavShowing] = useState(false);
  const [userExist, setUserExist] = useState(undefined);
  const {user} = useContext(userCOntext)

  useEffect(() => {
    // const user = getUser();
    setUserExist(user);
  }, []);
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="logo" onClick={() => setIsNavShowing(false)}>
          <img src={logo} alt="Nav Logo" />
        </Link>
        <>
          <ul
            className={`nav__links ${isNavShowing ? "show__nav" : "hide__Nav"}`}
          >
            {links.map(({ name, path }, index) => {
              return (
                <li>
                  <NavLink
                    key={index}
                    end
                    to={path}
                    className={({ isActive }) => (isActive ? "active-nav" : "")}
                    onClick={() => setIsNavShowing((prev) => !prev)}
                  >
                    {name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          {user ? (
            <NavLink to="/dashboard">
              <button>Dashboard</button>
            </NavLink>
          ) : (
            <NavLink to="/signin">
              <button>Sign in</button>
            </NavLink>
          )}
        </>

        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing((prev) => !prev)}
        >
          {isNavShowing ? <MdOutlineClose /> : <GoThreeBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
