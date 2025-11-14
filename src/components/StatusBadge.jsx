// src/components/StatusBadge.jsx
import React from "react";

const cls = {
  REQUESTED: "bg-sky-100 text-sky-700",
  APPLIED:   "bg-indigo-100 text-indigo-700",
  PROPOSED:  "bg-amber-100 text-amber-700",
  ACCEPTED:  "bg-green-100 text-green-700",
  DECLINED:  "bg-rose-100 text-rose-700",
  CANCELLED: "bg-gray-100 text-gray-600",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${cls[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}