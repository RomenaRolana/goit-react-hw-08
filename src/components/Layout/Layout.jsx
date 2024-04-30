import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserData } from "../../redux/auth/selectors";
import { apiLogOut } from "../../redux/auth/operations";

import css from "../../App.module.css";
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userDate = useSelector(selectUserData);

  const onLogout = () => {
    dispatch(apiLogOut());
  };

  return (
    <div>
      <header>
        <nav className={css.nav}>
          <NavLink to='/' className={buildLinkClass}>
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink to='/contacts' className={buildLinkClass}>
                Contacts
              </NavLink>

              <div className={css.user}>
                <span className={css.span}>Hi , {userDate.name}</span>
                <button className={css.button} onClick={onLogout} type='button'>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {" "}
              <NavLink to='/login' className={buildLinkClass}>
                Login
              </NavLink>
              <NavLink to='/register' className={buildLinkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
