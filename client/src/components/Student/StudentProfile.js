import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import avatar from "../../assets/profile.png";
import { FiEdit } from "react-icons/fi";

function StudentProfile({ studentId }) {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/student/${studentId}`)
      .then((response) => {
        setStudent(response.data);
      });
  }, [studentId]);

  const handleEdit = () => {
    navigate(`/students/${studentId}/edit`);
  };

  return (
    <div className="flex flex-col">
      {student ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">
              {student.firstName} {student.lastName}
            </h3>
          </div>
          <hr className="border-gray-300 mt-2 mb-4"/>
          <div className="flex gap-20">
            <div>
              <img
                src={student.profile || avatar}
                alt={`${student.firstName} ${student.lastName}`}
                className="w-20 border-slate-500"
              />
            </div>
            <div className="ml-4">
              <ul>
                <li className="flex  gap-20 text-left">
                  <strong>Email:</strong> {student.email}
                </li>
                <li className="flex  gap-20 text-left">
                  <strong>Address:</strong> {student.address} 24 rue raspail 96290 Nullpart
                </li>
              </ul>
            </div>
            <div>
              <button onClick={handleEdit}>
                <FiEdit />
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StudentProfile;


