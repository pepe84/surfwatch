import { useParams, Link } from "react-router-dom";
import { useBeaches } from "../context/BeachesContext";
import WebcamCard from "../components/WebcamCard";

export default function Region() {
  const { rid } = useParams();
  const beaches = useBeaches();
  if (!beaches) return <p>Loading...</p>;

  const region = beaches[rid];
  if (!region) return <p>Regió no trobada</p>;

  return (
    <div className="container mt-4">
      <h2>{region.name}</h2>
      <div className="row">
        {Object.entries(region.locations).map(([bid, beach]) => (
          <div key={bid} className="col-lg-4 col-md-6 mb-4">
            <div className="card">
              <WebcamCard webcam={beach.webcams[0]}></WebcamCard>
              <Link className="btn btn-primary" to={`/zone/${rid}/beach/${bid}`}>
                Més detalls
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
