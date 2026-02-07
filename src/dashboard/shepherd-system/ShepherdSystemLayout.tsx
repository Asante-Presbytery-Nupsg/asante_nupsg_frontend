import React from "react";
import { Outlet } from "react-router-dom";

const ShepherdSystemLayout: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col bg-gray-50 overflow-y-auto">
            <div className="p-6">
                <div className="mb-6 flex flex-col gap-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Shepherd System
                    </h1>
                    <p className="text-gray-500">
                        Manage Coordinating Branches, Shepherds, and Sheep.
                    </p>
                </div>
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default ShepherdSystemLayout;
