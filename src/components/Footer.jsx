import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-blue-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
        <p className="text-blue-100 max-w-xl mx-auto text-lg">
          Contact us for support, partnership, or to join our hospital referral network.
        </p>

        {/* Divider */}
        <div className="border-t border-blue-700 my-8 w-full"></div>

        {/* Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Name */}
          <div className="text-xl font-semibold text-blue-200">MediConnect</div>

          {/* Social Icons */}
          <div className="flex justify-center items-center space-x-6 ml-20 pl-12">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/mediconnect"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <img src="/images/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
            </a>

            {/* Email */}
            <a
              href="mailto:support@mediconnect.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <img src="/images/gmail.png" alt="Email" className="w-6 h-6" />
            </a>

            {/* Instragram */}
            <a
              href="https://instagram.com/mediconnect"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              <img src="/images/instagram.png" alt="Twitter" className="w-6 h-6" />
            </a>

            
          </div>

          {/* Copyright */}
          <div className="text-sm text-blue-200">
            © {new Date().getFullYear()} MediConnect. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
