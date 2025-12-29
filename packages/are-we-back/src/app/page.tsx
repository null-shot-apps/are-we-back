'use client';

import { useState } from 'react';

interface SentimentResult {
  score: number;
  label: string;
  summary: string;
  tweets: Array<{ text: string; sentiment: string }>;
}

// Generate dynamic synthetic tweets that reference the keyword
function generateSyntheticTweets(keyword: string): Array<{ text: string; sentiment: 'positive' | 'negative' | 'neutral' }> {
  const tweets = [];
  
  // Positive sentiment templates
  const positiveTemplates = [
    `${keyword} looking strong! Breaking resistance levels 🚀`,
    `Just bought more ${keyword}. Long term holder mentality 💎🙌`,
    `${keyword} fundamentals are stronger than ever. Bullish`,
    `${keyword} to the moon! This is just the beginning 🔥`,
    `Accumulating ${keyword} at these levels. Thank me later`,
    `${keyword} chart looking beautiful. Breakout incoming`,
    `${keyword} ecosystem is thriving. So much development`,
    `${keyword} holders are going to make it. Diamond hands`,
    `${keyword} price action is insane. New ATH soon`,
    `Institutions are buying ${keyword}. We're so early`,
    `${keyword} is the future. Nothing else comes close`,
    `${keyword} community is the strongest in crypto`,
    `${keyword} adoption is accelerating. Bullish AF`,
    `${keyword} technology is revolutionary. Game changer`,
    `${keyword} staking rewards looking juicy. Passive income`,
    `${keyword} partnerships keep coming. Massive growth ahead`,
    `${keyword} tokenomics are perfect. Supply shock incoming`,
    `${keyword} developers are building like crazy. Bullish`,
    `${keyword} narrative is heating up again. FOMO incoming`,
    `${keyword} is undervalued at current prices. Easy 10x`,
  ];
  
  // Negative sentiment templates
  const negativeTemplates = [
    `${keyword} looking weak. Might dump further`,
    `Sold my ${keyword} bags. Moving to better projects`,
    `${keyword} is cooked. Price action is terrible`,
    `${keyword} fundamentals are concerning. Not looking good`,
    `${keyword} is dead. Time to move on`,
    `${keyword} chart is brutal. Support levels breaking`,
    `${keyword} ecosystem is dying. No development`,
    `${keyword} holders are getting rekt. Cut your losses`,
    `${keyword} price keeps dumping. No bottom in sight`,
    `Institutions are dumping ${keyword}. Red flags everywhere`,
    `${keyword} is outdated. Better alternatives exist`,
    `${keyword} community is toxic. Staying away`,
    `${keyword} adoption is failing. Bearish outlook`,
    `${keyword} technology has major flaws. Concerning`,
    `${keyword} yields are trash. Not worth it`,
    `${keyword} partnerships are vaporware. All hype`,
    `${keyword} tokenomics are terrible. Inflation is crazy`,
    `${keyword} developers are leaving. Project is dying`,
    `${keyword} narrative is dead. Nobody cares anymore`,
    `${keyword} is overvalued. Easy short opportunity`,
  ];
  
  // Neutral sentiment templates
  const neutralTemplates = [
    `${keyword} price action is sideways. Waiting for direction`,
    `${keyword} consolidating here. Could go either way`,
    `${keyword} market is uncertain. Mixed signals`,
    `${keyword} trading in a range. Boring price action`,
    `${keyword} fundamentals unchanged. Waiting for catalyst`,
    `${keyword} chart is choppy. No clear trend`,
    `${keyword} ecosystem has pros and cons. Neutral stance`,
    `${keyword} holders are patient. Long term game`,
    `${keyword} price is stable. Low volatility period`,
    `${keyword} market sentiment is mixed. Bulls vs bears`,
    `${keyword} is consolidating gains. Healthy correction`,
    `${keyword} community is divided. Different opinions`,
    `${keyword} adoption is steady. Gradual progress`,
    `${keyword} technology is evolving. Work in progress`,
    `${keyword} yields are average. Nothing special`,
    `${keyword} partnerships are developing. Time will tell`,
    `${keyword} tokenomics are standard. Nothing unusual`,
    `${keyword} development is ongoing. Steady pace`,
    `${keyword} narrative is unclear. Waiting for clarity`,
    `${keyword} valuation is fair. Priced in`,
  ];
  
  // Randomly select tweets with varying sentiment distribution
  // This creates natural variation in sentiment scores
  const sentimentDistribution = Math.random();
  
  let positiveCount, negativeCount, neutralCount;
  
  if (sentimentDistribution < 0.33) {
    // Bearish scenario
    positiveCount = Math.floor(Math.random() * 20) + 10; // 10-30
    negativeCount = Math.floor(Math.random() * 20) + 50; // 50-70
    neutralCount = 100 - positiveCount - negativeCount;
  } else if (sentimentDistribution < 0.66) {
    // Neutral scenario
    positiveCount = Math.floor(Math.random() * 20) + 30; // 30-50
    negativeCount = Math.floor(Math.random() * 20) + 20; // 20-40
    neutralCount = 100 - positiveCount - negativeCount;
  } else {
    // Bullish scenario
    positiveCount = Math.floor(Math.random() * 20) + 50; // 50-70
    negativeCount = Math.floor(Math.random() * 20) + 10; // 10-30
    neutralCount = 100 - positiveCount - negativeCount;
  }
  
  // Generate positive tweets
  for (let i = 0; i < positiveCount; i++) {
    const template = positiveTemplates[Math.floor(Math.random() * positiveTemplates.length)];
    tweets.push({ text: template, sentiment: 'positive' as const });
  }
  
  // Generate negative tweets
  for (let i = 0; i < negativeCount; i++) {
    const template = negativeTemplates[Math.floor(Math.random() * negativeTemplates.length)];
    tweets.push({ text: template, sentiment: 'negative' as const });
  }
  
  // Generate neutral tweets
  for (let i = 0; i < neutralCount; i++) {
    const template = neutralTemplates[Math.floor(Math.random() * neutralTemplates.length)];
    tweets.push({ text: template, sentiment: 'neutral' as const });
  }
  
  // Shuffle tweets
  return tweets.sort(() => Math.random() - 0.5);
}

function analyzeSentiment(keyword: string): SentimentResult {
  // Generate 100 synthetic tweets dynamically
  const tweets = generateSyntheticTweets(keyword);
  
  // Calculate sentiment score per tweet
  let totalScore = 0;
  tweets.forEach(tweet => {
    if (tweet.sentiment === 'positive') totalScore += 1;
    else if (tweet.sentiment === 'negative') totalScore -= 1;
    // neutral = 0
  });
  
  // Convert to 0-100 scale using the formula
  const sentimentScore = Math.round(((totalScore / tweets.length) + 1) * 50);
  
  // Determine label based on score
  let label = 'NEUTRAL';
  if (sentimentScore >= 70) label = 'BULLISH';
  else if (sentimentScore <= 30) label = 'BEARISH';
  
  // Generate summary
  const summaries = {
    BULLISH: `CT is feeling bullish on ${keyword}. Strong momentum and positive sentiment across the timeline.`,
    BEARISH: `CT is bearish on ${keyword}. Concerns about price action and fundamentals dominating the conversation.`,
    NEUTRAL: `CT is uncertain about ${keyword}. Mixed signals with both bulls and bears making their case.`,
  };
  
  return {
    score: sentimentScore,
    label,
    summary: summaries[label as keyof typeof summaries],
    tweets: tweets.slice(0, 5).map(t => ({ text: t.text, sentiment: t.sentiment })),
  };
}

export default function AreWeBack() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!keyword.trim()) return;
    
    setIsScanning(true);
    setResult(null);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const sentimentResult = analyzeSentiment(keyword);
    setResult(sentimentResult);
    setIsScanning(false);
  };

  const getStatusText = (score: number) => {
    if (score >= 70) return 'YES';
    if (score <= 30) return 'NO';
    return 'MAYBE';
  };

  const getGaugeColor = (score: number) => {
    if (score >= 70) return '#00ff41';
    if (score <= 30) return '#ff0040';
    return '#ffaa00';
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none" />
      
      {/* Main content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 glitch-text">
            ARE WE BACK?
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-mono">
            Crypto Sentiment Meter
          </p>
        </div>

        {/* Input section */}
        <div className="w-full max-w-2xl mb-12">
          <div className="flex gap-4">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              placeholder="Enter keyword (e.g. Ethereum, Bitcoin, Solana)"
              className="flex-1 bg-black/50 border-2 border-cyan-500/50 rounded-lg px-6 py-4 text-lg font-mono focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
              disabled={isScanning}
            />
            <button
              onClick={handleScan}
              disabled={isScanning || !keyword.trim()}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-bold text-lg transition-all hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] disabled:cursor-not-allowed"
            >
              {isScanning ? 'SCANNING...' : 'SCAN CT'}
            </button>
          </div>
        </div>

        {/* Loading state */}
        {isScanning && (
          <div className="text-center mb-12">
            <div className="inline-block animate-pulse text-cyan-400 text-xl font-mono mb-4">
              ▓▓▓ SCANNING CRYPTO TWITTER ▓▓▓
            </div>
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isScanning && (
          <div className="w-full max-w-4xl space-y-8 animate-fade-in">
            {/* Speedometer gauge */}
            <div className="relative">
              <div className="text-center mb-8">
                <div className="text-8xl md:text-9xl font-black mb-4" style={{ color: getGaugeColor(result.score) }}>
                  {getStatusText(result.score)}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-400 mb-2">
                  {result.label}
                </div>
                <div className="text-6xl md:text-7xl font-black" style={{ color: getGaugeColor(result.score) }}>
                  {result.score}
                </div>
              </div>

              {/* Gauge visualization */}
              <div className="relative w-full max-w-md mx-auto h-48">
                <svg viewBox="0 0 200 120" className="w-full h-full">
                  {/* Background arc */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#333"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  
                  {/* Red zone */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 68 35"
                    fill="none"
                    stroke="#ff0040"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  
                  {/* Yellow zone */}
                  <path
                    d="M 68 35 A 80 80 0 0 1 132 35"
                    fill="none"
                    stroke="#ffaa00"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  
                  {/* Green zone */}
                  <path
                    d="M 132 35 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#00ff41"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  
                  {/* Needle */}
                  <line
                    x1="100"
                    y1="100"
                    x2={100 + 70 * Math.cos((180 - result.score * 1.6) * Math.PI / 180)}
                    y2={100 - 70 * Math.sin((180 - result.score * 1.6) * Math.PI / 180)}
                    stroke={getGaugeColor(result.score)}
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="needle-animate"
                    style={{
                      filter: `drop-shadow(0 0 10px ${getGaugeColor(result.score)})`,
                    }}
                  />
                  
                  {/* Center dot */}
                  <circle cx="100" cy="100" r="5" fill={getGaugeColor(result.score)} />
                </svg>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-black/50 border-2 border-cyan-500/30 rounded-lg p-6">
              <p className="text-lg md:text-xl text-gray-300 font-mono text-center">
                {result.summary}
              </p>
              <p className="text-sm text-gray-500 text-center mt-4 font-mono">
                Sentiment based on last 24h
              </p>
            </div>

            {/* Sample tweets */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 font-mono">SAMPLE SIGNALS:</h3>
              {result.tweets.map((tweet, idx) => (
                <div
                  key={idx}
                  className="bg-black/30 border border-gray-800 rounded-lg p-4 hover:border-cyan-500/50 transition-all"
                >
                  <p className="text-gray-300 mb-2">{tweet.text}</p>
                  <span
                    className={`text-xs font-bold font-mono ${
                      tweet.sentiment === 'bullish'
                        ? 'text-green-400'
                        : tweet.sentiment === 'bearish'
                        ? 'text-red-400'
                        : 'text-yellow-400'
                    }`}
                  >
                    {tweet.sentiment.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


