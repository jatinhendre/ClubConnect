import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import api from "../api/api";

function Gallery() {

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = () => {
    api.get("/gallery")
      .then(res => {
        setPhotos(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const deletePhoto = async (id) => {
    if (!confirm("Are you sure you want to delete this photo?")) {
      return;
    }

    try {
      await api.delete(`/gallery/${id}`);
      loadGallery();
    } catch (error) {
      alert("Failed to delete photo");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3 className="mb-3">Gallery</h3>

      {photos.length === 0 && (
        <div className="card">
          <p className="muted-text">No photos in gallery yet.</p>
        </div>
      )}

      <div className="grid-container">
        {photos.map(photo => (
          <div key={photo._id} className="card" style={{ position: "relative" }}>
            <img
              src={`http://localhost:5000/uploads/${photo.image}`}
              className="gallery-img"
              alt={photo.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
            
            <div style={{ marginTop: "12px" }}>
              <h4 style={{ fontSize: "16px", marginBottom: "4px" }}>
                {photo.title}
              </h4>
              
              {photo.description && (
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                  {photo.description}
                </p>
              )}
              
              {photo.clubId && (
                <span style={{
                  background: "var(--primary)",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "12px"
                }}>
                  {photo.clubId.clubName}
                </span>
              )}
            </div>

            {user?.role === "admin" && (
              <button
                className="btn-danger"
                onClick={() => deletePhoto(photo._id)}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  padding: "4px 8px",
                  fontSize: "12px"
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
