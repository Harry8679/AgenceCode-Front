// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import DefaultLayout from "../components/DefaultLayout";
import { useAuth } from "../context/AuthContext";

const API_BASE = process.env.REACT_APP_API_BASE_URL || ""; // utiliser proxy CRA ou .env

const Register = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const { firstName, lastName, email, password, confirm } = form;
    if (!firstName || !lastName || !email || !password || !confirm) {
      toast.error("Veuillez remplir tous les champs.");
      return false;
    }
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      toast.error("Nom et prénom doivent contenir au moins 2 caractères.");
      return false;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      toast.error("Email invalide.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }
    if (password !== confirm) {
      toast.error("Les mots de passe ne correspondent pas.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      // Essaye de parser proprement (au cas où)
      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { message: await res.text() };

      if (!res.ok) {
        throw new Error(data.message || "Erreur lors de l'inscription");
      }

      // data attendu: { _id, firstName, lastName, email, token }
      if (!data?.token) {
        throw new Error("Réponse serveur invalide (token manquant).");
      }

      // Stocke token + user, puis met à jour le contexte
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      authLogin?.(data);

      toast.success("Inscription réussie !");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-b from-blue-50 to-white">
        <ToastContainer />
        <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Colonne gauche : Accroche */}
          <div className="flex-col justify-center hidden p-8 bg-white border border-blue-100 shadow-lg md:flex rounded-2xl">
            <h1 className="mb-4 text-3xl font-bold text-blue-900">
              Créez votre compte
            </h1>
            <p className="leading-relaxed text-gray-600">
              Suivez vos revenus et dépenses facilement. Vos données restent
              sécurisées et accessibles à tout moment.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-gray-600">
              <li>• Statistiques en un coup d’œil</li>
              <li>• Catégorisation intelligente</li>
              <li>• Export et historique</li>
            </ul>
          </div>

          {/* Colonne droite : Formulaire */}
          <div className="p-8 bg-white border border-gray-100 shadow-lg rounded-2xl">
            <h2 className="mb-6 text-2xl font-bold text-center text-blue-700">
              Inscription
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    autoComplete="given-name"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    autoComplete="family-name"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="vous@example.com"
                  autoComplete="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Au moins 6 caractères"
                      autoComplete="new-password"
                      className="w-full px-3 py-2 pr-10 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                      aria-label="Afficher/masquer le mot de passe"
                    >
                      {showPwd ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPwd2 ? "text" : "password"}
                      name="confirm"
                      value={form.confirm}
                      onChange={handleChange}
                      placeholder="Retapez le mot de passe"
                      autoComplete="new-password"
                      className="w-full px-3 py-2 pr-10 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd2((s) => !s)}
                      className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                      aria-label="Afficher/masquer la confirmation"
                    >
                      {showPwd2 ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Création du compte..." : "S'inscrire"}
              </button>

              <p className="mt-2 text-sm text-center text-gray-600">
                Déjà un compte ?{" "}
                <Link to="/connexion" className="text-blue-600 hover:underline">
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Register;