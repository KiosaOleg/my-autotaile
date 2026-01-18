import { NextResponse } from "next/server";

const UNIQTRADE_API_BASE = "https://order24-api.utr.ua/api";
const JWT_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3Njg3NjA0MDIsImV4cCI6MTc2ODg0NjgwMiwicm9sZXMiOlsiUk9MRV9DTElFTlRfTUFJTiJdLCJsb2dpbiI6InJpa2dyaXNoYUB1a3IubmV0IiwidXNlcm5hbWUiOiJyaWtncmlzaGFAdWtyLm5ldCIsImNsaWVudCI6eyJleHRlcm5hbF9jb2RlIjoiNDcyNzMifX0.J1WoMS8EIhgiD-10ivK8i30PNdnjaVNUJ4I2SpzdRKTYM0wVl54_7MwVij7Sq2F1A7R3-mAEMUlIRMmqXc69z_ENJMEl0IHf3i-pONPyZatBNGafcDgbUrBKZM92_tuOGZHjrwIqtWuxYEP7Gicn1LEZ9pejlWWKhC-xe9r8MUvDROcQLL5bq2B012O--BP-rwSPo6RZJ5ZQEMBIpdlGA4RkabfNvKsshjd9TIFn48N99XU_f-9MOvvgX6q7neelbnx60j5eJauFXrHkOjq9w6wZiMELPwLrXhaCK664XmOPvXb8OttMyVZKNqCxKbBXZ5VNzqif4zLQVp5mzYgCS6asRg58jQSNF5q02hR0YCSPOca48ksBrC3tgOfuyXN9bSNhYZD0btZKWQsLetBAthZlm3rESSDScCyhTQbfM4waZ78kmsoBUMzgWX30x_KYneWli1JgHJLx5l-U6eh3A9ZiDV396HVJMFD-39IVjUSZMWo7cwjnchkSyCkIPCLyXlhcIjKW7_X0ODqS2FolhprL9FFIZ2arkan91skAtEfxbaQbZwThHZIwUYug3csV3bU9OoVbFqkgZgYrzUq10LRh1i4tf0knWmXza8xNvseANCE4PLouaskxakYFYQDUw14_HL8xWFpYc7paihh8zgZFDPfySWQ_bG15eOgBskg";

interface UniqTradePart {
  id: number;
  article: string;
  title: string;
  brand?: {
    id: number;
    name: string;
    externalCode: string;
  };
  displayBrand?: string;
  yourPrice?: {
    amount: number;
    currency: {
      code: string;
      numberCode: number;
    };
  };
  remains?: Array<{
    storage: {
      id: number;
      name: string;
    };
    remain: string;
  }>;
  images?: any[];
  [key: string]: any;
}

async function searchPartsByArticle(article: string): Promise<UniqTradePart[]> {
  try {
    const response = await fetch(`${UNIQTRADE_API_BASE}/search/${encodeURIComponent(article)}?info=1`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${JWT_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const data = await response.json();
    return data.details || [];
  } catch (error) {
    console.error("Error searching parts:", error);
    return [];
  }
}

async function getPartInfo(partId: string): Promise<any> {
  try {
    // Use the search endpoint with info=1 to get detailed part info
    const response = await fetch(`${UNIQTRADE_API_BASE}/search/${encodeURIComponent(partId)}?info=1`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${JWT_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Return the first detail if available
    return data.details && data.details.length > 0 ? data.details[0] : null;
  } catch (error) {
    console.error("Error getting part info:", error);
    return null;
  }
}

async function getPartCharacteristics(partId: string): Promise<any> {
  try {
    // For now, return the detailed part info which should include characteristics
    // The API documentation doesn't specify a separate characteristics endpoint
    // so we'll use the detailed search result
    const response = await fetch(`${UNIQTRADE_API_BASE}/search/${encodeURIComponent(partId)}?info=1`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${JWT_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Return the first detail with all available information
    return data.details && data.details.length > 0 ? data.details[0] : null;
  } catch (error) {
    console.error("Error getting part characteristics:", error);
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const article = searchParams.get("article") || "OC90"; // Default test article (changed to a more common one)

  try {
    // 1. Пошук деталей по артикулу
    const searchResults = await searchPartsByArticle(article);

    if (searchResults.length === 0) {
      return NextResponse.json({
        success: false,
        message: `Деталі з артикулом "${article}" не знайдені`,
        data: null,
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Отримуємо детальну інформацію про першу знайдену деталь (вже включено в пошук з info=1)
    const firstPart = searchResults[0];

    return NextResponse.json({
      success: true,
      message: `Знайдено ${searchResults.length} деталей з артикулом "${article}"`,
      data: {
        searchResults: searchResults.slice(0, 10), // Показуємо до 10 результатів
        selectedPart: firstPart,
        partInfo: firstPart, // Детальна інформація вже включена
        characteristics: firstPart, // Характеристики також включені
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in UniqTrade API test:", error);
    return NextResponse.json({
      success: false,
      message: "Помилка при запиті до UniqTrade API",
      error: error instanceof Error ? error.message : "Невідома помилка",
      details: error instanceof Error ? error.stack : null,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}