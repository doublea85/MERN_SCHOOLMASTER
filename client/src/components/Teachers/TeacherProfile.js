import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import avatar from "../../assets/profile.png";
import { FiEdit } from "react-icons/fi";

function TeacherProfile({ teacherId }) {
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/teacher/${teacherId}`)
      .then((response) => {
        setTeacher(response.data);
      });
  }, [teacherId]);

  const handleEdit = () => {
    navigate(`/teacher/${teacherId}/edit`);
  };

  return (
    <div className="flex flex-col">
      {teacher ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">
              {teacher.firstName} {teacher.lastName}
            </h3>
          </div>
          <hr className="border-gray-300 mt-2 mb-4"/>
          <div className="flex gap-20">
            <div>
              <img
                src={teacher.profile || avatar}
                alt={`${teacher.firstName} ${teacher.lastName}`}
                className="w-20 border-slate-500"
              />
            </div>
            <div className="ml-4">
              <ul>
                <li className="flex  gap-20 text-left">
                  <strong>Email:</strong> {teacher.email}
                </li>
                <li className="flex  gap-20 text-left">
                  <strong>Address:</strong> {teacher.address} 24 rue raspail 96290 Nullpart
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

export default TeacherProfile;


