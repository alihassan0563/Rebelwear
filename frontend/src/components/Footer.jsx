import React from 'react'

const Footer = () => {
  // Handles in-page smooth scroll navigation
  const handleFooterLink = (e) => {
    e.preventDefault();
    const sectionId = e.currentTarget.getAttribute('href').replace('#', '');
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/rebelwear.jpg"
                alt="REBELWEAR Logo"
                className="h-16 w-16 rounded-full object-cover"
              />
              <h3 className="text-xl font-black">REBELWEAR</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Premium streetwear and sportswear for those who dare to be different.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="list-none space-y-2">
              <li>
                <a
                  href="#collections"
                  onClick={handleFooterLink}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={handleFooterLink}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  onClick={handleFooterLink}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={handleFooterLink}
                  className="text-gray-400 hover:text-secondary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Connect With Us</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/rebelwear40?igsh=ZDZxb2FlZmVlOGYx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-2"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a
                href="https://www.facebook.com/Rebelwear40/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-2"
              >
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a
                href="https://wa.me/923313337574"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-2"
              >
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
              <a
                href="http://tiktok.com/@rebelwear40"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors flex items-center gap-2"
              >
                <i className="fab fa-tiktok"></i> TikTok
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="list-none space-y-2 text-gray-400">
              <li>Custom Designs</li>
              <li>Bulk Orders</li>
              <li>Worldwide Shipping</li>
              <li>24/7 Support</li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/10 text-gray-400">
          <p>&copy; 2024 <b>REBELWEAR</b>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
