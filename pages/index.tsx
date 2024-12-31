// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PlantList from "../components/PlantList";

// const Home: React.FC = () => {
//   const [plants, setPlants] = useState<any[]>([]);

//   const fetchPlants = async () => {
//     try {
//       const response = await axios.get("/api/plants");
//       setPlants(response.data.plants);
//     } catch (error) {
//       console.error("Error fetching plants:", error);
//     }
//   };

//   const handlePlantUpdated = (updatedPlant: any) => {
//     setPlants((prev) =>
//       prev.map((plant) =>
//         plant.plant_id === updatedPlant.plant_id ? updatedPlant : plant
//       )
//     );
//   };

//   const handlePlantDeleted = (deletedIds: number[]) => {
//     setPlants((prev) => prev.filter((plant) => !deletedIds.includes(plant.plant_id)));
//   };

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   return (
//     <div>
//       <h1>Plant Management</h1>
//       <PlantList
//         plants={plants}
//         onEdit={handlePlantUpdated}
//         onDelete={handlePlantDeleted}
//         onPlantUpdated={handlePlantUpdated}
//       />
//     </div>
//   );
// };

// export default Home;
