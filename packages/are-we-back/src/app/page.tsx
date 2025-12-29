'use client';

import { useState } from 'react';

interface SentimentResult {
  score: number;
  label: string;
  summary: string;
  tweets: Array<{ text: string; sentiment: string }>;
}

// Mock tweet data for realistic sentiment analysis
const mockTweetData: Record<string, Array<{ text: string; sentiment: string }>> = {
  ethereum: [
    { text: "ETH looking strong above $3.5k. Merge narrative heating up again 🔥", sentiment: "bullish" },
    { text: "Ethereum gas fees are insane rn. This is not sustainable", sentiment: "bearish" },
    { text: "Just stacked more ETH. Long term holder mentality 💎🙌", sentiment: "bullish" },
    { text: "ETH/BTC ratio still bleeding. Not looking good", sentiment: "bearish" },
    { text: "Vitalik just dropped another banger post. Bullish on the tech", sentiment: "bullish" },
    { text: "Layer 2s are eating ETH's lunch. Concerned about value accrual", sentiment: "bearish" },
    { text: "ETH staking yields looking juicy. Passive income szn", sentiment: "bullish" },
    { text: "Sold my ETH stack. Moving to other chains with better UX", sentiment: "bearish" },
    { text: "Ethereum is still the king of DeFi. Nothing comes close", sentiment: "bullish" },
    { text: "Price action is mid but fundamentals are stronger than ever", sentiment: "neutral" },
  ],
  bitcoin: [
    { text: "BTC breaking $100k is inevitable. Just a matter of time ⏰", sentiment: "bullish" },
    { text: "Bitcoin dominance rising. Alt season is dead", sentiment: "neutral" },
    { text: "Institutions are accumulating. We're so early 🚀", sentiment: "bullish" },
    { text: "BTC looking weak. Might see $80k again", sentiment: "bearish" },
    { text: "Halving cycle playing out perfectly. History repeats", sentiment: "bullish" },
    { text: "Sold all my BTC. This rally feels fake", sentiment: "bearish" },
    { text: "Bitcoin is digital gold. Nothing else matters", sentiment: "bullish" },
    { text: "Macro environment is terrible. Risk off mode activated", sentiment: "bearish" },
    { text: "Just DCA'd more BTC. Long term vision unchanged", sentiment: "bullish" },
    { text: "Sideways chop continues. Boring price action", sentiment: "neutral" },
  ],
  solana: [
    { text: "SOL to $500 is not a meme. Ecosystem is thriving 🔥", sentiment: "bullish" },
    { text: "Another Solana outage. When will this end?", sentiment: "bearish" },
    { text: "Solana DeFi TVL hitting new ATHs. Bullish", sentiment: "bullish" },
    { text: "Network went down again. This is embarrassing", sentiment: "bearish" },
    { text: "SOL memecoins are printing. Best chain for degens", sentiment: "bullish" },
    { text: "Sold my SOL bags. Too much centralization risk", sentiment: "bearish" },
    { text: "Solana speed is unmatched. ETH feels slow now", sentiment: "bullish" },
    { text: "FTX dumping more SOL. Price is cooked", sentiment: "bearish" },
    { text: "Solana Mobile sold out instantly. Demand is crazy", sentiment: "bullish" },
    { text: "Price action is choppy but fundamentals improving", sentiment: "neutral" },
  ],
};

function analyzeSentiment(keyword: string): SentimentResult {
  const normalizedKeyword = keyword.toLowerCase();
  const tweets = mockTweetData[normalizedKeyword] || mockTweetData.ethereum;
  
  // Calculate sentiment score
  let bullishCount = 0;
  let bearishCount = 0;
  let neutralCount = 0;
  
  tweets.forEach(tweet => {
    if (tweet.sentiment === 'bullish') bullishCount++;
    else if (tweet.sentiment === 'bearish') bearishCount++;
    else neutralCount++;
  });
  
  const totalTweets = tweets.length;
  const bullishPercent = (bullishCount / totalTweets) * 100;
  const bearishPercent = (bearishCount / totalTweets) * 100;
  
  // Score from 0-100
  const score = Math.round(bullishPercent - bearishPercent + 50);
  
  // Determine label
  let label = 'NEUTRAL';
  if (score >= 70) label = 'BULLISH';
  else if (score <= 30) label = 'BEARISH';
  
  // Generate summary
  const summaries = {
    BULLISH: `CT is feeling bullish on ${keyword}. Strong momentum and positive sentiment across the timeline.`,
    BEARISH: `CT is bearish on ${keyword}. Concerns about price action and fundamentals dominating the conversation.`,
    NEUTRAL: `CT is uncertain about ${keyword}. Mixed signals with both bulls and bears making their case.`,
  };
  
  return {
    score: Math.max(0, Math.min(100, score)),
    label,
    summary: summaries[label as keyof typeof summaries],
    tweets: tweets.slice(0, 5),
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

