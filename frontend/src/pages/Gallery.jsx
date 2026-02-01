import { useEffect, useState } from "react";
import api from "../api/api";

function Gallery() {

  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    api.get("/gallery").then(res => {
      setEvents(res.data.events);
      setResources(res.data.resources);
    });
  }, []);

  const isImage = (file) => {
    return file.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  };

  return (
    <div>

      <h3 className="mb-3">Gallery</h3>

      <div className="grid-container">

        {events.map(e => (
          e.poster && (
            <div key={e._id} className="card">
              <img
                src={`http://localhost:5000/uploads/${e.poster}`}
                className="gallery-img"
                alt={e.title}
                loading="lazy"
              />
              <p className="mt-2">{e.title}</p>
            </div>
          )
        ))}

        {resources.map(r => (
          <div key={r._id} className="card">

            {isImage(r.file) ? (
              <img
                src={`http://localhost:5000/uploads/${r.file}`}
                className="gallery-img"
                alt={r.title}
                loading="lazy"
              />
            ) : (
              <div className="file-box">
                📄 {r.title}
              </div>
            )}

            <p className="mt-2">{r.title}</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Gallery;
