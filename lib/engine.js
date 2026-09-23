// Retrieval + LLM recommendation engine.
// Step 1 (retrieve): score every card in data/cards.json against the user's spend profile.
// Step 2 (generate): send the top candidates to the LLM, which picks and explains the best 3.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const DB = JSON.parse(readFileSync(path.join(here, "..", "data", "cards.json"), "utf8"));
export const CARDS = DB.cards;
export const META = DB.meta;

export const CATEGORIES = [
  "amazon", "flipkart", "food_delivery", "online", "dining", "groceries",
  "fuel", "travel", "utilities", "offline", "intl",
];

const FEE_LIMITS = { free: 0, low: 1000, mid: 5000, high: 15000, any: Infinity };
const MODEL = process.env.OPENAI_MODEL || "gpt-6-luna";

const num = (v, max = 1e8) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.min(n, max) : 0;
};

export function sanitizeProfile(body = {}) {
  const spend = {};
  for (const c of CATEGORIES) spend[c] = num(body.spend?.[c], 5e6);
  // Whatever the user didn't split into categories counts as general (offline) spending.
  const split = CATEGORIES.reduce((a, c) => a + spend[c], 0);
  const expenditure = Math.max(num(body.expenditure, 5e7), split);
  spend.offline += expenditure - split;
  return {
    expenditure,
    employment: String(body.employment || "salaried").slice(0, 30),
    credit_history: String(body.credit_history || "good").slice(0, 30),
    fee_comfort: FEE_LIMITS[body.fee_comfort] !== undefined ? body.fee_comfort : "mid",
    priorities: (Array.isArray(body.priorities) ? body.priorities : []).slice(0, 8).map((p) => String(p).slice(0, 30)),
    existing_banks: String(body.existing_banks || "").slice(0, 200),
    notes: String(body.notes || "").slice(0, 400),
    spend,
  };
}

function rateFor(card, cat) {
  const r = card.rates;
  if (r[cat] !== undefined) return r[cat];
  if (["amazon", "flipkart", "food_delivery"].includes(cat) && r.online !== undefined) return r.online;
  if (["dining", "groceries"].includes(cat) && r.offline !== undefined) return r.offline;
  return r.base;
}

export function scoreCard(card, p) {
  let monthly = 0;
  let monthlySpend = 0;
  for (const c of CATEGORIES) {
    monthly += (p.spend[c] * rateFor(card, c)) / 100;
    monthlySpend += p.spend[c];
  }
  if (card.monthly_reward_cap) monthly = Math.min(monthly, card.monthly_reward_cap);
  const annualSpend = monthlySpend * 12;
  const feeWaived = card.fee_waiver_spend !== null && annualSpend >= card.fee_waiver_spend;
  const fee = feeWaived ? 0 : card.annual_fee;
  const forexCost = (p.spend.intl * 12 * card.forex_markup) / 100;
  const wantsLounge = p.priorities.includes("lounge") || p.priorities.includes("travel");
  const perks = wantsLounge ? card.lounge_value : card.lounge_value * 0.15;
  const net = Math.round(monthly * 12 + perks - fee - forexCost);
  return { rewards_per_year: Math.round(monthly * 12), fee_after_waiver: fee, forex_cost: Math.round(forexCost), net_value: net };
}

function eligible(card, p) {
  // We don't ask for income; use spend level as a loose proxy for which tiers make sense.
  if (p.credit_history === "none") return card.best_for.includes("no-credit-history") || (card.tier === "entry" && card.min_income_monthly <= 25000);
  if (p.credit_history === "new" && card.tier === "super-premium") return false;
  if (card.tier === "super-premium" && p.expenditure < 75000) return false;
  return card.joining_fee <= FEE_LIMITS[p.fee_comfort] && card.annual_fee <= FEE_LIMITS[p.fee_comfort] * 1.5;
}

export function retrieve(p, k = 12) {
  const scored = CARDS.filter((c) => eligible(c, p))
    .map((c) => ({ card: c, score: scoreCard(c, p) }))
    .map((x) => {
      // small boost when the card's strengths match the user's stated priorities
      const hits = x.card.best_for.filter((t) => p.priorities.includes(t)).length;
      const securedBoost = p.credit_history === "none" && x.card.best_for.includes("no-credit-history") ? 5000 : 0;
      return { ...x, rank: x.score.net_value + hits * 750 + securedBoost };
    })
    .sort((a, b) => b.rank - a.rank);
  return scored.slice(0, k);
}

const SYSTEM = `You are CardWise, an expert, unbiased Indian credit card advisor.
You receive a user's lifestyle profile (amounts in INR per month) and a shortlist of candidate cards retrieved from our database, each with our estimated yearly numbers.
Pick the best 3 cards for this user ONLY from the shortlist (use the exact "id"). Consider: where they spend most, fee vs value, fee waivers, likely eligibility (credit history, spend level; mention the bank's income requirement as a caveat for premium cards), their priorities, lounge/travel needs, forex, and caps.
Prefer a card that covers their largest spend categories; the 2nd/3rd can be complementary picks. Be concrete with rupee figures, honest about drawbacks, and never invent card features not given.
Reply with JSON only, in this shape:
{"summary": "2-3 sentence overview of their spending pattern and strategy",
 "recommendations": [{"id": "card-id", "headline": "short reason (max 12 words)", "why": "2-4 sentences tailored to this user", "estimated_annual_value": number, "watch_out": "one key caveat"}],
 "tips": ["2-3 short practical tips"]}`;

async function callLLM(profile, shortlist) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not set");
  const candidates = shortlist.map(({ card, score }) => ({
    id: card.id, name: card.name, bank: card.bank, tier: card.tier,
    joining_fee: card.joining_fee, annual_fee: card.annual_fee, fee_waiver_spend: card.fee_waiver_spend,
    min_income_monthly: card.min_income_monthly, rates_percent: card.rates, monthly_reward_cap: card.monthly_reward_cap,
    forex_markup: card.forex_markup, lounge: card.lounge, key_benefits: card.key_benefits, drawbacks: card.drawbacks,
    our_estimate: score,
  }));
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: MODEL,
      response_format: { type: "json_object" },
      max_completion_tokens: 1500,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: JSON.stringify({ profile, candidates }) },
      ],
    }),
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

function publicCard(card) {
  const { rates, lounge_value, ...rest } = card;
  return rest;
}

export async function recommend(rawBody) {
  const profile = sanitizeProfile(rawBody);
  const shortlist = retrieve(profile);
  if (!shortlist.length) return { source: "none", summary: "We couldn't find a matching card. Try relaxing the fee preference.", recommendations: [], tips: [] };
  const byId = Object.fromEntries(shortlist.map((x) => [x.card.id, x]));

  let llm = null;
  let error = null;
  try {
    llm = await callLLM(profile, shortlist);
  } catch (e) {
    error = e.message;
    console.error("LLM failed, using rule-based fallback:", e.message);
  }

  // Only trust ids that exist in our shortlist; apply links always come from our database.
  let recs = (llm?.recommendations || [])
    .filter((r) => byId[r.id])
    .slice(0, 3)
    .map((r) => ({ ...r, card: publicCard(byId[r.id].card), estimate: byId[r.id].score }));

  if (!recs.length) {
    recs = shortlist.slice(0, 3).map(({ card, score }) => ({
      id: card.id,
      headline: card.key_benefits[0],
      why: `Based on your spending, we estimate about Rs ${score.rewards_per_year.toLocaleString("en-IN")} in rewards a year, with an effective fee of Rs ${score.fee_after_waiver.toLocaleString("en-IN")}.`,
      estimated_annual_value: score.net_value,
      watch_out: card.drawbacks[0],
      card: publicCard(card),
      estimate: score,
    }));
  }

  return {
    source: llm ? MODEL : "rule-based",
    summary: llm?.summary || "Here are the cards that return the most value for your spending pattern.",
    recommendations: recs,
    tips: llm?.tips || [],
    data_updated: META.last_updated,
    ...(error && process.env.DEBUG ? { debug_error: error } : {}),
  };
}
