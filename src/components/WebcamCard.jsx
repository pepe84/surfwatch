import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

export default function WebcamCard({ webcam }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="card">
      {loading && <Spinner animation="border" />}
      {webcam.type == "photo" ? (
        <>
          <img
            className="card-img-top"
            src={webcam.src}
            alt={webcam.name}
            loading="lazy"
            onLoad={() => setLoading(false)}
          />
        </>
      ) : (
        <iframe
          className="card-img-top"
          src={webcam.src}
          title={webcam.caption}
          loading="lazy"
          onLoad={() => setLoading(false)}
        ></iframe>
      )}
      <div className="card-body">
        <p className="card-text">{webcam.caption}</p>
      </div>
    </div>
  );
}
