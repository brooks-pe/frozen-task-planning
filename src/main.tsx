
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

function restoreGitHubPagesRoute() {
  const { search, hash } = window.location;
  if (!search.startsWith("?/")) return;

  const decoded = search.slice(2).replace(/~and~/g, "&");
  const [rawPath, ...queryParts] = decoded.split("&");
  const query = queryParts.length ? `?${queryParts.join("&")}` : "";

  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL.slice(0, -1)
    : import.meta.env.BASE_URL;
  const path = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;

  window.history.replaceState(null, "", `${base}${path}${query}${hash}`);
}

restoreGitHubPagesRoute();

createRoot(document.getElementById("root")!).render(<App />);
  
