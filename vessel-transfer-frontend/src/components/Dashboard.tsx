import React, { useState, useEffect } from "react";
import { TransferTable } from "./TransferTable";
import { TransferDrawer } from "./TransferDrawer";
import type { Transfer, Vessel } from "../types/types";

export const Dashboard: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transfersRes, vesselsRes] = await Promise.all([
          fetch("http://localhost:3000/transfers"),
          fetch("http://localhost:3000/vessels"),
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
      await fetch(`http://localhost:3000/transfers/${updatedTransfer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTransfer),
      });
    } catch (error) {
      console.error("Error saving transfer:", error);
    }
  };

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
        </header>

        <main>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <TransferTable
              transfers={transfers}
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
