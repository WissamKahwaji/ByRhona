import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// import baseUrl from "../../../constants/domain";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // try {
    //   const response = await fetch(`${baseUrl}/contact/send-email`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     console.log("Email sent successfully");
    //     alert("Your Enquery sent successfully!");
    //   } else {
    //     console.error("Failed to send email");
    //     alert("Failed to send request. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error sending email:", error);
    //   alert("Failed to send request. Please try again.");
    // }
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };
  return (
    <div className="flex flex-col gap-8 bg-gray-background px-3 lg:px-20 md:py-14 py-4 w-full bg-seconBackground">
      <div className="border border-primary p-4 md:p-6 lg:p-8 rounded-lg">
        <h2 className="text-4xl font-semibold mb-4 font-header text-hoverColor">
          {t("contact_us")}
        </h2>
        <form onSubmit={handleSubmit} className="text-hoverColor">
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="font-serif mb-1">
              {t("name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent border-b border-primary  p-2"
              placeholder={t("enter_your_name")}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="font-serif mb-1">
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border-b border-primary  p-2"
              placeholder={t("enter_your_email")}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="phone" className="font-serif mb-1">
              {t("phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-transparent border-b border-primary  p-2"
              placeholder={t("enter_your_phone_number")}
              required
            />
          </div>
          <div className="flex flex-col mb-8">
            <label htmlFor="message" className="font-serif mb-1">
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent border-b border-primary  p-2 h-32"
              placeholder={t("enter_your_message")}
              required
            />
          </div>
          <div className="w-full items-center  flex">
            <button
              type="submit"
              className="bg-primary w-1/2 mx-auto text-white font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-primary/80 focus:outline-none focus:ring focus:ring-gray-700"
            >
              {t("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
