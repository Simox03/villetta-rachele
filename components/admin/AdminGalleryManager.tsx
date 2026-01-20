/**
 * @file components/admin/AdminGalleryManager.tsx
 * @purpose The admin panel for managing the hero image and the photo gallery, based on a local image workflow.
 */
import React, { useState } from 'react';
import type { GalleryImage } from '../../types';

interface AdminGalleryManagerProps {
    galleryImages: GalleryImage[];
    heroImage: string;
    updateSiteData: (key: string, value: any) => Promise<void>;
}

const AdminGalleryManager: React.FC<AdminGalleryManagerProps> = ({ galleryImages, heroImage, updateSiteData }) => {
    const [newImageSrc, setNewImageSrc] = useState('');
    const [alt, setAlt] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<GalleryImage['category']>('soggiorno');
    const [localHeroImage, setLocalHeroImage] = useState(heroImage);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const categories: GalleryImage['category'][] = ['camere', 'bagni', 'soggiorno', 'veranda', 'cucina'];

    const handleAddPhoto = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImageSrc || !alt || !description) {
            setError('Per favore, compila tutti i campi: Percorso, Testo Alternativo e Descrizione.');
            return;
        }
        
        setError('');
        setIsSaving(true);
        
        const newImage: GalleryImage = {
            id: Date.now(),
            category,
            src: newImageSrc,
            alt,
            description,
        };
        const updatedImages = [newImage, ...galleryImages];
        await updateSiteData('galleryImages', updatedImages);

        // Reset form
        setNewImageSrc('');
        setAlt('');
        setDescription('');
        setCategory('soggiorno');
        setIsSaving(false);
    };

    const handleDeletePhoto = async (id: number) => {
        if (window.confirm('Sei sicuro di voler eliminare questa foto dalla galleria? L\'immagine non sarà rimossa dal server.')) {
            const updatedImages = galleryImages.filter(img => img.id !== id);
            await updateSiteData('galleryImages', updatedImages);
        }
    };
    
    const handleHeroImageSave = async () => {
        setIsSaving(true);
        await updateSiteData('heroImage', localHeroImage);
        setIsSaving(false);
    }

    return (
        <div>
            <h3 className="text-2xl font-bold mb-6">Gestione Galleria e Immagine Principale</h3>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
                <h4 className="text-xl font-semibold mb-3">Immagine Principale (Hero)</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <img src={localHeroImage} alt="Immagine principale" className="w-full h-auto object-cover rounded-md shadow-md max-h-48" />
                    <div>
                        <label htmlFor="hero-path" className="block text-slate-700 font-semibold mb-2">Percorso Immagine</label>
                        <input id="hero-path" type="text" value={localHeroImage} onChange={(e) => setLocalHeroImage(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900" />
                        <button onClick={handleHeroImageSave} disabled={isSaving || heroImage === localHeroImage} className="mt-2 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 disabled:bg-slate-400">
                           {isSaving ? 'Salvataggio...' : 'Salva Immagine Principale'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
                 <h4 className="text-xl font-semibold mb-3">Aggiungi Foto alla Galleria</h4>
                 <p className="text-sm text-slate-600 mb-4">
                    <strong>Istruzioni:</strong> 1. Aggiungi la tua immagine nella cartella `images` del progetto. 2. Copia il percorso (es. `/images/camere/foto.jpg`) e incollalo nel campo "Percorso". 3. Compila gli altri campi e aggiungi la foto.
                 </p>
                <form onSubmit={handleAddPhoto} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-2 lg:col-span-3">
                        <label htmlFor="photo-src" className="block text-slate-700 font-semibold mb-1">Percorso Foto</label>
                        <input id="photo-src" type="text" value={newImageSrc} onChange={e => setNewImageSrc(e.target.value)} required placeholder="/images/categoria/nome_file.jpg" className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900" />
                    </div>
                     <div>
                        <label htmlFor="alt-text" className="block text-slate-700 font-semibold mb-1">Testo Alternativo (alt)</label>
                        <input id="alt-text" type="text" value={alt} onChange={e => setAlt(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900" />
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-slate-700 font-semibold mb-1">Descrizione</label>
                        <input id="description" type="text" value={description} onChange={e => setDescription(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900" />
                    </div>
                     <div>
                        <label htmlFor="category" className="block text-slate-700 font-semibold mb-1">Categoria</label>
                        <select id="category" value={category} onChange={e => setCategory(e.target.value as GalleryImage['category'])} className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white text-slate-900">
                           {categories.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2 lg:col-span-3">
                        <button type="submit" disabled={isSaving} className="w-full md:w-auto bg-teal-500 text-white py-2 px-6 rounded-md hover:bg-teal-600 disabled:bg-slate-400">
                           {isSaving ? 'Salvataggio...' : 'Aggiungi Foto'}
                        </button>
                    </div>
                     {error && <p className="text-red-500 text-sm mt-2 md:col-span-2 lg:col-span-3">{error}</p>}
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map(img => (
                    <div key={img.id} className="bg-white p-4 rounded-lg shadow-md border border-slate-100">
                        <img src={img.src} alt={img.alt} className="w-full h-48 object-cover rounded-md mb-4" />
                        <p className="font-semibold text-slate-800">{img.alt}</p>
                        <p className="text-sm text-slate-600 italic mb-2">{img.description}</p>
                        <p className="text-xs text-white bg-teal-500 inline-block px-2 py-1 rounded-full mb-4">{img.category.charAt(0).toUpperCase() + img.category.slice(1)}</p>
                        <button onClick={() => handleDeletePhoto(img.id)} className="w-full bg-red-500 text-white text-sm py-2 rounded-md hover:bg-red-600 transition-colors">Elimina</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminGalleryManager;
