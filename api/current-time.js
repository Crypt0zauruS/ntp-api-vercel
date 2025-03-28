export default async function handler(req, res) {
  try {
    const r = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC");
    const data = await r.json();
    res.status(200).json({ utc_datetime: data.utc_datetime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}