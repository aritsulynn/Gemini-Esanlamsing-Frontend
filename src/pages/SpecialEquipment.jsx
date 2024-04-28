import React, { useEffect, useState } from "react";
import axios from "axios";

const SpecialEquipmentPage = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [equipmentDetails, setEquipmentDetails] = useState(null);
  const [newEquipmentName, setNewEquipmentName] = useState("");
  const [newEquipmentOwner, setNewEquipmentOwner] = useState("");
  const [newEquipmentDate, setNewEquipmentDate] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3030/equipment/all");
      setEquipmentList(response.data);
    } catch (error) {
      console.error("Error fetching equipment data:", error);
    }
  };

  const handleEquipmentSelect = async (equipmentId) => {
    setSelectedEquipment(equipmentId);
    try {
      const response = await axios.get(
        `http://localhost:3030/equipment/${equipmentId}`
      );
      setEquipmentDetails(response.data);
    } catch (error) {
      console.error("Error fetching equipment details:", error);
    }
  };

  const handleAddEquipment = async () => {
    try {
      const response = await axios.post("http://localhost:3030/equipment/add", {
        equipmentName: newEquipmentName,
        ownerName: newEquipmentOwner,
        installedDate: newEquipmentDate,
      });
      console.log(response.data);
      fetchData(); // Refresh equipment list after adding new equipment
    } catch (error) {
      console.error("Error adding equipment:", error);
    }
  };

  const handleDeleteEquipment = async () => {
    if (!selectedEquipment) return;
    try {
      const response = await axios.delete(
        `http://localhost:3030/equipment/${selectedEquipment}`
      );
      console.log(response.data);
      setSelectedEquipment(null); // Reset selected equipment after deletion
      fetchData(); // Refresh equipment list after deletion
    } catch (error) {
      console.error("Error deleting equipment:", error);
    }
  };

  const handleEditEquipment = async () => {
    if (!selectedEquipment || !equipmentDetails) return;
    try {
      const response = await axios.put(
        `http://localhost:3030/equipment/${selectedEquipment}`,
        {
          equipmentName: equipmentDetails.equipmentName,
          ownerName: equipmentDetails.ownerName,
          installedDate: equipmentDetails.installedDate,
        }
      );
      console.log(response.data);
      fetchData(); // Refresh equipment list after editing equipment details
    } catch (error) {
      console.error("Error editing equipment:", error);
    }
  };

  const handleShowAllEquipment = async () => {
    fetchData();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md shadow-lg bg-white rounded-lg">
      <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
        Special Equipment
      </h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select Equipment
        </label>
        <select
          onChange={(e) => handleEquipmentSelect(e.target.value)}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="">Select equipment</option>
          {equipmentList.map((equipment) => (
            <option key={equipment.equipmentID} value={equipment.equipmentID}>
              {equipment.equipmentName}
            </option>
          ))}
        </select>
      </div>
      {selectedEquipment && equipmentDetails && (
        <div>
          <h2 className="text-lg font-bold text-gray-700 mb-2">
            Selected Equipment Details:
          </h2>
          <p>
            <strong>ID:</strong> {equipmentDetails.equipmentID}
          </p>
          <input
            type="text"
            value={equipmentDetails.equipmentName}
            onChange={(e) =>
              setEquipmentDetails({
                ...equipmentDetails,
                equipmentName: e.target.value,
              })
            }
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
          />
          <input
            type="text"
            value={equipmentDetails.ownerName}
            onChange={(e) =>
              setEquipmentDetails({
                ...equipmentDetails,
                ownerName: e.target.value,
              })
            }
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
          />
          <input
            type="date"
            value={equipmentDetails.installedDate}
            onChange={(e) =>
              setEquipmentDetails({
                ...equipmentDetails,
                installedDate: e.target.value,
              })
            }
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
          />
          <button
            onClick={handleEditEquipment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={handleDeleteEquipment}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-700 mb-2">
          Add New Equipment:
        </h2>
        <input
          type="text"
          placeholder="Equipment Name"
          value={newEquipmentName}
          onChange={(e) => setNewEquipmentName(e.target.value)}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
        />
        <input
          type="text"
          placeholder="Owner Name"
          value={newEquipmentOwner}
          onChange={(e) => setNewEquipmentOwner(e.target.value)}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
        />
        <input
          type="date"
          placeholder="Installed Date"
          value={newEquipmentDate}
          onChange={(e) => setNewEquipmentDate(e.target.value)}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
        />
        <button
          onClick={handleAddEquipment}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Equipment
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={handleShowAllEquipment}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Show All Equipment
        </button>
      </div>
    </div>
  );
};

export default SpecialEquipmentPage;
