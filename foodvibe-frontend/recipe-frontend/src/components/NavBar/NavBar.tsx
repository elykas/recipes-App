import { useState } from "react";
import { useUserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { ChevronDown } from "lucide-react";

const NavBar: React.FC = () => {
  const { user } = useUserContext();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-4">
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-blue-500 font-medium">
          AI Recipes
        </Link>
        <Link to="/user-recipes" className="hover:text-blue-500 font-medium">
          My Recipes
        </Link>
      </div>

      <div className="relative">
        <Button
          variant="default"
          className="flex items-center gap-2"
          onClick={() => setShowMenu(!showMenu)}
        >
          {user ? user.username : "User"}
          <ChevronDown size={16} />
        </Button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded-lg p-2">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Edit Profile
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Choose Mode
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Language
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
