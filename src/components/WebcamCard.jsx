import { useState, useEffect, useRef } from "react";
import { Spinner, Card } from "react-bootstrap";
import NoPreview from "../assets/No_Preview_1.jpg";

export default function WebcamCard({ webcam, showCaption = false }) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(
    webcam.type === "photo"
      ? webcam.src
      : webcam.preview
      ? webcam.preview
      : NoPreview
  );

  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const handleImageLoad = () => {
    setLoading(false);

    if (
      webcam.refresh &&
      (webcam.type === "photo" || webcam.type === "video") &&
      !intervalRef.current
    ) {
      intervalRef.current = setInterval(() => {
        const baseSrc =
          webcam.type === "photo"
            ? webcam.src
            : webcam.preview
            ? webcam.preview
            : NoPreview;
        setImageSrc(`${baseSrc}?t=${Date.now()}`);
      }, webcam.refresh);
    }
  };

  return (
    <Card>
      {loading && <Spinner animation="border" />}
      {(webcam.type === "photo" || webcam.type === "video") && (
        <a href={webcam.src} target="_blank" rel="noopener noreferrer">
          <img
            className="card-img-top"
            src={imageSrc}
            alt={webcam.caption || webcam.name}
            loading="lazy"
            onLoad={() => handleImageLoad()}
            onError={() => setLoading(false)}
          />
        </a>
      )}
      {(webcam.type === "iframe" || webcam.type === "m3u8") && (
        <iframe
          className="card-img-top"
          src={webcam.src}
          title={webcam.caption || webcam.name}
          loading="lazy"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        ></iframe>
      )}
      {showCaption && (
        <Card.Body>
          <Card.Text>
            <span className="me-2">
              {webcam.type === "photo" ? "📷" : "📽"}
            </span>
            <a href={webcam.link ? webcam.link : webcam.src}>
              {webcam.caption}
            </a>
          </Card.Text>
        </Card.Body>
      )}
    </Card>
  );
}
