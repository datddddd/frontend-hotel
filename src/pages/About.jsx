import React, { useEffect } from 'react';
import Navbar from '../components/Home/HomeNavabar';
import Footer from '../components/Home/HomeFooter';
import { FiTarget, FiHeart, FiAward, FiUsers, FiArrowRight } from 'react-icons/fi';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* Hero Section - Cải tiến Text Shadow và Overlay */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920"
            alt="Luxury Hotel"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="text-amber-400 font-bold uppercase tracking-[0.5em] text-[10px] md:text-xs mb-6 block animate-fade-in-down">
            Defining Luxury Since 1998
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight animate-fade-in-up drop-shadow-2xl">
            Hành Trình <br /> <span className=" font-light">Tạo Di Sản</span>
          </h1>
          <div className="w-20 h-[2px] bg-amber-500 mx-auto animate-expand"></div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Our Story - Cải tiến Layout và Border nghệ thuật */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            {/* Khung ảnh nghệ thuật */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-emerald-600/30 z-0 hidden md:block"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-amber-600/30 z-0 hidden md:block"></div>

            <div className="relative z-10 overflow-hidden rounded-sm shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
                alt="Hotel Interior"
                className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Thẻ trôi nổi */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 shadow-xl hidden lg:block z-20 rounded-sm border-l-4 border-emerald-600">
              <p className="text-3xl font-serif text-slate-900">25+</p>
              <p className="text-xs uppercase tracking-widest text-slate-500">Năm dẫn đầu</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-xs">Câu chuyện của chúng tôi</span>
              <h2 className="text-4xl md:text-5xl  text-slate-900 leading-[1.2]">
                Nơi Sự Sang Trọng <br /> Thấu Hiểu <span className="text-emerald-700">Tâm Hồn</span>
              </h2>
            </div>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-light">
              <p>
                Khởi đầu từ một biệt thự cổ kính bên bờ biển vào năm 1998, chúng tôi không chỉ xây dựng những bức tường, chúng tôi xây dựng niềm tin. Mỗi viên gạch đều chứa đựng khát vọng mang đến sự hoàn mỹ.
              </p>
              <p className="border-l-2 border-slate-200 pl-6 italic">
                "Chúng tôi tin rằng dịch vụ khách sạn không chỉ là một ngành công nghiệp, đó là nghệ thuật của sự hiếu khách."
              </p>
            </div>

            <div className="pt-6">
              <button className="group flex items-center gap-4 px-10 py-5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-emerald-800 transition-all duration-500 rounded-full">
                Khám phá di sản
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Cải tiến Card dạng Minimalist */}
      <section className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl text-slate-900 mb-4">Giá Trị Cốt Lõi</h2>
              <p className="text-slate-500">Những nguyên tắc vàng giúp chúng tôi duy trì tiêu chuẩn 5 sao suốt hơn hai thập kỷ qua.</p>
            </div>
            <div className="hidden md:block w-32 h-[1px] bg-slate-300 mb-4"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: <FiTarget size={28} />, title: "Định hướng phát triển", desc: "Định vị thương hiệu Việt trên bản đồ nghỉ dưỡng cao cấp thế giới." },
              { icon: <FiHeart size={28} />, title: "Tận tâm", desc: "Chúng tôi lắng nghe những nhu cầu chưa được nói thành lời." },
              { icon: <FiAward size={28} />, title: "Dịch vụ", desc: "Không có sự thỏa hiệp trong việc tuyển chọn những điều tốt nhất." },
              { icon: <FiUsers size={28} />, title: "Vững trãi", desc: "Phát triển xanh là cam kết của chúng tôi với thế hệ tương lai." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 hover:bg-slate-900 hover:text-white transition-all duration-500 group relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-emerald-600 mb-8 group-hover:text-amber-400 transition-colors duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-serif mb-4">{item.title}</h3>
                  <p className="text-slate-500 group-hover:text-slate-400 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
                {/* Background trang trí khi hover */}
                <div className="absolute bottom-[-20%] right-[-10%] opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  {React.cloneElement(item.icon, { size: 150 })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Làm tối giản và hiện đại hơn */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            {[
              { label: "Năm kinh nghiệm", value: "25" },
              { label: "Phòng nghỉ hạng sang", value: "500" },
              { label: "Khách hàng hài lòng", value: "100K" },
              { label: "Giải thưởng danh giá", value: "15" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="text-5xl font-serif text-slate-900 tracking-tighter">
                  {stat.value}<span className="text-emerald-600">+</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 30s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95);
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1.2s ease-out;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out;
        }
        @keyframes expand {
          from { width: 0; opacity: 0; }
          to { width: 5rem; opacity: 1; }
        }
        .animate-expand {
          animation: expand 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default About;