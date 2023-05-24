// Respond to OPTIONS method
export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      // 'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  });
};

// Set CORS to all /api responses
export const onRequest: PagesFunction = async ({ next }) => {
  const response = await next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Max-Age', '86400');
  // response.headers.set('Access-Control-Allow-Headers', '*');
  return response;
};
