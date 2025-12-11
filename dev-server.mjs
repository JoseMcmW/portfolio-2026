/**
 * Servidor de desarrollo local para probar la API de contacto
 * Simula el entorno de Vercel Serverless Functions
 */

import { createServer } from 'http';
import { parse } from 'url';
import { config } from 'dotenv';

// Cargar variables de entorno
config({ path: '.env.local' });

const PORT = 3001;

console.log('🔧 Environment check:');
console.log(`  GMAIL_EMAIL: ${process.env.GMAIL_EMAIL ? '✅ Set' : '❌ Missing'}`);
console.log(`  GMAIL_APP_PASSWORD: ${process.env.GMAIL_APP_PASSWORD ? '✅ Set' : '❌ Missing'}`);
console.log(`  SUPABASE_URL: ${process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing'}`);
console.log(`  SUPABASE_ANON_KEY: ${process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}`);
console.log('');

const server = createServer(async (req, res) => {
  const parsedUrl = parse(req.url, true);

  // CORS headers para desarrollo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Solo manejar /api/contact
  if (parsedUrl.pathname === '/api/contact') {
    console.log(`📨 ${req.method} /api/contact`);

    try {
      // Importar el handler
      const { default: handler } = await import('./api/contact.ts');

      // Leer body
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', async () => {
        const parsedBody = body ? JSON.parse(body) : {};
        console.log('📤 Request body:', parsedBody);

        // Request compatible con Vercel
        const vercelReq = {
          method: req.method,
          headers: req.headers,
          body: parsedBody,
          query: parsedUrl.query,
        };

        // Response compatible con Vercel
        const vercelRes = {
          status: (code) => {
            res.statusCode = code;
            return vercelRes;
          },
          json: (data) => {
            console.log('📥 Response:', data);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
          },
          send: (data) => {
            res.end(data);
          },
        };

        // Ejecutar handler
        await handler(vercelReq, vercelRes);
      });

    } catch (error) {
      console.error('❌ Error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message
      }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Dev API Server running on http://localhost:${PORT}`);
  console.log(`📍 Contact endpoint: http://localhost:${PORT}/api/contact`);
  console.log('');
  console.log('💡 Tips:');
  console.log('  - Make sure your Vite dev server is running on port 5173');
  console.log('  - Update your Contact.tsx to use http://localhost:3001/api/contact');
  console.log('  - Or use the proxy in vite.config.ts');
  console.log('');
  console.log('✨ Ready to handle contact form submissions!');
});
