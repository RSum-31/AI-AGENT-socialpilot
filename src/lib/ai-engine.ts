export interface BusinessProfile {
  businessName: string;
  industry: string;
  targetAudience: string;
  brandTone: 'Professional' | 'Fun' | 'Bold' | 'Minimal';
}

export interface GeneratedPost {
  id: string;
  platform: string;
  contentType: string;
  goal: string;
  caption: string;
  hashtags: string[];
  emojis: string[];
  postingTip: string;
  bestTime: string;
  reason: string;
  createdAt: Date;
  scheduledDate?: Date;
  scheduledTime?: string;
}

const captions: Record<string, Record<string, string[]>> = {
  Professional: {
    Awareness: [
      "In today's rapidly evolving landscape, staying ahead means embracing innovation. Here's how we're leading the charge in {industry} — transforming challenges into opportunities, one solution at a time.\n\nOur approach combines data-driven insights with human expertise to deliver results that matter. Because your success isn't just our goal — it's our standard.\n\n{cta}",
      "The future of {industry} is being written right now. And we're holding the pen.\n\nWith over a decade of expertise helping businesses like yours navigate complexity, we've learned that the best solutions are often the simplest ones. Here's what we've discovered about reaching {audience} effectively:\n\n✅ Consistency builds trust\n✅ Value-first communication wins\n✅ Authenticity resonates deeper than any campaign\n\n{cta}",
      "Behind every great brand is a story worth telling. Ours begins with a simple belief: that {industry} deserves better.\n\nBetter service. Better innovation. Better results.\n\nWe're not just another company — we're your partner in growth. And today, we're sharing the framework that helped our clients achieve 3x engagement in just 90 days.\n\n{cta}"
    ],
    Sales: [
      "🚀 Limited time offer for {audience}!\n\nWe've spent months perfecting our latest solution, and the results speak for themselves:\n\n📊 47% increase in efficiency\n💰 30% cost reduction\n⭐ 98% customer satisfaction\n\nDon't let this opportunity pass you by. The businesses that invest in innovation today are the ones that lead tomorrow.\n\nLink in bio to learn more and claim your exclusive offer.\n\n{cta}",
      "Your competitors are already making moves. Are you?\n\nIn the {industry} space, timing is everything. That's why we've created a solution specifically designed for {audience} who want results without the complexity.\n\nWhat you get:\n→ Streamlined operations\n→ Measurable ROI from day one\n→ Dedicated support team\n→ Proven methodology\n\nEarly adopters save 25%. The clock is ticking.\n\n{cta}"
    ],
    Engagement: [
      "Let's settle this once and for all 👇\n\nWe asked 500+ professionals in {industry} what their biggest challenge is. The answers might surprise you:\n\n1️⃣ Finding the right talent (34%)\n2️⃣ Keeping up with technology (28%)\n3️⃣ Customer retention (22%)\n4️⃣ Budget constraints (16%)\n\nWhich one resonates with you most? Drop your answer below and tell us how you're tackling it!\n\nWe'll share our expert insights on the top response next week.\n\n{cta}",
      "Hot take: The {industry} landscape will look completely different in 5 years.\n\nHere's what we're predicting (and preparing for):\n\n🔮 AI-powered personalization becomes the norm\n🔮 Sustainability moves from nice-to-have to must-have\n🔮 Community-driven growth outperforms traditional marketing\n\nAgree? Disagree? We want to hear from {audience}!\n\nShare your boldest prediction in the comments 💭\n\n{cta}"
    ]
  },
  Fun: {
    Awareness: [
      "POV: You just discovered the best-kept secret in {industry} 🤫✨\n\nSpoiler alert: it's us! And we're about to change everything you thought you knew about reaching {audience}.\n\nHere's the thing — we don't do boring. We don't do cookie-cutter. We do results with a side of personality, and our clients absolutely love it.\n\nReady to see what all the buzz is about? 🐝\n\n{cta}",
      "Okay but can we talk about how {industry} is having its main character moment right now? 💅\n\nSeriously though — the opportunities for {audience} have never been better. And we're here to help you grab them with both hands (and maybe a latte in one of them ☕).\n\nFollow along as we break down the trends, share the hacks, and occasionally post memes. It's what we do best.\n\n{cta}"
    ],
    Sales: [
      "Stop scrolling! 🛑 (Just for a sec, promise)\n\nRemember that thing you've been putting off? The one that could literally transform your {industry} game? Yeah, THAT thing.\n\nWell, good news bestie — we made it ridiculously easy. And right now, it's on SALE. 🎉\n\nThe catch? There isn't one. Just pure value for {audience} who want results without the headache.\n\nTap the link before your future self gets mad at you 😤\n\n{cta}"
    ],
    Engagement: [
      "Wrong answers only: What does a typical day in {industry} look like? 😂\n\nWe'll go first: Pretending to understand the algorithm while drinking our third coffee and telling clients everything is 'on brand' 💀\n\nYour turn, {audience}! Drop your most relatable (or ridiculous) answer below 👇\n\nBest answer gets featured on our stories! 🏆\n\n{cta}"
    ]
  },
  Bold: {
    Awareness: [
      "The old way of doing {industry}? Dead. 💀\n\nWe're not here to play it safe or follow the rulebook. We're here to REWRITE it.\n\nEvery single day, {audience} are being told to \"stay in their lane.\" But lanes are for highways, not visionaries.\n\nHere's what we believe:\n\n🔥 Disruption isn't optional — it's survival\n🔥 Data without action is just noise\n🔥 The best time to innovate was yesterday. The second best? RIGHT NOW.\n\nFollow us if you're ready to make some noise.\n\n{cta}",
      "UNPOPULAR OPINION: 90% of {industry} content is forgettable.\n\nThat's not shade — that's a wake-up call.\n\nAt {brand}, we create content that DEMANDS attention. Content that makes {audience} stop mid-scroll. Content that converts skeptics into superfans.\n\nBecause mediocre? That's not in our vocabulary.\n\n{cta}"
    ],
    Sales: [
      "Last chance. No more reminders. ⏰\n\nOur flagship solution for {industry} drops in price by 40% at midnight. After that? Full price. No exceptions.\n\nThis isn't a drill. This isn't marketing fluff. This is your moment to invest in what actually works.\n\n{audience}, you know what you need. Stop overthinking and START winning.\n\n🔗 Link in bio. Clock's ticking. 💣\n\n{cta}"
    ],
    Engagement: [
      "DEBATE TIME 🥊\n\nWe're throwing down the gauntlet to every professional in {industry}:\n\nIs [trending topic] the future or just hype?\n\n⚡ Team Future: Comment with 🚀\n⚡ Team Hype: Comment with 🎪\n\nWe're reading EVERY response and posting our take tomorrow. {audience}, bring your A-game.\n\nNo fence-sitting allowed. Pick a side. 👊\n\n{cta}"
    ]
  },
  Minimal: {
    Awareness: [
      "Simple truth: Great {industry} results come from great foundations.\n\nWe focus on what matters.\nWe cut the noise.\nWe deliver.\n\nThat's our promise to {audience}.\n\n{cta}",
      "Less complexity. More clarity.\n\nThat's the {brand} approach to {industry}.\n\nWe believe the best solutions are the ones you barely notice — because they just work. Seamlessly. Reliably. Beautifully.\n\nFor {audience} who value substance over spectacle.\n\n{cta}"
    ],
    Sales: [
      "One solution. Measurable results. No clutter.\n\nDesigned for {audience} who value their time as much as their investment.\n\n→ Clean interface\n→ Instant setup\n→ Real impact\n\nNow available at a reduced rate. Details in bio.\n\n{cta}"
    ],
    Engagement: [
      "One word to describe your experience in {industry} this year.\n\nJust one.\n\nWe'll start: Transformative.\n\nYour turn, {audience}. 👇\n\n{cta}"
    ]
  }
};

const hashtagSets: Record<string, string[][]> = {
  Instagram: [
    ['#socialmedia', '#contentcreator', '#digitalmarketing', '#branding', '#growthhacking', '#marketingtips', '#instabusiness', '#entrepreneur'],
    ['#business', '#startup', '#innovation', '#strategy', '#leadership', '#growth', '#success', '#motivation'],
    ['#trending', '#viral', '#instagood', '#explore', '#community', '#smallbusiness', '#hustle', '#goals']
  ],
  LinkedIn: [
    ['#leadership', '#innovation', '#business', '#strategy', '#growth', '#networking', '#professionaldevelopment', '#thoughtleadership'],
    ['#futureofwork', '#digital', '#technology', '#entrepreneurship', '#management', '#B2B', '#careergrowth', '#industry']
  ],
  Twitter: [
    ['#business', '#tech', '#startup', '#growth', '#marketing', '#AI', '#innovation'],
    ['#trending', '#leadership', '#digital', '#brand', '#strategy', '#social']
  ],
  Facebook: [
    ['#business', '#community', '#smallbusiness', '#local', '#support', '#growth', '#entrepreneur'],
    ['#marketing', '#digital', '#social', '#brand', '#content', '#engagement', '#tips']
  ]
};

const emojiSets: Record<string, string[]> = {
  Professional: ['📊', '💼', '🎯', '✅', '📈', '🤝', '💡', '⭐'],
  Fun: ['🎉', '✨', '🚀', '😍', '🔥', '💕', '🌈', '🎊', '☕', '💅'],
  Bold: ['💥', '⚡', '🔥', '💪', '🏆', '👊', '💣', '🎯', '🚀', '⚔️'],
  Minimal: ['→', '·', '—', '○', '◦']
};

const postingTips: Record<string, string[]> = {
  Instagram: [
    'Use Instagram Stories to tease this post 2 hours before publishing for maximum reach.',
    'Pin this as your top post to boost profile engagement with new visitors.',
    'Respond to every comment within the first hour to boost algorithmic reach by up to 40%.',
    'Add this to a relevant Highlight reel to extend its shelf life beyond 24 hours.'
  ],
  LinkedIn: [
    'Engage with 10 posts in your niche 30 minutes before publishing to prime the algorithm.',
    'Tag 3-5 relevant connections to spark initial engagement and expand reach.',
    'Add a personal anecdote in the first comment to encourage deeper conversation.',
    'Avoid external links in the main post — LinkedIn deprioritizes posts with outbound links.'
  ],
  Twitter: [
    'Quote-tweet this with a personal take 4 hours later to revive engagement.',
    'Create a thread version of this post for 3x more impressions.',
    'Schedule this during your audience\'s peak hours for maximum visibility.',
    'Pin this tweet to your profile for increased visibility.'
  ],
  Facebook: [
    'Share this to 2-3 relevant Facebook Groups for wider organic reach.',
    'Ask a question in the comments to boost the algorithm signal.',
    'Use Facebook Live to discuss the topic in this post for 5x more engagement.',
    'Boost this post with a small budget ($5-10) targeting your local audience.'
  ]
};

const bestTimes: Record<string, string[]> = {
  Instagram: ['7:00 PM', '12:00 PM', '9:00 AM', '6:00 PM', '8:00 PM'],
  LinkedIn: ['8:00 AM', '10:00 AM', '12:00 PM', '5:00 PM'],
  Twitter: ['9:00 AM', '12:00 PM', '5:00 PM', '7:00 PM'],
  Facebook: ['1:00 PM', '3:00 PM', '9:00 AM', '7:00 PM']
};

const reasons: Record<string, Record<string, string[]>> = {
  Instagram: {
    Awareness: [
      'Instagram\'s algorithm favors carousel posts and Reels for discovery. Your target audience ({audience}) is most active during evening hours, making 7 PM optimal for awareness content.',
      'Visual-first platforms like Instagram reward high-quality imagery paired with storytelling captions. For {industry}, educational content generates 3x more saves than promotional posts.'
    ],
    Sales: [
      'Instagram Shopping features combined with urgency-driven captions convert 23% better for {industry}. Your {audience} responds well to limited-time offers with clear CTAs.',
      'Product-focused posts with social proof (testimonials, numbers) drive the highest conversion rates on Instagram for {audience} in the {industry} space.'
    ],
    Engagement: [
      'Question-based posts and polls generate 2x more comments on Instagram. Your {audience} in {industry} prefers interactive content that invites their perspective.',
      'Carousel posts with a strong hook slide generate 1.4x more engagement than single images. For {audience}, educational carousels outperform entertainment.'
    ]
  },
  LinkedIn: {
    Awareness: [
      'LinkedIn\'s professional audience engages most with thought leadership content during business hours. For {industry}, long-form posts with personal insights get 45% more reach.',
      'Document posts and native articles on LinkedIn receive priority in the feed. Your {audience} values data-backed insights and industry analysis.'
    ],
    Sales: [
      'LinkedIn\'s B2B audience converts at 2x the rate of other platforms for {industry}. Solution-focused posts that address specific pain points of {audience} perform best.',
      'Case studies and ROI-focused content generate the highest click-through rates on LinkedIn for {audience}.'
    ],
    Engagement: [
      'Polls and debate-style posts on LinkedIn generate 5x more engagement for {industry} topics. Your {audience} appreciates nuanced discussions over surface-level content.',
      'Posts that share contrarian views or challenge conventional wisdom in {industry} consistently outperform standard updates with {audience}.'
    ]
  },
  Twitter: {
    Awareness: [
      'Twitter threads with a compelling hook tweet get 8x more engagement than single tweets. For {industry}, bite-sized insights resonate best with {audience}.',
      'Timely, relevant commentary on {industry} trends positions your brand as a thought leader for {audience}. Twitter rewards real-time engagement.'
    ],
    Sales: [
      'Twitter\'s fast-paced environment favors concise, punchy sales messaging. For {audience} in {industry}, scarcity-driven tweets with clear value propositions convert best.',
      'Thread-style product breakdowns generate 3x more link clicks than single promotional tweets for {industry}.'
    ],
    Engagement: [
      'Hot takes and opinion polls consistently generate the most replies on Twitter. Your {audience} in {industry} engages most with debatable topics.',
      'Reply-focused prompts ("What\'s your take?") generate 4x more engagement than standard tweets for {audience}.'
    ]
  },
  Facebook: {
    Awareness: [
      'Facebook Groups and community-driven content generate 6x more organic reach than page posts. For {industry}, building community around shared interests attracts {audience}.',
      'Video content on Facebook receives 135% more organic reach. For {audience} in {industry}, behind-the-scenes and educational videos build the strongest awareness.'
    ],
    Sales: [
      'Facebook\'s detailed targeting combined with retargeting pixels makes it ideal for conversion-focused campaigns for {industry}. Your {audience} responds to social proof and testimonials.',
      'Posts with customer success stories generate 28% more conversions on Facebook for {audience} in the {industry} space.'
    ],
    Engagement: [
      'Facebook\'s algorithm prioritizes "meaningful interactions" — posts that generate long comments perform best. For {audience} in {industry}, storytelling and questions drive this behavior.',
      'Live videos on Facebook generate 6x more interactions than regular videos. Your {audience} appreciates real-time Q&A sessions about {industry} topics.'
    ]
  }
};

const ctas: Record<string, string[]> = {
  Awareness: [
    'Follow us for more insights on {industry}.',
    'Save this post for later — you\'ll want to come back to it.',
    'Share this with someone who needs to hear it.',
    'Turn on notifications so you never miss an update.'
  ],
  Sales: [
    'Link in bio — your future self will thank you.',
    'DM us "START" to get exclusive access.',
    'Limited spots available. Don\'t miss out.',
    'Click the link in bio to claim your offer today.'
  ],
  Engagement: [
    'Drop your answer in the comments 👇',
    'Tag someone who needs to see this!',
    'What\'s your take? We\'re reading every response.',
    'Share your experience — we want to hear from you!'
  ]
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateStrategy(
  profile: BusinessProfile,
  goal: string,
  platform: string,
  contentType: string
): GeneratedPost {
  const tone = profile.brandTone;
  const goalCaptions = captions[tone]?.[goal] || captions[tone]?.['Awareness'] || captions['Professional']['Awareness'];
  let caption = pickRandom(goalCaptions);

  // Replace placeholders
  const cta = pickRandom(ctas[goal] || ctas['Awareness']);
  caption = caption
    .replace(/\{industry\}/g, profile.industry)
    .replace(/\{audience\}/g, profile.targetAudience)
    .replace(/\{brand\}/g, profile.businessName)
    .replace(/\{cta\}/g, cta.replace(/\{industry\}/g, profile.industry));

  const platformHashtags = hashtagSets[platform] || hashtagSets['Instagram'];
  const hashtags = pickRandom(platformHashtags);
  const emojis = emojiSets[tone] || emojiSets['Professional'];
  const tip = pickRandom(postingTips[platform] || postingTips['Instagram']);
  const time = pickRandom(bestTimes[platform] || bestTimes['Instagram']);

  const platformReasons = reasons[platform]?.[goal] || reasons['Instagram']['Awareness'];
  let reason = pickRandom(platformReasons);
  reason = reason
    .replace(/\{industry\}/g, profile.industry)
    .replace(/\{audience\}/g, profile.targetAudience);

  // Add content type context
  if (contentType === 'Reel Idea') {
    caption = `🎬 REEL IDEA:\n\nHook: Start with a bold statement or question\nBody: ${caption}\nCTA: End with action prompt\n\nTrending audio suggestion: Use current top sounds in ${profile.industry}`;
    reason += ` Reels currently receive 67% more engagement than static posts on ${platform}.`;
  } else if (contentType === 'Carousel') {
    caption = `📑 CAROUSEL POST (Swipe →)\n\nSlide 1 (Hook): ${caption.split('\n')[0]}\nSlide 2-4 (Value): ${caption}\nSlide 5 (CTA): ${cta.replace(/\{industry\}/g, profile.industry)}`;
    reason += ` Carousels generate 1.4x more reach than single images on ${platform}.`;
  } else if (contentType === 'Thread') {
    const lines = caption.split('\n').filter(l => l.trim());
    caption = lines.map((line, i) => `${i === 0 ? '🧵' : `${i}.`} ${line}`).join('\n\n');
    reason += ` Threads get 8x more impressions than single posts on ${platform}.`;
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    platform,
    contentType,
    goal,
    caption,
    hashtags,
    emojis: emojis.slice(0, 5),
    postingTip: tip,
    bestTime: time,
    reason,
    createdAt: new Date()
  };
}

export function getInsight(postHistory: GeneratedPost[]): string {
  if (postHistory.length === 0) return 'Generate your first post to start building AI insights!';
  
  const platforms = postHistory.map(p => p.platform);
  const goals = postHistory.map(p => p.goal);
  const types = postHistory.map(p => p.contentType);

  const topPlatform = mode(platforms);
  const topGoal = mode(goals);
  const topType = mode(types);

  const insights = [
    `AI noticed you prefer ${topPlatform} content. Consider diversifying to reach a wider audience.`,
    `${topGoal}-focused content dominates your strategy. Mix in other goals for balanced growth.`,
    `${topType} posts are your go-to format. Try experimenting with Reels for 67% more engagement.`,
    `Based on ${postHistory.length} generated posts, your content leans ${topGoal.toLowerCase()}. Consider A/B testing different tones.`,
    `Your ${topPlatform} content strategy is strong. LinkedIn posts could complement this for B2B reach.`
  ];

  return pickRandom(insights);
}

function mode(arr: string[]): string {
  const freq: Record<string, number> = {};
  arr.forEach(v => freq[v] = (freq[v] || 0) + 1);
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || arr[0];
}
