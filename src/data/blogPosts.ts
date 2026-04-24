// Bilingual blog post content (English + Burmese / မြန်မာ)
// Each post has structured sections so the layout component can render
// consistent typography across all articles.

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogContent = {
  intro: string;
  sections: BlogSection[];
  conclusion: string;
};

export type BlogPost = {
  slug: string;
  category: string;
  readMinutes: number;
  publishedOn: string; // ISO date
  en: {
    title: string;
    description: string; // meta description / excerpt
    content: BlogContent;
  };
  my: {
    title: string;
    description: string;
    content: BlogContent;
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "introduction-to-forex-trading",
    category: "Forex",
    readMinutes: 7,
    publishedOn: "2025-01-12",
    en: {
      title: "Introduction to Forex Trading: A Complete Beginner's Guide",
      description:
        "Learn the fundamentals of the foreign exchange market — how currency pairs work, who the major players are, and how to start trading responsibly.",
      content: {
        intro:
          "The foreign exchange market — better known as Forex or FX — is the largest financial market on the planet, with over $7 trillion changing hands every single day. Unlike the stock market, Forex never sleeps: it runs 24 hours a day, five days a week, across financial centres in Tokyo, London, New York, and Sydney. For beginners, this scale can feel intimidating, but the underlying idea is surprisingly simple — you are buying one currency while simultaneously selling another.",
        sections: [
          {
            heading: "What is Forex Trading?",
            paragraphs: [
              "Forex trading is the act of exchanging one currency for another with the goal of profiting from changes in exchange rates. When you travel abroad and convert your local money into foreign cash, you are technically participating in the Forex market — just at the retail tourist level.",
              "Professional Forex trading uses currency pairs such as EUR/USD, GBP/JPY, or USD/MMK. The first currency in the pair is called the base currency; the second is the quote currency. The price tells you how much of the quote currency you need to buy one unit of the base currency.",
            ],
          },
          {
            heading: "Who Trades Forex and Why?",
            paragraphs: [
              "The participants range from massive central banks managing national reserves, to multinational corporations hedging foreign revenue, to retail traders speculating from a laptop at home. Each player has different motivations, but all of them contribute to the deep liquidity that makes Forex so attractive.",
              "Retail traders are typically drawn to Forex for three reasons: low entry barriers, leverage that can amplify small accounts, and round-the-clock access. However, the same leverage that creates opportunity also magnifies losses, which is why education must come before capital.",
            ],
          },
          {
            heading: "How to Start Trading Safely",
            paragraphs: [
              "Begin with a regulated broker — check that your broker is licensed by a recognised authority such as the FCA, ASIC, or CySEC. Open a demo account first and practise for at least one to three months without risking real money. Treat the demo seriously, as if every dollar were real.",
              "Once you go live, never risk more than 1–2% of your account on a single trade, always set a stop loss, and keep a written trading journal. The traders who survive long-term are not the ones with the smartest predictions — they are the ones with the strictest risk discipline.",
            ],
          },
          {
            heading: "Common Mistakes to Avoid",
            paragraphs: [
              "Overleveraging is the number one account killer. Just because your broker offers 1:500 leverage does not mean you should use it. Other frequent mistakes include revenge trading after a loss, removing stop losses 'just this once', and chasing tips from social media influencers.",
            ],
          },
        ],
        conclusion:
          "Forex trading is a marathon, not a sprint. Spend more time learning than trading in your first year, focus on protecting your capital before chasing profits, and always remember: the market will still be here tomorrow. Slow, consistent growth beats fast, reckless gains every single time.",
      },
    },
    my: {
      title: "Forex Trading အကြောင်း မိတ်ဆက် — အခြေခံအစကနေ စလေ့လာရန်",
      description:
        "နိုင်ငံခြားငွေ ဖလှယ်ရေးစျေးကွက်၏ အခြေခံများ၊ Currency Pair များမည်သို့လုပ်ဆောင်သည်နှင့် တာဝန်ယူမှုရှိစွာ စတင်ရောင်းဝယ်နည်းကို လေ့လာပါ။",
      content: {
        intro:
          "Forex (FX) ဆိုသည်မှာ ကမ္ဘာ့အကြီးဆုံး ငွေကြေးစျေးကွက်ဖြစ်ပြီး တစ်နေ့လျှင် အမေရိကန်ဒေါ်လာ ၇ ထရီလီယံကျော် ပြောင်းလဲရောင်းဝယ်နေသော စျေးကွက်တစ်ခုဖြစ်သည်။ စတော့စျေးကွက်နှင့်မတူဘဲ Forex သည် တနင်္လာမှ သောကြာအထိ ၂၄ နာရီ ဖွင့်လှစ်ထားသည်။ အစပိုင်းတွင် ရှုပ်ထွေးပုံပေါ်နိုင်သော်လည်း အခြေခံအယူအဆမှာ ရိုးရှင်းပါသည် — ငွေကြေးတစ်မျိုးကို ဝယ်ယူပြီး အခြားငွေကြေးတစ်မျိုးကို တစ်ပြိုင်နက် ရောင်းချခြင်းဖြစ်သည်။",
        sections: [
          {
            heading: "Forex Trading ဆိုတာဘာလဲ",
            paragraphs: [
              "Forex Trading သည် ငွေလဲလှယ်နှုန်းပြောင်းလဲမှုမှ အကျိုးအမြတ်ရရှိရန် ငွေကြေးတစ်မျိုးကို အခြားငွေကြေးတစ်မျိုးနှင့် လဲလှယ်ခြင်းဖြစ်သည်။ နိုင်ငံခြားသွားရောက်စဉ် မိမိငွေကို ပြည်ပငွေဖြင့် လဲလှယ်ခြင်းသည်လည်း Forex စျေးကွက်ထဲမှာ ပါဝင်နေခြင်းပင် ဖြစ်သည်။",
              "Professional Forex Trading တွင် EUR/USD, GBP/JPY, USD/MMK ကဲ့သို့ Currency Pair များကို အသုံးပြုသည်။ ပထမငွေကြေးကို Base Currency ဟုခေါ်ပြီး ဒုတိယငွေကြေးကို Quote Currency ဟုခေါ်သည်။",
            ],
          },
          {
            heading: "ဘယ်သူတွေက ဘာကြောင့် Forex ရောင်းဝယ်ကြသလဲ",
            paragraphs: [
              "ပါဝင်သူများတွင် နိုင်ငံတော် ဘဏ်များ၊ နိုင်ငံတကာကုမ္ပဏီများ၊ နှင့် အိမ်တွင်နေ Laptop ဖြင့် ရောင်းဝယ်သော Retail Trader များ ပါဝင်သည်။ အားလုံးက Forex စျေးကွက်၏ Liquidity ကို ထောက်ပံ့ပေးကြသည်။",
              "Retail Trader များအတွက် Forex ၏ ဆွဲဆောင်မှုမှာ စတင်ရန်ငွေနည်းနည်းသာလိုခြင်း၊ Leverage ဖြင့် Account သေးသေးကိုပင် ချဲ့နိုင်ခြင်း၊ နှင့် ၂၄ နာရီ ရောင်းဝယ်နိုင်ခြင်း တို့ဖြစ်သည်။ သို့သော် Leverage သည် အရှုံးကိုလည်း ချဲ့ထွင်နိုင်သဖြင့် ပညာရေးသည် မတည်ငွေထက် အရင် လာရမည်။",
            ],
          },
          {
            heading: "လုံခြုံစွာ စတင်ရောင်းဝယ်နည်း",
            paragraphs: [
              "FCA, ASIC သို့မဟုတ် CySEC ကဲ့သို့ စစ်မှန်သော အာဏာပိုင်များက ထောက်ခံထားသော Broker များကိုသာ ရွေးချယ်ပါ။ Demo Account ဖြင့် အနည်းဆုံး ၁ လမှ ၃ လအထိ လေ့ကျင့်ပါ။ Demo ကို ဒေါ်လာအစစ်လို သဘောထားလေ့ကျင့်ပါ။",
              "Live Account သို့ ပြောင်းသောအခါ တစ်ခုတည်းသော Trade တွင် မိမိ Account ၏ ၁% မှ ၂% ထက် မစောင့်ပါနှင့်။ Stop Loss ကို အမြဲထားပြီး Trading Journal ကို မှတ်တမ်းတင်ပါ။ ရေရှည်အောင်မြင်သော Trader များသည် အကောင်းဆုံးခန့်မှန်းနိုင်သူများမဟုတ်ဘဲ စည်းကမ်းအတိအကျရှိသူများသာ ဖြစ်သည်။",
            ],
          },
          {
            heading: "ရှောင်ရှားရမည့် အမှားများ",
            paragraphs: [
              "Leverage လွန်အသုံးပြုခြင်းသည် Account ဆုံးရှုံးရခြင်း၏ အကြီးဆုံး အကြောင်းရင်းဖြစ်သည်။ Broker က 1:500 Leverage ပေးသည်ဆိုခြင်းသည် မိမိအသုံးပြုသင့်သည်ဟု မဆိုလိုပါ။ ရှုံးပြီးနောက် 'Revenge Trading' လုပ်ခြင်း၊ Stop Loss ကို 'ဒီတစ်ခါပဲ' ဟုဆိုပြီး ဖြုတ်ခြင်းတို့ကိုလည်း ရှောင်ရှားပါ။",
            ],
          },
        ],
        conclusion:
          "Forex Trading သည် အပြေးပြိုင်ပွဲမဟုတ်ဘဲ Marathon ဖြစ်သည်။ ပထမနှစ်တွင် ရောင်းဝယ်ချိန်ထက် လေ့လာချိန်ကို ပိုမိုအသုံးပြုပါ။ အမြတ်မလိုက်ခင် မိမိမတည်ငွေကို ကာကွယ်ပါ။ စျေးကွက်သည် မနက်ဖြန်လည်း ရှိနေဦးမည်ဖြစ်သည်။",
      },
    },
  },
  {
    slug: "how-to-use-lot-size-calculator-safely",
    category: "Risk Management",
    readMinutes: 6,
    publishedOn: "2025-01-18",
    en: {
      title: "How to Use a Lot Size Calculator Safely",
      description:
        "A practical guide to position sizing in Forex — learn how to calculate the correct lot size for every trade so a single bad call cannot wipe out your account.",
      content: {
        intro:
          "Position sizing is the silent skill that separates professional traders from gamblers. Two traders can use the exact same strategy and reach completely different outcomes simply because one of them sized their trades correctly and the other did not. A Lot Size Calculator removes guesswork from this critical decision — but only if you use it properly.",
        sections: [
          {
            heading: "What Is a Lot in Forex?",
            paragraphs: [
              "A 'lot' is the standardised unit used to measure trade volume in Forex. A standard lot is 100,000 units of the base currency, a mini lot is 10,000 units, and a micro lot is 1,000 units. The smaller the lot size, the smaller the monetary value of each pip — and therefore the smaller your potential gain or loss.",
            ],
          },
          {
            heading: "The Three Inputs You Must Get Right",
            paragraphs: [
              "Every Lot Size Calculator needs three honest inputs: your account balance, the percentage you are willing to risk on this trade, and the distance in pips between your entry and your stop loss. Lying to yourself on any of these three numbers makes the calculator useless.",
              "A safe risk percentage for most retail traders is between 0.5% and 2% per trade. If you are still learning, stay closer to 0.5%. Once your strategy has shown a positive expectancy across at least 100 trades, you can consider gradually moving up.",
            ],
          },
          {
            heading: "Step-by-Step: Using the Calculator Correctly",
            paragraphs: [
              "Step 1 — Decide your stop loss BEFORE opening the calculator. The stop loss should be based on market structure (recent swing high/low, support/resistance), not on how much money you feel like risking.",
              "Step 2 — Enter your real account balance, not your hoped-for balance. Step 3 — Enter your maximum acceptable risk percentage. Step 4 — Enter the pip distance to your stop loss. The calculator then outputs the exact lot size that keeps your loss capped at the chosen percentage if the stop is hit.",
            ],
          },
          {
            heading: "Common Mistakes That Defeat the Purpose",
            paragraphs: [
              "Many traders calculate the correct lot size, then increase it 'because they feel confident about this one'. This single habit is responsible for the majority of blown accounts. Another mistake is widening the stop loss after entry to 'give the trade more room' — this silently doubles or triples your real risk.",
              "Always trust the math, not the emotion. The calculator is your shield; using it inconsistently is the same as not using it at all.",
            ],
          },
        ],
        conclusion:
          "A Lot Size Calculator is one of the simplest and most powerful tools in trading, but it only protects you if you respect its output. Combine consistent position sizing with a written trading plan, and you have already done more than 90% of retail traders to give yourself a real long-term edge.",
      },
    },
    my: {
      title: "Lot Size Calculator ကို လုံခြုံစွာ အသုံးပြုနည်း",
      description:
        "Forex တွင် Position Sizing လုပ်နည်း — Trade တစ်ခုက သင့် Account တစ်ခုလုံးကို မဖျက်ဆီးနိုင်ရန် မှန်ကန်သော Lot Size တွက်နည်းကို လေ့လာပါ။",
      content: {
        intro:
          "Position Sizing သည် Professional Trader နှင့် လောင်းကစားသမားကို ခွဲခြားပေးသော တိတ်တဆိတ် ကျွမ်းကျင်မှုဖြစ်သည်။ Trader နှစ်ဦးသည် တူညီသော Strategy ကိုသုံးပြီးမှ တစ်ဦးက Lot Size မှန်ကန်စွာထား၍ နောက်တစ်ဦးက မမှန်ကန်သဖြင့် ရလဒ်များ ကွဲပြားသွားနိုင်သည်။ Lot Size Calculator သည် ဤအရေးကြီးသော ဆုံးဖြတ်ချက်အတွက် မှန်းဆခြင်းကို ဖယ်ရှားပေးနိုင်သည် — သို့သော် မှန်ကန်စွာ အသုံးပြုမှသာ။",
        sections: [
          {
            heading: "Forex မှာ Lot ဆိုတာဘာလဲ",
            paragraphs: [
              "Lot သည် Forex တွင် Trade Volume ကို တိုင်းတာသော စံသတ်မှတ်ထားသော ယူနစ်ဖြစ်သည်။ Standard Lot = ၁၀၀,၀၀၀ Unit၊ Mini Lot = ၁၀,၀၀၀ Unit၊ Micro Lot = ၁,၀၀၀ Unit။ Lot Size သေးလေ၊ Pip တစ်ခု၏ ငွေတန်ဖိုးနည်းလေ၊ မိမိ၏ အကျိုးအမြတ်/အရှုံး နည်းလေ ဖြစ်သည်။",
            ],
          },
          {
            heading: "မှန်ကန်ရမည့် အချက် ၃ ချက်",
            paragraphs: [
              "Lot Size Calculator တိုင်းတွင် မှန်ကန်သော Input ၃ ခု လိုအပ်သည် — Account လက်ကျန်ငွေ၊ ဤ Trade တွင် ရှုံးနိုင်သော % နှင့် Entry မှ Stop Loss ထိ Pip အကွာအဝေး။ ဤနံပါတ်များကို မိမိကိုယ်ကို လိမ်ညာပါက Calculator သည် အသုံးမဝင်တော့ပါ။",
              "Retail Trader အများစုအတွက် တစ် Trade လျှင် Risk % သည် 0.5% မှ 2% အကြားဖြစ်သင့်သည်။ စတင်လေ့လာနေဆဲဖြစ်ပါက 0.5% နီးပါးတွင်ထားပါ။",
            ],
          },
          {
            heading: "Calculator ကို မှန်ကန်စွာ အသုံးပြုနည်း",
            paragraphs: [
              "အဆင့် ၁ — Calculator မဖွင့်မီ Stop Loss ကို ဆုံးဖြတ်ပါ။ Stop Loss သည် မိမိ ရှုံးချင်သော ငွေပမာဏအပေါ် မဟုတ်ဘဲ Market Structure (Support/Resistance) အပေါ် အခြေခံရမည်။",
              "အဆင့် ၂ — အမှန်တကယ် Account လက်ကျန်ငွေ ထည့်ပါ။ အဆင့် ၃ — လက်ခံနိုင်သော Risk % ထည့်ပါ။ အဆင့် ၄ — Stop Loss အထိ Pip အကွာအဝေး ထည့်ပါ။ Calculator က ထည့်ထားသော Risk % အတိအကျနှင့် ကိုက်ညီသော Lot Size ကို ထုတ်ပေးပါမည်။",
            ],
          },
          {
            heading: "ရည်ရွယ်ချက်ကို ဖျက်ဆီးသော အမှားများ",
            paragraphs: [
              "Trader အများစုသည် မှန်ကန်သော Lot Size ကို တွက်ပြီး 'ဒီတစ်ခုကို ကောင်းမယ်ထင်လို့' ဆိုပြီး တိုးထည့်ကြသည်။ ဤအလေ့အကျင့်တစ်ခုတည်းကြောင့် Account များစွာ ပျက်စီးခဲ့သည်။ နောက်အမှားတစ်ခုမှာ Entry လုပ်ပြီးမှ Stop Loss ကို 'နေရာပိုပေးချင်လို့' ဆိုပြီး ကျယ်ပေးခြင်းဖြစ်သည်။",
              "Math ကို ယုံပါ၊ စိတ်ခံစားမှုကို မယုံပါနှင့်။ Calculator သည် မိမိ၏ ဒိုင်းဖြစ်သည်။",
            ],
          },
        ],
        conclusion:
          "Lot Size Calculator သည် ရိုးရှင်းသော်လည်း အင်အားအကြီးဆုံး Tool တစ်ခုဖြစ်သည်။ ၎င်း၏ ရလဒ်ကို လေးစားအသုံးပြုမှသာ မိမိကို ကာကွယ်နိုင်ပါမည်။ Position Sizing ကို တသမတ်တည်း လုပ်ခြင်းဖြင့် Retail Trader ၉၀% ထက် ပိုသာသော အနေအထားသို့ ရောက်နိုင်ပါမည်။",
      },
    },
  },
  {
    slug: "top-5-crypto-security-tips",
    category: "Crypto Security",
    readMinutes: 6,
    publishedOn: "2025-01-25",
    en: {
      title: "Top 5 Crypto Security Tips Every Holder Must Follow",
      description:
        "Protect your crypto from hacks, phishing, and exchange failures with these five essential security practices used by serious long-term holders.",
      content: {
        intro:
          "In crypto, you are your own bank — which means you are also your own security team. Unlike a traditional bank account, a stolen crypto wallet cannot be reversed, refunded, or recovered through customer support. The good news: a few simple habits can put you ahead of 95% of users and dramatically lower your risk of ever losing a single satoshi.",
        sections: [
          {
            heading: "1. Use a Hardware Wallet for Long-Term Holdings",
            paragraphs: [
              "If you hold more than a few hundred dollars in crypto for the long term, a hardware wallet (Ledger, Trezor, etc.) is non-negotiable. These devices store your private keys offline, completely isolated from internet-based attacks. Even a fully compromised computer cannot drain a properly used hardware wallet.",
            ],
          },
          {
            heading: "2. Never Share Your Seed Phrase — Ever",
            paragraphs: [
              "Your 12 or 24 word seed phrase IS your wallet. Anyone who sees it can take everything you own, instantly and irreversibly. Never type it on a website, never save it in cloud storage, never photograph it, and never share it with 'support staff' — real support will never ask for it.",
              "Write it on paper or stamp it on metal, store it in at least two physically separate locations, and treat it with the same seriousness you would treat a million dollars in cash.",
            ],
          },
          {
            heading: "3. Enable Two-Factor Authentication (App-Based, Not SMS)",
            paragraphs: [
              "Every exchange and crypto-related account should have 2FA enabled using an authenticator app such as Google Authenticator, Authy, or a hardware key like YubiKey. Avoid SMS-based 2FA whenever possible — SIM-swap attacks have drained countless accounts that relied on text messages.",
            ],
          },
          {
            heading: "4. Beware of Phishing Sites and Fake Apps",
            paragraphs: [
              "Always type exchange URLs manually or use a saved bookmark — never click a link from an email, Telegram, or Twitter DM. Fake websites that look identical to the real thing are one of the most common ways crypto is stolen. On mobile, only download wallet apps from official store links found on the project's verified website.",
            ],
          },
          {
            heading: "5. Don't Keep Everything on One Exchange",
            paragraphs: [
              "Even the most reputable exchanges have failed — FTX, Mt. Gox, Celsius, and others all looked safe right up until the day they weren't. The old crypto saying applies: 'Not your keys, not your coins.' Use exchanges to trade, then withdraw long-term holdings to a wallet you fully control.",
            ],
          },
        ],
        conclusion:
          "Crypto security is not glamorous, but it is the single highest-return activity any holder can practice. Spend one focused weekend setting up a hardware wallet, securing your seed phrase, and enabling app-based 2FA — and you will sleep better for years to come.",
      },
    },
    my: {
      title: "Crypto ပိုင်ဆိုင်သူတိုင်း လိုက်နာသင့်သော လုံခြုံရေး အကြံပြုချက် ၅ ချက်",
      description:
        "Hack ခံရခြင်း၊ Phishing နှင့် Exchange ပျက်စီးခြင်းတို့မှ မိမိ Crypto ကို ကာကွယ်ရန် အရေးကြီးသော လုံခြုံရေး အလေ့အကျင့် ၅ ခု။",
      content: {
        intro:
          "Crypto တွင် မိမိကိုယ်တိုင် ဘဏ်ဖြစ်ပြီး မိမိကိုယ်တိုင် လုံခြုံရေး အဖွဲ့လည်း ဖြစ်သည်။ ရိုးရိုး ဘဏ်စာရင်းနှင့်မတူဘဲ ခိုးခံရသော Crypto Wallet ကို ပြန်လည်ရယူ၍ မရပါ။ သတင်းကောင်းမှာ ရိုးရှင်းသော အလေ့အကျင့်အနည်းငယ်ဖြင့် အသုံးပြုသူ ၉၅% ထက် ပိုလုံခြုံအောင် လုပ်နိုင်ပါသည်။",
        sections: [
          {
            heading: "၁။ ရေရှည်ပိုင်ဆိုင်မှုအတွက် Hardware Wallet ကို သုံးပါ",
            paragraphs: [
              "ဒေါ်လာ ရာဂဏန်းအထက် Crypto ကို ရေရှည်ထားမည်ဆိုပါက Hardware Wallet (Ledger, Trezor) ကို မဖြစ်မနေ သုံးသင့်သည်။ ၎င်းတို့သည် Private Key များကို Internet နှင့် လုံးဝ ခွဲခွာထားသဖြင့် Computer ပျက်စီးနေသော်လည်း မိမိ Coin များ မဆုံးရှုံးနိုင်ပါ။",
            ],
          },
          {
            heading: "၂။ Seed Phrase ကို ဘယ်တော့မှ မပေးပါနှင့်",
            paragraphs: [
              "၁၂ လုံး သို့မဟုတ် ၂၄ လုံးပါ Seed Phrase သည် မိမိ၏ Wallet ပင်ဖြစ်သည်။ မြင်တွေ့သူတိုင်း မိမိ၏ Coin အားလုံးကို ချက်ချင်း ယူနိုင်သည်။ Website တွင် မရိုက်ပါနှင့်၊ Cloud တွင် မသိမ်းပါနှင့်၊ ဓာတ်ပုံ မရိုက်ပါနှင့်၊ 'Support Staff' ဆိုသူကို မပြောပြပါနှင့် — အစစ်အမှန် Support များက Seed Phrase ကို ဘယ်တော့မှ မတောင်းပါ။",
              "စက္ကူပေါ်တွင် ရေး၍ သို့မဟုတ် သတ္တုပေါ်တွင် ထွင်း၍ နေရာ နှစ်ခုတွင် သိမ်းထားပါ။",
            ],
          },
          {
            heading: "၃။ App အခြေခံ 2FA ကို ဖွင့်ပါ (SMS မဟုတ်)",
            paragraphs: [
              "Exchange အကောင့်တိုင်းတွင် Google Authenticator, Authy သို့မဟုတ် YubiKey ကဲ့သို့ Hardware Key ဖြင့် 2FA ကို ဖွင့်သင့်သည်။ SMS အခြေခံ 2FA ကို ရှောင်ရှားပါ — SIM-Swap တိုက်ခိုက်မှုကြောင့် Account များစွာ ဆုံးရှုံးခဲ့ဖူးသည်။",
            ],
          },
          {
            heading: "၄။ Phishing Site နှင့် အတုအယောင် App များကို သတိထားပါ",
            paragraphs: [
              "Exchange URL များကို မိမိကိုယ်တိုင် ရိုက်ထည့်ပါ သို့မဟုတ် Bookmark သုံးပါ — Email, Telegram, Twitter DM မှ Link များကို မနှိပ်ပါနှင့်။ အတုအယောင် Website များသည် Crypto ခိုးယူရာတွင် အသုံးအများဆုံး နည်းလမ်းတစ်ခု ဖြစ်သည်။",
            ],
          },
          {
            heading: "၅။ Exchange တစ်ခုတည်းတွင် အားလုံး မထားပါနှင့်",
            paragraphs: [
              "ထင်ရှားသော Exchange များပင်လျှင် ပျက်စီးခဲ့ဖူးသည် — FTX, Mt. Gox, Celsius တို့သည် ပျက်မည့်နေ့အထိ လုံခြုံပုံပေါ်ခဲ့သည်။ 'Not your keys, not your coins' ဆိုသော စကားအတိုင်း Exchange ကို Trade အတွက်သာ သုံးပြီး ရေရှည် ပိုင်ဆိုင်မှုများကို မိမိကိုယ်တိုင် ထိန်းချုပ်နိုင်သော Wallet သို့ ပြောင်းပါ။",
            ],
          },
        ],
        conclusion:
          "Crypto လုံခြုံရေးသည် ဆွဲဆောင်မှုမရှိသော်လည်း Crypto ပိုင်ဆိုင်သူတိုင်းအတွက် အကောင်းဆုံး ရင်းနှီးမြှုပ်နှံမှု ဖြစ်သည်။ စနေ-တနင်္ဂနွေ တစ်ပတ်စာ အချိန်ပေး၍ Hardware Wallet, Seed Phrase နှင့် 2FA တို့ကို စနစ်တကျ ပြင်ဆင်ပါက နှစ်ပေါင်းများစွာ စိတ်ချစွာ အိပ်စက်နိုင်ပါမည်။",
      },
    },
  },
  {
    slug: "understanding-currency-pairs",
    category: "Forex",
    readMinutes: 5,
    publishedOn: "2025-02-02",
    en: {
      title: "Understanding Currency Pairs: Majors, Minors, and Exotics Explained",
      description:
        "Every Forex trade involves two currencies. Learn how currency pairs are categorised, how to read quotes, and which pairs are best for beginners.",
      content: {
        intro:
          "If Forex is the language of global money, then currency pairs are its vocabulary. Once you understand how pairs are structured and quoted, every chart, broker platform, and economic news headline starts to make a lot more sense. This guide breaks it down in plain English.",
        sections: [
          {
            heading: "How a Currency Pair Is Quoted",
            paragraphs: [
              "A pair such as EUR/USD = 1.0850 simply means that 1 Euro is worth 1.0850 US Dollars. The first currency (EUR) is the base, and the second (USD) is the quote. When the pair rises, the base is getting stronger compared to the quote; when it falls, the quote is getting stronger.",
            ],
          },
          {
            heading: "Major Pairs",
            paragraphs: [
              "Majors are the seven most-traded pairs in the world, and they all include the US Dollar: EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD, and NZD/USD. They have the tightest spreads, the deepest liquidity, and the most predictable behaviour, which makes them the safest starting point for beginners.",
            ],
          },
          {
            heading: "Minor (Cross) Pairs",
            paragraphs: [
              "Minor pairs do not include the US Dollar but pair two other major currencies — for example EUR/GBP, GBP/JPY, or AUD/NZD. Liquidity is still strong, but spreads are usually slightly wider and movements can be sharper, especially around economic news.",
            ],
          },
          {
            heading: "Exotic Pairs",
            paragraphs: [
              "Exotics combine a major currency with a currency from a smaller or emerging economy — for example USD/TRY, USD/ZAR, or USD/MMK. They can offer big moves, but they also come with very wide spreads, sudden gaps, and political risk. Beginners should treat exotics with extreme caution and tiny position sizes if they trade them at all.",
            ],
          },
          {
            heading: "Which Pairs Should Beginners Start With?",
            paragraphs: [
              "EUR/USD is widely considered the best beginner pair because of its tight spreads, abundant educational material, and relatively orderly behaviour. GBP/USD and USD/JPY are also popular starting points. Stick to one or two pairs in your first few months — mastering one pair beats juggling ten.",
            ],
          },
        ],
        conclusion:
          "Currency pairs are simply a way to express the relative value of two currencies. Start with the majors, focus on understanding the economic story behind each currency you trade, and avoid exotics until you have real experience. Mastering pair selection alone will save you many costly lessons.",
      },
    },
    my: {
      title: "Currency Pair များ နားလည်ခြင်း — Major, Minor နှင့် Exotic ရှင်းပြချက်",
      description:
        "Forex Trade တိုင်းတွင် ငွေကြေးနှစ်မျိုး ပါဝင်သည်။ Currency Pair များကို မည်သို့ ခွဲခြားသည်၊ Quote များကို မည်သို့ ဖတ်ရမည် နှင့် Beginner အတွက် မည်သည့် Pair ကောင်းသည်ကို လေ့လာပါ။",
      content: {
        intro:
          "Forex သည် ကမ္ဘာ့ငွေကြေး၏ ဘာသာစကားဖြစ်ပါက Currency Pair များသည် ၎င်း၏ ဝေါဟာရများပင် ဖြစ်သည်။ Pair များ၏ ဖွဲ့စည်းပုံကို နားလည်လိုက်ပါက Chart များ၊ Broker Platform များနှင့် စီးပွားရေး သတင်းများ ပိုမို ရှင်းလင်းသွားပါမည်။",
        sections: [
          {
            heading: "Currency Pair တစ်ခု မည်သို့ Quote လုပ်သလဲ",
            paragraphs: [
              "EUR/USD = 1.0850 ဆိုသည်မှာ ၁ Euro သည် 1.0850 USD တန်သည်ဟု ဆိုလိုသည်။ ပထမငွေကြေး (EUR) သည် Base၊ ဒုတိယ (USD) သည် Quote ဖြစ်သည်။ Pair တက်လာပါက Base ငွေကြေး အားကောင်းလာခြင်းဖြစ်ပြီး ကျသွားပါက Quote ငွေကြေး အားကောင်းလာခြင်း ဖြစ်သည်။",
            ],
          },
          {
            heading: "Major Pair များ",
            paragraphs: [
              "Major Pair များသည် ကမ္ဘာတွင် အရောင်းအဝယ်အများဆုံး ၇ Pair ဖြစ်ပြီး အားလုံးတွင် USD ပါဝင်သည် — EUR/USD, USD/JPY, GBP/USD, USD/CHF, AUD/USD, USD/CAD, NZD/USD။ Spread ကျပ်ပြီး Liquidity ကောင်းသဖြင့် Beginner အတွက် အသင့်တော်ဆုံး ဖြစ်သည်။",
            ],
          },
          {
            heading: "Minor (Cross) Pair များ",
            paragraphs: [
              "Minor Pair များသည် USD မပါဘဲ အခြား Major ငွေကြေး နှစ်မျိုး ပူးတွဲထားခြင်းဖြစ်သည် — ဥပမာ EUR/GBP, GBP/JPY, AUD/NZD။ Liquidity ရှိသော်လည်း Spread အနည်းငယ် ကျယ်ပြီး လှုပ်ရှားမှု ပိုကြီးနိုင်သည်။",
            ],
          },
          {
            heading: "Exotic Pair များ",
            paragraphs: [
              "Exotic Pair များသည် Major ငွေကြေးကို တိုင်းပြည်ငယ်များ၏ ငွေကြေးနှင့် ပူးတွဲထားခြင်း ဖြစ်သည် — ဥပမာ USD/TRY, USD/ZAR, USD/MMK။ ကြီးမားသော လှုပ်ရှားမှုများ ပေးနိုင်သော်လည်း Spread အလွန်ကျယ်ပြီး နိုင်ငံရေးဆိုင်ရာ အန္တရာယ်များ ရှိသည်။ Beginner များ အလွန်သတိထား၍ Lot Size သေးသေးနှင့်သာ ရောင်းဝယ်သင့်သည်။",
            ],
          },
          {
            heading: "Beginner က ဘယ် Pair နဲ့ စသင့်သလဲ",
            paragraphs: [
              "EUR/USD သည် Spread ကျပ်ပြီး လေ့လာစရာ ပစ္စည်းများ ပေါများသဖြင့် Beginner အတွက် အကောင်းဆုံးဟု သတ်မှတ်ထားသည်။ GBP/USD နှင့် USD/JPY တို့လည်း လူကြိုက်များသော အစပြုစရာများ ဖြစ်သည်။ ပထမလများတွင် Pair တစ်ခု သို့မဟုတ် နှစ်ခုကိုသာ ကျွမ်းကျင်အောင် လေ့လာပါ။",
            ],
          },
        ],
        conclusion:
          "Currency Pair များသည် ငွေကြေးနှစ်မျိုး၏ နှိုင်းရတန်ဖိုးကို ဖော်ပြသော နည်းလမ်းသာ ဖြစ်သည်။ Major Pair များမှ စတင်ပြီး Exotic များကို အတွေ့အကြုံရှိမှသာ ထိတွေ့ပါ။ Pair ရွေးချယ်မှု မှန်ကန်ခြင်းတစ်ခုတည်းက ကုန်ကျစရိတ်ကြီးသော သင်ခန်းစာများကို ရှောင်ရှားပေးနိုင်သည်။",
      },
    },
  },
  {
    slug: "risk-management-for-beginners",
    category: "Risk Management",
    readMinutes: 7,
    publishedOn: "2025-02-10",
    en: {
      title: "Risk Management for Beginners: The Skill That Keeps You in the Game",
      description:
        "The traders who survive long term are not the smartest — they are the ones who manage risk best. Learn the core rules every beginner must follow.",
      content: {
        intro:
          "Most beginners obsess over entries: 'Where should I buy?' 'Which indicator is best?' 'What is the perfect strategy?' Meanwhile, professional traders obsess over a much less exciting question: 'How much can I lose if I am wrong?' This single shift in focus is the difference between a 6-month trading career and a 20-year one.",
        sections: [
          {
            heading: "Rule 1: Never Risk More Than 1–2% Per Trade",
            paragraphs: [
              "If your account is $1,000 and you risk 1% per trade, your maximum loss on any single trade is $10. Lose ten in a row — a brutal but realistic streak — and you are still down only ~10%, fully able to recover. Risk 20% per trade instead, and the same losing streak ends your trading career.",
            ],
          },
          {
            heading: "Rule 2: Always Use a Hard Stop Loss",
            paragraphs: [
              "A 'mental stop loss' is not a stop loss. The only stop loss that protects you is the one already placed in the market the moment you opened the trade. Markets move fast, internet connections drop, and emotions take over the longer you stare at a losing position.",
            ],
          },
          {
            heading: "Rule 3: Aim for a Reward-to-Risk Ratio of at Least 1.5:1",
            paragraphs: [
              "If you risk 20 pips, aim to make at least 30 pips. With a 1.5:1 reward-to-risk ratio, you can be wrong 55% of the time and still finish profitable over the long run. This frees you from the impossible pressure of needing to 'predict' the market.",
            ],
          },
          {
            heading: "Rule 4: Limit Daily and Weekly Drawdown",
            paragraphs: [
              "Set a hard rule such as: 'If I lose 3% in a day, I stop trading until tomorrow.' This single rule has saved more accounts than any indicator ever invented. Trading on tilt — angry, frustrated, trying to win it back — is responsible for the majority of catastrophic losses.",
            ],
          },
          {
            heading: "Rule 5: Keep a Trading Journal",
            paragraphs: [
              "Every trade should be logged: entry, exit, stop loss, position size, reason for entry, and how you felt during the trade. Reviewing your journal weekly is the fastest way to spot the leaks in your trading. You will discover patterns about your own behaviour that no course can teach you.",
            ],
          },
        ],
        conclusion:
          "Risk management is not the exciting part of trading — but it is the only part that determines whether you are still trading next year. Master these five rules before chasing any 'holy grail' strategy, and you will already be ahead of the vast majority of retail traders. Survival is the strategy.",
      },
    },
    my: {
      title: "Beginner များအတွက် Risk Management — စျေးကွက်ထဲ ရေရှည်တည်ရှိနေဖို့",
      description:
        "ရေရှည် အသက်ရှင်နေသော Trader များသည် အတော်ဆုံးများ မဟုတ်ဘဲ Risk ကို အကောင်းဆုံး စီမံခန့်ခွဲသူများ ဖြစ်သည်။ Beginner တိုင်း လိုက်နာရမည့် အခြေခံ စည်းမျဉ်းများ။",
      content: {
        intro:
          "Beginner အများစုသည် 'ဘယ်နေရာမှာ ဝယ်ရမလဲ' 'ဘယ် Indicator အကောင်းဆုံးလဲ' 'အကောင်းဆုံး Strategy က ဘယ်ဟာလဲ' ဆိုသော Entry အပေါ် အာရုံစိုက်ကြသည်။ Professional Trader များက 'ငါ မှားရင် ဘယ်လောက် ရှုံးနိုင်လဲ' ဆိုသည်ကို အာရုံစိုက်ကြသည်။ ဤ အာရုံပြောင်းမှု တစ်ခုတည်းသည် ၆ လ Trading အသက်တာ နှင့် ၂၀ နှစ် Trading အသက်တာ၏ ခြားနားချက်ဖြစ်သည်။",
        sections: [
          {
            heading: "စည်းမျဉ်း ၁ — Trade တစ်ခုလျှင် 1–2% ထက် မရှုံးပါစေနှင့်",
            paragraphs: [
              "Account သည် $1,000 ဖြစ်ပြီး Trade တစ်ခုလျှင် 1% ရှုံးမည်ဆိုပါက အများဆုံး အရှုံးမှာ $10 ဖြစ်သည်။ ဆက်တိုက် ၁၀ ခါ ရှုံးသော်လည်း ~10% သာ ဆုံးရှုံးပြီး ပြန်လည် နာလန်ထူနိုင်သည်။ 20% ရှုံးပါက Account ကုန်သွားနိုင်သည်။",
            ],
          },
          {
            heading: "စည်းမျဉ်း ၂ — Stop Loss ကို အမြဲတမ်း ထားပါ",
            paragraphs: [
              "'Mental Stop Loss' သည် Stop Loss မဟုတ်ပါ။ Trade ဖွင့်ချိန်တွင် ထည့်ထားသော Stop Loss သာလျှင် မိမိကို ကာကွယ်နိုင်သည်။ စျေးကွက်သည် မြန်ဆန်စွာ လှုပ်ရှားနိုင်ပြီး Internet ပြတ်တောက်နိုင်သည်။",
            ],
          },
          {
            heading: "စည်းမျဉ်း ၃ — Reward-to-Risk အနည်းဆုံး 1.5:1",
            paragraphs: [
              "20 Pips ရှုံးနိုင်ပါက အနည်းဆုံး 30 Pips ရရန် ရည်မှန်းပါ။ 1.5:1 ဖြင့် Trade များ၏ 55% မှားသော်လည်း ရေရှည်တွင် အမြတ်ရရှိနိုင်သည်။ ၎င်းသည် စျေးကွက်ကို 'ခန့်မှန်းရန်' မဖြစ်နိုင်သော ဖိအားမှ ကင်းလွတ်စေသည်။",
            ],
          },
          {
            heading: "စည်းမျဉ်း ၄ — နေ့စဉ်နှင့် အပတ်စဉ် Drawdown ကို ကန့်သတ်ပါ",
            paragraphs: [
              "'တစ်နေ့ 3% ရှုံးရင် မနက်ဖြန်အထိ ရပ်နားမယ်' ကဲ့သို့ စည်းမျဉ်း ထားပါ။ ဤစည်းမျဉ်းတစ်ခုတည်းက Account များစွာကို ကယ်တင်ခဲ့ပြီးပြီ။ ဒေါသထွက်လျက် ပြန်အနိုင်ယူရန် Trade လုပ်ခြင်း ('Tilt') သည် ကြီးမားသော အရှုံးအများစု၏ အကြောင်းရင်း ဖြစ်သည်။",
            ],
          },
          {
            heading: "စည်းမျဉ်း ၅ — Trading Journal ကို မှတ်ပါ",
            paragraphs: [
              "Trade တိုင်းကို မှတ်တမ်းတင်ပါ — Entry, Exit, Stop Loss, Position Size, Trade ဖွင့်ရသော အကြောင်းရင်း နှင့် မိမိ၏ စိတ်ခံစားမှု။ အပတ်စဉ် ပြန်လည် သုံးသပ်ခြင်းသည် မိမိ၏ Trading အားနည်းချက်များကို မြန်ဆန်စွာ ရှာဖွေနိုင်သော နည်းလမ်း ဖြစ်သည်။",
            ],
          },
        ],
        conclusion:
          "Risk Management သည် Trading ၏ စိတ်လှုပ်ရှားဖွယ်ရာ အပိုင်းမဟုတ်သော်လည်း နောက်နှစ်တွင် မိမိ Trade ဆက်လုပ်နေနိုင်မည်ဆိုသည်ကို ဆုံးဖြတ်ပေးသည့် တစ်ခုတည်းသော အပိုင်းဖြစ်သည်။ မည်သည့် 'Holy Grail' Strategy ကိုမဆို မရှာမီ ဤစည်းမျဉ်း ၅ ခုကို ကျွမ်းကျင်အောင် လုပ်ပါ။ အသက်ရှင်ခြင်းသည်ပင်လျှင် Strategy ဖြစ်သည်။",
      },
    },
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
