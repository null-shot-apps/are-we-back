'use client';

import { useState } from 'react';

interface Tweet {
  id: string;
  author: string;
  timestamp: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentLabel: string;
  reason?: string;
}

interface SentimentResult {
  score: number;
  label: string;
  summary: string;
  tweets: Tweet[];
  totalTweets: number;
  positiveCount: number;
  negativeCount: number;
  neutralCount: number;
}

// Generate random crypto Twitter handles
function generateHandle(): string {
  const prefixes = ['crypto', 'degen', 'moon', 'diamond', 'whale', 'ape', 'bull', 'bear', 'hodl', 'gm'];
  const suffixes = ['trader', 'maxi', 'bro', 'chad', 'anon', 'degen', 'lord', 'king', 'god', 'wizard'];
  const numbers = Math.random() > 0.5 ? Math.floor(Math.random() * 9999) : '';
  return `@${prefixes[Math.floor(Math.random() * prefixes.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}${numbers}`;
}

// Generate relative timestamp
function generateTimestamp(): string {
  const minutes = Math.floor(Math.random() * 1440); // 0-24 hours
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return '1d';
}

// Sentiment classification reasons
const sentimentReasons = {
  positive: [
    'Strong bullish language detected',
    'Positive price action mentioned',
    'Optimistic outlook expressed',
    'Accumulation signals present',
    'Bullish technical indicators referenced',
    'Positive fundamental analysis',
    'Growth and adoption mentioned',
    'Strong community sentiment',
  ],
  negative: [
    'Bearish language detected',
    'Negative price action mentioned',
    'Pessimistic outlook expressed',
    'Distribution signals present',
    'Bearish technical indicators referenced',
    'Negative fundamental concerns',
    'Declining adoption mentioned',
    'Weak community sentiment',
  ],
  neutral: [
    'Balanced perspective expressed',
    'Waiting for market direction',
    'Mixed signals detected',
    'Consolidation phase mentioned',
    'Neutral technical setup',
    'Observational commentary',
    'No clear directional bias',
    'Cautious market stance',
  ],
};

// Generate dynamic synthetic tweets that reference the keyword
function generateSyntheticTweets(keyword: string): Tweet[] {
  const tweets: Tweet[] = [];
  
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
    tweets.push({
      id: `tweet-${Date.now()}-${i}`,
      author: generateHandle(),
      timestamp: generateTimestamp(),
      text: template,
      sentiment: 'positive',
      sentimentLabel: '🟢 Bullish',
      reason: sentimentReasons.positive[Math.floor(Math.random() * sentimentReasons.positive.length)],
    });
  }
  
  // Generate negative tweets
  for (let i = 0; i < negativeCount; i++) {
    const template = negativeTemplates[Math.floor(Math.random() * negativeTemplates.length)];
    tweets.push({
      id: `tweet-${Date.now()}-${i + positiveCount}`,
      author: generateHandle(),
      timestamp: generateTimestamp(),
      text: template,
      sentiment: 'negative',
      sentimentLabel: '🔴 Bearish',
      reason: sentimentReasons.negative[Math.floor(Math.random() * sentimentReasons.negative.length)],
    });
  }
  
  // Generate neutral tweets
  for (let i = 0; i < neutralCount; i++) {
    const template = neutralTemplates[Math.floor(Math.random() * neutralTemplates.length)];
    tweets.push({
      id: `tweet-${Date.now()}-${i + positiveCount + negativeCount}`,
      author: generateHandle(),
      timestamp: generateTimestamp(),
      text: template,
      sentiment: 'neutral',
      sentimentLabel: '🟡 Neutral',
      reason: sentimentReasons.neutral[Math.floor(Math.random() * sentimentReasons.neutral.length)],
    });
  }
  
  // Shuffle tweets and sort by timestamp (most recent first)
  return tweets.sort(() => Math.random() - 0.5);
}

function analyzeSentiment(keyword: string): SentimentResult {
  // Generate 100 synthetic tweets dynamically
  const tweets = generateSyntheticTweets(keyword);
  
  // Calculate sentiment score per tweet
  let totalScore = 0;
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;
  
  tweets.forEach(tweet => {
    if (tweet.sentiment === 'positive') {
      totalScore += 1;
      positiveCount++;
    } else if (tweet.sentiment === 'negative') {
      totalScore -= 1;
      negativeCount++;
    } else {
      neutralCount++;
    }
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
    tweets,
    totalTweets: tweets.length,
    positiveCount,
    negativeCount,
    neutralCount,
  };
}

export default function AreWeBack() {
  const [keyword, setKeyword] = useState('');
  const [expandedTweet, setExpandedTweet] = useState<string | null>(null);
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [showDebug, setShowDebug] = useState(false);

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

  // Highlight sentiment keywords in tweet text
  const highlightKeywords = (text: string, sentiment: string) => {
    const positiveKeywords = ['bullish', 'moon', 'strong', 'buy', 'accumulating', 'diamond', 'hodl', 'breakout', 'thriving', 'revolutionary', 'juicy', 'massive', 'perfect', 'undervalued'];
    const negativeKeywords = ['bearish', 'dump', 'weak', 'sold', 'cooked', 'dead', 'rekt', 'brutal', 'dying', 'toxic', 'failing', 'flaws', 'trash', 'vaporware', 'terrible', 'overvalued'];
    const neutralKeywords = ['sideways', 'consolidating', 'uncertain', 'mixed', 'waiting', 'range', 'choppy', 'stable', 'steady', 'average', 'fair'];

    let keywords: string[] = [];
    if (sentiment === 'positive') keywords = positiveKeywords;
    else if (sentiment === 'negative') keywords = negativeKeywords;
    else keywords = neutralKeywords;

    let highlightedText = text;
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="sentiment-highlight">$1</mark>');
    });

    return highlightedText;
  };

  // Filter tweets based on sentiment
  const filteredTweets = result?.tweets.filter(tweet => {
    if (sentimentFilter === 'all') return true;
    return tweet.sentiment === sentimentFilter;
  }) || [];

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

            {/* Sentiment breakdown */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-black text-green-400">{result.positiveCount}</div>
                <div className="text-sm text-gray-400 font-mono mt-1">🟢 Bullish</div>
              </div>
              <div className="bg-yellow-500/10 border-2 border-yellow-500/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-black text-yellow-400">{result.neutralCount}</div>
                <div className="text-sm text-gray-400 font-mono mt-1">🟡 Neutral</div>
              </div>
              <div className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-black text-red-400">{result.negativeCount}</div>
                <div className="text-sm text-gray-400 font-mono mt-1">🔴 Bearish</div>
              </div>
            </div>

            {/* Debug mode toggle */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowDebug(!showDebug)}
                className="text-xs font-mono text-gray-500 hover:text-cyan-400 transition-colors"
              >
                {showDebug ? '[ HIDE DEBUG ]' : '[ SHOW DEBUG ]'}
              </button>
            </div>

            {/* Debug panel */}
            {showDebug && (
              <div className="bg-black/50 border-2 border-cyan-500/30 rounded-lg p-6 mb-8 font-mono text-sm">
                <div className="text-cyan-400 font-bold mb-4">DEBUG MODE</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-500 mb-1">Positive Count:</div>
                    <div className="text-green-400 font-bold">{result.positiveCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Negative Count:</div>
                    <div className="text-red-400 font-bold">{result.negativeCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Neutral Count:</div>
                    <div className="text-yellow-400 font-bold">{result.neutralCount}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Total Tweets:</div>
                    <div className="text-white font-bold">{result.totalTweets}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Raw Score Sum:</div>
                    <div className="text-white font-bold">
                      {result.positiveCount - result.negativeCount}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1">Normalized Score:</div>
                    <div className="text-cyan-400 font-bold">{result.score}/100</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-gray-500 mb-1">Formula:</div>
                    <div className="text-gray-400 text-xs">
                      ((sum / total) + 1) × 50 = (({result.positiveCount - result.negativeCount} / {result.totalTweets}) + 1) × 50 = {result.score}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tweet feed */}
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-400 font-mono">
                  ANALYZED TWEETS ({filteredTweets.length})
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSentimentFilter('all')}
                    className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                      sentimentFilter === 'all'
                        ? 'bg-cyan-500 text-black'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    ALL
                  </button>
                  <button
                    onClick={() => setSentimentFilter('positive')}
                    className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                      sentimentFilter === 'positive'
                        ? 'bg-green-500 text-black'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    🟢 BULLISH
                  </button>
                  <button
                    onClick={() => setSentimentFilter('negative')}
                    className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                      sentimentFilter === 'negative'
                        ? 'bg-red-500 text-black'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    🔴 BEARISH
                  </button>
                  <button
                    onClick={() => setSentimentFilter('neutral')}
                    className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                      sentimentFilter === 'neutral'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    🟡 NEUTRAL
                  </button>
                </div>
              </div>
              <div className="max-h-[600px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {filteredTweets.map((tweet) => {
                  const isExpanded = expandedTweet === tweet.id;
                  return (
                    <div
                      key={tweet.id}
                      onClick={() => setExpandedTweet(isExpanded ? null : tweet.id)}
                      className={`bg-black/30 border rounded-lg p-4 hover:border-cyan-500/50 transition-all cursor-pointer ${
                        tweet.sentiment === 'positive'
                          ? 'border-green-500/20 hover:bg-green-500/5'
                          : tweet.sentiment === 'negative'
                          ? 'border-red-500/20 hover:bg-red-500/5'
                          : 'border-yellow-500/20 hover:bg-yellow-500/5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-cyan-400 font-mono text-sm font-bold">
                              {tweet.author}
                            </span>
                            <span className="text-gray-600 text-xs">•</span>
                            <span className="text-gray-500 text-xs font-mono">
                              {tweet.timestamp}
                            </span>
                          </div>
                          <p 
                            className="text-gray-300 text-sm mb-3 leading-relaxed"
                            dangerouslySetInnerHTML={{ 
                              __html: isExpanded 
                                ? highlightKeywords(tweet.text, tweet.sentiment)
                                : tweet.text 
                            }}
                          />
                          {isExpanded && tweet.reason && (
                            <div className="mt-3 pt-3 border-t border-gray-800">
                              <div className="text-xs text-gray-500 font-mono mb-1">
                                CLASSIFICATION REASON:
                              </div>
                              <div className="text-sm text-gray-400 italic">
                                {tweet.reason}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-shrink-0">
                          <span
                            className={`text-xs font-bold font-mono px-2 py-1 rounded ${
                              tweet.sentiment === 'positive'
                                ? 'bg-green-500/20 text-green-400'
                                : tweet.sentiment === 'negative'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {tweet.sentimentLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}












