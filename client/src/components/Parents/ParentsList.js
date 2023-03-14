import { useState, useEffect } from "react";
import axios from "axios";
import ParentProfile from "./ParentProfile";

function ParentsList() {
  const [parents, setParents] = useState([]);
  const [selectedParents, setSelectedParents] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/parents").then((response) => {
      setParents(response.data);
    });
  }, []);

  const handleViewClick = (parent) => {
    setSelectedParents(parent._id);
  };

  const handleCloseClick = () => {
    setSelectedParents(null);
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
          {parents.map((parent) => (
            <tr
              key={parent._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {parent.firstName}
              </td>
              <td className="py-3 px-6 text-left">{parent.lastName}</td>
              <td className="py-3 px-6 text-left">{parent.email}</td>
              <td className="py-3 px-6 text-left">{parent.address}</td>
              <td className="py-3 px-6 text-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleViewClick(parent)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedParents && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-2 w-3/5">
            <div className="text-center">
              <ParentProfile studentId={selectedParents} />
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

export default ParentsList;
