import { Link } from "react-router-dom";
import imgStudent from '../assets/images/students.jpg';

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
                    <img src={imgStudent} alt='Elève suivant un cours en ligne' className='aspect-video w-full object-cover' />
                </div>
            </div>
        </section>

        {/* ========== MATIERES ========== */}
        <section className='mx-auto max-w-7xl px-4 py-14'>
            <h2 className='text-2xl font-bold text-slate-900'>Matières enseignées</h2>
            <p className='mt-1 text-slate-600'>Choisissez une matière et lancez-vous.</p>

            <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {[
                    { title: 'Maths', desc: 'Du primaire au supérieur', emoji: "📐" },
                    { title: 'Physique', desc: 'Mécanique, optique ...', emoji: "⚛️" },
                    { title: 'Chimie', desc: 'Du primaire au supérieur', emoji: "🧪" },
                    { title: 'Informatique', desc: 'Du primaire au supérieur', emoji: "🖥" },
                ].map((s) => (
                    <div key={s.title} className='rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md transition'>
                        <div className='text-3xl'>{s.emoji}</div>
                        <h3 className='mt-3 text-lg font-semibold text-slate-600'>{s.title}</h3>
                        <p className='text-sm text-slate-600'>{s.desc}</p>
                        <Link to='/inscription' className='mt-4 inline-block rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800'>
                            Trouvez un professeur
                        </Link>
                    </div>
                ))}
            </div>
        </section>

        {/* ========== COMMENT ÇA MARCHE ========== */}
        <section className="bg-white">
            <div className='mx-auto max-w-7xl px-4 py-14'>
                <h2 className='text-2xl font-bold text-slate-900'>Comment ça marche ?</h2>
                <p className='mt-1 text-slate-600'>3 étapes rapides pour démarrer.</p>

                <div className='mt-8 grid gap-6 md:grid-cols-3'>
                    {[
                        {
                            step: '1',
                            title: 'Recherchez',
                            text: 'Filtrer par matière, niveau, prix et disponibilité.'
                        },
                        {
                            step: '2',
                            title: 'Réservez',
                            text: 'Choisissez un créneau et payer en toute sécurité.'
                        },
                        {
                            step: '3',
                            title: 'Progressez',
                            text: 'Cours en visio ou à domicile + suivi des progrès.'
                        },
                    ].map((card) => (
                        <div key={card.step} className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
                            <div className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white'>
                                {card.step}
                            </div>
                            <h3 className='mt-4 text-lg font-semibold text-slate-900'>{card.title}</h3>
                            <p className='text-slate-600'>{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ========== TÉMOGNAGES ========== */}
        <section className='mx-auto max-w-7xl px-4 py-14'>
            <h2 className='text-2xl font-bold text-slate-900'>Ils nous recommandent</h2>
            <p className='mt-1 text-slate-600'>Parents et élèves satisfaits.</p>

            <div className='mt-6 grid gap-6 md:grid-cols-3'>
                {[
                    {
                        quote: 'Super expérience ! Ma fille a repris confiance en maths en 1 mois.',
                        name: 'Sophie, Paris'
                    },
                    {
                        quote: 'Prof pédagogue et disponible. Les progrès sont visbles rapidement.',
                        name: 'Rachid, Paris'
                    },
                    {
                        quote: 'Plateforme simple et efficace. J\'ai trouvé un super prof d\'info.',
                        name: 'Camille, Lille'
                    },
                ].map((t) => (
                    <figure key={t.name} className='rounded-2xl border border-slate-100 bg-white p-6 shadow-sm'>
                        <blockquote className='text-slate-800'>"{t.quote}"</blockquote>
                        <figcaption className='mt-3 text-sm text-slate-500'>- {t.name}</figcaption>
                    </figure>
                ))}
            </div>
        </section>

        {/* ========== BANDEAU CTA ========== */}
        <section className='px-4 pb-16'>
            <div className='mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-tr from-indigo-600 to-emerald-500 p-8 text-white shadow-xl md:p-12'>
                <h3 className='text-2xl font-bold'>Prêt à commencer ?</h3>
                <p className='mt-2 text-indigo-50'>
                    Créer votre compte et réservez votre premier cours aujourd'hui.
                </p>
                <div className='mt-6 flex flex-wrap gap-3'>
                    <Link to='/inscription' className='rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-sky-100'>
                        Créer un compte
                    </Link>
                    <Link to='/connexion' className='rounded-xl border border-white/40 px-5 py-3 font-semibold text-white hover:bg-white/10'>
                        Se connecter
                    </Link>
                </div>
            </div>
        </section>
    </div>
  )
}
export default Home;