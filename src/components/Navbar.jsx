import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBeaches } from "../context/BeachesContext";
import TerritoryTitle from "./TerritoryTitle";

export default function AppNavbar() {
  const { beaches } = useBeaches();

  const countBeachesInZone = (zone) =>
    Object.keys(zone.locations).length;

  const countBeachesInTerritory = (territory) =>
    Object.values(territory.zones).reduce(
      (acc, zone) => acc + countBeachesInZone(zone),
      0
    );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🌊👀 surfwatch
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {beaches &&
              Object.entries(beaches).map(([zid, territory]) => {
                const territoryBeachCount = countBeachesInTerritory(territory);
                return (
                  <NavDropdown
                    title={
                      <>
                        <TerritoryTitle territory={territory}></TerritoryTitle>
                        <Badge bg="light" text="dark" className="ms-2">
                          {territoryBeachCount}
                        </Badge>
                      </>
                    }
                    id={`nav-dropdown-${zid}`}
                    key={zid}
                  >
                    {Object.entries(territory.zones).map(([rid, zone]) => {
                      const beachCount = countBeachesInZone(zone);
                      return (
                        <NavDropdown.Item
                          as={Link}
                          to={`/${zid}/${rid}`}
                          key={rid}
                          className="d-flex justify-content-between align-items-center"
                        >
                          <span>{zone.name}</span>
                          <Badge bg="dark" className="ms-2">
                            {beachCount}
                          </Badge>
                        </NavDropdown.Item>
                      );
                    })}
                  </NavDropdown>
                );
              })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
