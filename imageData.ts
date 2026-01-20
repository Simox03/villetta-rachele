/**
 * @file imageData.ts
 * @purpose Defines the initial set of gallery images.
 */
import type { GalleryImage } from './types';

export const GALLERY_IMAGES: GalleryImage[] = [
  // Soggiorno
  { id: 1, category: 'soggiorno', src: '/images/soggiorno/soggiorno-1.jpg', alt: 'Soggiorno luminoso', description: 'Ampio soggiorno' },
  { id: 2, category: 'soggiorno', src: '/images/soggiorno/soggiorno-2.jpg', alt: 'Dettaglio soggiorno', description: 'Arredamento curato' },
  { id: 3, category: 'soggiorno', src: '/images/soggiorno/soggiorno-3.jpg', alt: 'Zona relax', description: 'Perfetto per il relax' },
  { id: 4, category: 'soggiorno', src: '/images/soggiorno/soggiorno-4.jpg', alt: 'Vista soggiorno', description: 'Spazi accoglienti' },

  // Camere
  { id: 6, category: 'camere', src: '/images/camere/camera-matrimoniale-1.jpg', alt: 'Camera Matrimoniale', description: 'Ampia camera matrimoniale' },
  { id: 7, category: 'camere', src: '/images/camere/camera-matrimoniale-2.jpg', alt: 'Camera Matrimoniale vista', description: 'Luminosa e accogliente' },
  { id: 8, category: 'camere', src: '/images/camere/camera-quattro-1.jpg', alt: 'Camera Quadrupla', description: 'Ideale per famiglie' },
  { id: 9, category: 'camere', src: '/images/camere/camera-quattro-2.jpg', alt: 'Dettaglio camera', description: 'Spaziosa e confortevole' },

  // Cucina
  { id: 10, category: 'cucina', src: '/images/cucina/cucina-1.jpg', alt: 'Cucina attrezzata', description: 'Cucina completa di tutto' },
  { id: 11, category: 'cucina', src: '/images/cucina/cucina-2.jpg', alt: 'Angolo cottura', description: 'Pronta per le tue ricette' },
  { id: 12, category: 'cucina', src: '/images/cucina/cucina-3.jpg', alt: 'Dettagli cucina', description: 'Macchina caffè e accessori' },
  { id: 13, category: 'cucina', src: '/images/cucina/cucina-4.jpg', alt: 'Tavolo da pranzo', description: 'Per i tuoi pasti in compagnia' },
  { id: 131, category: 'cucina', src: '/images/cucina/cucina-5.jpg', alt: 'Vista cucina', description: 'Spaziosa e funzionale' },

  // Esterno (formerly Veranda)
  { id: 14, category: 'esterno', src: '/images/esterno/esterno-1.jpg', alt: 'Esterno della villa', description: 'Ampio spazio esterno' },
  { id: 15, category: 'esterno', src: '/images/esterno/esterno-2.jpg', alt: 'Veranda coperta', description: 'Ideale per cene all\'aperto' },
  { id: 16, category: 'esterno', src: '/images/esterno/esterno-3.jpg', alt: 'Giardino', description: 'Verde e relax' },
  { id: 161, category: 'esterno', src: '/images/esterno/esterno-4.jpg', alt: 'Dettaglio esterno', description: 'Curato nei minimi dettagli' },

  // Bagni
  { id: 17, category: 'bagni', src: '/images/bagni/bagno-grande-1.jpg', alt: 'Bagno principale', description: 'Bagno spazioso con doccia' },
  { id: 18, category: 'bagni', src: '/images/bagni/bagno-grande-2.jpg', alt: 'Dettaglio bagno', description: 'Finiture moderne' },
  { id: 20, category: 'bagni', src: '/images/bagni/bagno-piccolo.jpg', alt: 'Bagno di servizio', description: 'Comodo secondo bagno' },
];