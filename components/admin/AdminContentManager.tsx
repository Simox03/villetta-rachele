
/**
 * @file components/admin/AdminContentManager.tsx
 * @purpose The admin panel for editing all textual content across the website (CMS functionality).
 */
import React, { useState, useEffect } from 'react';
import { INITIAL_SITE_CONTENT } from '../../data/siteContent';

interface AdminContentManagerProps {
    siteContent: typeof INITIAL_SITE_CONTENT;
    updateSiteData: (key: string, value: any) => Promise<void>;
}

const AdminContentManager: React.FC<AdminContentManagerProps> = ({ siteContent, updateSiteData }) => {

    const [localContent, setLocalContent] = useState(siteContent);
    const [isDirty, setIsDirty] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [openAccordion, setOpenAccordion] = useState<string | null>('hero');

    useEffect(() => {
        setIsDirty(JSON.stringify(localContent) !== JSON.stringify(siteContent));
    }, [localContent, siteContent]);
    
    useEffect(() => {
        // When the parent siteContent changes (e.g. from a data reload), update local state
        setLocalContent(siteContent);
    }, [siteContent]);

    const handleContentChange = (section: keyof typeof INITIAL_SITE_CONTENT, field: string, value: any) => {
        setLocalContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };
    
    const handleNestedChange = (section: 'property' | 'services', listName: 'infoCards' | 'serviceList', index: number, field: 'title' | 'description', value: string) => {
        setLocalContent(prev => {
            const list = [...prev[section][listName]];
            // @ts-ignore
            list[index] = { ...list[index], [field]: value };
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [listName]: list
                }
            };
        });
    };
    
    const handleSaveChanges = async () => {
        setIsSaving(true);
        await updateSiteData('siteContent', localContent);
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const handleResetChanges = () => {
        if (window.confirm("Sei sicuro di voler annullare tutte le modifiche non salvate?")) {
            setLocalContent(siteContent);
        }
    };

    const inputClasses = "w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500";
    const textareaClasses = `${inputClasses} min-h-[80px]`;

    const renderField = (label: string, section: keyof typeof INITIAL_SITE_CONTENT, field: string, type: 'input' | 'textarea' = 'input', helperText?: string) => (
        <div className="mb-4">
            <label className="block text-slate-700 font-semibold mb-1">{label}</label>
            {type === 'input' ? (
                 <input 
                    type="text" 
                    value={(localContent[section] as any)[field] ?? ''} 
                    onChange={e => handleContentChange(section, field, e.target.value)} 
                    className={inputClasses} 
                 />
            ) : (
                 <textarea 
                    value={(localContent[section] as any)[field] ?? ''} 
                    onChange={e => handleContentChange(section, field, e.target.value)} 
                    className={textareaClasses} 
                />
            )}
            {helperText && <p className="text-xs text-slate-500 mt-1">{helperText}</p>}
        </div>
    );
    
    const AccordionItem: React.FC<{ title: string; id: string; children: React.ReactNode }> = ({ title, id, children }) => (
        <div className="border-b border-slate-200">
            <button 
                onClick={() => setOpenAccordion(openAccordion === id ? null : id)} 
                className="w-full flex justify-between items-center text-left py-4 px-2 font-semibold text-lg text-slate-800 hover:bg-slate-50 transition-colors"
            >
                <span>{title}</span>
                <svg className={`w-5 h-5 transform transition-transform duration-300 ${openAccordion === id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {openAccordion === id && <div className="p-4 bg-slate-50 border-t border-slate-200">{children}</div>}
        </div>
    );

    return (
        <div>
            <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                <h3 className="text-2xl font-bold">Gestione Contenuti Sito</h3>
                <div className="flex items-center gap-3">
                    {saveSuccess && <span className="text-green-600 font-semibold transition-opacity duration-300">Salvato!</span>}
                    <button 
                        onClick={handleResetChanges} 
                        disabled={!isDirty || isSaving} 
                        className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Annulla
                    </button>
                    <button 
                        onClick={handleSaveChanges} 
                        disabled={!isDirty || isSaving} 
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? 'Salvataggio...' : 'Salva Modifiche'}
                    </button>
                </div>
            </div>
            <p className="text-slate-600 mb-6 text-sm">Modifica i testi del sito. Ricorda di cliccare su "Salva Modifiche" per applicare i cambiamenti.</p>

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <AccordionItem title="Sezione Principale (Hero)" id="hero">
                    {renderField("Titolo Principale", "hero", "title")}
                    {renderField("Sottotitolo", "hero", "subtitle", "textarea")}
                    {renderField("Testo Bottone Disponibilità", "hero", "cta1")}
                    {renderField("Testo Bottone Contatti", "hero", "cta2")}
                    {renderField("Testo Link Booking.com", "hero", "bookingLinkText")}
                    {renderField("URL Link Booking.com", "hero", "bookingLinkUrl")}
                    {renderField("Testo Link Airbnb", "hero", "airbnbLinkText")}
                    {renderField("URL Link Airbnb", "hero", "airbnbLinkUrl")}
                </AccordionItem>

                <AccordionItem title="Sezione 'La Proprietà'" id="property">
                     {renderField("Titolo Sezione", "property", "title")}
                     {renderField("Descrizione Sezione", "property", "description", "textarea")}
                     <h4 className="font-semibold text-slate-800 mt-6 mb-2">Card Informative</h4>
                     <div className="space-y-4">
                     {localContent.property.infoCards.map((card, index) => (
                        <div key={card.id} className="p-3 border border-slate-300 rounded-md bg-white">
                            <label className="block font-semibold text-sm mb-1 text-slate-600">Card {index+1} Titolo</label>
                            <input 
                                type="text" 
                                value={card.title} 
                                onChange={e => handleNestedChange("property", "infoCards", index, "title", e.target.value)} 
                                className={`${inputClasses} mb-2`}
                            />
                            <label className="block font-semibold text-sm mb-1 text-slate-600">Card {index+1} Descrizione</label>
                            <input 
                                type="text" 
                                value={card.description} 
                                onChange={e => handleNestedChange("property", "infoCards", index, "description", e.target.value)} 
                                className={inputClasses}
                            />
                        </div>
                     ))}
                     </div>
                </AccordionItem>
                
                <AccordionItem title="Sezione Video Tour" id="video">
                    {renderField("Titolo Sezione", "video", "title")}
                    {renderField("Descrizione Sezione", "video", "description", "textarea")}
                    {renderField("URL Video", "video", "videoUrl", "input", "Incolla qui il link di condivisione di YouTube (es: https://www.youtube.com/watch?v=...) o Google Drive.")}
                    {renderField("URL Immagine di Anteprima", "video", "thumbnailSrc", "input", "Inserisci il percorso di un'immagine da usare come anteprima (es: /images/veranda/veranda_01.jpg). Puoi usare immagini già presenti nel sito.")}
                </AccordionItem>

                <AccordionItem title="Sezioni Testuali" id="text-sections">
                    {renderField("Titolo Sezione Disponibilità", "availability", "title")}
                    {renderField("Descrizione Sezione Disponibilità", "availability", "description", "textarea")}
                    <hr className="my-6 border-slate-200"/>
                    {renderField("Titolo Sezione Galleria", "gallery", "title")}
                    {renderField("Descrizione Sezione Galleria", "gallery", "description", "textarea")}
                    <hr className="my-6 border-slate-200"/>
                    {renderField("Titolo Sezione Recensioni", "reviews", "title")}
                    {renderField("Descrizione Sezione Recensioni", "reviews", "description", "textarea")}
                    {renderField("Titolo Form Recensioni", "reviews", "formTitle")}
                    {renderField("Descrizione Form Recensioni", "reviews", "formDescription", "textarea")}
                    <hr className="my-6 border-slate-200"/>
                    {renderField("Titolo Sezione Posizione", "location", "title")}
                    {renderField("Descrizione Sezione Posizione", "location", "description", "textarea")}
                    {renderField("Titolo 'Luoghi Vicini'", "location", "nearbyTitle")}
                    {renderField("Testo Bottone Mappa", "location", "mapButtonText")}
                    {renderField("URL Google Maps (Esterno)", "location", "mapUrl")}
                    {renderField("URL Embed Google Maps (Mappa interattiva)", "location", "mapEmbedUrl", "textarea", "Copia solo l'attributo 'src' dall'iframe di Google Maps (es: https://www.google.com/maps/embed?...)")}
                    <hr className="my-6 border-slate-200"/>
                    {renderField("Titolo Sezione FAQ", "faq", "title")}
                    {renderField("Descrizione Sezione FAQ", "faq", "description", "textarea")}
                    {renderField("Titolo Form FAQ", "faq", "formTitle")}
                    {renderField("Descrizione Form FAQ", "faq", "formDescription", "textarea")}
                     <hr className="my-6 border-slate-200"/>
                    {renderField("Titolo Sezione Contatti", "contact", "title")}
                    {renderField("Descrizione Sezione Contatti", "contact", "description", "textarea")}
                 </AccordionItem>
                 
                <AccordionItem title="Sezione 'Servizi & Comfort'" id="services">
                     {renderField("Titolo Sezione", "services", "title")}
                     {renderField("Descrizione Sezione", "services", "description", "textarea")}
                     <h4 className="font-semibold text-slate-800 mt-6 mb-2">Lista Servizi</h4>
                     <div className="space-y-4">
                      {localContent.services.serviceList.map((service, index) => (
                        <div key={service.id} className="p-3 border border-slate-300 rounded-md bg-white">
                            <label className="block font-semibold text-sm mb-1 text-slate-600">Servizio {index+1} Titolo</label>
                            <input 
                                type="text" 
                                value={service.title} 
                                onChange={e => handleNestedChange("services", "serviceList", index, "title", e.target.value)} 
                                className={inputClasses}
                            />
                        </div>
                     ))}
                     </div>
                </AccordionItem>

                 <AccordionItem title="Info Contatto & Footer" id="contact-footer">
                    <h4 className="font-semibold text-slate-800 mb-2">Info di Contatto Principali</h4>
                     {renderField("Email", "contact", "email")}
                     {renderField("Telefono", "contact", "phone")}
                     {renderField("Indirizzo", "contact", "address")}
                    <hr className="my-6 border-slate-200"/>
                    <h4 className="font-semibold text-slate-800 mt-6 mb-2">Footer</h4>
                     {renderField("Nome Brand (Footer)", "footer", "brandName")}
                     {renderField("Slogan Brand (Footer)", "footer", "brandSlogan")}
                     {renderField("URL Facebook", "footer", "facebookUrl")}
                     {renderField("URL Instagram", "footer", "instagramUrl")}
                     {renderField("Testo Copyright", "footer", "copyright")}
                </AccordionItem>
            </div>
        </div>
    );
};

export default AdminContentManager;
