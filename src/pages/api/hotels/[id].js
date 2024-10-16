export default async function handler(req, res) {
    const { id } = req.query;
  
    // Example hotel data
    const hotelData = {
      101: { name: "Some Hotel Inn", city: "Pune", country: "India" },
    };
  
    if (req.method === 'GET') {
      const apiKey = req.headers['x-api-key'];
      if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: 'Invalid API Key' });
      }
  
      const hotel = hotelData[id];
      if (hotel) {
        return res.status(200).json(hotel);
      } else {
        return res.status(404).json({ message: 'Hotel not found' });
      }
    }
  }
  