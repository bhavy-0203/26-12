import { useSelect } from "@chakra-ui/react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/Slice/User";

function NavBar() {
  const navigate = useNavigate();
  const handleRoutes = (route) => {
    navigate(route);
  };
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => handleRoutes("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => handleRoutes("/products")}>
              products
            </Nav.Link>
            <Nav.Link onClick={() => handleRoutes("/add-product")}>
              Add product
            </Nav.Link>
            <Nav.Link onClick={() => handleRoutes("/cart")}>cart</Nav.Link>

            {user.username ? (
              <>
                <Nav.Link onClick={() => dispatch(logOut())}>logOut</Nav.Link>
                <Nav.Link>{user.username}</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => handleRoutes("/login")}>
                  login
                </Nav.Link>
                <Nav.Link onClick={() => handleRoutes("/signup")}>
                  signup
                </Nav.Link>
              </>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
