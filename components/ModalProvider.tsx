"use client";

import {createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";


interface ModalContextValue {
    content:React.ReactNode;
    openModal : (content:React.ReactNode)=>void;
    closeModal:()=>void;
}

const ModalContext=createContext<ModalContextValue | null>(null);
export function useModal() {
    const context=useContext(ModalContext);
     if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }
    return context;
}

export default function ModalProvider({ children } : { children : React.ReactNode}) {
    const[content,setContent]=useState<React.ReactNode>(null);

    function openModal(c:React.ReactNode) {
        setContent(c);
    }

    function closeModal(){
        setContent(null);
    }

    return (
        <ModalContext.Provider value={{content,openModal,closeModal}}>
            {children}
            {content && 
            createPortal(
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                {content}

                <button onClick={closeModal}
                 className="absolute top-2 right-2 text-gray-600 hover:text-black"
                >❌</button>
            </div>
            </div>,
            document.getElementById("modal-root")!
            )
            }
        </ModalContext.Provider>
    );
}