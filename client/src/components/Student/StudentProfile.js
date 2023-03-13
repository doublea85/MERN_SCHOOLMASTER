import { useState, useEffect } from "react";
import axios from "axios";

function StudentProfile({ studentId }) {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/student/${studentId}`).then((response) => {
      setStudent(response.data);
    });
  }, [studentId]);

  return (
    <div className="p-4">
      {student ? (
        <>
          <h2 className="text-lg font-bold mb-2">
            {student.firstName} {student.lastName}
          </h2>
          <p className="text-gray-600 mb-4">{student.email}</p>
          <p className="text-gray-600 mb-4">{student.address}</p>
          <img src={student.profile} alt={`${student.firstName} ${student.lastName}`} className="w-40 h-40 rounded-full mx-auto" />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StudentProfile;



// import { useState, useEffect } from "react";
// import axios from "axios";

// function StudentProfile({ selectedStudentId }) {
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     const fetchStudent = async () => {
//       const response = await axios.get(`http://localhost:3001/api/student/${selectedStudentId}`);
//       setStudent(response.data[0]);
//     };
  
//     fetchStudent();
//   }, [selectedStudentId]);
  

//   if (!student) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="container mx-auto my-4">
//       <h1 className="text-2xl font-bold mb-4">Student Profile</h1>
//       <div className="bg-white rounded-lg p-4 max-w-md w-full">
//         <div className="text-center">
//           <h2 className="text-lg font-bold mb-2">
//             {student.firstName} {student.lastName}
//           </h2>
//           <p className="text-gray-600 mb-4">{student.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudentProfile;