import { useState, useMemo } from "react";
import emailjs from "@emailjs/browser";

const CLASSES = ["6e","5e","4e","3e","2nde","1ère","Terminale","Bac+1","Bac+2","Bac+3","Bac+4","Bac+5"];
const MATIERES = ["Mathématiques","Physique","Chimie","Informatique"];

function ContactProfileForm() {
  const [profile, setProfile] = useState(""); // "", "PARENT", "STUDENT", "CURIOUS"
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // communs
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [phone, setPhone] = useState("");

  // spécifiques
  const [classe, setClasse] = useState("");
  const [matieres, setMatieres] = useState([]);
  const [matiereAutre, setMatiereAutre] = useState("");
  const [formatCours, setFormatCours] = useState(""); // parent
  const [demande, setDemande] = useState("");         // curieux

  const isParent  = profile === "PARENT";
  const isStudent = profile === "STUDENT";
  const isCurious = profile === "CURIOUS";

  const profileLabel = useMemo(() => {
    if (isParent) return "Parent";
    if (isStudent) return "Élève/Étudiant";
    if (isCurious) return "Curieux(se)";
    return "";
  }, [isParent, isStudent, isCurious]);

  function toggleMatiere(m) {
    setMatieres((prev) => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
  }

  function resetSpecific() {
    setClasse(""); setMatieres([]); setMatiereAutre("");
    setFormatCours(""); setDemande("");
    setVille(""); setCodePostal(""); setPhone("");
    setNom(""); setPrenom(""); setEmail("");
  }

  function validate() {
    setOkMsg(""); setErrMsg("");

    if (!profile) { setErrMsg("Choisissez votre profil pour continuer."); return false; }

    // Après sélection du profil : on vérifie les champs correspondants
    if (isParent) {
      if (!classe) return setErrMsg("Indiquez la classe de l’élève."), false;
      if (matieres.length === 0) return setErrMsg("Sélectionnez au moins une matière."), false;
      if (!formatCours.trim()) return setErrMsg("Précisez le format de cours souhaité."), false;
      if (!nom || !prenom || !email || !codePostal || !ville)
        return setErrMsg("Renseignez nom, prénom, email, code postal et ville."), false;
    }

    if (isStudent) {
      if (!classe) return setErrMsg("Indiquez votre classe."), false;
      if (matieres.length === 0 && !matiereAutre.trim())
        return setErrMsg("Sélectionnez une matière ou précisez 'Autre'."), false;
      if (!nom || !prenom || !email || !phone || !ville || !codePostal)
        return setErrMsg("Renseignez nom, prénom, email, téléphone, ville et code postal."), false;
    }

    if (isCurious) {
      if (!demande.trim()) return setErrMsg("Décrivez votre demande d’information."), false;
      if (!nom || !prenom || !email)
        return setErrMsg("Renseignez nom, prénom et email."), false;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) return setErrMsg("Email invalide."), false;

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const serviceId  = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        setErrMsg("EmailJS n'est pas configuré (.env).");
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
        nom, prenom, email, phone, ville, code_postal: codePostal,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setOkMsg("Merci ! Votre demande a bien été envoyée. Nous vous recontactons rapidement.");
      setErrMsg("");
      resetSpecific();
      setProfile(""); // revient à l’état initial (seulement le select)
    } catch (err) {
      console.error(err);
      setErrMsg("Erreur lors de l’envoi. Réessayez dans un instant.");
      setOkMsg("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full md:max-w-md md:ml-auto">
      <div className="rounded-2xl border border-slate-100 bg-white/95 p-6 shadow-xl backdrop-blur">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">Obtenir un devis — Nous contacter</h3>

        {/* Étape 1 : par défaut, on n’affiche QUE le choix du profil */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-slate-700">Je suis :</label>
            <select
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">— Sélectionner un profil —</option>
              <option value="PARENT">Parent</option>
              <option value="STUDENT">Élève / Étudiant</option>
              <option value="CURIOUS">Curieux(se)</option>
            </select>
          </div>

          {/* Étape 2 : si un profil est choisi, on affiche son formulaire */}
          {profile && (
            <>
              {(isParent || isStudent) && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Classe</label>
                    <select
                      value={classe}
                      onChange={(e) => setClasse(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      <option value="">— Sélectionner —</option>
                      {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

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
                    </div>

                    {isStudent && (
                      <div className="mt-2">
                        <label className="block text-sm text-slate-600">Autre matière (optionnel)</label>
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

              {isCurious && (
                <div>
                  <label className="block text-sm font-medium text-slate-700">Votre demande</label>
                  <textarea
                    rows={3}
                    value={demande}
                    onChange={(e) => setDemande(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="Posez votre question, demande d’info ou de devis…"
                  />
                </div>
              )}

              {/* Coordonnées (varie selon profil) */}
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

              {okMsg && <p className="text-sm text-emerald-700">{okMsg}</p>}
              {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Envoi..." : "Envoyer ma demande"}
              </button>
            </>
          )}
        </form>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        En envoyant ce formulaire, vous acceptez d’être recontacté(e) au sujet de votre demande.
      </p>
    </div>
  );
}

export default ContactProfileForm;