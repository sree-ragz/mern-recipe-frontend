import "../App.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const [cookie, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <div className="nav-local">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li>
              <Link to="/create-recipe" className="nav-link">
                CreateRecipe
              </Link>
            </li>

            {!cookie.access_token ? (
              <li className="nav-item">
                <Link to="/auth" className="nav-link">
                  Login/Signup
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/saved-recipe" className="nav-link">
                    SavedRecipe
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth" className="nav-link" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};
