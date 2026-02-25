export interface PersonalityResult {
  traits: { name: string; level: string; reasoning: string }[];
  communicationStyle: string;
  strengths: string[];
  growthAreas: string[];
  reflectionQuestions: string[];
}

const traitKeywords: Record<string, { high: string[]; low: string[] }> = {
  Openness: {
    high: ['curious', 'creative', 'imagine', 'explore', 'ideas', 'art', 'dream', 'wonder', 'learn', 'travel', 'philosophy', 'read', 'music', 'diverse', 'new', 'experience', 'adventure', 'innovate', 'think', 'abstract'],
    low: ['practical', 'routine', 'traditional', 'concrete', 'conventional', 'familiar', 'stable', 'predictable'],
  },
  Conscientiousness: {
    high: ['organized', 'plan', 'discipline', 'goal', 'detail', 'careful', 'responsible', 'reliable', 'hard-working', 'efficient', 'punctual', 'structure', 'focus', 'determined', 'achieve', 'thorough', 'dedicated'],
    low: ['spontaneous', 'flexible', 'go with the flow', 'relaxed', 'casual', 'easygoing', 'carefree', 'improvise'],
  },
  Extraversion: {
    high: ['social', 'people', 'talk', 'party', 'friends', 'outgoing', 'energetic', 'enthusiastic', 'group', 'meet', 'fun', 'lively', 'loud', 'engage', 'network', 'team', 'collaborate'],
    low: ['quiet', 'alone', 'introvert', 'solitude', 'reserved', 'private', 'independent', 'reflect', 'calm', 'peaceful', 'observe', 'listen'],
  },
  Agreeableness: {
    high: ['kind', 'help', 'care', 'empathy', 'compassion', 'support', 'generous', 'trust', 'cooperate', 'harmony', 'warm', 'patient', 'understanding', 'gentle', 'forgive', 'volunteer'],
    low: ['competitive', 'challenge', 'debate', 'direct', 'assertive', 'skeptical', 'independent', 'blunt', 'honest'],
  },
  Neuroticism: {
    high: ['worry', 'anxious', 'stress', 'overthink', 'sensitive', 'emotional', 'nervous', 'insecure', 'fear', 'overwhelm', 'doubt', 'mood'],
    low: ['calm', 'stable', 'resilient', 'confident', 'steady', 'composed', 'secure', 'balanced', 'relaxed', 'grounded'],
  },
};

function scoreTrait(text: string, trait: string): { level: string; reasoning: string } {
  const lower = text.toLowerCase();
  const kw = traitKeywords[trait];
  const highHits = kw.high.filter(w => lower.includes(w));
  const lowHits = kw.low.filter(w => lower.includes(w));

  if (highHits.length > lowHits.length) {
    return {
      level: 'High',
      reasoning: `Your description suggests high ${trait}, reflected in words like "${highHits.slice(0, 3).join('", "')}." This points to ${trait === 'Openness' ? 'intellectual curiosity and a love for new experiences' : trait === 'Conscientiousness' ? 'strong self-discipline and goal orientation' : trait === 'Extraversion' ? 'a sociable, energetic nature' : trait === 'Agreeableness' ? 'warmth and consideration for others' : 'heightened emotional sensitivity'}.`,
    };
  }
  if (lowHits.length > highHits.length) {
    return {
      level: 'Low',
      reasoning: `Your writing hints at lower ${trait}, with themes like "${lowHits.slice(0, 3).join('", "')}." This suggests ${trait === 'Openness' ? 'a preference for the practical and familiar' : trait === 'Conscientiousness' ? 'a flexible, spontaneous approach to life' : trait === 'Extraversion' ? 'a reflective, inner-directed temperament' : trait === 'Agreeableness' ? 'independent thinking and directness' : 'emotional stability and composure'}.`,
    };
  }
  return {
    level: 'Moderate',
    reasoning: `Your description shows a balanced expression of ${trait}, without strong leanings in either direction. This suggests adaptability in this dimension.`,
  };
}

export function analyzePersonality(text: string): PersonalityResult {
  const traits = Object.keys(traitKeywords).map(trait => ({
    name: trait,
    ...scoreTrait(text, trait),
  }));

  const lower = text.toLowerCase();
  const wordCount = text.split(/\s+/).length;
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
  const avgSentenceLen = wordCount / Math.max(sentenceCount, 1);

  let commStyle = '';
  if (avgSentenceLen > 20) commStyle += 'You tend toward detailed, flowing expression — painting full pictures with your words. ';
  else if (avgSentenceLen < 10) commStyle += 'Your communication is concise and direct — you get to the point efficiently. ';
  else commStyle += 'You balance clarity with detail, communicating in a measured, approachable manner. ';

  if (lower.includes('feel') || lower.includes('love') || lower.includes('passion') || lower.includes('heart'))
    commStyle += 'There\'s a warmth and emotional openness in your tone that invites connection.';
  else if (lower.includes('think') || lower.includes('believe') || lower.includes('reason') || lower.includes('analyze'))
    commStyle += 'Your tone leans analytical, suggesting you process the world through logic and reflection.';
  else commStyle += 'Your tone is balanced between emotional and analytical expression.';

  const strengthPool = [
    'Self-awareness and willingness to reflect',
    'Ability to articulate thoughts and feelings',
    'Emotional intelligence and empathy',
    'Curiosity and openness to growth',
    'Resilience and adaptability',
    'Strong sense of personal values',
    'Thoughtful decision-making',
    'Authentic self-expression',
  ];
  const strengths = strengthPool.sort(() => Math.random() - 0.5).slice(0, 4);
  if (wordCount > 50) strengths[0] = 'Ability to articulate thoughts and feelings with depth';

  const growthPool = [
    'Exploring perspectives that differ from your natural inclinations',
    'Balancing self-reflection with action and forward momentum',
    'Setting boundaries while maintaining your caring nature',
    'Embracing uncertainty as a space for growth rather than discomfort',
  ];

  const reflectionQuestions = [
    'What recurring themes in your life bring you the most meaning, and how do they connect to who you are becoming?',
    'When do you feel most authentically yourself, and what conditions create that feeling?',
    'If you could change one pattern in how you relate to others, what would it be and why?',
  ];

  return { traits, communicationStyle: commStyle, strengths, growthAreas: growthPool, reflectionQuestions };
}
