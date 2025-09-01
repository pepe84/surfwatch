import { useParams, Link } from "react-router-dom";
import { useBeaches } from "../context/BeachesContext";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import WebcamCard from "../components/WebcamCard";

export default function Zone() {
  const { beaches } = useBeaches();
  if (!beaches) return <p>Loading...</p>;

  const { tid, zid } = useParams();
  const zone = beaches?.[tid]?.zones?.[zid];
  if (!zone) return <p>Zona no trobada</p>;
  
  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>{zone.name}</h2>
        </Col>
        <Col xs="auto">
          <Button as={Link} to="/" variant="secondary">
            ← Tornar
          </Button>
        </Col>
      </Row>
      <Row>
        {Object.entries(zone.locations).map(([bid, beach]) => {
          const cardBg = "light"; // Canvia a "dark" si vols fons fosc
          const cardText = cardBg === "dark" ? "light" : "dark";

          return (
            <Col xs={12} md={6} lg={4} key={zid} className="mb-4">
              <Card bg={cardBg} text={cardText}>
                <Card.Body>
                  <WebcamCard webcam={beach.webcams[0]}></WebcamCard>
                  <Card.Title className="d-flex justify-content-between align-items-center mt-4">
                    <h3>{beach.name}</h3>
                  </Card.Title>
                  <Card.Text>
                    <h4 class="text-secondary">{beach.region}</h4>
                    <Link className="btn btn-primary" to={`/${tid}/${zid}/${bid}`}>
                      Més detalls
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
