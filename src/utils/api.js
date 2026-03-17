/**
 * Authenticated fetch wrapper.
 * Reads the JWT token from localStorage and attaches it as
 * an Authorization: Bearer header to every request.
 */
export async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
