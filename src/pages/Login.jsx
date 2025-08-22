// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const API_BASE = process.env.REACT_APP_API_BASE_URL || ""; // proxy CRA ou .env

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const { email, password } = form;
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs.");
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
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { message: await res.text() };

      if (!res.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      // data attendu: { token, user: { ... } } (ou directement { token, ...profil })
      if (!data?.token) {
        throw new Error("Réponse serveur invalide (token manquant).");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user ?? data));
      authLogin?.(data);

      toast.success("Connexion réussie !");
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
        {/* Colonne gauche (accroche) */}
        <div className="flex-col justify-center hidden p-8 bg-white border border-blue-100 shadow-lg md:flex rounded-2xl">
          <h1 className="mb-4 text-3xl font-bold text-blue-900">Ravi de vous revoir 👋</h1>
          <p className="leading-relaxed text-gray-600">
            Accédez à votre espace pour gérer vos cours, vos paiements et vos messages.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>• Suivi en temps réel</li>
            <li>• Historique complet</li>
            <li>• Sécurité renforcée</li>
          </ul>
        </div>

        {/* Colonne droite (formulaire en 1 colonne) */}
        <div className="p-8 bg-white border border-gray-100 shadow-lg rounded-2xl">
          <h2 className="mb-6 text-2xl font-bold text-center text-blue-700">Connexion</h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
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
                  placeholder="Votre mot de passe"
                  autoComplete="current-password"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute text-sm text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                  aria-label="Afficher/masquer le mot de passe"
                >
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                Se souvenir de moi
              </label>
              <button
                type="button"
                onClick={() => toast.info("Lien de réinitialisation à implémenter")}
                className="text-sm text-blue-600 hover:underline"
              >
                Mot de passe oublié ?
              </button>
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Pas de compte ?{" "}
              <Link to="/inscription" className="text-blue-600 hover:underline">
                Créer un compte
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;