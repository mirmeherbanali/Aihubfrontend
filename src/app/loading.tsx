"use client";

export default function Loading() {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p>Loading...</p>

      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 80vh;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #ddd;
          border-top: 4px solid #007acc;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
