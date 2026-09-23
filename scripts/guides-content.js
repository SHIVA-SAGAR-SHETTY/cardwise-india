// Article content for /guides. Card facts (fees, benefits, drawbacks, links) are pulled
// from data/cards.json at build time; only the editorial text lives here.
export const GUIDES = [
  {
    slug: "best-credit-card-for-swiggy-zomato",
    title: "Best Credit Cards for Swiggy & Zomato in 2026",
    description: "Which credit card gives the most back on Swiggy, Zomato, Instamart and food delivery in India? We compare cashback, caps and fees after the 2026 changes.",
    intro: [
      "Food delivery is one of the fastest-growing monthly expenses for urban Indians. If you order two or three times a week, you can easily spend ₹4,000–₹8,000 a month on Swiggy, Zomato and quick-commerce apps like Instamart. On a regular credit card that earns 1%, that is ₹40–₹80 back. On the right card, it can be ₹400–₹800 every month.",
      "The catch is that food-delivery cards come with monthly caps, minimum order values and exclusions, and several of them changed in 2026. Below are the cards that still give the best return on food delivery, and who each one suits.",
    ],
    cards: {
      "hdfc-swiggy-blck": "The strongest Swiggy card available to new applicants. It pays 10% on Swiggy Food, Instamart and Dineout up to ₹1,500 a month, which covers roughly ₹15,000 of monthly Swiggy spend. Since April 2026 each Swiggy order must be ₹249 or more to qualify, so very small Instamart top-ups won't count. The older Swiggy HDFC card stopped taking new applications in February 2026.",
      "hsbc-liveplus": "The best choice if you use both Swiggy and Zomato, or also spend a lot on dining out and groceries. It pays 10% across dining, food delivery, groceries, shopping and utilities, with a combined cap of ₹1,200 a month. It is only issued in selected Indian cities, so check availability first.",
      "axis-airtel": "Pays 10% on Swiggy, Zomato and BigBasket, plus strong cashback on Airtel and utility bills paid through the Airtel Thanks app. Good if you are already an Airtel customer. Each category has its own cap.",
      "hdfc-millennia": "A solid all-rounder that pays 5% on Swiggy and Zomato along with Amazon, Flipkart, Myntra and other popular apps. The 5% is capped at ₹1,000 a month across all those merchants, so it suits moderate spenders.",
    },
    sections: [
      { h: "How to choose", list: [
        "<b>Mostly Swiggy (including Instamart)?</b> Swiggy HDFC BLCK gives the highest rate.",
        "<b>Both Swiggy and Zomato, plus dining out?</b> HSBC Live+ covers everything at 10%, if it's available in your city.",
        "<b>Airtel customer?</b> Airtel Axis adds bill-payment cashback on top of food delivery.",
        "<b>Food delivery is only part of your online spending?</b> HDFC Millennia spreads 5% across many apps.",
      ]},
      { h: "Watch out for these", paras: [
        "Food-delivery cashback almost always has a monthly cap. Work out your real monthly spend on each app and check it against the cap. Beyond it, you earn only the base rate. Also check whether wallet top-ups (Swiggy Money, Zomato Money) earn cashback. Usually they do not.",
      ]},
    ],
    faq: [
      ["Can I still apply for the original Swiggy HDFC credit card?", "No. HDFC stopped accepting new applications in February 2026. New applicants can choose the Swiggy HDFC BLCK (10% on Swiggy) or ORNGE (5% on Swiggy) variants."],
      ["Does Zomato have its own credit card?", "Not at the moment. For Zomato, cards with broad food-delivery cashback like HSBC Live+, Airtel Axis or HDFC Millennia work best."],
      ["Is it worth paying an annual fee for a food delivery card?", "Usually yes, if you spend ₹3,000 or more a month on food delivery. At 10% cashback that's ₹3,600+ a year, well above a ₹500–₹1,000 fee, and most of these cards waive the fee once you cross an annual spend threshold."],
    ],
  },
  {
    slug: "lifetime-free-credit-cards-india",
    title: "Best Lifetime Free Credit Cards in India (2026)",
    description: "The best lifetime-free credit cards in India with no joining or annual fee: Amazon Pay ICICI, IDFC FIRST, Scapia, IndusInd Tiger, OneCard and more, compared.",
    intro: [
      "A lifetime-free (LTF) credit card has no joining fee and no annual fee, ever. That makes it a safe first card, a good backup card, and a way to keep your credit history long without paying to hold the card. Keeping a card open is good for your credit score, because the average age of your accounts matters.",
      "Free doesn't have to mean useless. Several lifetime-free cards in India offer real rewards, zero forex markup, or even lounge access. Here are the best ones right now.",
    ],
    cards: {
      "icici-amazonpay": "The most popular free card in India for good reason. It pays 5% on Amazon for Prime members, 2% on Amazon Pay partners and bill payments, and 1% on everything else, with no cap. If you shop on Amazon at all, this is the easiest recommendation.",
      "federal-scapia": "A free travel card. It has zero forex markup and earns about 2% in Scapia coins on regular spends, or more on travel booked through Scapia. Domestic lounge access needs ₹20,000 of monthly spend since February 2026.",
      "indusind-tiger": "A rare free card with lounge access that doesn't depend on spending: 8 domestic and 2 international visits a year. The reward rate climbs as your annual spend grows, and since June 2026 points convert 1:1 to Air India miles.",
      "idfc-select": "A free card with points that never expire and zero forex markup on all IDFC FIRST cards from September 2026. You earn 10X rewards on monthly spends above ₹20,000.",
      "idfc-millennia": "The entry-level IDFC FIRST card with the same zero-forex benefit and points that never expire. A good first card if your spending is modest.",
      "onecard": "A free metal card with one of the best card apps in India. It gives 5X rewards on your top two spending categories each month, and has a low 1% forex markup.",
      "axis-kiwi": "A free RuPay card built for UPI. It pays 1.5% on offline UPI payments made through the Kiwi app, with no cap. Useful if you pay at shops by scanning QR codes.",
    },
    sections: [
      { h: "Lifetime free vs first-year free", paras: [
        "Some cards advertise themselves as 'free' but only waive the fee for the first year. BOBCARD Eterna, for example, stopped being lifetime free in September 2026 and now charges ₹2,499 from year two unless you spend ₹2.5 lakh. Always check the annual (renewal) fee, not just the joining fee.",
      ]},
      { h: "How to choose", list: [
        "<b>You shop on Amazon:</b> Amazon Pay ICICI.",
        "<b>You travel abroad:</b> Scapia Federal or IDFC FIRST (zero forex).",
        "<b>You want lounges without paying a fee:</b> IndusInd Tiger.",
        "<b>You pay mostly by UPI:</b> Kiwi Axis RuPay.",
      ]},
    ],
    faq: [
      ["Do lifetime-free cards hurt my credit score?", "No. Like any card, applying causes a hard enquiry, but holding a free card for years helps your score by lengthening your credit history and increasing your available credit."],
      ["Can a bank start charging a fee on a lifetime-free card?", "Banks can change terms with notice, as BOBCARD did with Eterna in 2026. It's rare for cards sold as lifetime free, and you can always close the card if a fee is introduced."],
    ],
  },
  {
    slug: "best-cashback-credit-cards-india",
    title: "Best Cashback Credit Cards in India (2026)",
    description: "Compare the best cashback credit cards in India: SBI Cashback, HSBC Live+, Amazon Pay ICICI, Flipkart Axis, Swiggy HDFC BLCK and more, with 2026 caps explained.",
    intro: [
      "Cashback cards are the simplest way to earn from your spending. There are no points to track and no redemption catalogues, just money credited back to your statement or wallet. For most people spending ₹20,000–₹60,000 a month, a good cashback card beats a complicated rewards card.",
      "The key numbers to compare are the cashback rate, the monthly cap, and the excluded categories. Several popular cashback cards were cut in 2026, so older 'best card' lists are often out of date.",
    ],
    cards: {
      "sbi-cashback": "Still the simplest high-cashback card: 5% on almost any online spend, with no merchant restrictions. From April 2026, online cashback is capped at ₹2,000 per statement cycle and offline cashback (1%) has its own ₹2,000 cap. Rent, fuel, utilities and wallet loads earn nothing.",
      "hsbc-liveplus": "Pays 10% on dining, food delivery, groceries, shopping and utilities, up to ₹1,200 a month, then 1.5% unlimited on everything else. That 1.5% base rate is one of the best in India. It's only issued in selected cities.",
      "icici-amazonpay": "Lifetime free: 5% on Amazon (Prime), 2% on partners and bills, 1% elsewhere with no cap. The best free cashback card.",
      "axis-flipkart": "5% on Flipkart and Cleartrip, 7.5% on Myntra (each capped at ₹4,000 a quarter), 4% on Swiggy, Uber and PVR, and 1% elsewhere. Lounge access was removed in 2025.",
      "hdfc-swiggy-blck": "10% on Swiggy and 5% on many online categories, each capped at ₹1,500 a month. Great if food delivery is a big part of your spending.",
      "sc-smart": "A simple card with 2% on all online spends and 1% offline, with a modest cap. Suits people who want flat online cashback without choosing specific apps.",
    },
    sections: [
      { h: "A simple way to pick", paras: [
        "Add up your monthly spending in each category, multiply by each card's rate, apply the caps, then subtract the annual fee if you won't reach the waiver threshold. That's exactly what the <a href=\"/\">CardWise recommender</a> does for you in about a minute.",
        "Many people get the most value from two cards: one broad cashback card (SBI Cashback or HSBC Live+) and one for their favourite shopping app (Amazon Pay ICICI or Flipkart Axis).",
      ]},
    ],
    faq: [
      ["Is cashback taxable in India?", "Credit card cashback on your own spending is generally treated as a discount on purchases, not income, for individuals. Check with a tax adviser if you have large or business-related amounts."],
      ["What's better, cashback or reward points?", "Cashback is better for most people because the value is clear and guaranteed. Points can be worth more if you redeem them for flights or hotels, but that takes effort and point values change often."],
    ],
  },
  {
    slug: "best-credit-cards-online-shopping-amazon-flipkart",
    title: "Best Credit Cards for Amazon, Flipkart & Online Shopping (2026)",
    description: "Which credit card is best for Amazon, Flipkart, Myntra and online shopping in India? Compare Amazon Pay ICICI, Flipkart Axis, SBI Cashback, HDFC Millennia and more.",
    intro: [
      "If most of your shopping happens online, the right card can give you 5% or more back on every order. The best card depends on where you shop. Co-branded cards like Amazon Pay ICICI and Flipkart Axis are strongest on their own platform, while cards like SBI Cashback pay well across all online stores.",
    ],
    cards: {
      "icici-amazonpay": "The default choice for Amazon shoppers: 5% for Prime members (3% otherwise), no annual fee, and no cap. Cashback arrives as Amazon Pay balance.",
      "axis-flipkart": "The best card for Flipkart (5%) and Myntra (7.5%), each capped at ₹4,000 a quarter. It also pays 4% on Swiggy, Uber and PVR.",
      "sbi-cashback": "5% on nearly every online merchant, which makes it ideal if you shop across many sites. Capped at ₹2,000 per cycle for online spends from April 2026.",
      "hdfc-millennia": "5% on a fixed list of 10 popular apps (Amazon, Flipkart, Myntra, Swiggy, Zomato and more), capped at ₹1,000 a month.",
      "bob-eterna": "About 3.75% value on online shopping, dining and travel. It's first-year free, then ₹2,499 unless you spend ₹2.5 lakh a year.",
      "amex-smartearn": "10X Membership Rewards on Flipkart and Uber and 5X on Amazon, Swiggy and Zomato, for a low fee. Amex acceptance is narrower than Visa or Mastercard.",
    },
    sections: [
      { h: "How to choose", list: [
        "<b>Mostly Amazon:</b> Amazon Pay ICICI (free, uncapped).",
        "<b>Mostly Flipkart or Myntra:</b> Flipkart Axis.",
        "<b>Many different sites:</b> SBI Cashback.",
        "<b>Heavy spender on both:</b> hold Amazon Pay ICICI plus Flipkart Axis or SBI Cashback.",
      ]},
      { h: "Bank offers vs card rewards", paras: [
        "During sales, platforms run instant discounts with specific banks, often 10% up to a limit. These are separate from your card's own cashback, and you often get both. Having cards from two or three different banks lets you use more sale offers.",
      ]},
    ],
    faq: [
      ["Do I get card cashback on EMI purchases?", "Usually yes for regular EMI, but many cards exclude or reduce rewards on no-cost EMI or on the processing fee. Check your card's terms."],
      ["Does buying gift cards count as online shopping?", "Increasingly, no. Many banks excluded gift cards and vouchers from rewards in 2025–26 (Axis Bank from August 2026, for example)."],
    ],
  },
  {
    slug: "best-fuel-credit-cards-india",
    title: "Best Fuel Credit Cards in India (2026)",
    description: "Save up to 7% on petrol and diesel with the best fuel credit cards in India: BPCL SBI Octane, IndianOil HDFC, HPCL Super Saver ICICI and IndianOil Axis compared.",
    intro: [
      "Most credit cards give nothing on fuel. Fuel is usually excluded from rewards, and you pay a 1% fuel surcharge. If you spend ₹3,000 or more a month on petrol or diesel, a dedicated fuel card can save you 4–7%, which is ₹1,500–₹3,000 a year or more.",
      "Every fuel card is tied to one oil company: BPCL, IndianOil or HPCL. The single most important question is which pumps are near your home and on your commute.",
    ],
    cards: {
      "sbi-bpcl-octane": "The highest fuel return, about 7.25% at BPCL pumps including the surcharge waiver. It also pays 10X on dining, groceries and movies, and includes 4 domestic lounge visits a year. The fee is ₹1,499, waived on ₹2 lakh annual spend.",
      "hdfc-indianoil": "5% as Fuel Points at IndianOil, plus 5% on groceries and bill payments, for a low ₹500 fee. Monthly caps on accelerated points make it best for moderate fuel spenders.",
      "icici-hpcl-supersaver": "4% cashback plus a 1% surcharge waiver at HPCL, and 5% on utilities and grocery stores. The RuPay variant also works on UPI.",
      "axis-indianoil": "4% value back plus the surcharge waiver at IndianOil, and 1% on online shopping. A simple, low-fee option.",
    },
    sections: [
      { h: "Understanding the fuel surcharge waiver", paras: [
        "Pumps charge about 1% extra on card payments. Most cards refund it only for transactions within a range (commonly ₹400–₹4,000) and up to a monthly limit. Very large single fills may not get the waiver, so it can be better to split them.",
      ]},
    ],
    faq: [
      ["Can I use a BPCL card at an IndianOil pump?", "You can pay with it, but you'll only get the base reward rate (often close to zero) and may not get the surcharge waiver. Fuel cards pay well only at their partner brand."],
      ["Is a fuel card worth it if I spend ₹2,000 a month on fuel?", "Probably not on its own. At 5% that's about ₹1,200 a year. It's worth it if the card also covers your groceries or bills, or if the fee is waived."],
    ],
  },
  {
    slug: "best-travel-credit-cards-lounge-access",
    title: "Best Travel Credit Cards with Lounge Access in India (2026)",
    description: "Compare India's best travel credit cards for airport lounges, air miles and hotel rewards after the 2026 changes: Axis Atlas, HDFC Regalia Gold, Infinia, Scapia, IndusInd Tiger.",
    intro: [
      "Travel cards earn airline miles or points worth more when redeemed for flights and hotels, and many include airport lounge access. Lounge rules changed a lot in 2025–26. Most banks now require a minimum spend in the previous quarter, and HDFC moved to digital lounge vouchers. So the 'free lounge' card you remember may no longer be free.",
    ],
    cards: {
      "indusind-tiger": "Lifetime free with 8 domestic and 2 international lounge visits a year and no spending requirement, which is unusual in 2026. Points convert 1:1 to Air India miles.",
      "federal-scapia": "Lifetime free, zero forex, and about 2% back in travel coins (more when booking through Scapia). Unlimited domestic lounges once you spend ₹20,000 a month.",
      "hdfc-regalia-gold": "A popular mid-premium card with Priority Pass for international lounges. Domestic lounges now need ₹60,000 of quarterly spend (3 visits a quarter). The reward rate was cut to 5 points per ₹200 in May 2026.",
      "axis-atlas": "Earns 5 EDGE Miles per ₹100 on travel and 2 elsewhere, with tiered lounge access. Airline transfer caps were tightened in September 2026, which reduces its value for heavy users.",
      "hsbc-travelone": "4 points per ₹100 on travel with 1:1 transfers to many airline and hotel partners, including Accor. Often recommended as the Axis Atlas replacement after Axis dropped partners.",
      "hdfc-infinia": "The top Indian travel card for high spenders: about 3.3% base, up to 10X via SmartBuy, and unlimited lounges. It's largely invite-only and needs ₹18 lakh a year of spend to keep from 2027.",
    },
    sections: [
      { h: "Lounge access in 2026: what changed", list: [
        "HDFC: digital lounge vouchers, with higher quarterly spend thresholds on most cards.",
        "Axis: Priority Pass no longer works at domestic lounges; use the physical card instead (August 2026).",
        "IDFC FIRST: Select and Wealth lounge visits halved and spend-gated (April 2026).",
        "IndusInd: premium cards need ₹5 lakh of quarterly spend for lounge access, but Tiger has no spend requirement.",
      ]},
    ],
    faq: [
      ["Which card gives free lounge access without spending conditions?", "In our database, IndusInd Tiger offers 8 domestic and 2 international visits a year with no spend requirement, and it's lifetime free."],
      ["Are air miles better than cashback?", "Miles can be worth ₹1–2 each when transferred to airlines for premium flights, beating 2% cashback. But transfer partners and caps change often (Axis cut several in 2026), so only choose miles if you actually fly regularly."],
    ],
  },
  {
    slug: "first-credit-card-no-credit-history",
    title: "How to Get Your First Credit Card With No Credit History",
    description: "No CIBIL score? Here's how to get your first credit card in India: FD-backed cards like IDFC FIRST WOW and Kotak 811, plus easy-approval options, and how to build your score.",
    intro: [
      "Banks decide on credit cards largely based on your credit history, your CIBIL score. But you can't build a history without credit. The way out of this loop is a secured credit card backed by a fixed deposit (FD), or an entry-level card from a bank where you already have an account.",
    ],
    cards: {
      "idfc-wow": "Issued against a fixed deposit, so there's no income proof or credit check. It's lifetime free, has zero forex markup, and reports to credit bureaus, so on-time payments build your score.",
      "kotak-811": "Lifetime free and can be issued against a Kotak 811 FD, fully digitally. A simple first card to start building history.",
      "axis-kiwi": "A lifetime-free RuPay card for UPI payments with 1.5% back on offline UPI spends. Approval depends on the bank's checks, but it's a common first card.",
      "icici-amazonpay": "Easier to get if you already bank with ICICI or shop heavily on Amazon. It's lifetime free, so there's no cost to keeping it as your oldest account.",
    },
    sections: [
      { h: "Building your credit score, step by step", list: [
        "Start with one secured or entry-level card.",
        "Use it for a few regular expenses (a phone bill, groceries) and keep usage under 30% of your limit.",
        "Pay the full statement amount on or before the due date, every month. Set up auto-debit.",
        "After 6–12 months of on-time payments, you'll usually have a score good enough for an unsecured card with better rewards.",
        "Keep your first card open. Its age helps your score.",
      ]},
      { h: "Mistakes to avoid", paras: [
        "Don't apply for many cards at once. Each application is a hard enquiry and several in a short time lower your score. Avoid paying only the minimum due: interest on credit cards in India is often 3.5–3.75% a month (over 40% a year).",
      ]},
    ],
    faq: [
      ["Will an FD-backed card really improve my CIBIL score?", "Yes. Secured cards are reported to credit bureaus just like regular cards, so on-time payments build your history."],
      ["Can students get a credit card in India?", "Students without income usually can't get an unsecured card, but can get an FD-backed card, or an add-on card on a parent's account (though an add-on doesn't build the student's own history)."],
    ],
  },
  {
    slug: "zero-forex-credit-cards-international-travel",
    title: "Best Zero Forex Markup Credit Cards in India (2026)",
    description: "Stop paying 3.5% on foreign spends. The best zero and low forex markup credit cards in India for travel abroad and international websites, including IDFC FIRST and Scapia.",
    intro: [
      "Most Indian credit cards add a 3.5% forex markup (plus GST on it) to every foreign-currency transaction, whether you're shopping abroad or paying a foreign website. On a ₹2 lakh international trip, that's over ₹8,000 in fees. A zero-forex card removes that cost entirely.",
      "Good news for 2026: IDFC FIRST Bank removed forex markup on all its credit cards from September 2026, so there are now several free options.",
    ],
    cards: {
      "federal-scapia": "Lifetime free, zero forex, and it earns about 2% in travel coins on international spends. A favourite with frequent travellers.",
      "idfc-wow": "FD-backed, lifetime free, and zero forex. The easiest zero-forex card to get, even without credit history.",
      "idfc-select": "Lifetime free with zero forex from September 2026, plus 10X rewards above ₹20,000 monthly spend.",
      "idfc-wealth": "Premium lifetime-free card with zero forex, lounges and golf, for higher incomes.",
      "onecard": "Lifetime free with a low 1% forex markup and a good app for tracking foreign spends.",
      "indusind-tiger": "Lifetime free with a 1.5% forex markup, and lounge access that doesn't depend on spending.",
    },
    sections: [
      { h: "Always pay in the local currency", paras: [
        "Abroad, card machines and websites often offer to charge you in rupees. This is called Dynamic Currency Conversion (DCC), and its exchange rate is usually much worse than your bank's. Always choose to pay in the local currency. Some banks (HDFC from 2026) also charge a separate 1.75% fee on rupee transactions processed abroad.",
      ]},
    ],
    faq: [
      ["Is zero forex the same as no international fees?", "Not quite. Zero markup means no percentage fee on the conversion, but ATM cash withdrawals abroad still attract cash-advance fees and interest from day one. Use the card for purchases, not cash."],
      ["Do I pay GST on forex markup?", "Yes, 18% GST applies to the markup, which is another reason zero-markup cards save more than the headline 3.5%."],
    ],
  },
];
