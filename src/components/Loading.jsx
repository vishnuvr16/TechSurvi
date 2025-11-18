import React from "react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="w-full py-12 flex justify-center items-center">
      <div className="text-center">
        <div className="animate-pulse text-gray-500">{text}</div>
      </div>
    </div>
  );
}
