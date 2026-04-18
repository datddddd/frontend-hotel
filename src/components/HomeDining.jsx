const Services = () => {
  const services = [
    {
      category: "Culinary",
      title: "Fine Dining & Bars",
      desc: "Hệ thống nhà hàng Ý, Việt và Sunset Bar trên mặt nước độc nhất.",
      image: "/image/dining.jpg",
    },
    {
      category: "Wellness",
      title: "Spa & Health Club",
      desc: "Liệu trình trị liệu đặc trưng giúp khơi dậy nguồn năng lượng và sự thư thái.",
      image: "/image/spa.jpg",
    },
    {
      category: "Events",
      title: "Pool",
      desc: "Hồ bơi vô cực hướng ra Hồ Tây, không gian lý tưởng để thư giãn và ngắm cảnh.",
      image: "/image/pool.jpg",
    },
  ];

  return (
    <div className="bg-[#f9f9f9] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm uppercase tracking-[0.3em] text-gold-600 font-semibold mb-3">
              Our Services
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif leading-tight">
              Nâng cao trải nghiệm <br /> nghỉ dưỡng của bạn
            </h3>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={index} className="group relative overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500">
              {/* Image Container */}
              <div className="h-96 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Badge Category */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1 text-[10px] uppercase tracking-widest font-bold">
                  {service.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h4 className="text-2xl font-serif mb-4 group-hover:text-gold-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <a href="#" className="inline-flex items-center text-xs font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                  Khám phá ngay <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;