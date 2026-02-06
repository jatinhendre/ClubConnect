import { useEffect, useState } from "react";
import api from "../api/api";

function ViewClubs() {

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [formData, setFormData] = useState({
    studentName: "",
    class: "",
    contactDetails: ""
  });
  const [registering, setRegistering] = useState(false);
  const [myRegistrations, setMyRegistrations] = useState([]);

  useEffect(() => {
    fetchClubs();
    fetchMyRegistrations();
  }, []);

  const fetchClubs = () => {
    api.get("/clubs")
      .then(res => {
        setClubs(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const fetchMyRegistrations = () => {
    api.get("/club-registrations/my")
      .then(res => {
        setMyRegistrations(res.data);
      })
      .catch(err => console.error(err));
  };

  const handleRegisterClick = (club) => {
    setSelectedClub(club);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClub(null);
    setFormData({
      studentName: "",
      class: "",
      contactDetails: ""
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRegistration = async (e) => {
    e.preventDefault();
    setRegistering(true);

    try {
      await api.post("/club-registrations", {
        clubId: selectedClub._id,
        ...formData
      });
      
      alert("Registration submitted successfully! Please wait for admin approval.");
      handleCloseModal();
      fetchMyRegistrations();
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setRegistering(false);
    }
  };

  const getRegistrationStatus = (clubId) => {
    const registration = myRegistrations.find(reg => reg.clubId?._id === clubId);
    return registration?.status;
  };

  const getClubDetails = (clubName) => {
    if (clubName.toLowerCase().includes('sports')) {
      return {
        activities: [
          'Badminton – Improves agility, reflexes, and competitive skills.',
          'Cricket – Encourages teamwork and strategic thinking.',
          'Football – Develops endurance and coordination.',
          'Kabaddi – Enhances strength and tactical skills.',
          'Volleyball – Promotes communication and team collaboration.'
        ],
        about: [
          'Training schedules',
          'Achievements and awards',
          'Inter-college competitions',
          'Sports equipment and facilities'
        ],
        registration: 'Students can register for one or more sports through an online form.'
      };
    } else if (clubName.toLowerCase().includes('ncc')) {
      return {
        intro: 'Short introduction to NCC focusing on discipline, leadership, and national service.',
        activities: [
          'Adventure Sports',
          'Drill and Parade',
          'Leadership Training',
          'First Aid Training'
        ],
        about: [
          'NCC certifications',
          'Camp participation',
          'Republic Day parade opportunities',
          'Character building activities'
        ],
        registration: 'Students can enroll in NCC and select preferred activities.'
      };
    } else if (clubName.toLowerCase().includes('rotaract')) {
      return {
        activities: [
          'Annual Day Celebration',
          'Foundation Day',
          'Cultural Fest',
          'Cookery Fest',
          'Community service projects',
          'Leadership development programs'
        ],
        about: [
          'Social service initiatives',
          'Professional development',
          'Networking opportunities',
          'Global Rotaract network connection'
        ],
        registration: 'Students can register for the club or specific events.'
      };
    }
    return null;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h3 className="mb-4">Our Clubs</h3>

      {clubs.length === 0 && (
        <div className="card">
          <p className="muted-text">No clubs available yet.</p>
        </div>
      )}

      <div style={{ display: "grid", gap: "24px" }}>
        {clubs.map(club => {
          const details = getClubDetails(club.clubName);
          const registrationStatus = getRegistrationStatus(club._id);
          
          return (
            <div key={club._id} className="card">
              {/* Header */}
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "start",
                marginBottom: "24px",
                paddingBottom: "16px",
                borderBottom: "2px solid var(--primary)"
              }}>
                <div style={{ flex: 1 }}>
                  <h2 style={{ 
                    fontSize: "2rem", 
                    color: "var(--primary)",
                    marginBottom: "8px" 
                  }}>
                    {club.clubName}
                  </h2>
                  <p style={{ 
                    color: "var(--text-secondary)", 
                    fontSize: "0.95rem",
                    marginBottom: "0"
                  }}>
                    <strong>Total Members:</strong> {club.members?.length || 0} students
                  </p>
                </div>
                
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <span style={{
                    background: "var(--success)",
                    color: "white",
                    padding: "8px 20px",
                    borderRadius: "25px",
                    fontSize: "14px",
                    fontWeight: "600"
                  }}>
                    Active
                  </span>

                  {registrationStatus === "pending" && (
                    <span style={{
                      background: "#FFA500",
                      color: "white",
                      padding: "8px 20px",
                      borderRadius: "25px",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}>
                      Pending Approval
                    </span>
                  )}

                  {registrationStatus === "approved" && (
                    <span style={{
                      background: "#22C55E",
                      color: "white",
                      padding: "8px 20px",
                      borderRadius: "25px",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}>
                      ✓ Registered
                    </span>
                  )}

                  {registrationStatus === "rejected" && (
                    <span style={{
                      background: "#EF4444",
                      color: "white",
                      padding: "8px 20px",
                      borderRadius: "25px",
                      fontSize: "14px",
                      fontWeight: "600"
                    }}>
                      Rejected
                    </span>
                  )}

                  {!registrationStatus && (
                    <button 
                      className="btn-primary"
                      onClick={() => handleRegisterClick(club)}
                      style={{
                        padding: "10px 24px",
                        fontSize: "14px",
                        fontWeight: "600",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Register Now
                    </button>
                  )}
                </div>
              </div>

              {/* Introduction */}
              {details?.intro && (
                <div style={{ 
                  marginBottom: "24px",
                  padding: "16px",
                  background: "#F0F9FF",
                  borderLeft: "4px solid var(--primary)",
                  borderRadius: "8px"
                }}>
                  <p style={{ 
                    color: "var(--text-main)", 
                    lineHeight: "1.7",
                    marginBottom: "0",
                    fontStyle: "italic"
                  }}>
                    {details.intro}
                  </p>
                </div>
              )}

              {/* Description */}
              {club.description && (
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ 
                    fontSize: "1.1rem", 
                    color: "var(--primary)",
                    marginBottom: "12px",
                    fontWeight: "600"
                  }}>
                    📋 About {club.clubName}
                  </h4>
                  <p style={{ 
                    color: "var(--text-main)", 
                    lineHeight: "1.7",
                    marginBottom: "0"
                  }}>
                    {club.description}
                  </p>
                </div>
              )}

              {/* Activities/Sports Offered */}
              {details?.activities && (
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ 
                    fontSize: "1.1rem", 
                    color: "var(--primary)",
                    marginBottom: "12px",
                    fontWeight: "600"
                  }}>
                    🎯 {club.clubName.toLowerCase().includes('sports') ? 'Sports Offered' : 'Activities'}
                  </h4>
                  <ul style={{ 
                    margin: "0",
                    paddingLeft: "20px",
                    color: "var(--text-main)"
                  }}>
                    {details.activities.map((activity, idx) => (
                      <li key={idx} style={{ 
                        marginBottom: "8px",
                        lineHeight: "1.6"
                      }}>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* About Section */}
              {details?.about && (
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ 
                    fontSize: "1.1rem", 
                    color: "var(--primary)",
                    marginBottom: "12px",
                    fontWeight: "600"
                  }}>
                    ℹ️ Key Features
                  </h4>
                  <ul style={{ 
                    margin: "0",
                    paddingLeft: "20px",
                    color: "var(--text-main)"
                  }}>
                    {details.about.map((item, idx) => (
                      <li key={idx} style={{ 
                        marginBottom: "8px",
                        lineHeight: "1.6"
                      }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Registration Info */}
              {details?.registration && (
                <div style={{ 
                  marginBottom: "24px",
                  padding: "16px",
                  background: "#F0FDF4",
                  borderLeft: "4px solid var(--success)",
                  borderRadius: "8px"
                }}>
                  <h4 style={{ 
                    fontSize: "1rem", 
                    color: "var(--success)",
                    marginBottom: "8px",
                    fontWeight: "600"
                  }}>
                    📝 Registration
                  </h4>
                  <p style={{ 
                    color: "var(--text-main)", 
                    marginBottom: "0",
                    lineHeight: "1.6"
                  }}>
                    {details.registration}
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Registration Modal */}
      {showModal && selectedClub && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div className="card" style={{
            maxWidth: "500px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              marginBottom: "24px"
            }}>
              <div>
                <h3 style={{ marginBottom: "8px" }}>Register for Club</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  {selectedClub.clubName}
                </p>
              </div>
              <button 
                onClick={handleCloseModal}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "var(--text-secondary)",
                  padding: "0",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitRegistration}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Class/Year *</label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 3rd Year CSE"
                />
              </div>

              <div className="form-group">
                <label>Contact Details *</label>
                <input
                  type="text"
                  name="contactDetails"
                  value={formData.contactDetails}
                  onChange={handleInputChange}
                  required
                  placeholder="Phone number or email"
                />
              </div>

              <div style={{ 
                display: "flex", 
                gap: "12px", 
                marginTop: "24px" 
              }}>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={registering}
                  style={{ flex: 1 }}
                >
                  {registering ? "Submitting..." : "Submit Registration"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseModal}
                  disabled={registering}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewClubs;
