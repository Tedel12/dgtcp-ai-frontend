import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, BrainCircuit, BarChart3, Database, FileText, Bell, Lock, Users, Server, Layers } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="bg-[#0a192f] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-wider flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full">
              <img src="logo.png" alt="" />
            </div> {/* Placeholder Logo */}
            DGTCP - EXPERT
          </div>
          <div className="space-x-6 text-sm font-medium">
            {['Accueil', 'Missions', 'Architecture', 'Sécurité', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-blue-300 transition">{link}</a>
            ))}
            <button 
              onClick={() => navigate('/auth')}
              className="bg-white text-[#0a192f] px-5 py-2 rounded font-semibold hover:bg-blue-100 transition"
            >
              Se connecter
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="text-blue-800 font-bold tracking-widest uppercase text-sm">Outil d'aide à la décision</span>
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
              Détecter aujourd’hui, <br />
              <span className="text-green-600">décider en confiance demain.</span>
            </h1>
            <p className="text-lg text-gray-600">
              DGTCP est une plateforme intelligente conçue pour détecter automatiquement les anomalies financières, prévenir les fraudes et fournir aux décideurs des indicateurs fiables pour une gestion optimale des finances publiques.
            </p>
            <div className="flex gap-4">
              <button onClick={() => navigate('/dashboard')} className="bg-blue-800 text-white px-6 py-3 rounded font-semibold hover:bg-blue-900 transition shadow-lg">
                Accéder au tableau de bord
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
                Voir la démo
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center"
          >
            {/* Undraw Illustration */}
            <img 
              src="undraw_all-the-data_ijgn.png" 
                alt="Illustration de gestion de données" 
                className="max-w-full h-auto"
            />
          </motion.div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="fonctionnalités" className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Une plateforme complète au service de la performance publique</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Database, title: "Collecte intelligente", text: "Intégration automatique des données financières provenant des systèmes internes (SIGFIP, ASTER, BCEAO) et partenaires." },
            { icon: BrainCircuit, title: "Détection d'anomalies", text: "Algorithmes d'IA avancés (Machine Learning, Isolation Forest) pour identifier les comportements inhabituels et les transactions suspectes." },
            { icon: BarChart3, title: "Aide à la décision", text: "Tableaux de bord dynamiques et indicateurs clés pour appuyer les décisions stratégiques et prédictives." },
            { icon: Bell, title: "Alertes en temps réel", text: "Notifications instantanées et automatisées en cas de risque élevé ou d'anomalie détectée." },
            { icon: Lock, title: "Sécurité renforcée", text: "Protection stricte des données, contrôle des accès (MFA, RBAC) et conformité aux normes internationales (ISO 27001)." },
            { icon: FileText, title: "Rapports & Analyses", text: "Génération automatique de rapports personnalisés, traçabilité des décisions et analyses prédictives." },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition">
              <div className="bg-green-100 text-green-700 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Architecture Deep Dive */}
      <section id="architecture" className="bg-gray-100 py-20">
        <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Architecture Technique à 5 Couches</h2>
            <div className="grid md:grid-cols-5 gap-4">
                {[
                    { title: "1. Acquisition", icon: Server },
                    { title: "2. Prétraitement", icon: Layers },
                    { title: "3. Détection", icon: BrainCircuit },
                    { title: "4. Aide décision", icon: BarChart3 },
                    { title: "5. Gouvernance", icon: Lock },
                ].map((layer, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm text-center">
                        <layer.icon className="mx-auto mb-3 text-blue-800" />
                        <h4 className="font-semibold text-sm">{layer.title}</h4>
                    </div>
                ))}
            </div>
            <p className="mt-8 text-center text-gray-700 max-w-2xl mx-auto">
                Le modèle DGTCP repose sur une architecture informatique intelligente visant à transformer le système actuel essentiellement réactif en un système prédictif et proactif, garantissant transparence et responsabilité.
            </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-600" />
            <span>Conforme aux normes ISO 27001, RGPD, SYSCOHADA</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="text-green-600" />
            <span>Utilisé par les comptables, auditeurs et décideurs</span>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="text-green-600" />
            <span>Données sécurisées et hébergées localement</span>
          </div>
        </div>
        <div className="text-center mt-8 text-xs text-gray-500">
            © 2026 - Direction Générale du Trésor et de la Comptabilité Publique - DGTCP
        </div>
      </footer>
    </div>
  );
};

export default Home;
