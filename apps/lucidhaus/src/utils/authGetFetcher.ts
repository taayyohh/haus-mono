export const authGetFetcher = (url: string) =>
  fetch(url, {
    method: 'GET',
    credentials: 'include',
  }).then((res) => res.json())
