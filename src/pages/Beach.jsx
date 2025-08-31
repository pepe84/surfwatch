import { useParams, Link } from "react-router-dom";
import { useBeaches } from "../context/BeachesContext";
import { Button } from "react-bootstrap";
import WebcamCard from "../components/WebcamCard";
import MeteoWidget from "../components/MeteoWidget";

export default function Beach() {
  const beaches = useBeaches();
  if (!beaches) return <p>Loading...</p>;

  const { rid, bid } = useParams();
  const beach = beaches?.[rid]?.locations?.[bid];
  if (!beach) return <p>Platja no trobada</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{beach.name}</h2>
        <Button as={Link} to={`/zone/${rid}`} variant="secondary">
          ← Tornar <span className="d-none d-sm-inline">a {beaches[rid].name}</span>
        </Button>
      </div>
      <div className="row">
        <h3>Webcams</h3>
        {beach.webcams.map((cam, idx) => (
          <div key={idx} className="col-lg-4 col-md-6 mb-4">
            <WebcamCard webcam={cam} />
          </div>
        ))}
      </div>
      <div className="row">
        <MeteoWidget code={beach.code} />
      </div>
    </div>
  );
}
