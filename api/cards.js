import { CARDS, META } from "../lib/engine.js";

// Public list of cards in the database (without internal scoring fields).
export default function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=3600");
  res.status(200).json({
    updated: META.last_updated,
    cards: CARDS.map(({ rates, lounge_value, ...c }) => c),
  });
}
