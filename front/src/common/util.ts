export function urlBuilder(host: string, query: { [key: string]: string | number | boolean | undefined }) {
    const param = Object.entries(query)
        .map(([key, value]) => (value ? `${key}=${encodeURIComponent(value)}` : ""))
        .join("&");

    return `${host}?${param}`;
}
