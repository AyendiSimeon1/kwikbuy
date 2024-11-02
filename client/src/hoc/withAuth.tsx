"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { selectIsAuthenticated } from "@/redux/userSlice";

interface WithAuthOptions {
  redirectPath: string;
  requireAuth: boolean;
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
  
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (!mounted) return;

      const shouldRedirect =
        (options.requireAuth && !isAuthenticated) ||
        (!options.requireAuth && isAuthenticated);

      if (shouldRedirect) {
        router.replace(options.redirectPath);
      }
    }, [isAuthenticated, mounted]);

    if (!mounted) return null;

    const shouldRender =
      (options.requireAuth && isAuthenticated) ||
      (!options.requireAuth && !isAuthenticated);

    return shouldRender ? <WrappedComponent {...props} /> : null;
  };

  AuthenticatedComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthenticatedComponent;
};

export default withAuth;