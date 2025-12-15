import React, { useEffect, useState } from "react";
import type { Transfer, Vessel } from "../types/types";
import { matlabToDate } from "../util/helper";

interface TransferDrawerProps {
  transfer: Transfer | null;
  allVessels: Vessel[];
  onClose: () => void;
  onSave: (updatedTransfer: Transfer) => void;
}

export const TransferDrawer: React.FC<TransferDrawerProps> = ({
  transfer,
  allVessels,
  onClose,
  onSave,
}) => {
  const [comment, setComment] = useState("");
  const [editMode, setEditMode] = useState(false);

  if (!transfer) return null;

  useEffect(() => {
    if (transfer?.comment) {
      setComment(transfer?.comment);
    }
  }, [transfer?.comment]);

  const linkedVessel = allVessels.find((v) => v.mmsi === transfer.mmsi);

  const handleSaveClick = () => {
    const updatedTransfer: Transfer = {
      ...transfer,
      comment: comment,
    };
    onSave(updatedTransfer);
  };

  const handleEditMode = () => {
    setEditMode(!editMode);

    if (editMode) {
      handleSaveClick();
    }
  };

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

          {/* Tranfer Details  */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-1 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Location
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {transfer.location}
              </p>
            </div>
            <div
              className={`p-3 rounded border border-gray-100 ${
                transfer.Hs >= 1 ? "bg-red-200" : "bg-green-200"
              }`}
            >
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Hs (Waves)
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {transfer.Hs}m
              </p>
            </div>
            <div className="p-1 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Score
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {transfer.score}/10
              </p>
            </div>
            <div className="p-1 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Duration
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {transfer.duration} Min
              </p>
            </div>
            <div className="p-1 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Start time
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {matlabToDate(transfer.startTime).toLocaleTimeString()}
              </p>
            </div>
            <div className="p-1 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Date
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {matlabToDate(transfer.startTime).toLocaleDateString()}
              </p>
            </div>
            <div className="p-1 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Stop time
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {matlabToDate(transfer.stopTime).toLocaleTimeString()}
              </p>
            </div>
            <div className="p-1 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Detector
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {transfer.detector}
              </p>
            </div>

            <div className="p-1 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Pax Up / Pax Down
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {`${transfer.paxUp} / ${transfer.paxDown}`}
              </p>
            </div>
            <div className="p-1 bg-gray-50 rounded border border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase">
                Cargo Up / Cargo Down
              </label>
              <p className="font-mono text-lg font-bold text-gray-900">
                {`${transfer.cargoUp} / ${transfer.cargoDown}`}
              </p>
            </div>
          </div>
          {/* text area for comments */}
          <div className="p-1 bg-gray-50 rounded border border-gray-100">
            <label className="block text-xs font-medium text-gray-500 uppercase">
              Comments
            </label>
            <input
              className="w-full"
              type="textarea"
              name="comments"
              readOnly={!editMode}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div>
            {" "}
            <button
              className="mt-2 p-2 bg-blue-200 rounded-xl font-bold"
              onClick={handleEditMode}
            >{`${editMode ? "Save" : "Edit"}`}</button>
          </div>
          <div className="flex w-full">
            {editMode ? (
              <caption className="w-full text-xs text-left italic">
                You can change the text and press 'Save' after editing
              </caption>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
