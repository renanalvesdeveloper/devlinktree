import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useState, type FormEvent } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    //console.log({ email: email, password: password });
    if (email === "" || password === "") {
      alert("Preencha todos os campos!");
      return;
    }
    //renan@teste.com
    //baruck123
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("usuario logado!");
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        console.log("ERRO AO EFETUAR LOGIN");
        console.log(error);
      });
  }

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to={"/"}>
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from bg-yellow-500 to-orange-400 bg-clip-text text-transparent">
            LinkTree
          </span>
        </h1>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2"
      >
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <button
          type="submit"
          className="flex h-9 items-center justify-center rounded-md bg-gradient-to-b from-pink-400/80 from-50% to-pink-500/80 to-50% px-3 text-pink-50 hover:from-pink-400 hover:to-pink-500 active:from-pink-500 active:to-pink-600 cursor-pointer"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
