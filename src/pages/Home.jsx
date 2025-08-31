import { useBeaches } from "../context/BeachesContext";
import { Link } from "react-router-dom";

export default function Home() {
  const beaches = useBeaches();
  if (!beaches) return <p>Loading...</p>;
  
  return (
    <div className="container mt-4">
      <h1>Zones</h1>
      <div className="row">
        {Object.entries(beaches).map(([rid, region]) => (
          <div key={rid} className="col-md-6 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {region.flag} {region.name}
                </h5>
                <ul className="list-unstyled">
                  {Object.entries(region.locations).map(([bid, beach]) => (
                    <li key={bid}>
                      <Link to={`/zone/${rid}/beach/${bid}`}>
                        {beach.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
