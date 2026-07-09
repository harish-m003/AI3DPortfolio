import React, { useState } from "react";
import { useMagnetic } from "../hooks/useMagnetic";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState("");
  const btnRef = useMagnetic();

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.msg) {
      setStatus("Please fill in every field.");
      return;
    }
    const mailto = `mailto:harishhmohann@gmail.com?subject=${encodeURIComponent(
      "New project inquiry from " + form.name
    )}&body=${encodeURIComponent(form.msg + "\n\n— " + form.name + " (" + form.email + ")")}`;
    window.location.href = mailto;
    setStatus("Opening your mail client…");
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <input type="text" placeholder=" " value={form.name} onChange={update("name")} required />
        <label>Your name</label>
        <span className="underline" />
      </div>
      <div className="field">
        <input type="email" placeholder=" " value={form.email} onChange={update("email")} required />
        <label>Email address</label>
        <span className="underline" />
      </div>
      <div className="field">
        <textarea rows={4} placeholder=" " value={form.msg} onChange={update("msg")} required />
        <label>Message</label>
        <span className="underline" />
      </div>
      <button ref={btnRef} type="submit" className="btn btn-solid" data-hover>
        <span>Send message</span>
      </button>
      <div className="form-msg mono">{status}</div>
    </form>
  );
}
