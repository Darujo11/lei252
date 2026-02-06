import { SYSTEM_PROMPT } from './system-prompt.js';
import { getCorsHeaders, handleOptions } from './cors.js';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

export default {
  async fetch(request, env) {
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';

    if (request.method === 'OPTIONS') {
      return handleOptions(request, allowedOrigin);
    }

    const url = new URL(request.url);
    if (url.pathname !== '/chat' || request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request, allowedOrigin) },
      });
    }

    // Verificar origin
    const origin = request.headers.get('Origin') || '';
    if (allowedOrigin !== '*') {
      const allowedOrigins = allowedOrigin.split(',').map(o => o.trim());
      if (!allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Rate limiting por IP
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(clientIP)) {
      return new Response(JSON.stringify({ error: 'Limite de requisições excedido. Tente novamente em alguns instantes.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request, allowedOrigin) },
      });
    }

    // Validar body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'JSON inválido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request, allowedOrigin) },
      });
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(JSON.stringify({ error: 'O campo messages é obrigatório' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request, allowedOrigin) },
      });
    }

    // Sanitizar mensagens - só user/assistant, limitar tamanho
    const sanitizedMessages = body.messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: String(m.content).slice(0, 2000) }))
      .slice(-20);

    // Montar mensagens com system prompt server-side
    const fullMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...sanitizedMessages,
    ];

    // Proxy para OpenAI
    try {
      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: fullMessages,
          temperature: 0.3,
          max_tokens: 800,
        }),
      });

      const data = await openaiResponse.json();

      if (!openaiResponse.ok) {
        const status = openaiResponse.status === 429 ? 429 : 502;
        return new Response(JSON.stringify({
          error: data.error?.message || 'Erro na API OpenAI',
        }), {
          status,
          headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request, allowedOrigin) },
        });
      }

      return new Response(JSON.stringify({
        content: data.choices[0].message.content,
        usage: data.usage || null,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request, allowedOrigin) },
      });
    } catch {
      return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders(request, allowedOrigin) },
      });
    }
  },
};
