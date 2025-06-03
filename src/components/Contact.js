// src/components/Contact.js
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_j3wn4or", "template_11vu05g", form.current, "U5Z0pqZRDguX6I1Pa")
      .then(() => alert("Thanks for connecting with me.! I will get back to you soon."))
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
