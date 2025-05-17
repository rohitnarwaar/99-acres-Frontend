import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [properties, setProperties] = useState([]);
  const [location, setLocation] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties", {
        params: { location, maxPrice },
      });
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to load properties", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [location, maxPrice]);

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10 max-w-screen-xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          Find Your Dream Home
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Browse a variety of properties available for sale and rent. Use filters to find exactly what you're looking for.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-6 rounded-xl shadow mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-black placeholder-gray-500 w-full"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-black placeholder-gray-500 w-full"
        />
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {properties.map((p) => (
          <Link to={`/property/${p._id}`} key={p._id} className="no-underline text-black">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col h-full">
              {p.images?.[0] && (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {p.title}
                    </h3>
                    {p.type && (
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full capitalize">
                        {p.type}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1">{p.location}</p>
                  <p className="text-green-600 font-bold text-lg mt-2">
                    ₹{p.price.toLocaleString()}
                  </p>
                </div>
                {/* Optional details section */}
                <div className="flex justify-between text-xs text-gray-700 mt-3">
                  {p.bedrooms && <span>{p.bedrooms} Beds</span>}
                  {p.bathrooms && <span>{p.bathrooms} Baths</span>}
                  {p.area && <span>{p.area} sq.ft</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
