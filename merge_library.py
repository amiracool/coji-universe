import json

# Read all parts
with open('COJI_LIBRARY_PART_1.json', 'r', encoding='utf-8') as f:
    part1 = json.load(f)

with open('COJI_LIBRARY_PART_2.json', 'r', encoding='utf-8') as f:
    part2 = json.load(f)

with open('COJI_LIBRARY_PART_3.json', 'r', encoding='utf-8') as f:
    part3 = json.load(f)

with open('COJI_LIBRARY_PART_4.json', 'r', encoding='utf-8') as f:
    part4 = json.load(f)

# Combine all tabs
all_tabs = part1['tabs'] + part2['tabs'] + part3['tabs'] + part4['tabs']

# Add colour property to each planet based on alternating pattern
colours = ['#14b8a6', '#d946ef']  # teal and fuchsia
for i, planet in enumerate(all_tabs):
    planet['colour'] = colours[i % 2]

# Create the final combined library
# The app expects "planets" not "tabs"
combined_library = {
    "library_metadata": {
        "version": "1.0.0",
        "total_planets": 12,
        "british_english": True,
        "total_tips": 195,
        "last_updated": "2025-10-29"
    },
    "seed_search_queries": part1['seed_search_queries'],
    "tags_masterlist": part1['tags_masterlist'],
    "ui_copy": part1['ui_copy'],
    "planets": all_tabs  # Changed from "tabs" to "planets"
}

# Write to public/data directory
import os
os.makedirs('public/data', exist_ok=True)

with open('public/data/neuro_library.json', 'w', encoding='utf-8') as f:
    json.dump(combined_library, f, ensure_ascii=False, indent=2)

print(f"Combined library created with {len(all_tabs)} planets!")
print(f"Total tips: {sum(len(tab['tips']) for tab in all_tabs)}")
