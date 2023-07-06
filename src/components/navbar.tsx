import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <nav className="navbar navbar-expand-xxl navbar-light bg-dark mb-4">
        <div className="container">
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
                <li className="nav-item">
                  <Link to="/admin" className="nav-link active">
                    Admin
                  </Link>
                </li>
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
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </nav>
    </div>
  );
}
