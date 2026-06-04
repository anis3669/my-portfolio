const rawApiBase = import.meta.env.VITE_API_URL?.trim();
const API_BASE = !rawApiBase || rawApiBase === "auto" ? "" : rawApiBase.replace(/\/$/, "");
const API_PREFIX = `${API_BASE}/api`;
const SHOULD_WAIT_FOR_API = import.meta.env.DEV && API_BASE === "";
let apiReadyPromise: Promise<void> | null = null;

async function waitForApiReady() {
  if (!SHOULD_WAIT_FOR_API) {
    return;
  }

  if (!apiReadyPromise) {
    apiReadyPromise = (async () => {
      const maxAttempts = 20;

      for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        try {
          const res = await fetch(`${API_PREFIX}/healthz`, { credentials: "include" });
          if (res.ok) {
            return;
          }
        } catch {
          // Keep retrying while the API is booting.
        }

        await new Promise((resolve) => setTimeout(resolve, 250));
      }

      throw new Error(`API at ${API_PREFIX} is not responding.`);
    })();
  }

  await apiReadyPromise;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  await waitForApiReady();

  let res: Response;

  try {
    res = await fetch(`${API_PREFIX}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });
  } catch {
    throw new Error(
      `Unable to reach the API at ${API_PREFIX}${path}. Check that the backend is running and VITE_API_URL is correct.`,
    );
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};
