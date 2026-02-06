import { useState, useEffect } from "react";
import api from "../../api/api";

function UploadGallery() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clubId, setClubId] = useState("");
  const [image, setImage] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Load clubs
    api.get("/clubs").then(res => {
      setClubs(res.data);
    });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !image) {
      return setError("Title and image are required");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      if (clubId) formData.append("clubId", clubId);

      await api.post("/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSuccess("Photo uploaded successfully!");
      setTitle("");
      setDescription("");
      setClubId("");
      setImage(null);
      setPreview(null);
      
      // Reset file input
      document.getElementById("imageInput").value = "";
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="mb-4">Upload Gallery Photo</h3>

      <div className="card">
        {success && (
          <div style={{ 
            padding: "12px", 
            background: "#d4edda", 
            color: "#155724", 
            borderRadius: "8px",
            marginBottom: "16px"
          }}>
            {success}
          </div>
        )}

        {error && (
          <div style={{ 
            padding: "12px", 
            background: "#f8d7da", 
            color: "#721c24", 
            borderRadius: "8px",
            marginBottom: "16px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Photo Title *</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter photo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-input"
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Club (Optional)</label>
            <select
              className="form-input"
              value={clubId}
              onChange={(e) => setClubId(e.target.value)}
            >
              <option value="">-- All Clubs --</option>
              {clubs.map(club => (
                <option key={club._id} value={club._id}>
                  {club.clubName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Upload Image *</label>
            <input
              id="imageInput"
              className="form-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {preview && (
            <div className="form-group">
              <label>Preview:</label>
              <img 
                src={preview} 
                alt="Preview" 
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  borderRadius: "8px",
                  marginTop: "8px"
                }}
              />
            </div>
          )}

          <button 
            className="btn btn-primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Photo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadGallery;
