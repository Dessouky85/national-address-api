export default async function handler(req, res) {
  const { shortaddress } = req.query;

  if (!shortaddress) {
    return res.status(400).json({ error: "Missing short address" });
  }

  const apiUrl = process.env.API_URL;
  const fullUrl = `${apiUrl}?format=json&language=en&shortaddress=${shortaddress}`;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_API_KEY' // Add this if SPL requires auth
      }
    });

    if (!response.ok) {
      const errorBody = await response.text();
      return res.status(response.status).json({ error: "SPL API error", body: errorBody });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch address", details: error.message });
  }
}
