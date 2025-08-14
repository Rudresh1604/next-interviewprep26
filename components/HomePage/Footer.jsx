import {
  Facebook,
  InstagramIcon,
  LandPlotIcon,
  Linkedin,
  LocateIcon,
  LucideGalleryThumbnails,
  MailIcon,
  PhoneCallIcon,
  TextCursorIcon,
  TextIcon,
  Twitter,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full bg-gray-800  py-5 px-6 text-white lg:text-xl mt-9">
      <div className="flex max-sm:flex-col items-center justify-around">
        <div className="flex flex-col gap-3">
          <h1>Contact Us</h1>
          <h1>Products</h1>
          <h1>Students</h1>
          <h1>Recruiter</h1>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Facebook className="w-5 h-6" /> Facebook
          </div>
          <div className="flex items-center gap-1">
            <InstagramIcon className="w-5 h-6" /> Instagram
          </div>
          <div className="flex items-center gap-1">
            <Linkedin className="w-5 h-6" /> Linked In
          </div>
          <div className="flex items-center gap-1">
            <Twitter className="w-5 h-6" /> Twitter
          </div>
          <div className="flex items-center gap-1">
            <LandPlotIcon className="h-6 w-5" /> Locate Us
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <TextIcon className="w-5 h-6" /> Content
          </div>
          <div className="flex items-center gap-1">
            <LucideGalleryThumbnails className="w-5 h-6" /> Gallery
          </div>
          <div className="flex items-center gap-1">
            <MailIcon className="w-5 h-6" /> Mail
          </div>
          <div className="flex items-center gap-1">
            <PhoneCallIcon className="w-5 h-6" /> Call Us
          </div>
        </div>
      </div>
      <div className="text-center mt-9">
        <h1>
          &copy; 2025 — Made with <span className="text-red-500">❤️</span> by
          Rudresh Dharkar
        </h1>
      </div>
    </div>
  );
};

export default Footer;
