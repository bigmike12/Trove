/**
 * Simulates an asynchronous API request.
 * Centralizing data fetching here allows the mock data source
 * to be replaced with a real backend with minimal changes.
 */

const API_DELAY = 500;

export function fetchFromApi<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(structuredClone(data));
    }, API_DELAY);
  });
}