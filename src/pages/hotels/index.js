import { useEffect, useState } from 'react';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch hotel data from backend API
    const fetchHotels = async () => {
      const res = await fetch('/api/hotels');
      const data = await res.json();
      setHotels(data);
    };
    fetchHotels();
  }, []);

  return (
    <div>
      <h1>Available Hotels</h1>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            <img src={hotel.image} alt={hotel.name} />
            <h2>{hotel.name}</h2>
            <p>{hotel.city}, {hotel.country}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hotels;
