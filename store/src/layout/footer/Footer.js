import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full text-white">
      {/* Top section */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Blue Section */}
        <div className="bg-blue-700 p-8 md:p-12">
          <div className="flex flex-col gap-4">
            <Image
              src="/logo/logo-color.png"
              alt="Medical & Surgical Solutions"
              width={180}
              height={60}
              className="mb-3"
            />
            <p className="text-sm text-gray-100 leading-relaxed">
              We provide premium quality medical and surgical equipment across India,
              ensuring reliability, precision, and trust for healthcare professionals.
            </p>
            <div className="mt-4">
              <h4 className="text-base font-semibold text-white mb-1">Our Help Line:</h4>
              <p className="text-2xl font-bold text-white">+91 96433 44588</p>
              <p className="text-sm mt-1">Mon - Fri: 9:00 - 20:00</p>
              <p className="text-sm">Sat: 11:00 - 15:00</p>
              <p className="text-sm mt-2">care@medicalsurgical.org</p>
            </div>
          </div>
        </div>

        {/* Right Dark Section */}
        <div className="bg-[#0f0f0f] p-8 md:p-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-l-4 border-yellow-500 pl-3">
              Information
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/delivery" className="hover:text-blue-400">Delivery</Link></li>
              <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
              <li><Link href="/payment" className="hover:text-blue-400">Secure Payment</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">Contact Us</Link></li>
              <li><Link href="/sitemap" className="hover:text-blue-400">Sitemap</Link></li>
              <li><Link href="/stores" className="hover:text-blue-400">Stores</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-l-4 border-yellow-500 pl-3">
              Custom Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/legal" className="hover:text-blue-400">Legal Notice</Link></li>
              <li><Link href="/offers" className="hover:text-blue-400">Price Drop</Link></li>
              <li><Link href="/products" className="hover:text-blue-400">New Products</Link></li>
              <li><Link href="/bestsales" className="hover:text-blue-400">Best Sales</Link></li>
              <li><Link href="/login" className="hover:text-blue-400">Login</Link></li>
              <li><Link href="/account" className="hover:text-blue-400">My Account</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-l-4 border-yellow-500 pl-3">
              Newsletter
            </h4>
            <p className="text-sm mb-4 text-gray-300">
              Subscribe to receive product updates and special offers.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Subscribed: ${email}`);
              }}
              className="flex flex-col gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-[#1b1b1b] text-gray-200 px-3 py-2 rounded focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
              >
                SUBMIT NOW
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#0b0b0b] border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2025 Medical & Surgical Solutions. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">
            <Image
              src="/payment-method/payment-logo.png"
              alt="payment"
              width={180}
              height={30}
            />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-gray-400">
            <Link href="#"><FaFacebookF className="hover:text-blue-500" /></Link>
            <Link href="#"><FaInstagram className="hover:text-pink-500" /></Link>
            <Link href="#"><FaLinkedinIn className="hover:text-blue-400" /></Link>
            <Link href="#"><FaYoutube className="hover:text-red-600" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
