import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import avatar from "../../assets/profile.png";
import { FiEdit } from "react-icons/fi";

function ParentProfile({ parentId }) {
  const [parent, setParent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/parent/${parentId}`)
      .then((response) => {
        setParent(response.data);
      });
  }, [parentId]);

  const handleEdit = () => {
    navigate(`/parents/${parentId}/edit`);
  };

  return (
    <div className="flex flex-col">
      {parent ? (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">
              {parent.firstName} {parent.lastName}
            </h3>
          </div>
          <hr className="border-gray-300 mt-2 mb-4"/>
          <div className="flex gap-20">
            <div>
              <img
                src={parent.profile || avatar}
                alt={`${parent.firstName} ${parent.lastName}`}
                className="w-20 border-slate-500"
              />
            </div>
            <div className="ml-4">
              <ul>
                <li className="flex  gap-20 text-left">
                  <strong>Email:</strong> {parent.email}
                </li>
                <li className="flex  gap-20 text-left">
                  <strong>Address:</strong> {parent.address} 24 rue raspail 96290 Nullpart
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

export default ParentProfile;


