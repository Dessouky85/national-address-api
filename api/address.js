export default async function handler(req, res) {
  const { shortaddress } = req.query;

  if (!shortaddress) {
    return res.status(400).json({ error: "Missing short address" });
  }

  const apiUrl = process.env.API_URL;
  const fullUrl = `${apiUrl}?format=json&language=en&shortaddress=${shortaddress}`;

  try {
    const response = await fetch(fullUrl);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch address", details: error.message });
  }
}
