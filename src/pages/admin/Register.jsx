import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      console.log(form);
      const res = await axios.post("http://salon.test/register.php", form);

      setMessage(res.data.message);
      if (res.data.success) {
        setForm({ username: "", password: "" });
      }
    } catch (err) {
      setMessage(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <div className="mx-auto text-center flex justify-center w-full">
          <img src="/logo.png" alt="" />
        </div>
      <h2 className="text-center text-xl font-bold mb-4">Register Admin</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}
