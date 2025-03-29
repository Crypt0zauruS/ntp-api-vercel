export default async function handler(req, res) {
  const TIME_API_URL = "https://worldtimeapi.org/api/timezone/Etc/UTC";

  const fetchWithRetry = async (url, retries = 3, delay = 500) => {
    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout

        const response = await fetch(url, {
          headers: {
            "User-Agent": "ntp-api-vercel/1.0",
          },
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!data.utc_datetime) throw new Error("Champ utc_datetime manquant");
        return data.utc_datetime;
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  };

  try {
    const utc_datetime = await fetchWithRetry(TIME_API_URL);
    res.status(200).json({ utc_datetime });
  } catch (error) {
    // fallback : renvoie l'heure locale UTC du serveur Vercel
    res.status(200).json({
      utc_datetime: new Date().toISOString(),
      fallback: true,
      error: error.message,
    });
  }
}
