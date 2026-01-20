
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
    description: 'A soli 300 metri dalla splendida spiaggia di Punta Prosciutto, la nostra villetta recentemente ristrutturata unisce l\'autenticità della tradizione salentina con ogni comfort moderno per un soggiorno indimenticabile.',
    infoCards: [
      { id: 'card1', title: 'Casa Ristrutturata', description: 'Unisce tradizione e comfort.' },
      { id: 'card2', title: 'Fino a 7 Ospiti', description: 'Ideale per famiglie e gruppi.' },
      { id: 'card3', title: '2 Camere da Letto', description: 'Più un comodo divano letto.' },
      { id: 'card4', title: 'Cucina Attrezzata', description: 'Completa per ogni esigenza.' },
      { id: 'card5', title: '2 Bagni', description: 'Per la massima comodità.' },
      { id: 'card6', title: '300m dal Mare', description: 'Una breve passeggiata in spiaggia.' },
    ]
  },
  availability: {
    title: 'Disponibilità e Prezzi',
    description: 'Seleziona il periodo desiderato per il tuo soggiorno. Il primo click sceglie l\'arrivo, il secondo la partenza.',
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
    title: 'Servizi & Comfort',
    description: 'Tutto ciò di cui hai bisogno per una vacanza perfetta e senza pensieri.',
    serviceList: [
      { id: 'service1', title: 'WiFi Gratuito' },
      { id: 'service2', title: 'Parcheggio Privato' },
      { id: 'service3', title: 'Grande Giardino' },
      { id: 'service4', title: 'Aria Condizionata' },
      { id: 'service5', title: 'Vicinissima al Mare' },
      { id: 'service6', title: 'Lavatrice' },
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
          { text: 'Praticamente ci cadi dentro, sono solo 300 metri!', correct: true, feedback: 'Esatto! Giusto il tempo di mettere le infradito e sei già in spiaggia.' },
          { text: 'Abbastanza da farti passare la voglia, 10 km.', correct: false, feedback: '' },
          { text: 'Devi prendere un traghetto, si trova su un\'isola.', correct: false, feedback: '' },
        ],
        incorrectFeedback: 'Ops, non proprio! Controlla meglio, il mare è più vicino di quanto pensi!',
      },
      {
        question: 'Quanti amici puoi portare per riempire tutti i posti letto (divano incluso)?',
        options: [
          { text: 'Un\'intera squadra di calcio, 11 persone.', correct: false, feedback: '' },
          { text: 'Un bel gruppo, fino a 7 persone.', correct: true, feedback: 'Perfetto! Chi porti con te? Prepara il gruppo per una vacanza indimenticabile!' },
          { text: 'Solo tu e il tuo gatto, è per 2 persone.', correct: false, feedback: '' },
        ],
        incorrectFeedback: 'Non esattamente! C\'è spazio per un bel gruppetto, ma non per tutti gli invitati al tuo matrimonio.',
      },
      {
        question: 'Per evitare la fila la mattina, quanti bagni ci sono a disposizione?',
        options: [
          { text: 'Uno solo, bisogna organizzarsi con i turni!', correct: false, feedback: '' },
          { text: 'Ben due! Uno principale e uno di servizio.', correct: true, feedback: 'Hai ragione! Due bagni sono il segreto per una convivenza serena in vacanza.' },
          { text: 'Tre, praticamente un lusso da hotel a 5 stelle.', correct: false, feedback: '' },
        ],
        incorrectFeedback: 'Sbagliato! Abbiamo pensato alla comodità di tutti, la risposta giusta è due!',
      },
      {
        question: 'Visto il grande giardino, c\'è anche una piscina olimpionica, vero?',
        options: [
          { text: 'Certo, con tanto di scivolo acquatico!', correct: false, feedback: '' },
          { text: 'No, ma a 300 metri c\'è il mare che sembra una piscina naturale!', correct: true, feedback: 'Esatto! Chi ha bisogno del cloro quando hai il mare cristallino di Punta Prosciutto a due passi?' },
          { text: 'Sì, e viene pulita ogni giorno da un robot super tecnologico.', correct: false, feedback: '' },
        ],
        incorrectFeedback: 'Magari! Ma ti assicuriamo che il mare a 300 metri è molto meglio di qualsiasi piscina.',
      }
    ] as QuizQuestion[]
  },
  location: {
    title: 'La Posizione',
    description: 'Situata nel cuore del Salento, a Punta Prosciutto, la villetta gode di una posizione strategica per esplorare le meraviglie della Puglia.',
    nearbyTitle: 'Luoghi Vicini:',
    places: [
      { name: 'Spiaggia di Punta Prosciutto', distance: '300 m' },
      { name: 'Porto Cesareo', distance: '5 km' },
      { name: 'Torre Lapillo', distance: '7 km' },
      { name: 'Lecce', distance: '35 km' },
      { name: 'Otranto', distance: '60 km' },
    ],
    mapButtonText: 'Vedi su Google Maps',
    mapUrl: 'https://www.google.com/maps/place/Via+Carlo+Forlanini,+73010+Punta+Prosciutto+LE',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.5484852353055!2d17.7725946!3d40.296836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13469177f0a6d71b%3A0x1d4d60a1200155b9!2sVia%20Carlo%20Forlanini%2C%2073010%20Punta%20Prosciutto%20LE!5e0!3m2!1sit!2sit!4v1715000000000!5m2!1sit!2sit'
  },
  // Fix: Added missing faq property used across multiple components.
  faq: {
    title: 'Domande Frequenti (FAQ)',
    description: 'Qui troverai le risposte alle domande più comuni poste dai nostri ospiti per aiutarti a pianificare al meglio il tuo soggiorno.',
    formTitle: 'Hai altre domande?',
    formDescription: 'Se non trovi la risposta che cerchi, inviaci pure un messaggio tramite il form qui sotto e ti risponderemo il prima possibile.',
    data: [
      { id: 1, question: 'È inclusa la biancheria?', answer: 'Sì, forniamo lenzuola e asciugamani freschi di bucato per tutti gli ospiti all\'arrivo.' },
      { id: 2, question: 'C\'è il parcheggio?', answer: 'Sì, la villetta dispone di un parcheggio privato e recintato all\'interno della proprietà.' },
      { id: 3, question: 'Sono ammessi animali?', answer: 'Sì, accettiamo animali di piccola taglia. Vi chiediamo gentilmente di comunicarcelo al momento della prenotazione.' },
      { id: 4, question: 'C\'è la connessione Wi-Fi?', answer: 'Sì, offriamo Wi-Fi gratuito e illimitato in tutta la struttura.' }
    ] as FaqItem[]
  },
  contact: {
    title: 'Contattaci',
    description: 'Hai domande o vuoi richiedere la disponibilità? Compila il modulo o utilizza i nostri contatti diretti. Ti risponderemo al più presto!',
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
