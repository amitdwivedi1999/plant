"use client";

import React, { useState } from "react";
import AddPlantForm from "../../components/AddPlantForm";
import PlantDetailList from "../../components/PlantDetailList";

export default function Dashboard() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isPlantListVisible, setIsPlantListVisible] = useState(false);

  const handleAddPlantClick = () => {
    setIsFormVisible(true);
    setIsPlantListVisible(false); // Optional: Hide plant list when adding a plant
  };

  const handlePlantListClick = () => {
    // setIsFormVisible(false); // Hide the add form if it's visible
    setIsPlantListVisible(true);
  };

  const handlePlantAdded = (newPlant: any) => {
    setIsFormVisible(false);
    setIsPlantListVisible(true); // Show plant list after adding a plant
  };

  return (
    <div className="flex flex-1 bg-white">
      {/* Sidebar */}
      <div className="hidden bg-gray-50 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col pt-5 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>
          <div className="space-y-4">
            <nav className="flex-1 space-y-2">
              <button
                onClick={handleAddPlantClick}
                className="flex items-center px-4 py-3 text-sm font-medium text-indigo-600 transition-all duration-200 bg-indigo-50 group w-full text-left"
                title="Add a plant"
              >
                Add Plant
              </button>
              <button
                onClick={handlePlantListClick}
                className="flex items-center px-4 py-3 text-sm font-medium text-indigo-600 transition-all duration-200 bg-indigo-50 group w-full text-left"
                title="Show plant list"
              >
                Plant List
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main>
          <div className="py-6">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
              {/* Add Plant Form */}
              {isFormVisible && (
                <div className="mb-6">
                  <AddPlantForm onClose={() => setIsFormVisible(false)} onPlantAdded={handlePlantAdded} />
                </div>
              )}
              {/* Plant List */}
              {isPlantListVisible && <PlantDetailList />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
