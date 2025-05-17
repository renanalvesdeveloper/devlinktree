import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

export function Header() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <header className="w-full max-w-2xl mt-4 px-1">
      <nav className="w-full h-12 flex items-center justify-between text-amber-50 px-1 border-b">
        <div className="flex gap-5 font-medium">
          <Link to="/">Home</Link>
          <Link to="/admin">Links</Link>
          <Link to="/admin/social">Redes Sociais</Link>
        </div>

        <button onClick={handleLogout}>
          <BiLogOut size={28} color="white"></BiLogOut>
        </button>
      </nav>
    </header>
  );
}
