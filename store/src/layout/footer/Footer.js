import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FacebookIcon, LinkedinIcon, WhatsappIcon } from "react-share";
import { FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = ({ storeCustomizationSetting }) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white">
      {/* ---- TOP SECTION ---- */}
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Example section (Policies) */}
        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Policies</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/return">Exchange & Return Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Account</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/my-account">My Account</Link></li>
            <li><Link href="/orders">Orders</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Information</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Blogs</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/blogs">Latest Posts</Link></li>
          </ul>
        </div>
      </div>

      {/* ---- BOTTOM SECTION ---- */}
      <div className="bg-gray-800">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

          {/* FOLLOW US */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-base font-semibold text-white mb-3">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <Link
                href="#"
                className="bg-white p-2 rounded-full shadow hover:bg-blue-600 transition"
              >
                <FacebookIcon size={32} round />
              </Link>
              <Link
                href="#"
                className="bg-white p-2 rounded-full shadow hover:bg-pink-500 transition"
              >
                <FaInstagram size={26} className="text-pink-600 hover:text-white transition" />
              </Link>
              <Link
                href="#"
                className="bg-white p-2 rounded-full shadow hover:bg-blue-700 transition"
              >
                <LinkedinIcon size={32} round />
              </Link>
              <Link
                href="#"
                className="bg-white p-2 rounded-full shadow hover:bg-green-600 transition"
              >
                <WhatsappIcon size={32} round />
              </Link>
              <Link
                href="#"
                className="bg-white p-2 rounded-full shadow hover:bg-red-600 transition"
              >
                <FaYoutube size={26} className="text-red-500 hover:text-white transition" />
              </Link>
            </div>
          </div>

          {/* CALL US */}
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-base font-semibold text-white mb-2">
              Call Us Today
            </h4>
            <a
              href="tel:+919643344588"
              className="text-2xl font-bold text-cyan-400 hover:text-cyan-300"
            >
              +91 96433 44588
            </a>
          </div>

          {/* SECURE PAYMENT */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-base font-semibold text-white mb-3">
              Secure Payment
            </h4>
            <div className="flex items-center justify-center bg-white rounded-lg shadow px-3 py-2">
              <Image
                src="/payment-method/payment-logo.png"
                alt="Secure Payment"
                width={200}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---- COPYRIGHT ---- */}
      <div className="bg-gray-950 py-3 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Medical Surgical Solutions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
