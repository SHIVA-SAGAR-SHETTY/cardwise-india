// Local dev server: serves public/ and routes /api/* to the Vercel handlers.
import http from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";

const envFile = new URL("./.env", import.meta.url);
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const PORT = process.env.PORT || 3000;
http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname.startsWith("/api/")) {
    const name = url.pathname.slice(5).replace(/[^a-z-]/g, "");
    let body = "";
    for await (const chunk of req) body += chunk;
    req.body = body ? JSON.parse(body) : {};
    res.status = (c) => { res.statusCode = c; return res; };
    res.json = (o) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(o)); };
    const { default: handler } = await import(`./api/${name}.js`);
    return handler(req, res);
  }
  try {
    let file = url.pathname === "/" ? "index.html" : url.pathname.slice(1).replace(/\/$/, "");
    if (!/\.[a-z]+$/.test(file)) file = existsSync(new URL(`./public/${file}.html`, import.meta.url)) ? `${file}.html` : `${file}/index.html`;
    const data = await readFile(new URL(`./public/${file}`, import.meta.url));
    const types = { html: "text/html; charset=utf-8", css: "text/css", txt: "text/plain", xml: "application/xml" };
    res.setHeader("Content-Type", types[file.split(".").pop()] || "application/octet-stream");
    res.end(data);
  } catch { res.statusCode = 404; res.end("Not found"); }
}).listen(PORT, () => console.log(`CardWise running at http://localhost:${PORT}`));
