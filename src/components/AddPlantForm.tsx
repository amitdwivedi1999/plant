// import React, { useState } from "react";
// import axios from "axios";

// interface AddPlantFormProps {
//   onClose: () => void;
//   onPlantAdded: () => void;
// }

// const AddPlantForm: React.FC<AddPlantFormProps> = ({ onClose, onPlantAdded }) => {
//   const [plantName, setPlantName] = useState("");
//   const [scientificName, setScientificName] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const newPlant = { plantName, scientificName, description };

//     try {
//       await axios.post("/api/addPlant", newPlant);
//       alert("Plant added successfully!");
//       onPlantAdded(); // Notify parent to refresh the plant list
//       onClose(); // Close the modal
//     } catch (error) {
//       console.error("Error adding plant:", error);
//       alert("Failed to add plant.");
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-md shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Add a New Plant</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Plant Name</label>
//           <input
//             type="text"
//             value={plantName}
//             onChange={(e) => setPlantName(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Scientific Name</label>
//           <input
//             type="text"
//             value={scientificName}
//             onChange={(e) => setScientificName(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border rounded-md"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="mt-1 block w-full px-4 py-2 border rounded-md"
//             rows={4}
//             required
//           />
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             type="button"
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-200 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-indigo-600 text-white rounded-md"
//           >
//             Add Plant
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddPlantForm;
import React, { useState } from "react";
import axios from "axios";

interface AddPlantFormProps {
  onClose: () => void;
  onPlantAdded: (newPlant: any) => void; // Pass the added plant to the parent
}

const AddPlantForm: React.FC<AddPlantFormProps> = ({ onClose, onPlantAdded }) => {
  const [plantName, setPlantName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPlant = { plantName, scientificName, description };

    try {
      const response = await axios.post("/api/addPlant", newPlant);
      const addedPlant = response.data.plant; // Get the plant object from the server
      onPlantAdded(addedPlant); // Notify the parent with the new plant
      alert(response.data.message); // Show success message
      onClose(); // Close the form
    } catch (error) {
      console.error("Error adding plant:", error);
      alert("Failed to add plant.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add a New Plant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Plant Name</label>
          <input
            type="text"
            value={plantName}
            onChange={(e) => setPlantName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Scientific Name</label>
          <input
            type="text"
            value={scientificName}
            onChange={(e) => setScientificName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
            rows={4}
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Add Plant
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlantForm;
