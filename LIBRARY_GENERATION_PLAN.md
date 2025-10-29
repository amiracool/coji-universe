# Coji Universe Neurodivergent Library - Generation Plan

## Overview
Creating a comprehensive, compassionate library of 800-1000 tips across 12 planets.

## Structure

### Part 1: Core Planets (75-100 tips each)
1. **ADHD Support** 🎯 - 75 tips
2. **Autism Support** 🌈 - 75 tips
3. **Anxiety Tools** 😰 - 75 tips
4. **Depression Support** 💙 - 75 tips

### Part 2: Supporting Planets (40-60 tips each)
5. **Parenting Hub** 👪 - 50 tips
6. **Neurodivergent & Work** 💼 - 50 tips
7. **Relationships** 💑 - 50 tips
8. **Time Management** ⏰ - 50 tips

### Part 3: Specialist Planets (40-60 tips each)
9. **Dyslexia & Dyscalculia** 📖 - 40 tips
10. **Chronic Illness Resources** 💊 - 50 tips
11. **Memory Tools** 🧠 - 40 tips
12. **Dyspraxia** 🏃 - 40 tips

## Quality Standards

Each tip must have:
- ✅ Unique ID
- ✅ Short, friendly title
- ✅ Summary ≤ 140 characters
- ✅ Category from approved list
- ✅ 3-8 relevant tags
- ✅ Energy level (low/medium/high)
- ✅ "What happens" explanation ≤ 60 words
- ✅ "Try this" with 3-5 actionable steps
- ✅ "Why it helps" ≤ 30 words
- ✅ 1-3 variations
- ✅ Pitfall warning
- ✅ Context tags
- ✅ Copy-to-clipboard one-liner

## Tone Guidelines

- British English throughout
- Ultra-compassionate, never judgmental
- Practical and grounded
- "You" voice, direct but caring
- Therapy language welcome (grounding, self-soothe, regulation)
- Validate struggles as real and neurological
- No medical advice or diagnoses

## Progress Tracking

- [x] Library metadata and structure
- [x] Tags masterlist (conditions, challenges, strategies)
- [x] Seed search queries (100+ typo-tolerant phrases)
- [x] UI copy
- [ ] ADHD tips (10/75 complete)
- [ ] Autism tips (0/75)
- [ ] Anxiety tips (0/75)
- [ ] Depression tips (0/75)
- [ ] Parenting tips (0/50)
- [ ] Work tips (0/50)
- [ ] Relationships tips (0/50)
- [ ] Time Management tips (0/50)
- [ ] Dyslexia/Dyscalculia tips (0/40)
- [ ] Chronic Illness tips (0/50)
- [ ] Memory tips (0/40)
- [ ] Dyspraxia tips (0/40)

## File Structure

```
src/data/library/
├── library_core.json (metadata, UI copy, search queries, tags)
├── adhd_tips.json (75 tips)
├── autism_tips.json (75 tips)
├── anxiety_tips.json (75 tips)
├── depression_tips.json (75 tips)
├── parenting_tips.json (50 tips)
├── work_tips.json (50 tips)
├── relationships_tips.json (50 tips)
├── time_management_tips.json (50 tips)
├── dyslexia_dyscalculia_tips.json (40 tips)
├── chronic_illness_tips.json (50 tips)
├── memory_tips.json (40 tips)
└── dyspraxia_tips.json (40 tips)
```

## Integration Notes

The Coji Universe app will:
1. Load library_core.json on app start
2. Lazy-load tip files as users navigate to planets
3. Implement fuzzy search across all tips
4. Filter by tags, energy, context
5. Allow users to save favourite tips
6. Track which tips users find most helpful

## Next Steps

1. Complete remaining 65 ADHD tips
2. Generate 75 Autism tips
3. Generate 75 Anxiety tips
4. Generate 75 Depression tips
5. Continue with remaining 8 planets
6. Validate all tips meet quality standards
7. Create integration component for Coji Universe
8. Test search functionality with typo-tolerant queries
