"use client";

import { createContext, useContext, useState } from "react";

interface TabsContextValue {
    activeTab:string;
    setActiveTab:(tab:string)=>void;
}

const TabsContext=createContext<TabsContextValue | null>(null);

export function useTabs() {
    const context=useContext(TabsContext);
    if(!context) throw new Error("useTabs must be used inside TabsProvider");
    return context;
}

export default function TabsProvider({
    defaultTab,
    children,
}:{
    defaultTab:string;
    children:React.ReactNode;
}) {

    const [activeTab,setActiveTab]=useState(defaultTab);

    return (
        <TabsContext.Provider value={{activeTab,setActiveTab}}>
            {children}
        </TabsContext.Provider>
    );
}