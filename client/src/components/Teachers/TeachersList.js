import { useState, useEffect } from "react";
import axios from "axios";
import TeacherProfile from "./TeacherProfile";

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/teachers").then((response) => {
      setTeachers(response.data);
    });
  }, []);

  const handleViewClick = (teacher) => {
    selectedTeacher(teacher._id);
  };

  const handleCloseClick = () => {
    selectedTeacher(null);
  };

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">First Name</th>
            <th className="py-3 px-6 text-left">Last Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {teachers.map((teacher) => (
            <tr
              key={teacher._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {teacher.firstName}
              </td>
              <td className="py-3 px-6 text-left">{teacher.lastName}</td>
              <td className="py-3 px-6 text-left">{teacher.email}</td>
              <td className="py-3 px-6 text-left">{teacher.address}</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleViewClick(teacher)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {setSelectedTeacher && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-2 w-3/5">
            <div className="text-center">
              <TeacherProfile teacherId={setSelectedTeacher} />
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleCloseClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeachersList;