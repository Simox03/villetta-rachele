/**
 * @file netlify/functions/upload-image.ts
 * @purpose A serverless function for securely uploading images to Cloudinary from the admin panel.
 */
import { Handler } from '@netlify/functions';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { file, folder } = JSON.parse(event.body || '{}');
    if (!file) {
      return { statusCode: 400, body: 'Nessun file fornito.' };
    }

    const result = await cloudinary.uploader.upload(file, {
      folder: folder || 'villetta-rachele',
      resource_type: 'image',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ secure_url: result.secure_url }),
    };
  } catch (error) {
    console.error('Errore durante l\'upload su Cloudinary:', error);
    // Assicurati di non esporre dettagli sensibili dell'errore
    const errorMessage = error instanceof Error ? error.message : 'Errore sconosciuto';
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Errore durante il caricamento dell\'immagine.', details: errorMessage }),
    };
  }
};

export { handler };