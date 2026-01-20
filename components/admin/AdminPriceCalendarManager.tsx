/**
 * @file components/admin/AdminPriceCalendarManager.tsx
 * @purpose The admin panel for setting custom prices and blocking dates on the availability calendar.
 */
import React, { useState, useEffect } from 'react';
import Calendar from '../shared/Calendar';

interface AdminPriceCalendarManagerProps {
    dateInfo: { [key: string]: { occupied?: boolean, price?: number } };
    highSeasonRate: number;
    lowSeasonRate: number;
    updateSiteData: (key: string, value: any) => Promise<void>;
}

const formatDateToKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const AdminPriceCalendarManager: React.FC<AdminPriceCalendarManagerProps> = ({ dateInfo, highSeasonRate, lowSeasonRate, updateSiteData }) => {
    const [modalDate, setModalDate] = useState<Date | null>(null);
    const [customPrice, setCustomPrice] = useState('');
    const [isOccupied, setIsOccupied] = useState(false);
    
    // Local state for debouncing rate updates
    const [localHighRate, setLocalHighRate] = useState(highSeasonRate);
    const [localLowRate, setLocalLowRate] = useState(lowSeasonRate);

    useEffect(() => {
        if (modalDate) {
            const key = formatDateToKey(modalDate);
            const currentInfo = dateInfo[key];
            setCustomPrice(currentInfo?.price?.toString() || '');
            setIsOccupied(currentInfo?.occupied || false);
        }
    }, [modalDate, dateInfo]);
    
    useEffect(() => {
        setLocalHighRate(highSeasonRate);
    }, [highSeasonRate]);

    useEffect(() => {
        setLocalLowRate(lowSeasonRate);
    }, [lowSeasonRate]);
    
    // Debounce effect for saving rates
    useEffect(() => {
        const handler = setTimeout(() => {
            if (localHighRate !== highSeasonRate) {
                updateSiteData('highSeasonRate', localHighRate);
            }
        }, 1000); // 1-second debounce
        return () => clearTimeout(handler);
    }, [localHighRate, highSeasonRate, updateSiteData]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (localLowRate !== lowSeasonRate) {
                updateSiteData('lowSeasonRate', localLowRate);
            }
        }, 1000); // 1-second debounce
        return () => clearTimeout(handler);
    }, [localLowRate, lowSeasonRate, updateSiteData]);


    const handleDateClick = (date: Date) => {
        setModalDate(date);
    };

    const handleSaveDate = async () => {
        if (!modalDate) return;
        const key = formatDateToKey(modalDate);
        const newInfo = { ...dateInfo };

        const price = customPrice ? Number(customPrice) : undefined;
        
        if (!isOccupied && !price) {
            delete newInfo[key];
        } else {
            newInfo[key] = { occupied: isOccupied, price };
        }
        await updateSiteData('dateInfo', newInfo);
        setModalDate(null);
    };

    const handleClearAll = async () => {
        if (window.confirm('Sei sicuro di voler cancellare tutte le date occupate e i prezzi personalizzati?')) {
            await updateSiteData('dateInfo', {});
        }
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-4">Gestione Calendario e Prezzi</h3>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
                <h4 className="text-xl font-semibold mb-3">Prezzi di Default</h4>
                <p className="text-slate-600 mb-4 text-sm">Questi prezzi vengono usati se non imposti un prezzo personalizzato per una data specifica. Le modifiche vengono salvate automaticamente dopo 1 secondo.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="high-season-rate" className="block text-slate-700 font-semibold mb-1">Alta Stagione (€/notte)</label>
                        <input type="number" id="high-season-rate" value={localHighRate} onChange={e => setLocalHighRate(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="low-season-rate" className="block text-slate-700 font-semibold mb-1">Bassa Stagione (€/notte)</label>
                        <input type="number" id="low-season-rate" value={localLowRate} onChange={e => setLocalLowRate(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                    </div>
                </div>
            </div>

            <div>
                 <h4 className="text-xl font-semibold mb-3">Calendario Interattivo</h4>
                <p className="text-slate-600 mb-4 text-sm">Clicca su una data per impostare un prezzo personalizzato o marcarla come occupata.</p>
                <Calendar dateInfo={dateInfo} onDateClick={handleDateClick} isAdmin={true} />
                <button onClick={handleClearAll} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                    Resetta Calendario
                </button>
            </div>
            {modalDate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={() => setModalDate(null)}>
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">Modifica Data: {modalDate.toLocaleDateString('it-IT')}</h4>
                        <div className="mb-4">
                             <label htmlFor="custom-price" className="block text-slate-700 font-semibold mb-2">Prezzo Personalizzato (€)</label>
                             <input id="custom-price" type="number" value={customPrice} onChange={e => setCustomPrice(e.target.value)} placeholder="Default stagionale" className="w-full px-3 py-2 border border-slate-300 rounded-md" />
                        </div>
                        <div className="mb-6">
                            <label className="flex items-center">
                                <input type="checkbox" checked={isOccupied} onChange={e => setIsOccupied(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"/>
                                <span className="ml-2 text-slate-700">Marca come Occupato</span>
                            </label>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button onClick={() => setModalDate(null)} className="px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300">Annulla</button>
                            <button onClick={handleSaveDate} className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">Salva</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPriceCalendarManager;