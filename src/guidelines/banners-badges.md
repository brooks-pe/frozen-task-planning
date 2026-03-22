# Banners & Badges

- **Scope:** Banner components, badge/pill styling, status indicators, warning/info/success callouts
- **Do not apply outside this domain**

## Rule Priority
- Hard Rules: must be followed exactly
- Guidance: preferred, but flexible

---

## Hard Rules

### CRITICAL: Pattern Reuse
- If a badge or banner already exists in the product, it MUST be reused exactly.
- Do NOT create new colors or approximate values.
- Use existing implementations as source-of-truth:
  - "Available to Allocate" pill → canonical warning/amber badge
  - "Unsaved Changes" pill → canonical warning/amber badge

### Banner Types

#### Informational (Blue)
- Background: `bg-[rgba(0,179,238,0.12)]`
- Icon color: `#00749E`
- Text color: `#00749E`
- Icon: Info circle (lucide `Info`)
- Placement: full-width within parent section, standard section spacing

#### Warning (Amber)
- Background: `bg-[rgba(255,222,0,0.24)]`
- Icon color: `#ab6400`
- Text color: `#ab6400`
- Icon: Warning triangle (lucide `AlertTriangle`)
- Placement: full-width within parent section, standard section spacing

#### Success (Green)
- Background: `bg-[rgba(0,168,84,0.12)]`
- Icon color: `#18794E`
- Text color: `#18794E`
- Icon: Check circle (lucide `CheckCircle`)
- Placement: full-width within parent section, standard section spacing

#### Neutral (Gray)
- Background: `bg-[#F0F0F3]`
- Icon color: `#60646C`
- Text color: `#60646C`
- Icon: Context-dependent
- Placement: full-width within parent section, standard section spacing

### Banner Structure
- Horizontal layout: icon + text content, vertically centered
- Padding: `px-3 py-2.5` (compact) or `px-4 py-3` (standard)
- Border radius: `rounded-md`
- Text within banners may contain bold clickable links styled in semantic link color (`#147DB9`)
- No border unless explicitly required

### Badge/Pill Types

#### Status Badges
- Draft, Active, Closed, etc.
- Follow Status Pills rules from `components.md`

#### Warning Badges
- "Not Assigned", "Missing", "Incomplete"
- Background: `bg-[rgba(255,222,0,0.24)]`
- Text: `text-[#ab6400]`
- Padding: `px-2 py-0.5`
- Border radius: `rounded`

#### Success Badges
- "Approved", "Valid", "Complete"
- Background: `bg-[rgba(0,168,84,0.12)]`
- Text: `text-[#18794E]`
- Padding: `px-2 py-0.5`
- Border radius: `rounded`

#### Domain Badges (Appropriation)
- O&MN, RDT&E, SCN, etc.
- Follow `AppropriationBadge.tsx` implementation exactly

### Badge Structure
- Inline element, no layout shift
- Consistent padding and border-radius across all badge types
- Text size matches surrounding context or uses small/caption role

---

## Guidance

### Placement
- Banners appear immediately below the section they relate to
- Badges appear inline with their associated field or label
- When a banner contains an actionable link, the link text should be visually distinct (bold + semantic link color)
