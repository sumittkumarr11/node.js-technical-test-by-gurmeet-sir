import { useState } from "react";
import axios from "axios";

function Profile() {
  const [id, setId] = useState("");
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    });
  }

  async function searchProfile() {
    try {
      const response = await axios.get(`/api/profiles/${id}`);

      setProfile(response.data.data);
      setMessage("");

    } catch (error) {
      setProfile(null);
      setMessage("Something went wrong");
    }
  }

  async function updateProfile(event) {
    event.preventDefault();

    try {
      const response = await axios.put(`/api/profiles/${profile.id}`, {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        age: Number(profile.age)
      });

      setProfile(response.data.data);
      setMessage("Profile updated successfully");

    } catch (error) {
      setMessage("Something went wrong");
    }
  }

  return (
    <div className="page">

      <h1>Profile</h1>

    
      <div className="search">
        <input
          value={id}
          onChange={(event) => setId(event.target.value)}
          placeholder="Enter Profile ID"
        />

        <button onClick={searchProfile}>
          Search
        </button>
      </div>

      {message && <p>{message}</p>}

      {profile && (
        <form onSubmit={updateProfile} className="form">

          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
          />

          <input
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
          />

          <input
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
          />

          <input
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Address"
          />

          <input
            name="age"
            type="number"
            value={profile.age}
            onChange={handleChange}
            placeholder="Age"
          />

          <button type="submit"> Update Profile </button>

        </form>
      )}

    </div>
  );
}

export default Profile;
