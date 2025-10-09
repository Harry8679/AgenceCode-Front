import React, { useRef } from "react";

const items = [
  { id: 1, title: "DM n°3 – Suites numériques", type: "PDF",   size: "320 Ko", updated: "03/10" },
  { id: 2, title: "Cours – Énergie (Physique)",  type: "DOCX",  size: "1,2 Mo", updated: "30/09" },
  { id: 3, title: "Exercices – Probabilités",    type: "PDF",   size: "540 Ko", updated: "28/09" },
];

const Tag = ({ children }) => (
  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
    {children}
  </span>
);

const ResourceCard = ({ r }) => (
  <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
    <div>
      <p className="font-medium text-gray-900">{r.title}</p>
      <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
        <Tag>{r.type}</Tag>
        <span>•</span>
        <span>{r.size}</span>
        <span>•</span>
        <span>MAJ {r.updated}</span>
      </div>
    </div>
    <div className="flex gap-2">
      <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50">
        Télécharger
      </button>
      <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700">
        Partager
      </button>
    </div>
  </div>
);

const Resources = () => {
  const inputRef = useRef(null);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ressources</h1>
          <p className="text-gray-600">Centralisez vos cours, DM et supports pédagogiques.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={() => {
              // ici tu pourras gérer l'upload
            }}
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-700"
          >
            + Importer un fichier
          </button>
        </div>
      </header>

      <div className="grid gap-3">
        {items.map((r) => (
          <ResourceCard key={r.id} r={r} />
        ))}
      </div>
    </div>
  );
};

export default Resources;