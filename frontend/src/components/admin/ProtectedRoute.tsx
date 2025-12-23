import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  
  // Safely use the hook with error boundary
  let isAuthenticated = false;
  let loading = true;

  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
    loading = auth.loading;
  } catch (error) {
    console.error('Auth context error:', error);
    // If there's an error, redirect to login
    if (typeof window !== 'undefined') {
      router.push("/admin/login");
    }
    return null;
  }

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #181824 0%, #2d193c 100%)",
          color: "#f3b1e6",
          fontFamily: "Courier New, Monaco, Menlo, monospace",
        }}
      >
        Cargando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;