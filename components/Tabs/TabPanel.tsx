"use client";

import { useTabs } from "./TabsProvider";

export default function TabPanel({
    whenActive,
    children
} : {whenActive:string;
    children:React.ReactNode
}) {
    const { activeTab }=useTabs();
    if(activeTab!==whenActive) return null;

    return <div className="mt-6">{children}</div>
}