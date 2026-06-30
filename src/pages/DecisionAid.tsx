import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Lightbulb, AlertTriangle, ShieldCheck, TrendingUp, Handshake, DollarSign, Target, Zap } from 'lucide-react';
import api from '../api/client';

// Interfaces pour les données de l'API
interface RecommendationItem {
  id: string;
  categorie: 'budget' | 'controle' | 'securite' | 'urgence';
  titre: string;
  severite: 'critique' | 'eleve' | 'modere';
  constat: string;
  analyse_ia: string;
  actions_proposees: string[];
}

interface DecisionSupportResponse {
  taux_anomalie_global: number;
  volume_risque_fcfa: number;
  ministere_plus_critique: string;
  nombre_alertes_urgentes: number;
  synthese_ia: string;
  recommandations: RecommendationItem[];
}

const DecisionAid: React.FC = () => {
  const { data, isLoading, error } = useQuery<DecisionSupportResponse>({
    queryKey: ['decision-aid-conseils'],
    queryFn: async () => (await api.get('/decision/conseils')).data,
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-slate-400 text-sm font-medium animate-pulse">L'IA analyse les données pour éclairer votre décision...</p>
    </div>
  );

  if (error) return (
    <div className="p-8 text-center text-red-500">
      Erreur lors du chargement des conseils de l'IA: {error.message}.
      Assurez-vous que le backend est lancé et qu'il y a des données.
    </div>
  );

  const getSeveriteColor = (severite: string) => {
    switch (severite) {
      case 'critique': return 'bg-red-500 text-white';
      case 'eleve': return 'bg-orange-500 text-white';
      case 'modere': return 'bg-amber-400 text-white';
      default: return 'bg-slate-400 text-white';
    }
  };

  const getCategorieIcon = (categorie: string) => {
    switch (categorie) {
      case 'budget': return <DollarSign className="w-5 h-5" />;
      case 'controle': return <ShieldCheck className="w-5 h-5" />;
      case 'securite': return <Zap className="w-5 h-5" />;
      case 'urgence': return <AlertTriangle className="w-5 h-5" />;
      default: return <Lightbulb className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in pb-10">
      <div className="flex items-center space-x-4">
        <Lightbulb className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-slate-900">Aide à la Décision Stratégique (IA)</h1>
      </div>
      <p className="text-slate-600 text-lg">
        Cette interface fournit au Directeur Général des analyses approfondies et des recommandations proactives générées par l'intelligence artificielle, basées sur l'état actuel des transactions et anomalies.
      </p>

      {data && (
        <div className="space-y-8">
          {/* Synthèse IA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-8 shadow-xl"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Lightbulb className="w-6 h-6 shrink-0" />
              <h2 className="text-xl font-bold">Synthèse de l'IA</h2>
            </div>
            <p className="text-blue-100 leading-relaxed text-lg">
              {data.synthese_ia}
            </p>
          </motion.div>

          {/* KPI clés */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              icon={<AlertTriangle className="w-6 h-6 text-red-500" />}
              title="Taux d'anomalie global"
              value={`${data.taux_anomalie_global}%`}
              description="Pourcentage de transactions considérées comme anomales."
              color="text-red-500"
            />
            <MetricCard 
              icon={<DollarSign className="w-6 h-6 text-green-500" />}
              title="Volume financier à risque"
              value={`${data.volume_risque_fcfa.toLocaleString()} FCFA`}
              description="Somme des montants des transactions anomales."
              color="text-green-500"
            />
            <MetricCard 
              icon={<Handshake className="w-6 h-6 text-orange-500" />}
              title="Ministère le plus critique"
              value={data.ministere_plus_critique}
              description="Ministère avec le plus grand nombre d'anomalies."
              color="text-orange-500"
            />
            <MetricCard 
              icon={<Zap className="w-6 h-6 text-purple-500" />}
              title="Alertes critiques urgentes"
              value={`${data.nombre_alertes_urgentes}`}
              description="Nombre d'anomalies de niveau critique non traitées."
              color="text-purple-500"
            />
          </div>

          {/* Recommandations Détaillées */}
          <h2 className="text-2xl font-bold text-slate-900 mt-10">Recommandations Détaillées</h2>
          <div className="space-y-6">
            {data.recommandations.length > 0 ? (
              data.recommandations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 space-y-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${getSeveriteColor(rec.severite)}`}>
                      {getCategorieIcon(rec.categorie)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{rec.titre}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getSeveriteColor(rec.severite)}`}>
                        {rec.severite}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed"><span className="font-semibold">Constat:</span> {rec.constat}</p>
                  <p className="text-slate-700 leading-relaxed"><span className="font-semibold">Analyse IA:</span> {rec.analyse_ia}</p>
                  <div className="space-y-2 pt-2">
                    <p className="font-semibold text-slate-800">Actions Proposées:</p>
                    <ul className="list-disc pl-5 text-slate-700 space-y-1">
                      {rec.actions_proposees.map((action, i) => (
                        <li key={i}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 italic bg-white rounded-3xl border border-slate-100">
                Aucune recommandation spécifique générée pour le moment. La situation semble stable.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, description, color }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col space-y-3"
  >
    <div className={`p-3 rounded-xl bg-opacity-10 w-fit ${color.replace('text-', 'bg-')}`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900">{value}</h3>
    <p className="text-sm font-medium text-slate-500">{title}</p>
    <p className="text-xs text-slate-400 flex-1">{description}</p>
  </motion.div>
);

export default DecisionAid;
