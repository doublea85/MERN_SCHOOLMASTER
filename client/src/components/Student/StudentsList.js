import { useState, useEffect } from "react";
import axios from "axios";
import StudentProfile from "./StudentProfile";

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/students").then((response) => {
      setStudents(response.data);
    });
  }, []);

  const handleViewClick = (student) => {
    setSelectedStudent(student._id);
  };

  const handleCloseClick = () => {
    setSelectedStudent(null);
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
          {students.map((student) => (
            <tr
              key={student._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {student.firstName}
              </td>
              <td className="py-3 px-6 text-left">{student.lastName}</td>
              <td className="py-3 px-6 text-left">{student.email}</td>
              <td className="py-3 px-6 text-left">{student.address}</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleViewClick(student)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedStudent && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4 max-w-md w-full">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseClick}
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6L6 18"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="text-center">
              <StudentProfile studentId={selectedStudent} />
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

export default StudentsList;

// function StudentsList() {
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:3001/api/students").then((response) => {
//       setStudents(response.data);
//     });
//   }, []);

//   const handleViewClick = (student) => {
//     setSelectedStudent(student._id);
//   };

//   const handleCloseClick = () => {
//     setSelectedStudent(null);
//   };

//   const handlePopupClick = (event) => {
//     // Check if the target element is the popup or a child of the popup
//     if (!event.target.closest(".popup")) {
//       setSelectedStudent(null);
//     }
//   };

//   return (
//     <div className="container mx-auto my-4">
//       <h1 className="text-2xl font-bold mb-4">Student List</h1>
//       <table className="min-w-max w-full table-auto">
//         <thead>
//           <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//             <th className="py-3 px-6 text-left">First Name</th>
//             <th className="py-3 px-6 text-left">Last Name</th>
//             <th className="py-3 px-6 text-left">Email</th>
//             <th className="py-3 px-6 text-left">Address</th>
//             <th className="py-3 px-6 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-600 text-sm font-light">
//           {students.map((student) => (
//             <tr key={student._id} className="border-b border-gray-200 hover:bg-gray-100">
//               <td className="py-3 px-6 text-left whitespace-nowrap">{student.firstName}</td>
//               <td className="py-3 px-6 text-left">{student.lastName}</td>
//               <td className="py-3 px-6 text-left">{student.email}</td>
//               <td className="py-3 px-6 text-left">{student.address}</td>
//               <td className="py-3 px-6 text-center">
//                 <button
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                   onClick={() => handleViewClick(student)}
//                 >
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {selectedStudent && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
//           <div className="bg-white rounded-lg p-4 max-w-md w-full">
//             <div className="flex justify-end">
//               <button
//                 className="text-gray-500 hover:text-gray-700"
//                 onClick={handleCloseClick}
//               >
//                 <svg
//                   className="w-6 h-6 fill-current"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M18 6L6 18"></path>
//                   <path d="M6 6l12 12"></path>
//                 </svg>
//               </button>
//             </div>
//             <div className="text-center">
//               <StudentProfile studentId={selectedStudent} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StudentsList;
