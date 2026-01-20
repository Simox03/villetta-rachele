
/**
 * @file data/siteContent.ts
 * @purpose Stores the initial editable text content for the website. This data is used as a fallback and for initial state.
 */
import type { QuizQuestion, FaqItem } from '../types';

export const INITIAL_SITE_CONTENT = {
  hero: {
    title: 'Villetta Rachele',
    subtitle: 'Scopri l\'autenticità della Puglia nella nostra casa tradizionale, immersa tra ulivi e la bellezza del paesaggio mediterraneo.',
    cta1: 'Richiedi Disponibilità',
    cta2: 'Contattaci',
    bookingLinkText: 'Prenota su Booking.com',
    bookingLinkUrl: '#',
    airbnbLinkText: 'Prenota su Airbnb',
    airbnbLinkUrl: '#',
    heroImage: '/images/facade.jpg',
  },
  property: {
    title: 'La Proprietà',
    description: 'VILLETTA RACHELE – A Punta Prosciutto in Salento, Puglia. La villetta si trova a pochi passi dalla spiaggia con dune, sia libera che attrezzata (Lido Punta Prosciutto Beach). Villetta Rachele è un alloggio con ampio giardino, soggiorno, cucinotto, due camere da letto e due bagni. L’immobile si trova al piano terra ed è attrezzato per una vacanza relax in uno degli angoli più affascinanti del Salento.',
    infoCards: [
      { id: 'card1', title: '6 Ospiti', description: 'Capienza massima.' },
      { id: 'card2', title: '2 Camere', description: '01: Doppia/Matrimoniale, 02: Matrimoniale + Castello' },
      { id: 'card3', title: '2 Bagni', description: 'Bagno 01: wc, bidè, doccia. Bagno 02: wc, bidè.' },
      { id: 'card4', title: '75 m²', description: 'Ampio spazio interno al piano terra.' },
      { id: 'card5', title: 'Climatizzata', description: 'Aria condizionata in tutte le stanze.' },
      { id: 'card6', title: 'Ampio Giardino', description: 'Veranda attrezzata, barbecue e doccia esterna.' },
    ]
  },
  availability: {
    title: 'Disponibilità e Prezzi',
    description: 'Soggiorno: da sabato a sabato. Orari: Check-in 16:00-20:00, Check-out 08:00-10:00.',
  },
  gallery: {
    title: 'Galleria Fotografica',
    description: 'Esplora ogni angolo della Villetta Rachele.',
  },
  video: {
    title: 'Video Presentazione',
    description: 'Lasciati guidare in un tour virtuale della Villetta Rachele e scopri ogni dettaglio come se fossi già qui.',
    videoUrl: '/videos/videotour.mp4',
    thumbnailSrc: '/images/esterno/esterno-1.jpg',
  },
  services: {
    title: 'Dotazioni e Servizi',
    description: 'Tutto ciò di cui hai bisogno per una vacanza perfetta e senza pensieri.',
    serviceList: [
      { id: 'service1', title: 'Wifi & Smart TV' },
      { id: 'service2', title: 'Aria Condizionata' },
      { id: 'service3', title: 'Lavatrice' },
      { id: 'service4', title: 'Cucina a Induzione' },
      { id: 'service5', title: 'Barbecue in Pietra' },
      { id: 'service6', title: 'Posto Auto Gratuito' },
      { id: 'service7', title: 'Zanzariere' },
      { id: 'service8', title: 'Doccia Esterna' },
      { id: 'service9', title: 'Biancheria Inclusa' },
      { id: 'service10', title: 'Pulizie Finali Incluse' },
      { id: 'service11', title: 'Forno a Microonde & Moka' },
      { id: 'service12', title: 'Acqua da Cisterna' },
    ]
  },
  reviews: {
    title: 'Dicono di noi',
    description: 'Leggi le esperienze dei nostri ospiti e scopri perché Villetta Rachele è la scelta giusta per la tua vacanza in Salento.',
    formTitle: 'Lascia una recensione',
    formDescription: 'La tua opinione è importante per noi e per i futuri ospiti.',
  },
  quiz: {
    title: '🏖️ Pronto per le vacanze? Mettiti alla prova! 🏖️',
    description: 'Pensi di aver notato tutti i dettagli? Rispondi e scopri se sei un vero professionista delle vacanze!',
    data: [
      {
        question: 'Quanto è lontana Villetta Rachele dal mare?',
        options: [
          { text: 'Solo 300 metri!', correct: true, feedback: 'Esatto! Una brevissima passeggiata.' },
          { text: '5 km, serve l\'auto.', correct: false, feedback: '' },
          { text: 'È direttamente in acqua.', correct: false, feedback: '' },
        ],
        incorrectFeedback: 'Riprova! È molto vicina, ma non galleggia!',
      },
      {
        question: 'Come sono composti i posti letto?',
        options: [
          { text: 'Tutti divani letto.', correct: false, feedback: '' },
          { text: '2 camere matrimoniali classiche.', correct: false, feedback: '' },
          { text: 'Camera doppia/matrimoniale, Camera tripla, Divano letto.', correct: true, feedback: 'Corretto! Flessibilità per famiglie e gruppi.' },
        ],
        incorrectFeedback: 'Controlla meglio la descrizione dei posti letto!',
      },
      {
        question: 'È disponibile il parcheggio?',
        options: [
          { text: 'No, si parcheggia in strada.', correct: false, feedback: '' },
          { text: 'Sì, posto auto gratuito all\'interno della proprietà.', correct: true, feedback: 'Giusto! La tua auto è al sicuro.' },
          { text: 'Sì, ma a pagamento.', correct: false, feedback: '' },
        ],
        incorrectFeedback: 'Sbagliato! Il parcheggio è una comodità inclusa.',
      }
    ] as QuizQuestion[]
  },
  location: {
    title: 'La Posizione',
    description: 'Situata nel cuore del Salento, a Punta Prosciutto, la villetta gode di una posizione strategica per esplorare le meraviglie della Puglia.',
    nearbyTitle: 'Distanze Principali:',
    places: [
      { name: 'Spiaggia di Punta Prosciutto', distance: '300 m' },
      { name: 'Torre Colimena', distance: '4 km' },
      { name: 'Spiaggia di Torre Lapillo', distance: '5 km' },
      { name: 'Avetrana', distance: '7 km' },
      { name: 'Porto Cesareo', distance: '12 km' }, // Stima basata su Torre Lapillo
      { name: 'Lecce', distance: '35 km' },
    ],
    mapButtonText: 'Vedi su Google Maps',
    mapUrl: 'https://www.google.com/maps/place/Via+Carlo+Forlanini,+73010+Punta+Prosciutto+LE',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.5484852353055!2d17.7725946!3d40.296836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13469177f0a6d71b%3A0x1d4d60a1200155b9!2sVia%20Carlo%20Forlanini%2C%2073010%20Punta%20Prosciutto%20LE!5e0!3m2!1sit!2sit!4v1715000000000!5m2!1sit!2sit'
  },
  faq: {
    title: 'Domande Frequenti (FAQ)',
    description: 'Informazioni utili per il tuo soggiorno.',
    formTitle: 'Hai altre domande?',
    formDescription: 'Scrivici se non trovi la risposta che cerchi.',
    data: [
      { id: 1, question: 'Quali sono gli orari di check-in e check-out?', answer: 'Ingresso dalle 16:00 alle 20:00; uscita dalle 8:00 alle 10:00.' },
      { id: 2, question: 'L\'acqua è potabile?', answer: 'L’alloggio non è allacciato all’Acquedotto Pugliese; l\'acqua è fornita da cisterna (non potabile per bere, idonea per uso sanitario).' },
      { id: 3, question: 'Cosa comprende la biancheria?', answer: 'Il servizio comprende biancheria da bagno e da letto.' },
      { id: 4, question: 'Gli animali sono ammessi?', answer: 'Contattaci per valutare insieme in base alla tipologia e taglia.' }
    ] as FaqItem[]
  },
  contact: {
    title: 'Contattaci',
    description: 'Per prenotare o chiedere maggiori informazioni.',
    email: 'info@villettarachele.it',
    phone: '+39 123 456 7890',
    address: 'Via Carlo Forlanini, 73010 Punta Prosciutto LE'
  },
  footer: {
    brandName: 'Villetta Rachele',
    brandSlogan: 'La tua casa vacanze nel cuore del Salento.',
    contactTitle: 'Contatti',
    socialTitle: 'Seguici',
    facebookUrl: '#',
    instagramUrl: '#',
    copyright: '© 2025 Villetta Rachele. Tutti i diritti riservati.'
  }
};
