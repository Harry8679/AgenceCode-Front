import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='min-h-screen'>
        {/* ========== HERO ========== */}
        <section className='relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-emerald-50'>
            <div aria-hidden className='pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl'></div>
            <div aria-hidden className='pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl'></div>

            <div className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24'>
                <div>
                    <h1 className='text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl'>
                        Le soutien scolaire, <span className='text-indigo-600'>simple</span> et {" "}
                        <span className='text-emerald-600'>efficace</span>
                    </h1>
                    <p className='mt-4 text-lg text-slate-600'>
                        Trouver des professeurs de confiance en Maths, Physique, Chimie et Informatique.
                        Réservez en quelques clics, en ligne ou à domicile.
                    </p>

                    <div className='mt-8 flex flex-wrap gap-3'>
                        <Link to='/inscription' className='rounded-xl bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700'>Créer un compte</Link>
                        <Link to='/connexion' className='rounded-xl border border-slate-200 bg-white px-5 py-3 text-slate-800 hover:bg-slate-50'>Se connecter</Link>
                    </div>

                    <ul className='mt-6 grid gap-2 text-slate-700'>
                        <li>* Profs vérifiés et évalués</li>
                        <li>* Paiement sécurisé, annulation flexible</li>
                        <li>* Suivi des progrès de l'élève</li>
                    </ul>
                </div>

                <div className='overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl'>
                    <img src='https://images.unsplash.com/photo-1596495578065-8e9e96e0b3cf?q=80&w=1280&auto=format&fit=crop' alt='Elève suivant un cours en ligne' className='aspect-video w-full object-cover' />
                </div>
            </div>
        </section>
    </div>
  )
}
export default Home;