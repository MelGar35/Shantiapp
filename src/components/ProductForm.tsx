'use client'
import { useState } from 'react';
import { createProduct } from "@/actions/productActions";
import UploadImage from "@/components/UploadImage";

export default function ProductForm() {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <form action={async (formData) => { await createProduct(formData); }} className="flex flex-col gap-5 bg-white p-8 rounded-2xl shadow-lg border border-slate-300">
      <h2 className="text-2xl font-black text-slate-900 mb-2 border-b-2 border-slate-100 pb-2">Cargar Producto 🌿</h2>
      
      <input type="hidden" name="image" value={imageUrl} />
      
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-800">1. Imagen</label>
        <UploadImage onUpload={(url) => setImageUrl(url)} />
        {imageUrl && (
          <div className="flex justify-center mt-2">
            <img src={imageUrl} alt="Preview" width={100} className="rounded-xl border-2 border-emerald-500 shadow-md" />
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <label className="text-sm font-bold text-slate-800">2. Nombre</label>
        <input name="name" type="text" placeholder="Ej: Sahumerio de Lavanda" required className="w-full p-3 border-2 border-slate-400 rounded-lg text-slate-900 font-medium placeholder:text-slate-400 focus:border-emerald-600 outline-none transition-all" />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-bold text-slate-800">3. Categoría</label>
        <select name="category" required className="w-full p-3 border-2 border-slate-400 rounded-lg bg-white text-slate-900 font-medium focus:border-emerald-600 outline-none">
          <option value="bienestar">Bienestar</option>
          <option value="decoracion">Decoración</option>
          <option value="aromaterapia">Aromaterapia</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-800">4. Precio ($)</label>
          <input name="price" type="number" placeholder="0.00" required className="w-full p-3 border-2 border-slate-400 rounded-lg text-slate-900 font-bold placeholder:font-normal focus:border-emerald-600 outline-none" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-bold text-slate-800">5. Stock</label>
          <input name="stock" type="number" placeholder="Cant." required className="w-full p-3 border-2 border-slate-400 rounded-lg text-slate-900 font-bold placeholder:font-normal focus:border-emerald-600 outline-none" />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-bold text-slate-800">6. Descripción</label>
        <textarea name="description" placeholder="Escribí las propiedades..." required rows={3} className="w-full p-3 border-2 border-slate-400 rounded-lg text-slate-900 font-medium focus:border-emerald-600 outline-none"></textarea>
      </div>

      <button type="submit" className="bg-slate-900 text-white p-4 rounded-xl font-black text-lg hover:bg-emerald-700 transition-all shadow-xl active:scale-95 mt-2">
        PUBLICAR AHORA
      </button>
    </form>
  );
}