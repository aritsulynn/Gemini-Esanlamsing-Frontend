import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SpecialEquipmentPage = () => {
    const [equipmentList, setEquipmentList] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [equipmentDetails, setEquipmentDetails] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3030/equipment/all');
            setEquipmentList(response.data);
        } catch (error) {
            console.error('Error fetching equipment data:', error);
        }
    };

    const handleEquipmentSelect = async (equipmentId) => {
        setSelectedEquipment(equipmentId);
        try {
            const response = await axios.get(`http://localhost:3030/equipment/${equipmentId}`);
            setEquipmentDetails(response.data);
        } catch (error) {
            console.error('Error fetching equipment details:', error);
        }
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
                    <h2 className="text-lg font-bold text-gray-700 mb-2">Selected Equipment Details:</h2>
                    <p><strong>ID:</strong> {equipmentDetails.equipmentID}</p>
                    <p><strong>Name:</strong> {equipmentDetails.equipmentName}</p>
                    <p><strong>Owner:</strong> {equipmentDetails.ownerName}</p>
                    <p><strong>Installed Date:</strong> {equipmentDetails.installedDate}</p>
                    
                </div>
            )}
        </div>
    );
};

export default SpecialEquipmentPage;
