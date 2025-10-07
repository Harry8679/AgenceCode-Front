// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const API_BASE = process.env.REACT_APP_API_BASE_URL || ""; // proxy CRA ou .env

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
    profile: "", // PARENT | STUDENT | TEACHER
    password: "",
    confirm: "",
  });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const { firstName, lastName, email, profile, password, confirm } = form;
    if (!firstName || !lastName || !email || !password || !confirm || !profile) {
      toast.error("Veuillez remplir tous les champs (profil inclus).");
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

  // dans le composant
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);
  try {
    // 1) Inscription
    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      profile: (form.profile || "").toUpperCase(), // ← important pour l’enum PHP
    };

    const res = await fetch(`${API_BASE}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await res.json()
      : { message: await res.text() };

    // Gestion erreurs back (validation, email déjà pris, etc.)
    if (!res.ok) {
      // si tu renvoies des violations depuis Symfony Validator
      if (data?.violations?.length) {
        data.violations.forEach(v => toast.error(`${v.propertyPath}: ${v.title || v.message}`));
      } else {
        toast.error(data.message || "Erreur lors de l'inscription");
      }
      return;
    }

    // 2) On veut un token + un user pour hydrater le contexte
    if (!data?.token) {
      throw new Error("Réponse serveur invalide (token manquant)");
    }
    const token = data.token;

    // si le back renvoie déjà le user dans la même réponse on l’utilise,
    // sinon on appelle /me
    let user = data.id ? data : null;

    if (!user) {
      try {
        const meRes = await fetch(`${API_BASE}/api/v1/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const me = await meRes.json();
        if (meRes.ok && me?.id) user = me;
      } catch {
        // pas bloquant
      }
    }

    // 3) Stockage + contexte + redirect
    const toStore = user ? { ...user, token } : { token, email: payload.email, profile: payload.profile };
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(toStore));
    authLogin?.(toStore);

    toast.success("Inscription réussie !");
    navigate("/dashboard");
  } catch (err) {
    toast.error(err.message || "Erreur serveur");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-10">
      <ToastContainer />
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Colonne gauche (accroche) */}
        <div className="hidden flex-col justify-center rounded-2xl border border-blue-100 bg-white p-8 shadow-lg md:flex">
          <h1 className="mb-4 text-3xl font-bold text-blue-900">Créez votre compte</h1>
          <p className="text-gray-600 leading-relaxed">
            Accédez à votre espace pour gérer vos cours, suivi et factures. Vos données
            restent sécurisées et accessibles à tout moment.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>• Suivi des progrès</li>
            <li>• Messagerie sécurisée</li>
            <li>• Paiement simple et rapide</li>
          </ul>
        </div>

        {/* Colonne droite (formulaire en 1 colonne) */}
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-blue-700">Inscription</h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Prénom */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Votre prénom"
                autoComplete="given-name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Nom */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Votre nom"
                autoComplete="family-name"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="vous@example.com"
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* Profil */}
            <div>
              <span className="block text-sm font-medium text-gray-700">Je suis</span>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  { value: "PARENT", label: "Parent" },
                  { value: "STUDENT", label: "Élève / Étudiant" },
                  { value: "TEACHER", label: "Professeur" },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm ${
                      form.profile === opt.value
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span>{opt.label}</span>
                    <input
                      type="radio"
                      name="profile"
                      value={opt.value}
                      checked={form.profile === opt.value}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Ce choix nous permet d’adapter votre espace dès la création du compte.
              </p>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Au moins 6 caractères"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                  aria-label="Afficher/masquer le mot de passe"
                >
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Confirmation */}
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div className="relative mt-1">
                <input
                  id="confirm"
                  name="confirm"
                  type={showPwd2 ? "text" : "password"}
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Retapez le mot de passe"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd2((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                  aria-label="Afficher/masquer la confirmation"
                >
                  {showPwd2 ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Création du compte..." : "S'inscrire"}
            </button>

            <p className="text-center text-sm text-gray-600">
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