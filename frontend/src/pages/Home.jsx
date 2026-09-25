import { useState } from "react";
import axios from "axios";

function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    age: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("https://node-js-technical-test-by-gurmeet-sir.onrender.com/api/profiles", {
        ...form,
        age: Number(form.age)
      });

      setMessage(`Profile created successfully: ${response.data.data.id}`);

      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        age: ""
      });

    } catch (error) {
      setMessage("Something went wrong");
    }
  }

  return (
    <div className="page">
      <h1>Profile Management</h1>
      <p>Create a new profile</p>

      <form onSubmit={handleSubmit} className="form">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />

        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          type="number"
        />

        <button type="submit">
          Create Profile
        </button>

      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Home;
