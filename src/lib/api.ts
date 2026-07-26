// Ganti URL dengan URL Web App GAS Anda setelah deploy
const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL || ""; 

export async function fetchGAS(action: string, method: 'GET' | 'POST', payload?: any) {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Penting untuk GAS CORS
      },
    };

    let url = GAS_URL;

    if (method === 'GET') {
      url = `${GAS_URL}?action=${action}`;
    } else if (method === 'POST') {
      options.body = JSON.stringify({ action, payload });
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (result.status === 'error') throw new Error(result.message);
    return result.data;
  } catch (error) {
    console.error(`API Error [${action}]:`, error);
    throw error;
  }
}