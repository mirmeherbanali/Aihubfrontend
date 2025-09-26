'use client';
// import { useGetProfileQuery } from "@/features/auth/authApi";

export default function DashboardPage() {
  //  const { data: user, isLoading } = useGetProfileQuery();

  // if (isLoading) return <p>Loading...</p>;
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Welcome to Dashboard 🎉</h1>
    </div>
  );
}
