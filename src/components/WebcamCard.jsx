import { useState } from "react";
import { Spinner, Card, Button } from "react-bootstrap";
import NoPreview from "../assets/No_Preview_1.jpg"

export default function WebcamCard({ webcam, showCaption = false }) {
  const [loading, setLoading] = useState(true);

  return (
    <Card>
      {loading && <Spinner animation="border" />}
      {(webcam.type == "photo" || webcam.type == "video") && (
        <a href={webcam.src}>
          <img
            className="card-img-top"
            src={webcam.type=="photo" ? webcam.src : (webcam.preview ? webcam.preview : NoPreview )}
            alt={webcam.name}
            loading="lazy"
            onLoad={() => setLoading(false)} 
            onError={() => setLoading(false)}
          />
        </a>
      )}
      {webcam.type == "iframe" && (
        <iframe
          className="card-img-top"
          src={webcam.src}
          title={webcam.caption}
          loading="lazy"
          onLoad={() => setLoading(false)} 
          onError={() => setLoading(false)}
        ></iframe>
      )}
      {webcam.type == "m3u8" && (
        <iframe
          className="card-img-top"
          src={webcam.src}
          title={webcam.caption}
          loading="lazy"
          onLoad={() => setLoading(false)} 
          onError={() => setLoading(false)}
        ></iframe>
      )}
      { showCaption && 
        <Card.Body>
          <Card.Text>
            <span class="me-2">{webcam.type=="photo" ? "📷" : "📽"}</span><a href={ webcam.link ? webcam.link : webcam.src }>{webcam.caption}</a>
          </Card.Text>
        </Card.Body>
      }
    </Card>
  );
}
