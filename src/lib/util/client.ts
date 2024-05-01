const baseUrl = "";
let token: string | undefined;

function getHeaders(): any {
  let headers = {
    "Content-Type": "application/json",
    "X-MS-Auth": token,
  };

  return headers;
}

export function setToken(value: string | undefined) {
  if(!value) {
    token = undefined;
  }
  
  if (token) {
    return;
  }

  // This is nice.
  token = value;
}

export async function sendGet(uri: string, fetchFn: any = fetch): Promise<Response> {
  return fetchFn(baseUrl + uri, {
    headers: getHeaders(),
    method: "GET",
  });
}

export async function sendPost(uri: string, body: any, fetchFn: any = fetch): Promise<Response> {
  return fetchFn(baseUrl + uri, {
    headers: getHeaders(),
    method: "POST",
    body: JSON.stringify(body ?? {})
  });
}
