"use client";

import { useTabs } from "./TabsProvider";

const tabs=[

    {id:"overview",label:"Overview"},
    {id:"curriculum",label:"Curriculum"},
    {id:"lessons",label:"Lessons"},
    { id: "reviews", label: "Reviews" },
];

export default function Tabs(){
    const {activeTab,setActiveTab}=useTabs();
    return (
        <div className="border-b pb-2 flex gap-6 text-lg font-medium">
            {tabs.map((tab)=>(
                <button
                key={tab.id}
                onClick={()=>setActiveTab(tab.id)}
                className={activeTab===tab.id ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600 hover:text-black"}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}