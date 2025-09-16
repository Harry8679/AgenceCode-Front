// src/components/PromoDoubleCard.jsx
import { Link } from "react-router-dom";
import placeholder from "../assets/images/students.jpg"; // image de secours

export default function PromoDoubleCard({ leftImg, rightImg }) {
  const left = leftImg || placeholder;
  const right = rightImg || placeholder;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* ---- Carte gauche ---- */}
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-50 to-white shadow-xl">
          {/* Badge % */}
          <div className="pointer-events-none absolute left-6 top-6 z-10 grid h-10 w-10 place-items-center rounded-full bg-indigo-600 text-white shadow-lg">
            %
          </div>

          <div className="flex items-stretch">
            {/* Image à gauche */}
            <div className="relative hidden w-48 shrink-0 overflow-hidden sm:block md:w-56 lg:w-64">
              <img src={left} alt="" className="h-full w-full object-cover" />
            </div>

            {/* Texte */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10">
              <h3 className="text-2xl font-extrabold leading-snug text-[#3F46F1] sm:text-3xl">
                Ne payez que 50% du prix des cours avec
                <br className="hidden sm:block" />
                l’avance immédiate de crédit d’impôt
              </h3>
              <p className="mt-3 text-slate-600">
                Plus d’avance à réaliser, votre budget est allégé.
                C’est simple et rapide, nous nous occupons de tout.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/5" />
        </div>

        {/* ---- Carte droite ---- */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#FFD335] shadow-xl">
          <div className="relative z-10 p-8 pr-8 sm:p-10 lg:p-12 lg:pr-[320px]">
            <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Découvrir la solution
            </h3>
            <p className="mt-2 text-[17px] text-black/80">
              qui correspond aux besoins de votre enfant
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/agences"
                className="inline-flex items-center justify-center rounded-full border-2 border-black px-6 py-3 text-[15px] font-semibold text-black hover:bg-black/5"
              >
                Trouver mon agence
              </Link>
              <Link
                to="/tarifs"
                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-[15px] font-semibold text-white hover:bg-sky-600"
              >
                Obtenir mon tarif
              </Link>
            </div>
          </div>

          {/* Image à droite en overlay (idéalement PNG détouré) */}
          <img
            src={right}
            alt=""
            className="pointer-events-none absolute -bottom-2 -right-2 hidden h-[115%] max-w-none object-contain md:block"
          />

          <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/5" />
        </div>
      </div>
    </section>
  );
}