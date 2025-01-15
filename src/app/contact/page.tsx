"use client";
import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";
import { supabase } from "../supabaseClient"; 

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    error: "",
    success: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await supabase
        .from("messages")
        .insert([
          {
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
        ]);

      console.log(data); 

      setFormStatus({
        error: "",
        success: "Your message has been successfully submitted.",
      });

      // Reset the form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      setFormStatus({
        error: "Failed to submit your message. Please try again later.",
        success: "",
      });
    }
  };

  return (
    <div className="mx-auto bg-forest p-8 mt-20">
      {/* Contact Form Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form
            className="bg-gray-200 p-8 space-y-8 rounded-lg shadow-lg"
            onSubmit={handleSubmit}
          >
            <h3 className="text-lg font-bold text-black text-left">Write us a Message</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Fields */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-black" htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-black" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-black" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-black" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="mt-2 p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="flex flex-col mb-6">
              <label className="text-sm font-bold text-black" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="mt-2 p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>

            {/* Status Messages */}
            {formStatus.error && <p className="text-red-500 mt-4">{formStatus.error}</p>}
            {formStatus.success && <p className="text-green-500 mt-4">{formStatus.success}</p>}
          </form>

          {/* Contact Info Card */}
          <div className="bg-dusty p-8 space-y-12 items-start rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-left mb-6">Our Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaPhoneAlt className="text-white mr-4" />
                <span className="text-lg">+254702055158</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-white mr-4" />
                <span className="text-lg">sifainteriors20@gmail.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-white mr-4" />
                <span className="text-lg">Aryan Limited door no7, Nairobi, Kenya</span>
              </div>
              <div className="flex gap-12 items-center text-xl">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF className="text-white hover:text-blue-800" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="text-white hover:text-blue-600" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-white hover:text-blue-900" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
