import React, { useEffect, useRef } from "react";

const DeleteModal = ({
  isDeleteModalOpen,
  deleteTitel,
  deleteFor,
  handleDeteletModel,
  handleDelete,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleDeteletModel();
      }
    };

    if (isDeleteModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDeleteModalOpen]);

  if (!isDeleteModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-center"
      >
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          Delete {deleteTitel}
        </h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this {deleteFor}?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDeteletModel}
            className="px-16 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-16 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
