export function encodeURL(url: string, params?: Record<string, string>) {
    const encodedURL = new URL(url);

    if (params) {
        for (const key in params) {
            if (params[key] !== undefined && params[key] !== "") {
                encodedURL.searchParams.set(key, params[key].toString());
            }
        }
    }

    return encodedURL.toString();
}
