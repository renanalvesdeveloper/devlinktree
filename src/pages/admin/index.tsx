import { useState, useEffect, type FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FaTrashAlt } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
  created: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#fffbeb");
  const [backGroundColorInput, setBackGroundColorInput] = useState("#000000");

  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "linktree");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let listaDocs = [] as LinkProps[];
      snapshot.forEach((doc) => {
        listaDocs.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
          created: converDataFirebase(doc.data().created).toLocaleDateString(),
        });
      });
      console.log(listaDocs);
      setLinks(listaDocs);
      //console.log(snapshot);
    });
    return () => {
      unsub();
    };
  }, []);

  function converDataFirebase(dataFireBase: Timestamp): Date {
    return dataFireBase.toDate();
  }

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    // insert novo item
    addDoc(collection(db, "linktree"), {
      name: nameInput,
      url: urlInput,
      bg: backGroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        console.log("CADASTRADO COM SUCESSO");
        toast.success("Link Cadastrado com Sucesso!");
      })
      .catch((erro) => {
        console.log("ERRO AO CADASTRAR NO BANCO DE DADOS: " + erro);
      });

    /*if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }*/
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "linktree", id);
    await deleteDoc(docRef);
    toast.success("Link Removido com Sucesso!");
  }
  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-amber-50 mt-2 mb-2 font-medium">
          Nome do Link
        </label>
        <Input
          required
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        ></Input>

        <label className="text-amber-50 mt-2 mb-2 font-medium">
          Url do Link
        </label>
        <Input
          required
          type="url"
          placeholder="Digite a url..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        ></Input>

        <section className="flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-amber-50 mt-2 mb-2 font-medium">
              Cor do Link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            ></input>
          </div>
          <div className="flex gap-2">
            <label className="text-amber-50 mt-2 mb-2 font-medium">
              Fundo do Link
            </label>
            <input
              type="color"
              value={backGroundColorInput}
              onChange={(e) => setBackGroundColorInput(e.target.value)}
            ></input>
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 pb-1 text-amber-50 border rounded-md">
            <label className="text-amber-50 mt-2 mb-3 font-medium">
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded-lg px-1 py-2 mb-2"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backGroundColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className=" mb-7 flex h-9 items-center justify-center rounded-md bg-gradient-to-b from-pink-400/80 from-50% to-pink-500/80 to-50% px-3 text-pink-50 hover:from-pink-400 hover:to-pink-500 active:from-pink-500 active:to-pink-600 cursor-pointer"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-medium text-amber-50 mb-4 text-2xl">Meus Links</h2>

      {links.map((item) => (
        <article
          key={item.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded-lg px-1 py-2 mb-2 select-none"
          style={{ backgroundColor: item.bg, color: item.color }}
        >
          <p style={{ paddingLeft: 10 }}>{item.name}</p>
          <div>
            <button
              className="border border-dashed p-1 rounded mr-2 cursor-pointer"
              onClick={() => handleDeleteLink(item.id)}
            >
              <FaTrashAlt size={18} color="white" />
            </button>
          </div>
        </article>
      ))}
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
    </div>
  );
}
