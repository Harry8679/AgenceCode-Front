// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // form état
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [phone,     setPhone]     = useState("");

  // password état
  const [curPwd, setCurPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const me = await apiFetch("/api/v1/me");
      setUser(me);
      setFirstName(me.firstName || "");
      setLastName(me.lastName || "");
      setPhone(me.phone || "");
    } catch (e) {
      setErr(e.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await apiFetch("/api/v1/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/merge-patch+json" },
        body: JSON.stringify({ firstName, lastName, phone }),
      });
      await load();
    } catch (e) {
      setErr(e.message || "Échec de la mise à jour");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setPwdMsg("");
    try {
      await apiFetch("/api/v1/me/password", {
        method: "POST",
        body: JSON.stringify({ currentPassword: curPwd, newPassword: newPwd }),
      });
      setPwdMsg("Mot de passe mis à jour ✅");
      setCurPwd(""); setNewPwd("");
    } catch (e) {
      setPwdMsg(e.message || "Échec du changement de mot de passe");
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Mon profil</h1>

      {loading ? (
        <div className="p-4 bg-white border rounded-xl">Chargement…</div>
      ) : err ? (
        <div className="p-4 text-red-700 border border-red-200 bg-red-50 rounded-xl">{err}</div>
      ) : (
        <>
          {/* Carte infos */}
          <div className="p-5 bg-white border rounded-xl">
            <div className="mb-4">
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium">{user.email}</div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div>
                <div className="text-sm text-gray-500">Prénom</div>
                <div className="font-medium">{user.firstName || "—"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Nom</div>
                <div className="font-medium">{user.lastName || "—"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Téléphone</div>
                <div className="font-medium">{user.phone || "—"}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Profil</div>
                <div className="font-medium">{user.profile || (user.roles?.[0])}</div>
              </div>
            </div>
          </div>

          {/* Form profil */}
          <form onSubmit={saveProfile} className="p-5 space-y-4 bg-white border rounded-xl">
            <h2 className="text-lg font-semibold">Modifier mes informations</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm">Prénom</label>
                <input className="w-full px-3 py-2 mt-1 border rounded-lg"
                  value={firstName} onChange={e=>setFirstName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm">Nom</label>
                <input className="w-full px-3 py-2 mt-1 border rounded-lg"
                  value={lastName} onChange={e=>setLastName(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm">Téléphone</label>
                <input className="w-full px-3 py-2 mt-1 border rounded-lg"
                  value={phone} onChange={e=>setPhone(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg">
                Enregistrer
              </button>
            </div>
          </form>

          {/* Form mot de passe */}
          <form onSubmit={changePassword} className="p-5 space-y-4 bg-white border rounded-xl">
            <h2 className="text-lg font-semibold">Changer mon mot de passe</h2>
            {pwdMsg && <div className="p-2 text-sm border rounded bg-gray-50">{pwdMsg}</div>}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm">Mot de passe actuel</label>
                <input type="password" className="w-full px-3 py-2 mt-1 border rounded-lg"
                  value={curPwd} onChange={e=>setCurPwd(e.target.value)} required />
              </div>
              <div>
                <label className="text-sm">Nouveau mot de passe</label>
                <input type="password" className="w-full px-3 py-2 mt-1 border rounded-lg"
                  value={newPwd} onChange={e=>setNewPwd(e.target.value)} required />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg">
                Mettre à jour
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}