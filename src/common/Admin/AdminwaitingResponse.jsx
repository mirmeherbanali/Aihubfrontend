import React from "react";

export const BusinessResponse = ({ value }) => {
  return (
    <div className=" overflow-y-auto h-[calc(85vh-64px)]">
      <table className="w-full  border-separate border-spacing-y-2 content1 text-center">
        <thead className="text-gray-600">
          <tr className="content">
            <th>Date</th>
            <th>Reviews</th>
            <th>Pending</th>
            <th>Flagged</th>
          </tr>
        </thead>
        <tbody>
          {value.map((row, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 px-4 py-2">{row.name}</td>
              <td className="border-b border-gray-200 px-4 py-2">
                {row.reviews}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {row.pending}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {row.flagged}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const IndividualResponse = ({ value }) => {
  return (
    <div className=" overflow-y-auto h-[calc(85vh-64px)]">
      <table className="w-full  border-separate border-spacing-y-2 content1 text-center">
        <thead className="text-gray-600">
          <tr className="content">
            <th>Date</th>
            <th>Reviews</th>
            <th>Pending</th>
            <th>Flagged</th>
          </tr>
        </thead>
        <tbody>
          {value.map((row, index) => (
            <tr key={index}>
              <td className="border-b border-gray-200 px-4 py-2">{row.name}</td>
              <td className="border-b border-gray-200 px-4 py-2">
                {row.reviews}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {row.pending}
              </td>
              <td className="border-b border-gray-200 px-4 py-2">
                {row.flagged}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
