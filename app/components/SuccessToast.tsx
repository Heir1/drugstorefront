import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface SuccessToastProps {
  message: string;
}

export default function SuccessToast({ message }: SuccessToastProps) {
  useEffect(() => {
    toast.custom(
      (t:any) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } flex items-center w-full max-w-xs p-4 text-white bg-green-600 border border-green-900 rounded-lg shadow-lg`}
        >
          <span className="mr-2 bg-white rounded-full text-[10px] p-[2px]">✅</span>
          <div className="flex-1 text-center">
            <p className="text-sm">{message}</p>
          </div>
        </div>
      ),
      { duration: 2000 }
    );
  }, [message]); // Exécuter au montage du composant

  return null; // Ce composant n'affiche rien directement
}
