import React, { useState, useEffect } from "react";

import { TransferTable } from "./TransferTable";
import type { Transfer } from "../types/types";

export const Dashboard: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transfersRes = await fetch("http://localhost:3000/transfers");
        const transfersData = await transfersRes.json();
        // console.log(transfersData);

        setTransfers(transfersData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            <TransferTable transfers={transfers} />
          </div>
        </main>
      </div>
    </div>
  );
};
