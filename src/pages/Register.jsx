import React, { useRef, useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5050/users/register";

const Register = () => {
  const navigate = useNavigate();
  const signupNameRef = useRef();
  const signupPasswordRef = useRef();
  const signupEmailRef = useRef();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    const username = signupNameRef.current?.value?.trim();
    const email = signupEmailRef.current?.value?.trim();
    const password = signupPasswordRef.current?.value;

    if (!username) e.username = "Full name is required";
    else if (username.length < 3) e.username = "At least 3 characters";

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
      username: signupNameRef.current.value.trim(),
      email: signupEmailRef.current.value.trim(),
      password: signupPasswordRef.current.value,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "User Register successfully!");
        
        setTimeout(() => {
          signupNameRef.current.value = "";
          signupEmailRef.current.value = "";
          signupPasswordRef.current.value = "";
          navigate("/login")}, 2000);
      } else {
        toast.error(data.message || "Registration failed. Try again.");
      }
    } catch {
      toast.error("Network error. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <br/>

      {/* <section> */}
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <ToastContainer position="top-right" autoClose={2000} />

              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Full name"
                    ref={signupNameRef}
                  />
                  {errors.username && (
                    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                      {errors.username}
                    </p>
                  )}
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    ref={signupEmailRef}
                  />
                  {errors.email && (
                    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    ref={signupPasswordRef}
                  />
                  {errors.password && (
                    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                      {errors.password}
                    </p>
                  )}
                </div>

                <button type="submit" className="addTOCart__btn" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>

              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      {/* </section> */}
    </Helmet>
  );
};

export default Register;