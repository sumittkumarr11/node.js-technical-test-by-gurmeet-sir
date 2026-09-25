import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Profile Manager</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;