import { useState, type FormEvent, useEffect } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";

export function Network() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        //console.log(snapshot.data());
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      });
    }

    loadLinks();
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    //setDoc --> criar um novo documento.//atualizar(update) quando já existe.
    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        console.log("Cadastrado com sucesso");
        toast.success("Link Cadastrado com Sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao Salvar " + error);
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header></Header>
      <h1 className="font-medium text-amber-50 mt-8 mb-4 text-2xl">
        Minhas Redes Sociais
      </h1>
      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-amber-50 mt-2 mb-2 font-medium">
          Link do facebook
        </label>
        <Input
          type="url"
          placeholder="Digite a url do facebook..."
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        ></Input>

        <label className="text-amber-50 mt-2 mb-2 font-medium">
          Link do Instagram
        </label>
        <Input
          type="url"
          placeholder="Digite a url do Instagram..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        ></Input>

        <label className="text-amber-50 mt-2 mb-2 font-medium">
          Link do Youtube
        </label>
        <Input
          type="url"
          placeholder="Digite a url do youtube..."
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        ></Input>

        <button
          type="submit"
          className=" mb-7 flex h-9 items-center justify-center rounded-md bg-gradient-to-b from-pink-400/80 from-50% to-pink-500/80 to-50% px-3 text-pink-50 hover:from-pink-400 hover:to-pink-500 active:from-pink-500 active:to-pink-600 cursor-pointer"
        >
          Cadastrar
        </button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </form>
    </div>
  );
}
