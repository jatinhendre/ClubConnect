import { useEffect, useState } from "react";
import api from "../../api/api";

function Registrations() {

  const [regs, setRegs] = useState([]);

  useEffect(() => {
    api.get("/registrations").then((res)=>{
      setRegs(res.data);
    });
  }, []);

  const updateStatus = async (id, status) => {
    await api.patch(`/registrations/${id}`, { status });
    alert("Updated");
    window.location.reload();
  };

  return (
    <div>
      <h3>Event Registrations</h3>

      {regs.map((r)=>(
        <div key={r._id}>
          <p>{r.studentId.name} - {r.eventId.title}</p>
          <p>Status: {r.status}</p>

          <button onClick={()=>updateStatus(r._id,"approved")}>
            Approve
          </button>

          <button onClick={()=>updateStatus(r._id,"rejected")}>
            Reject
          </button>
        </div>
      ))}
    </div>
  );
}

export default Registrations;
