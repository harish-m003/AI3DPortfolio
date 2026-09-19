import React, { useState } from "react";
import { toast } from "react-toastify";
import { connectsupabase } from "../components/supabase";

export function ContactForm() {
  const [form, setform] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  const submitform = async (e) => {
    e.preventDefault();

    const { error } = await connectsupabase
      .from("aiportfoliocontactform")
      .insert([form]);

    if (error) {
      console.log(error);
      toast.error("Message Not Sent");
      return;
    }

    toast.success("Message Sent Successfully!");

    setform({
      Name: "",
      Email: "",
      Message: "",
    });
  };

  return (
    <form onSubmit={submitform}>
      <div className="field">
        <input
          type="text"
          required
          value={form.Name}
          onChange={(e) =>
            setform({ ...form, Name: e.target.value })
          }
        />
        <label>Your name</label>
        <span className="underline" />
      </div>

      <div className="field">
        <input
          type="email"
          required
          value={form.Email}
          onChange={(e) =>
            setform({ ...form, Email: e.target.value })
          }
        />
        <label>Email address</label>
        <span className="underline" />
      </div>

      <div className="field">
        <textarea
          rows={4}
          required
          value={form.Message}
          onChange={(e) =>
            setform({ ...form, Message: e.target.value })
          }
        />
        <label>Message</label>
        <span className="underline" />
      </div>

      <button type="submit" className="btn btn-solid">
        <span>Send message</span>
      </button>
    </form>
  );
}