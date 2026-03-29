'use client'

import { CldUploadWidget } from 'next-cloudinary';

interface UploadImageProps {
  onUpload: (url: string) => void;
}

export default function UploadImage({ onUpload }: UploadImageProps) {
  return (
    <CldUploadWidget 
      // Reemplazá esto directamente por el string de tu preset si sospechás del .env
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "shanti_preset"}
      onSuccess={(result) => {
        // Log para ver en la consola del navegador (F12)
        console.log("Widget Result:", result);

        if (result.info && typeof result.info !== "string") {
          const url = result.info.secure_url;
          console.log("Imagen URL:", url);
          onUpload(url);
        }
      }}
    >
      {({ open }) => (
        <button 
          type="button" 
          onClick={() => open()}
          className="w-full py-4 border-2 border-dashed border-emerald-300 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-semibold"
        >
          📷 Click para subir foto
        </button>
      )}
    </CldUploadWidget>
  );
}