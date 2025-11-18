import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 pt-10 pb-5 text-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 border-b border-gray-700 pb-10">

        {/* ABOUT */}
        <div>
          <h3 className="text-gray-400 font-semibold mb-3">ABOUT</h3>
          <ul className="space-y-1">
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>ShopinGo Stories</li>
            <li>Press</li>
            <li>Corporate Information</li>
          </ul>
        </div>

        {/* GROUP COMPANIES */}
        <div>
          <h3 className="text-gray-400 font-semibold mb-3">GROUP COMPANIES</h3>
          <ul className="space-y-1">
            <li>Myntra</li>
            <li>Cleartrip</li>
            <li>Shopsy</li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h3 className="text-gray-400 font-semibold mb-3">HELP</h3>
          <ul className="space-y-1">
            <li>Payments</li>
            <li>Shipping</li>
            <li>Cancellation & Returns</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="text-gray-400 font-semibold mb-3">CONSUMER POLICY</h3>
          <ul className="space-y-1">
            <li>Cancellation & Returns</li>
            <li>Terms Of Use</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>Sitemap</li>
            <li>Grievance Redressal</li>
            <li>EPR Compliance</li>
          </ul>
        </div>

        {/* ADDRESS */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-gray-400 font-semibold mb-3">Mail Us:</h3>
          <p className="text-gray-400 text-xs leading-5">
            Shopingo Internet Private Limited,<br />
            Buildings Alyssa, Begonia &<br />
            Clove Embassy Tech Village,<br />
            Outer Ring Road,<br />
            Devarabeesanahalli Village,<br />
            mumbai, 400063,<br />
            maharastra, India
          </p>

          <h3 className="text-gray-400 font-semibold mt-5 mb-3">
            Social:
          </h3>

          <div className="flex space-x-4 text-lg">
            <FaFacebook className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaYoutube className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center pt-4 text-gray-400 text-xs">
        <div className="flex space-x-6 mb-3 md:mb-0">
          <span>Become a Seller</span>
          <span>Advertise</span>
          <span>Gift Cards</span>
          <span>Help Center</span>
        </div>

        <span>© 2007–2025 ShopinGo.com</span>

        <div className="flex space-x-2 mt-3 md:mt-0">
          <img src="/visa.png" className="h-5" alt="visa" />
          <img src="/master.png" className="h-5" alt="mastercard" />
          <img src="/rupay.png" className="h-5" alt="rupay" />
        </div>
      </div>
    </footer>
  );
}
