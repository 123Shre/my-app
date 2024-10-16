// Mock hotel data
const hotels = [
    {
      id: 101,
      name: "Some Hotel Inn",
      city: "Pune",
      country: "India",
      image: "/images/hotel1.jpg",
    },
    {
      id: 102,
      name: "Beachside Resort",
      city: "Goa",
      country: "India",
      image: "/images/hotel2.jpg",
    },
    {
      id: 103,
      name: "Mountain View Lodge",
      city: "Shimla",
      country: "India",
      image: "/images/hotel3.jpg",
    },
  ];
  
  export default function handler(req, res) {
    const { method, query, headers } = req;
    
    const apiKey = headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
      return res.status(403).json({ message: "Invalid API Key" });
    }
  
    if (method === 'GET') {
      // If ID is present, fetch specific hotel
      const { id } = query;
      if (id) {
        const hotel = hotels.find(h => h.id == id);
        if (hotel) {
          return res.status(200).json(hotel);
        } else {
          return res.status(404).json({ message: 'Hotel not found' });
        }
      }
      
      // If no ID, return all hotels
      return res.status(200).json(hotels);
    }
  
    // Handle any other HTTP methods
    return res.status(405).json({ message: `Method ${method} not allowed` });
  }
  