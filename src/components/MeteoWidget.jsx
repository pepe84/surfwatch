import { useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

const MeteoWidget = ({ code }) => {
  if (!code) return null;

  const [loadingNow, setLoadingNow] = useState(true);
  const nowUrl = `https://portus.puertos.es/index.html#/locationsRTWidget?locationType=Playa&code=${code}&theme=dark&locale=es`;
  const [loadingFuture, setLoadingFuture] = useState(true);
  const futureUrl = `https://portus.puertos.es/#/locationsPredWidget?locationType=Playa&code=${code}&theme=dark&locale=es`;

  return (
    <Row className="mt-3">
      <Col xs={12} lg={6} className="mb-3 mb-lg-0">
        <h3>Condicions actuals</h3>
        {loadingNow && <Spinner animation="border" />}
        <iframe
          src={nowUrl}
          title={`Meteo actual ${code}`}
          className="w-100 rounded mb-3"
          style={{ height: "300px", border: "none" }}
          loading="lazy" 
          onLoad={() => setLoadingNow(false)}
        ></iframe>
      </Col>
      <Col xs={12} lg={6}>
        <h3>Prediccions</h3>
        {loadingFuture && <Spinner animation="border" />}
        <iframe
          src={futureUrl}
          title={`Meteo predicció ${code}`}
          className="w-100 rounded"
          style={{ height: "300px", border: "none" }}
          loading="lazy" 
          onLoad={() => setLoadingFuture(false)}
        ></iframe>
      </Col>
    </Row>
  );
};

export default MeteoWidget;
