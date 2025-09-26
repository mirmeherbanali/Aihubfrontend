"use client";
import { useState } from "react";
import ContactBg from "@/assets/images/Contact/contact_bg.png";
import InputLogoUpload from "@/common/Input/InputLogoUpload";
import InputEmail from "@/common/Input/InputEmail";
import InputTextArea from "@/common/Input/InputTextArea";
import fetchAPI from "@/common/Hooks/fetchAPI";
import {
  showToastifyError,
  showToastifySuccess,
} from "@/common/tostify/Toastifyresponse";
import InputName from "@/common/Input/InputName";
import InputSelect from "@/common/Input/InputSelect";

const contactUs = async (payload) => {
  try {
    const res = await fetchAPI({
      url: process.env.NEXT_PUBLIC_API_URL + "/admin/contact/contactUs",
      method: "POST",
      body: payload,
    });
    showToastifySuccess("Request Sent Successfully");
    return res;
  } catch (error) {
    showToastifyError("Request Failed");
    return [];
  }
};

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    supportTopic: "",
    message: "",
    attachment: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachment: Array.isArray(e.target.data) ? e.target.data : [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.supportTopic.trim()) {
      setErrors((prev) => ({ ...prev, supportTopic: true }));
      return;
    }

    setIsSubmitting(true);

    const form = new FormData();
    form.append("userName", formData.name.trim());
    form.append("email", formData.email.trim());
    form.append("country", formData.country.trim());
    form.append("topic", formData.supportTopic.trim());
    form.append("message", formData.message.trim());
    if (formData.attachment?.length && formData.attachment[0]?.file) {
      form.append("attachment", formData.attachment[0].file);
    }

    const response = await contactUs(form);
    if (response && response.success === true) {
      setFormData({
        name: "",
        email: "",
        country: "",
        supportTopic: "",
        message: "",
        attachment: [],
      });
      setErrors({});
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className="flex items-center bg-white justify-center px-4 bg-center bg-cover max-w-7xl mx-auto rounded-2xl mb-6"
      style={{ backgroundImage: `url(${ContactBg.src || ContactBg})` }}
    >
      <div className="rounded-2xl p-6 sm:p-10 max-w-2xl w-full">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <InputName
              label="Name"
              required={true}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter the Name"
              autoComplete="name"
              className="w-full h-10 sm:h-12 p-3 bg-white border rounded-md placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <InputEmail
              label="Email"
              required={true}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter the Email"
              autoComplete="email"
              className="w-full h-10 sm:h-12 p-3 bg-white border rounded-md placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <InputName
              label="Country"
              required={true}
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              autoComplete="country"
              placeholder="Country"
              className="w-full h-10 sm:h-12 p-3 bg-white border rounded-md placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <InputSelect
              label="Support Topic"
              required={true}
              id="supportTopic"
              name="supportTopic"
              value={formData.supportTopic}
              onChange={handleInputChange}
              error={errors.supportTopic}
              options={[
                { value: "", label: "Choose a support topic", disabled: true },
                { value: "reviews", label: "Reviews" },
                { value: "technical", label: "Technical support" },
                { value: "legal", label: "Legal & Privacy" },
              ]}
              className="mt-2 w-full p-3 bg-white border rounded-md placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <InputTextArea
              label="Describe Message"
              required={true}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Describe your issue. Please be as specific as possible."
              className="bg-white border rounded-md placeholder-gray-500 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold regular">Attachment (Optional)</p>
            <InputLogoUpload
              autoComplete="off"
              id="attachment"
              name="attachment"
              required={false}
              onChange={handleFileChange}
              initialFiles={formData.attachment}
              allowedFileTypes={["png", "jpg", "jpeg", "pdf", "doc", "docx"]}
            />
          </div>
          <div className="flex justify-center mt-9">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-[#014b3b] text-white font-semibold px-8 py-2 rounded-full hover:bg-[#023f31] transition ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportForm;
