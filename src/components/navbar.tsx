import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { Button } from "@mui/material";
import {
  getAccessTokenFromLS,
  getUserDetails,
  getUserFromLS,
  removeAccessTokenFromLS,
  removeUserFromLS,
  storeAccessTokenInLS,
  storeUserInLS,
} from "../services/google";
import { User } from "../model/user";
import { SuccessLogin } from "../model/success-login";

export default function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [user, setUser] = useState(new User({}));

  const handleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      console.log("Success while google signin", res);
      storeAccessTokenInLS(res);
      const u = await getUserDetails(res.access_token);
      setUser(u);
      console.log("User", u);
      storeUserInLS(u);
    },
    onError: (res) => {
      console.log("Error while google signin", res);
    },
  });

  useEffect(() => {
    const accessToken = getAccessTokenFromLS();
    const minutesPassed = new Date().getHours() * 60 + new Date().getMinutes();
    if (accessToken) {
      const diff = accessToken.expires_in - minutesPassed;
      if (diff > 0) {
        const u = getUserFromLS();
        setUser(new User(u));
      } else {
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    setUser(new User({}));
    googleLogout();
    removeUserFromLS();
    removeAccessTokenFromLS();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-xxl navbar-light bg-dark mb-4">
        <div className="container">
          {user && user.email ? (
            <>
              <Button variant="contained" color="error" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLogin()}
              >
                Login With Google
              </Button>
            </>
          )}
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbarExample-expand-xxl"
            aria-controls="offcanvasNavbarExample-expand-xxl"
            onClick={handleShow}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Offcanvas
            show={show}
            onHide={handleClose}
            target="#offcanvasNavbarExample-expand-xxl"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>GO TO</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {user && user.email ? (
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link active">
                      Admin
                    </Link>
                  </li>
                ) : (
                  <></>
                )}
                <li className="nav-item">
                  <Link to="/form" className="nav-link">
                    Form
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
              </ul>
              {user && user.email ? (
                <div className="card flex-md-row mb-4 box-shadow h-md-250">
                  <div className="card-body d-flex flex-column align-items-start">
                    <strong className="d-inline-block mb-2 text-primary">
                      {user.name}
                    </strong>
                    <p className="mb-0">{user.email}</p>
                    <div className="mb-1 text-muted">Nov 12</div>
                    <p className="card-text mb-auto">
                      {user.verified_email ? "Verified" : "Not Verified"}
                    </p>
                  </div>
                  <img
                    className="card-img-right flex-auto d-none d-md-block thumbnail"
                    src={user.picture}
                  />
                  <div></div>
                </div>
              ) : (
                <></>
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>
    </div>
  );
}
