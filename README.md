# CardWise India

An AI credit card adviser for India. Users answer a short questionnaire about their income, monthly spending and priorities. CardWise then recommends the best credit cards from a database of 50 popular Indian cards.

## How it works (RAG)

1. **Knowledge base**: `data/cards.json` holds 50 cards with fees, fee waivers, estimated reward rates per category, caps, lounge access, forex markup, benefits, drawbacks and the official apply link.
2. **Retrieve**: `lib/engine.js` scores every card against the user's spend profile (rewards minus fee and forex cost, plus perks). It filters by eligibility (income, credit history, fee comfort) and shortlists the top 12.
3. **Generate**: the shortlist and the profile go to **GPT-6 Luna** (`gpt-6-luna`), which picks and explains the best 3.
4. **Guardrails**: the model can only choose card IDs from the shortlist, and apply links always come from our database. If the LLM call fails, a rule-based ranking is returned instead.

## Run locally

```bash
cp .env.example .env   # then add your OPENAI_API_KEY
npm run dev            # http://localhost:3000
```

## Deploy (Vercel, free Hobby plan)

1. Push this repo to GitHub.
2. On vercel.com, click **Add New → Project** and import the repo (no build settings needed).
3. Add the environment variables `OPENAI_API_KEY` and (optionally) `OPENAI_MODEL=gpt-6-luna`.
4. Deploy.

## Updating card data

Edit `data/cards.json`. The `rates` values are the estimated % return per ₹100 spent in each category (`base` is the default rate). Update `meta.last_updated` when you change the data.

*Not financial advice. Card terms change often. Always check them on the bank's site before you apply.*
