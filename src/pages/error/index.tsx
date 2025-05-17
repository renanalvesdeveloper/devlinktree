import { Link } from "react-router-dom";
import erro from "../../assets/erro.png";
export function ErrorPage() {
  return (
    <div className="flex w-full justify-center items-center flex-col  text-white mt-52">
      <img src={erro} alt="erro" className="w-md" />
      <Link
        to="/"
        className="bg-transparent border border-solid border-white mb-4 py-2 px-4 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
      >
        Voltar para Home
      </Link>
    </div>
  );
}
