"use client";

import { Provider } from "react-redux";
import { store } from ".";
import { setUser } from "./userSlice";
import { useEffect, useRef } from "react";

export function Providers({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: any | null;
}) {

  const hydrate=useRef(false);
  // 🔹 Hydrate Redux once on mount
  useEffect(() => {
    if (initialUser && !hydrate.current) {
      store.dispatch(setUser(initialUser));
      hydrate.current=true;
    }
  }, [initialUser]);

  return <Provider store={store}>{children}</Provider>;
}

