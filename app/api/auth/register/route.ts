import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // API Unic Tread не підтримує реєстрацію через API
  return NextResponse.json(
    {
      error:
        "Реєстрація через API недоступна. Будь ласка, зверніться до адміністратора для створення облікового запису.",
      code: 501,
    },
    { status: 501 }
  );
}
