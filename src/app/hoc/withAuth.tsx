"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (
  WrappedComponent: React.ComponentType,
  allowedRoles: string[]
) => {
  return (props: any) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const role = localStorage.getItem("userRole");
      if (role && allowedRoles.includes(role)) {
        setIsAuthorized(true);
      } else {
        router.push("/login");
      }
    }, [router, allowedRoles]);

    if (!isAuthorized) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
