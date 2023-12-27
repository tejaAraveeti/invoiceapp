import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });

  const initialValues = {
    Name: "",
    email: "",
    userName: "",
    password: "",
  };

  const onSubmit = (values) => {
    axios
      .post("http://localhost:8000/api/signup/", values)
      .then(
        (response) => {
          const token = response.data.token;

          localStorage.setItem("authToken", token);

          setRequestResponse({
            textMessage: response.data.message,
            alertClass: "alert alert-success",
          });

          navigate("/login");
        },
        (error) => {
          setRequestResponse({
            textMessage: error.response.data.message,
            alertClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => console.log(error));
  };

  const validationSchema = Yup.object({
    Name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email"),
    userName: Yup.string().required("UserName is required"),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="wrapper">
            <div className={requestResponse.alertClass} role="alert">
              {requestResponse.textMessage}
            </div>
            <h2>Register</h2>
            <hr />
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="userName">UserName</label>
                <input
                  type="text"
                  className={
                    formik.touched.userName && formik.errors.userName
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="userName"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <small className="text-danger">
                    {formik.errors.userName}
                  </small>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  className={
                    formik.touched.Name && formik.errors.Name
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="Name"
                  name="Name"
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.Name && formik.errors.Name ? (
                  <small className="text-danger">
                    {formik.errors.Name}
                  </small>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className={
                    formik.touched.email && formik.errors.email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <small className="text-danger">{formik.errors.email}</small>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={
                    formik.touched.password && formik.errors.password
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                ) : null}
              </div>

              <input
                type="submit"
                value="Register"
                className="btn btn-primary btn-block"
              />
            </form>
            <br />
            <p className="text-center">
              Already Registered <Link to="/login">Click Here</Link>
            </p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Signup;
