import { FaFacebookF, FaInstagram, FaTripadvisor } from 'react-icons/fa'; // Cần cài react-icons

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        
        {/* Cột 1: Giới thiệu */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-bold tracking-widest uppercase text-gold-400">
            Hanoi Luxury Lakeside
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Nơi giao thoa giữa vẻ đẹp cổ điển của Hà Nội và sự tiện nghi hiện đại. 
            Tận hưởng kỳ nghỉ dưỡng tuyệt vời bên bờ Hồ Tây thơ mộng.
          </p>
        </div>

        {/* Cột 2: Liên hệ */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold border-b border-white/10 pb-2">Contact Us</h4>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>123 Xuan Dieu Street, Tay Ho District, Hanoi</li>
            <li>Hotline: +84 (0) 24 3456 7890</li>
            <li>Email: info@lakesidehotel.com</li>
          </ul>
        </div>

        {/* Cột 3: Mạng xã hội & Newsletter */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold border-b border-white/10 pb-2">Follow Us</h4>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gold-400 transition-colors"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-gold-400 transition-colors"><FaInstagram size={20} /></a>
            <a href="#" className="hover:text-gold-400 transition-colors"><FaTripadvisor size={24} /></a>
          </div>
          <div className="pt-4">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-transparent border border-white/20 px-4 py-2 text-sm focus:outline-none focus:border-gold-400 w-full"
            />
          </div>
        </div>

      </div>

      {/* Dòng bản quyền */}
      <div className="border-t border-white/5 pt-8 text-center text-xs text-gray-500 tracking-widest uppercase">
        <p>© 2026 Hanoi Luxury Lakeside Hotel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;