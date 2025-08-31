// src/components/Navbar.jsx
import { Navbar, Container, Nav } from "react-bootstrap";
import { useBeaches } from "../context/BeachesContext";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  const beaches = useBeaches();

  if (!beaches) return null; // Espera a que carregui el JSON

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">🌊 SurfWatch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {Object.entries(beaches).map(([rid, region]) => (
              <Nav.Link
                key={rid}
                as={Link}
                to={`/zone/${rid}`}
              >
                {region.flag} {region.name}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
