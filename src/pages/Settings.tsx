import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Save, ShieldCheck, QrCode } from 'lucide-react';
import api from '../api/client';

const Settings: React.FC = () => {
  const [passwords, setPasswords] = useState({ old: '', new: '' });
  const [mfaData, setMfaData] = useState<{ qr_code: string; secret: string } | null>(null);
  const [mfaCode, setMfaCode] = useState('');
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const setupMfaMutation = useMutation({
    mutationFn: () => api.post('/mfa/setup'),
    onSuccess: (res) => setMfaData(res.data)
  });

  const verifyMfaMutation = useMutation({
    mutationFn: (code: string) => api.post('/mfa/verify', null, { params: { code } }),
    onSuccess: () => {
        setMessage({ text: 'MFA activé !', type: 'success' });
        setMfaData(null);
    }
  });

  // ... (Garder le reste du code pour le changement de mot de passe)
  // ... (Ajouter dans le JSX la section MFA)
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* ... (Section mot de passe existante) ... */}
      
      {/* Section MFA */}
      <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><ShieldCheck className="w-6 h-6" /></div>
            <div>
                <h3 className="font-bold text-slate-900">Authentification à deux facteurs (MFA)</h3>
                <p className="text-sm text-slate-500">Sécurisez votre compte avec TOTP</p>
            </div>
        </div>
        {!mfaData ? (
            <button onClick={() => setupMfaMutation.mutate()} className="bg-purple-600 text-white rounded-xl py-3 px-6 text-sm font-bold">Activer MFA</button>
        ) : (
            <div className="space-y-4">
                <img src={mfaData.qr_code} alt="QR Code" className="w-48 h-48 mx-auto" />
                <input type="text" placeholder="Code TOTP" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm" value={mfaCode} onChange={(e) => setMfaCode(e.target.value)} />
                <button onClick={() => verifyMfaMutation.mutate(mfaCode)} className="bg-emerald-600 text-white rounded-xl py-3 px-6 text-sm font-bold">Vérifier</button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
