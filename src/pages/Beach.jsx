import { useParams, Link } from "react-router-dom";
import { useBeaches } from "../context/BeachesContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import WebcamCard from "../components/WebcamCard";
import MeteoWidget from "../components/MeteoWidget";

export default function Beach() {
  const { beaches } = useBeaches();
  if (!beaches) return <p>Carregant...</p>;

  const { tid, zid, bid } = useParams();
  const beach = beaches?.[tid]?.zones?.[zid]?.locations?.[bid];
  if (!beach) return <p>Platja no trobada</p>;

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>{beach.name}</h2>
          <h3 class="text-secondary">{beach.region}</h3>
        </Col>
        <Col xs="auto">
          <Button as={Link} to={`/${tid}/${zid}`} variant="secondary">
            ← Tornar
          </Button>
        </Col>
      </Row>
      <Row>
        <h3>Webcams</h3>
        {beach.webcams.map((webcam, idx) => (
        <div key={idx} className="col-lg-4 col-md-6 mb-4">
          <WebcamCard webcam={webcam} showCaption={true} />
        </div>
        ))}
        <MeteoWidget code={beach.code} />
      </Row>
    </Container>
  );
}
