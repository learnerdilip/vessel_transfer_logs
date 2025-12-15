import React from "react";
import type { Transfer, Vessel } from "../types/types";

interface TransferDrawerProps {
  transfer: Transfer | null;
  allVessels: Vessel[];
  onClose: () => void;
}

export const TransferDrawer: React.FC<TransferDrawerProps> = ({
  transfer,
  allVessels,
  onClose,
}) => {
  if (!transfer) return null;

  const linkedVessel = allVessels.find((v) => v.mmsi === transfer.mmsi);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-xl overflow-y-auto transform transition-transform">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Transfer Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 text-2xl"
            >
              &times;
            </button>
          </div>

          {/* Vessel details */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
            <h3 className="text-xs font-bold text-blue-800 uppercase mb-2 tracking-wide">
              Vessel Profile
            </h3>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-lg text-blue-900">
                {linkedVessel?.nicename || "Unknown Vessel"}
              </p>
              <div className="text-sm text-blue-700 flex justify-between">
                <span>Type: {linkedVessel?.operationsClass || "N/A"}</span>
                <span>
                  Length:{" "}
                  {linkedVessel?.vessel_length
                    ? `${linkedVessel.vessel_length}m`
                    : "-"}
                </span>
              </div>
              <p className="text-xs text-blue-600 mt-1">
                Operator: {linkedVessel?.Operator}
              </p>
            </div>
          </div>

          {/* Details  */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Location
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {transfer.location}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Hs (Waves)
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {transfer.Hs}m
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Score
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {transfer.score}/10
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Duration
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {Math.round(transfer.duration)}s
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
