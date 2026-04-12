const rooms = [
  {
    name: "Lake View Room",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  },
  {
    name: "Overwater Room",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  {
    name: "City View Room",
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427"
  }
];

const Rooms = () => {
  return (
    <div className="py-16 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Rooms & Suites</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {rooms.map((room, i) => (
          <div key={i} className="shadow-lg">
            <img src={room.img} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h3 className="text-xl">{room.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;