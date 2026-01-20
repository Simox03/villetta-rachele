/**
 * @file components/admin/AdminSettings.tsx
 * @purpose The admin panel for managing general site settings, like toggling the quiz section.
 */
import React from 'react';

interface AdminSettingsProps {
    isQuizEnabled: boolean;
    updateSiteData: (key: string, value: any) => Promise<void>;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ isQuizEnabled, updateSiteData }) => (
     <div>
        <h3 className="text-2xl font-bold mb-4">Impostazioni Generali</h3>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-slate-800">Sezione Quiz</h4>
                    <p className="text-sm text-slate-500">Mostra o nascondi la sezione del quiz sulla pagina principale.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={isQuizEnabled} onChange={() => updateSiteData('isQuizEnabled', !isQuizEnabled)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  <span className="ml-3 text-sm font-medium text-slate-900">{isQuizEnabled ? 'Attivo' : 'Disattivato'}</span>
                </label>
            </div>
        </div>
    </div>
);

export default AdminSettings;