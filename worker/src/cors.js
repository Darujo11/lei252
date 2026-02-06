export function getCorsHeaders(request, allowedOrigin) {
  const origin = request.headers.get('Origin') || '';
  const allowedOrigins = allowedOrigin.split(',').map(o => o.trim());
  const isAllowed = allowedOrigin === '*' || allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin || '*' : allowedOrigins[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export function handleOptions(request, allowedOrigin) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request, allowedOrigin),
  });
}
