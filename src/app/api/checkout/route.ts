import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({ 
  accessToken: "TESTUSER6044428242784445991" // Obtenelo en el panel de MP Developers
});

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    const preference = await new Preference(client).create({
      body: {
        items: items,
        payer: {
      email: "test_user_123456@testuser.com", // USÁ ESTE EMAIL DE PRUEBA
    },
        back_urls: {
          success: "http://localhost:3000/", // A donde vuelve si sale bien
          failure: "http://localhost:3000/cart",
          pending: "http://localhost:3000/cart",
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ id: preference.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear pago" }, { status: 500 });
  }
}