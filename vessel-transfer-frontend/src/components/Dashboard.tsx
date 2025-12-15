import React, { useState, useEffect, useMemo } from "react";

import { TransferTable } from "./TransferTable";
import { TransferDrawer } from "./TransferDrawer";
import type { Transfer, Vessel } from "../types/types";
import { API_URL } from "../../config";

export const Dashboard: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedVesselMmsi, setSelectedVesselMmsi] = useState<number | "ALL">(
    "ALL"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transfersRes, vesselsRes] = await Promise.all([
          fetch(`${API_URL}/transfers`),
          fetch(`${API_URL}/vessels`),
        ]);

        const transfersData = await transfersRes.json();
        const vesselsData = await vesselsRes.json();

        // console.log(transfersData);

        setTransfers(transfersData);
        setVessels(vesselsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async (updatedTransfer: Transfer) => {
    setTransfers((prev) =>
      prev.map((transfer) =>
        transfer.id === updatedTransfer.id ? updatedTransfer : transfer
      )
    );
    setSelectedTransfer(null);

    try {
      await fetch(`${API_URL}/transfers/${updatedTransfer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTransfer),
      });
    } catch (error) {
      console.error("Error saving transfer:", error);
    }
  };

  const filteredTransfers = useMemo(() => {
    if (selectedVesselMmsi === "ALL") {
      return transfers;
    }
    return transfers.filter((t) => t.mmsi === selectedVesselMmsi);
  }, [transfers, selectedVesselMmsi]);

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header className="mb-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Operations Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Overview of daily transfers
          </p>
          <div className="w-64">
            <label
              htmlFor="vessel-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Vessel
            </label>
            <select
              id="vessel-filter"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              value={selectedVesselMmsi}
              onChange={(e) => {
                const val = e.target.value;
                // Convert string back to number, or keep as 'ALL'
                setSelectedVesselMmsi(val === "ALL" ? "ALL" : Number(val));
              }}
            >
              <option value="ALL">All Vessels</option>
              {vessels.map((vessel) => (
                <option key={vessel.id} value={vessel.mmsi}>
                  {vessel.nicename}
                </option>
              ))}
            </select>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TransferTable
              transfers={filteredTransfers}
              vessels={vessels}
              onSelectTransfer={setSelectedTransfer}
            />
          </div>
        </main>

        {/* Drawer renders when a transfer is selected */}
        {selectedTransfer && (
          <TransferDrawer
            transfer={selectedTransfer}
            allVessels={vessels}
            onClose={() => setSelectedTransfer(null)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};
