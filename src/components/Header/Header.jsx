import React, { useRef, useEffect, useState } from "react";
import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import { authActions } from "../../store/authStore.js";
import "../../styles/header.css";

const nav__links = [
  { display: "Home", path: "/home" },
  { display: "Foods", path: "/foods" },
  { display: "Cart", path: "/cart" },
  { display: "Contact", path: "/contact" },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const dropdownRef = useRef(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const toggleCart = () => dispatch(cartUiActions.toggle());
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(authActions.logout());
    setDropdownOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get initials avatar from username
  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="logo">
            <img src={logo} alt="logo" />
            <h5>Tasty Treat</h5>
          </div>

          {/* Nav links */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) => navClass.isActive ? "active__menu" : ""}
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="nav__right d-flex align-items-center gap-4">
            {/* Cart */}
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            {/* User / Profile */}
            {isLoggedIn ? (
              <div
                className="profile__dropdown"
                ref={dropdownRef}
                style={{ position: "relative", cursor: "pointer" }}
              >
                {/* Avatar circle with initial */}
                <div
                  onClick={toggleDropdown}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#df2020",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    fontSize: "16px",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  title={user?.username}
                >
                  {getInitials(user?.username)}
                </div>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "45px",
                      right: "0",
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                      minWidth: "180px",
                      zIndex: 9999,
                      overflow: "hidden",
                    }}
                  >
                    {/* Profile info */}
                    <div
                      style={{
                        padding: "12px 16px",
                        borderBottom: "1px solid #f0f0f0",
                        background: "#fafafa",
                      }}
                    >
                      <p style={{ margin: 0, fontWeight: "700", fontSize: "14px", color: "#333" }}>
                        {user?.username}
                      </p>
                      <p style={{ margin: 0, fontSize: "11px", color: "#888", marginTop: "2px" }}>
                        {user?.email}
                      </p>
                    </div>

                    {/* Conditional links based on role */}
                    {user?.role === "ADMIN" ? (
                      <div
                        onClick={() => { setDropdownOpen(false); navigate("/admin"); }}
                        style={{
                          padding: "12px 16px",
                          fontSize: "14px",
                          color: "#333",
                          fontWeight: "500",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          borderBottom: "1px solid #f0f0f0"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <i className="ri-dashboard-line"></i>
                        Dashboard
                      </div>
                    ) : (
                      <div
                        onClick={() => { setDropdownOpen(false); navigate("/orders"); }}
                        style={{
                          padding: "12px 16px",
                          fontSize: "14px",
                          color: "#333",
                          fontWeight: "500",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          borderBottom: "1px solid #f0f0f0"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <i className="ri-list-check"></i>
                        My Orders
                      </div>
                    )}

                    {/* Logout */}
                    <div
                      onClick={handleLogout}
                      style={{
                        padding: "12px 16px",
                        fontSize: "14px",
                        color: "#df2020",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <i className="ri-logout-box-r-line"></i>
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <span className="user">
                <Link to="/login">
                  <i className="ri-user-line"></i>
                </Link>
              </span>
            )}

            {/* Mobile menu */}
            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;