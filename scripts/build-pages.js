// Generates the static content pages: /guides/*, /about, /privacy, sitemap.xml, robots.txt, ads.txt.
// Run with: npm run build:pages   (output is committed to public/)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { GUIDES } from "./guides-content.js";

const SITE = "https://cardwise-india-delta.vercel.app";
const ADSENSE_CLIENT = "ca-pub-8084037494513258";
const root = new URL("../", import.meta.url);
const { cards, meta } = JSON.parse(readFileSync(new URL("data/cards.json", root), "utf8"));
const byId = Object.fromEntries(cards.map((c) => [c.id, c]));

const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fee = (c) => (c.joining_fee === 0 && c.annual_fee === 0 ? "Lifetime free"
  : c.joining_fee === 0 ? `First year free, then ${inr(c.annual_fee)}`
  : c.joining_fee === c.annual_fee ? `${inr(c.annual_fee)} / year` : `${inr(c.joining_fee)} joining, ${inr(c.annual_fee)} / year`);
const updated = new Date(meta.last_updated).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

function page({ title, description, path, body, jsonld }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} | CardWise India</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${path}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${SITE}${path}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect x='2' y='7' width='28' height='18' rx='4' fill='%230f766e'/><rect x='2' y='11' width='28' height='4' fill='%23042f2e'/><rect x='6' y='19' width='8' height='2' rx='1' fill='%23ccfbf1'/></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/site.css">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}" crossorigin="anonymous"></script>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body>
<div class="wrap">
  <header class="site"><a href="/" class="brand"><span class="logo" aria-hidden="true"></span> CardWise India</a>
    <nav><a href="/guides">Guides</a><a href="/about">About</a><a href="/" class="cta">Find my card</a></nav></header>
  <main>${body}</main>
  <footer class="site">
    <p><a href="/">Card recommender</a> · <a href="/guides">Guides</a> · <a href="/about">About</a> · <a href="/privacy">Privacy policy</a></p>
    <p>CardWise gives general information, not financial advice. Card terms change often, so always check the fees and terms on the bank's website before you apply. Card data last updated ${updated}.</p>
  </footer>
</div>
<script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
`;
}

function cardBlock(id, why) {
  const c = byId[id];
  if (!c) throw new Error(`Unknown card id in guide: ${id}`);
  return `<section class="pick" id="${c.id}">
  <h3>${esc(c.name)}</h3>
  <p class="meta">${esc(c.bank)} · ${esc(c.network)} · ${fee(c)}</p>
  <p>${why}</p>
  <div class="cols">
    <div><h4>Highlights</h4><ul>${c.key_benefits.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>
    <div><h4>Keep in mind</h4><ul>${c.drawbacks.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>
  </div>
  <p class="facts"><b>Fee waiver:</b> ${c.fee_waiver_spend ? `spend ${inr(c.fee_waiver_spend)} a year` : "not available"} · <b>Forex markup:</b> ${c.forex_markup}% · <b>Lounge:</b> ${esc(c.lounge)}</p>
  <a class="apply" href="${esc(c.apply_url)}" target="_blank" rel="noopener nofollow">See details on the ${esc(c.bank)} website →</a>
</section>`;
}

const out = (p, html) => { const f = new URL(`public/${p}`, root); mkdirSync(new URL(".", f), { recursive: true }); writeFileSync(f, html); };

for (const g of GUIDES) {
  const ids = Object.keys(g.cards);
  const table = `<div class="tablewrap"><table><thead><tr><th>Card</th><th>Fee</th><th>Best for</th></tr></thead><tbody>
${ids.map((id) => `<tr><td><a href="#${id}">${esc(byId[id].name)}</a></td><td>${fee(byId[id])}</td><td>${esc(byId[id].key_benefits[0])}</td></tr>`).join("\n")}
</tbody></table></div>`;
  const sections = g.sections.map((s) => `<h2>${s.h}</h2>${(s.paras || []).map((p) => `<p>${p}</p>`).join("")}${s.list ? `<ul>${s.list.map((l) => `<li>${l}</li>`).join("")}</ul>` : ""}`).join("\n");
  const faq = `<h2>Frequently asked questions</h2>${g.faq.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}`;
  const body = `<article class="guide">
<p class="crumbs"><a href="/guides">Guides</a> ›</p>
<h1>${esc(g.title)}</h1>
<p class="updated">Updated ${updated} · Compares ${ids.length} cards</p>
${g.intro.map((p) => `<p class="lede">${p}</p>`).join("")}
<h2>Quick comparison</h2>
${table}
<div class="callout">Not sure which fits you? <a href="/">Answer 3 quick questions</a> and our AI adviser works out which of 50 cards pays you back the most.</div>
<h2>Our picks in detail</h2>
${ids.map((id) => cardBlock(id, g.cards[id])).join("\n")}
${sections}
${faq}
<div class="callout">Every person's spending is different. <a href="/">Get a personalised recommendation</a>. It's free and needs no sign-up.</div>
<p class="small">How we pick: we compare fees, fee waivers, reward rates, monthly caps and exclusions from each bank's published terms, including 2025–26 changes. Estimates assume typical redemption values. CardWise is independent, and card rankings are not influenced by any bank.</p>
</article>`;
  const jsonld = [
    { "@context": "https://schema.org", "@type": "Article", headline: g.title, description: g.description, dateModified: meta.last_updated, author: { "@type": "Organization", name: "CardWise India" }, mainEntityOfPage: `${SITE}/guides/${g.slug}` },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: g.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
  ];
  out(`guides/${g.slug}.html`, page({ title: g.title, description: g.description, path: `/guides/${g.slug}`, body, jsonld }));
}

out("guides/index.html", page({
  title: "Credit Card Guides for India",
  description: "Independent, up-to-date guides to choosing a credit card in India: cashback, food delivery, online shopping, fuel, travel, lifetime free, zero forex and first cards.",
  path: "/guides",
  body: `<h1>Credit card guides</h1>
<p class="lede">Plain-English guides to picking the right credit card in India, updated for the 2025–26 reward and lounge changes.</p>
<div class="guides">${GUIDES.map((g) => `<a class="gcard" href="/guides/${g.slug}"><b>${esc(g.title)}</b><span>${esc(g.description)}</span></a>`).join("")}</div>
<div class="callout">Want a personal answer? <a href="/">Try the CardWise recommender</a>.</div>`,
}));

out("about.html", page({
  title: "About CardWise India",
  description: "CardWise India is a free, independent tool that recommends the best credit card for your spending from 50 popular Indian cards.",
  path: "/about",
  body: `<h1>About CardWise</h1>
<p class="lede">CardWise India helps you choose a credit card based on how you actually spend, not on which card has the biggest advertising budget.</p>
<h2>How it works</h2>
<p>We maintain a database of 50 popular Indian credit cards from banks including HDFC, SBI, ICICI, Axis, American Express, IDFC FIRST, HSBC, Kotak, IndusInd and Standard Chartered. For each card we record its fees, fee-waiver conditions, reward rates by category, monthly caps, lounge access, forex markup and important exclusions.</p>
<p>When you answer our short questionnaire, we estimate how much each card would return on your spending after fees. We then shortlist the best matches, and an AI model explains which three suit you best and what to watch out for. The AI can only choose from our verified shortlist, and application links always go to the bank's official website.</p>
<h2>Keeping data current</h2>
<p>Banks change card terms often. In 2026 alone there were dozens of reward cuts, new caps and lounge rule changes. We review card terms regularly. The current data was last updated on ${updated}. Always confirm the latest terms on the bank's website before you apply.</p>
<h2>Independence</h2>
<p>CardWise is free to use and supported by advertising. Recommendations are based only on the value a card gives you, and no bank can pay to rank higher. CardWise does not provide financial advice.</p>
<h2>Contact</h2>
<p>Found an outdated fee or a broken link? Please report it on our <a href="https://github.com/SHIVA-SAGAR-SHETTY/cardwise-india/issues" rel="noopener">GitHub issues page</a>.</p>`,
}));

out("privacy.html", page({
  title: "Privacy Policy",
  description: "How CardWise India handles your data, cookies and advertising.",
  path: "/privacy",
  body: `<h1>Privacy policy</h1>
<p class="updated">Last updated ${updated}</p>
<h2>Information you give us</h2>
<p>The recommender asks for your approximate monthly spending, spending categories, credit history type, fee preference and optional notes. It does not ask for your name, phone number, email, PAN or income. Your answers are sent to our server only to generate your recommendation, and are processed by our AI provider (OpenAI) for that purpose. We do not store your answers in any database after your recommendation is returned. Please don't include personal details in the optional notes field.</p>
<h2>Analytics</h2>
<p>We use Vercel Web Analytics to count page views and see which pages are popular. It does not use cookies and does not identify individual visitors.</p>
<h2>Advertising and cookies</h2>
<p>We use Google AdSense to show ads. Google and its partners may use cookies to serve ads based on your previous visits to this and other websites. Google's use of advertising cookies lets it and its partners serve ads based on your visits to this site and/or other sites on the internet. You can opt out of personalised advertising in <a href="https://www.google.com/settings/ads" rel="noopener">Google Ads Settings</a>, or visit <a href="https://www.aboutads.info" rel="noopener">aboutads.info</a> to opt out of some third-party vendors' use of cookies. Learn more in <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">How Google uses information from sites that use its services</a>.</p>
<h2>Links to banks</h2>
<p>When you click an apply link, you leave CardWise and go to the bank's website, which has its own privacy policy.</p>
<h2>Children</h2>
<p>CardWise is intended for adults. Credit cards in India are only available to people aged 18 and over.</p>
<h2>Contact</h2>
<p>Questions about this policy can be raised on our <a href="https://github.com/SHIVA-SAGAR-SHETTY/cardwise-india/issues" rel="noopener">GitHub issues page</a>.</p>`,
}));

const urls = ["/", "/guides", ...GUIDES.map((g) => `/guides/${g.slug}`), "/about", "/privacy"];
out("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${meta.last_updated}</lastmod></url>`).join("\n")}
</urlset>
`);
out("robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);
out("ads.txt", `google.com, ${ADSENSE_CLIENT.replace("ca-", "")}, DIRECT, f08c47fec0942fa0\n`);
console.log(`Built ${GUIDES.length} guides + index, about, privacy, sitemap (${urls.length} URLs), robots.txt, ads.txt`);
