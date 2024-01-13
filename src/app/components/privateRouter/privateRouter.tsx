"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { checkUserAuthenticated } from "@/utils/checkUserAuthenticated";

export function PrivateRouter({ children }: any) {
  const [auth, setAuth] = useState(true);
  const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    setAuth(checkUserAuthenticated());
  }, [pathname]);

  function backToLogin() {
    if (!auth) {
      push("/");

      return false;
    }

    return true;
  }

  return (
    <>
      {backToLogin() && null}
      {backToLogin() && children}
    </>
  );
}