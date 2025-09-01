import { Card, Row, Col, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useBeaches } from "../context/BeachesContext";
import TerritoryTitle from "../components/TerritoryTitle";

export default function Home() {
  const { beaches } = useBeaches();
  if (!beaches) return <p>Carregant...</p>;

  const countBeachesInZone = (zone) =>
    Object.keys(zone.locations).length;

  const countBeachesInTerritory = (territory) =>
    Object.values(territory.zones).reduce(
      (acc, zone) => acc + countBeachesInZone(zone),
      0
    );

  return (
    <Container className="mt-4">
      <Row>
        {Object.entries(beaches).map(([zid, territory]) => {
          const territoryBeachCount = countBeachesInTerritory(territory);
          const cardBg = "light"; // Canvia a "dark" si vols fons fosc
          const cardText = cardBg === "dark" ? "light" : "dark";
          const badgeBg = cardBg === "dark" ? "light" : "dark";
          const badgeText = cardBg === "dark" ? "dark" : "light";

          return (
            <Col xs={12} md={6} lg={4} key={zid} className="mb-4">
              <Card bg={cardBg} text={cardText}>
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    <span className="d-inline-flex align-items-center">
                      <TerritoryTitle territory={territory}></TerritoryTitle>
                    </span>
                    <Badge
                      bg={badgeBg}
                      text={badgeText}
                      className="ms-2" // marge esquerra
                    >
                      {territoryBeachCount} spots
                    </Badge>
                  </Card.Title>

                  <Card.Text>
                    {Object.keys(territory.zones).length} zones
                  </Card.Text>

                  <Row className="mt-2">
                    {Object.entries(territory.zones).map(([rid, zone]) => {
                      const beachCount = countBeachesInZone(zone);
                      return (
                        <Col xs={12} key={rid} className="mb-1">
                          <Link
                            to={`/${zid}/${rid}`}
                            className="d-flex justify-content-between align-items-center text-decoration-none"
                          >
                            <span>{zone.name}</span>
                            <Badge
                              bg={badgeBg}
                              text={badgeText}
                              className="ms-2" // marge esquerra
                            >
                              {beachCount}
                            </Badge>
                          </Link>
                        </Col>
                      );
                    })}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
