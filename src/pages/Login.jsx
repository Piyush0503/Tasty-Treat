import React, { useRef, useState } from "react";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authStore.js";
import { cartActions } from "../store/shopping-cart/cartSlice.js";

const API_URL = "http://localhost:5050/users/login";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    const email = loginEmailRef.current?.value?.trim();
    const password = loginPasswordRef.current?.value;

    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";

    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "At least 6 characters";

    return e;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const payload = {
      email: loginEmailRef.current.value.trim(),
      password: loginPasswordRef.current.value,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        // Save user in Redux store
        dispatch(authActions.setUser({
          username: data.username,
          email: payload.email,
          userId: data.userId, // Added userId
        }));

        // Fetch user's cart from backend
        try {
          const cartRes = await fetch(`http://localhost:5050/cart/${data.userId}`);
          if (cartRes.ok) {
            const cartData = await cartRes.json();
            // Transform to Redux format
            const cartItems = cartData.items.map(item => ({
              id: item.productId,
              title: item.title,
              image01: item.image01,
              price: item.price,
              quantity: item.quantity,
              totalPrice: item.totalPrice
            }));
            const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
            const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

            dispatch(cartActions.replaceCart({
              cartItems: cartItems,
              totalQuantity: totalQuantity,
              totalAmount: totalAmount
            }));
          }
        } catch (err) {
          console.error("Failed to load cart", err);
        }

        toast.success("Welcome back! Login successful 🎉");
        loginEmailRef.current.value = "";
        loginPasswordRef.current.value = "";
        setTimeout(() => navigate("/"), 1500);

      } else if (res.status === 404) {
        toast.error("No account found. Go first Register...");
      } else if (res.status === 401) {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error(data.message || "Login failed. Try again.");
      }
    } catch {
      toast.error("Network error. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CommonSection title="Login" />
      <br />
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="m-auto text-center">
            <ToastContainer position="top-right" autoClose={2500} />

            <form className="form mb-5" onSubmit={submitHandler}>
              <div className="form__group">
                <input type="email" placeholder="Email" ref={loginEmailRef} />
                {errors.email && (
                  <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="form__group">
                <input type="password" placeholder="Password" ref={loginPasswordRef} />
                {errors.password && (
                  <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                    {errors.password}
                  </p>
                )}
              </div>

              <button type="submit" className="addTOCart__btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <Link to="/register">Don't have an account? Create an account</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;