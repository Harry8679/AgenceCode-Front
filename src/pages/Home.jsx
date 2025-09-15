// src/pages/Home.jsx
import { Link } from "react-router-dom";
import imgStudent from "../assets/images/students.jpg";
import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import ContactProfileForm from "../components/ContactProfileForm";

const CLASSES = [
  "6e", "5e", "4e", "3e", "2nde", "1ère", "Terminale",
  "Bac+1", "Bac+2", "Bac+3", "Bac+4", "Bac+5",
];

const MATIERES = ["Mathématiques", "Physique", "Chimie", "Informatique"];

function ContactDevisForm() {
  const [profile, setProfile] = useState("PARENT"); // PARENT | STUDENT | CURIOUS
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Champs communs
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [phone, setPhone] = useState("");

  // Champs spécifiques
  const [classe, setClasse] = useState("");
  const [matieres, setMatieres] = useState([]);
  const [matiereAutre, setMatiereAutre] = useState("");
  const [formatCours, setFormatCours] = useState("");     // Parent
  const [demande, setDemande] = useState("");             // Curieux(se)

  const isParent = profile === "PARENT";
  const isStudent = profile === "STUDENT";
  const isCurious = profile === "CURIOUS";

  const profileLabel = useMemo(() => {
    if (isParent) return "Parent";
    if (isStudent) return "Élève/Étudiant";
    return "Curieux(se)";
  }, [profile, isParent, isStudent]);

  function toggleMatiere(m) {
    setMatieres((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  }

  function validate() {
    setOkMsg("");
    setErrMsg("");

    if (!nom || !prenom || !email) {
      setErrMsg("Merci de renseigner au minimum votre nom, prénom et email.");
      return false;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setErrMsg("Email invalide.");
      return false;
    }

    if (isParent) {
      if (!classe) return setErrMsg("Merci d’indiquer la classe de l’élève."), false;
      if (matieres.length === 0)
        return setErrMsg("Merci de sélectionner au moins une matière."), false;
      if (!formatCours.trim())
        return setErrMsg("Merci de préciser le format de cours souhaité."), false;
      if (!codePostal || !ville)
        return setErrMsg("Merci d’indiquer code postal et ville."), false;
    }

    if (isStudent) {
      if (!classe) return setErrMsg("Merci d’indiquer votre classe."), false;
      if (matieres.length === 0 && !matiereAutre.trim())
        return setErrMsg("Sélectionnez au moins une matière ou précisez 'Autre'."), false;
      if (!codePostal || !ville || !phone)
        return setErrMsg("Merci de renseigner téléphone, code postal et ville."), false;
    }

    if (isCurious) {
      if (!demande.trim())
        return setErrMsg("Merci de préciser votre demande d’information."), false;
    }
    return true;
  }

  // envoi EmailJS (sans "!" et avec garde si .env manquant)
async function handleSubmit(e) {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);
  try {
    const serviceId  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setErrMsg("EmailJS n'est pas configuré. Ajoute REACT_APP_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY dans .env puis redémarre le serveur.");
      setLoading(false);
      return;
    }

    const templateParams = {
      profile: profileLabel,
      classe,
      matieres: matieres.join(", "),
      matiere_autre: matiereAutre,
      format_cours: formatCours,
      demande,
      nom,
      prenom,
      email,
      phone,
      ville,
      code_postal: codePostal,
    };

    await emailjs.send(serviceId, templateId, templateParams, publicKey);

    setOkMsg("Merci ! Votre demande a bien été envoyée.");
    setErrMsg("");
    setMatieres([]); setMatiereAutre(""); setFormatCours(""); setDemande("");
  } catch (err) {
    console.error(err);
    setErrMsg("Erreur lors de l’envoi. Réessaie dans un instant.");
    setOkMsg("");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="w-full md:max-w-md md:ml-auto">
      <div className="rounded-2xl border border-slate-100 bg-white/95 p-6 shadow-xl backdrop-blur">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">
          Obtenir un devis — Nous contacter
        </h3>

        {/* Choix du profil */}
        <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
          <button
            type="button"
            onClick={() => setProfile("PARENT")}
            className={`rounded-lg border px-3 py-2 ${isParent ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 hover:bg-slate-50"}`}
          >
            Parent
          </button>
          <button
            type="button"
            onClick={() => setProfile("STUDENT")}
            className={`rounded-lg border px-3 py-2 ${isStudent ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 hover:bg-slate-50"}`}
          >
            Élève / Étudiant
          </button>
          <button
            type="button"
            onClick={() => setProfile("CURIOUS")}
            className={`rounded-lg border px-3 py-2 ${isCurious ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 hover:bg-slate-50"}`}
          >
            Curieux(se)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champs spécifiques */}
          {(isParent || isStudent) && (
            <>
              {/* Classe */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Classe</label>
                <select
                  value={classe}
                  onChange={(e) => setClasse(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="">— Sélectionner —</option>
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Matières */}
              <div>
                <label className="block text-sm font-medium text-slate-700">Matières</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {MATIERES.map((m) => (
                    <label key={m} className="inline-flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={matieres.includes(m)}
                        onChange={() => toggleMatiere(m)}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      {m}
                    </label>
                  ))}
                  {isStudent && (
                    <div className="w-full">
                      <label className="block text-sm text-slate-600 mt-2">
                        Autre matière (optionnel)
                      </label>
                      <input
                        type="text"
                        value={matiereAutre}
                        onChange={(e) => setMatiereAutre(e.target.value)}
                        placeholder="Précisez la matière"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Format cours (Parent) */}
              {isParent && (
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Format du cours (en ligne / à domicile, fréquence, disponibilités…)
                  </label>
                  <textarea
                    rows={3}
                    value={formatCours}
                    onChange={(e) => setFormatCours(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="Décrivez vos besoins (créneaux, objectifs, présentiel/visio, etc.)"
                  />
                </div>
              )}
            </>
          )}

          {/* Demande (Curieux) */}
          {isCurious && (
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Votre demande
              </label>
              <textarea
                rows={3}
                value={demande}
                onChange={(e) => setDemande(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Posez votre question, demande d’info ou de devis…"
              />
            </div>
          )}

          {/* Coordonnées */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Nom</label>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Prénom</label>
              <input
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {(isStudent || isCurious) && (
            <div>
              <label className="block text-sm font-medium text-slate-700">Téléphone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-700">Code postal</label>
              <input
                type="text"
                value={codePostal}
                onChange={(e) => setCodePostal(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Ville</label>
              <input
                type="text"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>

          {/* Feedback */}
          {okMsg && <p className="text-sm text-emerald-700">{okMsg}</p>}
          {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Envoi..." : "Envoyer ma demande"}
          </button>
        </form>
      </div>
      <p className="mt-2 text-xs text-slate-500">
        En envoyant ce formulaire, vous acceptez d’être recontacté(e) au sujet de votre demande.
      </p>
    </div>
  );
}

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* ========== HERO (image de fond + grille 50/50) ========== */}
      <section className="relative overflow-visible min-h-[80vh]">
        {/* Image en fond */}
        <img
          src={imgStudent}
          alt=""
          aria-hidden
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        {/* Voile pour lisibilité */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/85 via-white/60 to-white/30" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          {/* 50% gauche : texte */}
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Le soutien scolaire, <span className="text-indigo-600">simple</span> et{" "}
              <span className="text-emerald-600">efficace</span>
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Trouver des professeurs de confiance en Maths, Physique, Chimie et Informatique.
              Réservez en quelques clics, en ligne ou à domicile.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/inscription" className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
                Créer un compte
              </Link>
              <Link to="/connexion" className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-800 hover:bg-slate-50">
                Se connecter
              </Link>
            </div>

            <ul className="mt-6 space-y-2 text-slate-800">
              <li>• Profs vérifiés et évalués</li>
              <li>• Paiement sécurisé, annulation flexible</li>
              <li>• Suivi des progrès de l’élève</li>
            </ul>
          </div>

          {/* 50% droite : formulaire, le haut du formulaire démarre à 80% de la hauteur de la colonne */}
          <div className="relative min-h-[80vh]">
            <div className="md:absolute md:top-[50%] md:left-0 md:w-full">
              <ContactProfileForm />
            </div>
          </div>
        </div>
      </section>


      {/* ========== MATIERES ========== */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">Matières enseignées</h2>
        <p className="mt-1 text-slate-600">Choisissez une matière et lancez-vous.</p>

        {/* Sur desktop : on limite la largeur à 50% pour libérer la colonne de droite */}
        <div className="mt-6 lg:w-1/2">
          {/* Toujours 2 cartes par ligne dès sm; pas de 4 colonnes en lg */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {[
              { title: "Maths", desc: "Du primaire au supérieur", emoji: "📐" },
              { title: "Physique", desc: "Mécanique, optique ...", emoji: "⚛️" },
              { title: "Chimie", desc: "Du primaire au supérieur", emoji: "🧪" },
              { title: "Informatique", desc: "Du primaire au supérieur", emoji: "🖥" },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="text-3xl">{s.emoji}</div>
                <h3 className="mt-3 text-lg font-semibold text-slate-600">{s.title}</h3>
                <p className="text-sm text-slate-600">{s.desc}</p>
                <Link
                  to="/inscription"
                  className="mt-4 inline-block rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Trouvez un professeur
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ========== COMMENT ÇA MARCHE ========== */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">Comment ça marche ?</h2>
          <p className="mt-1 text-slate-600">3 étapes rapides pour démarrer.</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Recherchez",
                text: "Filtrer par matière, niveau, prix et disponibilité.",
              },
              {
                step: "2",
                title: "Réservez",
                text: "Choisissez un créneau et payer en toute sécurité.",
              },
              {
                step: "3",
                title: "Progressez",
                text: "Cours en visio ou à domicile + suivi des progrès.",
              },
            ].map((card) => (
              <div
                key={card.step}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
                  {card.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="text-slate-600">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TÉMOIGNAGES ========== */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">Ils nous recommandent</h2>
        <p className="mt-1 text-slate-600">Parents et élèves satisfaits.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              quote: "Super expérience ! Ma fille a repris confiance en maths en 1 mois.",
              name: "Sophie, Paris",
            },
            {
              quote: "Prof pédagogue et disponible. Les progrès sont visbles rapidement.",
              name: "Rachid, Paris",
            },
            {
              quote: "Plateforme simple et efficace. J'ai trouvé un super prof d'info.",
              name: "Camille, Lille",
            },
          ].map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <blockquote className="text-slate-800">"{t.quote}"</blockquote>
              <figcaption className="mt-3 text-sm text-slate-500">- {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ========== BANDEAU CTA ========== */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-tr from-indigo-600 to-emerald-500 p-8 text-white shadow-xl md:p-12">
          <h3 className="text-2xl font-bold">Prêt à commencer ?</h3>
          <p className="mt-2 text-indigo-50">
            Créer votre compte et réservez votre premier cours aujourd'hui.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/inscription"
              className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-sky-100"
            >
              Créer un compte
            </Link>
            <Link
              to="/connexion"
              className="rounded-xl border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
