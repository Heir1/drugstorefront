import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface SuccessToastprops {
    message : string
}

export default function ErrorToast({ message }:SuccessToastprops) {
    useEffect(() => {
        toast.custom(
            (t: any) => (
                <div
                    className={`${
                        t.visible ? "animate-enter" : "animate-leave"
                    } flex items-center w-full max-w-xs p-4 text-white bg-red-600 border border-red-900 rounded-lg shadow-lg`}
                >
                    {/* Icône rouge avec fond blanc */}
                    <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">❌</span>
                    <div className="flex-1 text-center">
                        <p className="text-sm">{message}</p>
                    </div>
                </div>
            ),{
                duration: 2000,  // Délai de 3 secondes (3000ms)
        });
      }, [message]); // Exécuter au montage du composant
    
      return null; // Ce composant n'affiche rien directement
}
