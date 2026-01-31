import { useEffect, useState } from "react";
import api from "../../api/api";

function ViewStudents() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/admin/students").then((res)=>{
      setStudents(res.data);
    });
  }, []);

  return (
    <div>
      <h3>Students</h3>

      {students.map(s => (
        <div key={s._id}>
          <p>Name: {s.name}</p>
          <p>Email: {s.email}</p>

          <p>
            Clubs:
            {s.clubs.map(c => (
              <span key={c._id}> {c.clubName} </span>
            ))}
          </p>

          <hr/>
        </div>
      ))}
    </div>
  );
}

export default ViewStudents;
