import { Social } from "../../components/Social";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import perfil from "../../assets/foto-perfil.jpeg";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  doc,
  getDoc,
  query,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinkProps {
  facebook: string;
  youtube: string;
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLink, setSocialLinks] = useState<SocialLinkProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "linktree");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        let listaDocs = [] as LinkProps[];

        snapshot.forEach((doc) => {
          listaDocs.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          });
        });
        console.log(listaDocs);
        setLinks(listaDocs);
      });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function socialLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }

    socialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="text-4xl font-bold text-white mt-20 mb-6">
        Dev
        <span className="bg-gradient-to-r from bg-yellow-500 to-orange-400 bg-clip-text text-transparent">
          LinkTree
        </span>
      </h1>

      <img
        src={perfil}
        alt="perfil"
        className="w-40 h-40 rounded-full object-cover aspect-square mb-6 border-4 border-solid border-white"
      />
      <span className="text-gray-50 mb-5 mt-3">Veja meus links 🔽</span>
      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((item) => (
          <section
            key={item.id}
            //style={{backgroundColor: item.bg}} aplicando style do BD
            className="bg-transparent border border-solid border-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
          >
            <a href={item.url} target="_blank">
              <p
                className="text-base text-amber-50 md:text-lg"
                style={{ color: item.color }}
              >
                {item.name}
              </p>
            </a>
          </section>
        ))}

        {socialLink && Object.keys(socialLink).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLink?.facebook}>
              <FaFacebook size={35} color="#FFF"></FaFacebook>
            </Social>

            <Social url={socialLink?.youtube}>
              <FaYoutube size={35} color="#FFF"></FaYoutube>
            </Social>

            <Social url={socialLink?.instagram}>
              <FaInstagram size={35} color="#FFF"></FaInstagram>
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
