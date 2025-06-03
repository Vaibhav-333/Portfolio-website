// src/components/Contact.js
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("your_service_id", "your_template_id", form.current, "your_public_key")
      .then(() => alert("Message sent!"))
      .catch(() => alert("Error sending message."));

    e.target.reset();
  };

  return (
    <div className="contact-section">
      <h2>📨 Contact Me</h2>
      <form ref={form} onSubmit={sendEmail}>
        <input type="text" name="user_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;
