import React from "react";

import type { Transfer } from "../types/types";
import { matlabToDate } from "../util/helper";

interface TransferTableProps {
  transfers: Transfer[];
}

export const TransferTable: React.FC<TransferTableProps> = ({ transfers }) => {
  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              Date
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Vessel
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Location
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Score
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {transfers.map((transfer) => (
            <tr
              key={transfer.id}
              onClick={() => null}
              className="cursor-pointer hover:bg-blue-50 transition-colors"
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500">
                {matlabToDate(transfer.date).toDateString()}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-blue-600">
                {transfer.mmsi}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {transfer.location}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {/* we take 6 as the cutoff for safety here */}
                <span
                  className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                    transfer.score < 6
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {transfer.score}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {transfer.active ? "Active" : "Completed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
