export async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }

  return data;
}

export async function createAccount(username, email, password) {
  const { sha256Hex } = await import('./edgeCrypo');
  const password_hash = await sha256Hex(password);
  
  return apiRequest('/api/account', {
    method: 'POST',
    body: JSON.stringify({ username, email, password_hash }),
  });
}

export async function loginAccount(email, password) {
  const { sha256Hex } = await import('./edgeCrypo');
  const password_hash = await sha256Hex(password);
  
  return apiRequest('/api/account/login', {
    method: 'POST',
    body: JSON.stringify({ email, password_hash }),
  });
}

export async function getPosts(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  return apiRequest(`/api/posts${queryString ? `?${queryString}` : ''}`);
}

export async function createPost(user_id, title, content) {
  return apiRequest('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ user_id, title, content }),
  });
}
