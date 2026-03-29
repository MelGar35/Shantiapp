'use server'

import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData): Promise<void> {
  await dbConnect();

  // Extracción segura de datos
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = Number(formData.get('price'));
  const category = formData.get('category') as string;
  const stock = Number(formData.get('stock'));
  const imageUrl = formData.get('image') as string;

  // Generación de Slug para URL amigable
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  try {
    const nuevoProducto = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      slug,
      images: imageUrl ? [imageUrl] : ["https://placehold.co/400x400?text=Shanti+Shop"],
    });
    
    console.log("✅ Producto guardado con éxito ID:", nuevoProducto._id);
  } catch (error) {
    console.error("❌ Error real en MongoDB:", error);
    return; // Salimos para no redirigir si falló
  }

  // Refrescamos la Home y mandamos al usuario allá
  revalidatePath("/");
  redirect("/");
}
export async function deleteProduct(id: string) {
  await dbConnect();
  try {
    await Product.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin"); // Refrescamos ambos lugares
  } catch (error) {
    console.error("Error al borrar:", error);
  }
}