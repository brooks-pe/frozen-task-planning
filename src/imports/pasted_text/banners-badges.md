Task: Reinforce SyncPoint Design System guidance by adding missing pattern modules and strengthening routing behavior

Context:
The current modular guidelines structure is correct, but key patterns are underdefined, causing inconsistent UI generation.

Observed issues:
- Badge/pill colors are being invented instead of reused
- Banner styles are inconsistent
- Page headers are drifting from expected structure
- Metadata sections (like Task Summary) are inconsistently implemented
- Existing patterns are not being reliably reused

We are NOT restructuring the system.
We are reinforcing it by:
1) Adding missing pattern modules
2) Strengthening routing rules
3) Increasing specificity where ambiguity exists

--------------------------------------------------
PART 1 — CREATE NEW MODULE FILES
--------------------------------------------------

Create the following new files in the guidelines system:

-----------------------------------
1. banners-badges.md
-----------------------------------

Purpose:
Define ALL banner and badge/pill patterns and enforce reuse.

Content requirements:

- Define banner types:
  - Informational (blue)
  - Warning (amber)
  - Success (green)
  - Neutral (gray if applicable)

- Each banner must include:
  - Background behavior
  - Text color rules
  - Icon usage (info icon, warning icon, etc.)
  - Placement rules (full-width within section, spacing, alignment)

- Define badge/pill system:
  - Status badges (Draft, Active, etc.)
  - Warning badges (Not Assigned)
  - Success badges (Approved / Valid states)
  - Domain badges (Appropriation like O&MN)

- CRITICAL RULE:
  If a badge or banner already exists in the product, it must be reused.
  Do NOT create new colors or approximate values.

- Include explicit reference rule:
  “Use existing implementations such as:
   - ‘Available to Allocate’ pill
   - ‘Unsaved Changes’ pill
   as source-of-truth for warning/amber styling”

-----------------------------------
2. page-layout.md
-----------------------------------

Purpose:
Define canonical page header and top-level layout structure.

Content requirements:

- Define page header anatomy:
  - Top action row (Back button, primary actions)
  - Title (Display / Content Heading)
  - Subtitle (context line)
  - Breadcrumb placement
  - Divider usage

- Define spacing rules between:
  - Header and first section
  - Sections throughout the page

- Define rules for:
  - When to use a page header
  - When a page is embedded (no header)

- Define consistency rule:
  Page headers must match existing implemented pages before introducing variation

-----------------------------------
3. metadata-sections.md
-----------------------------------

Purpose:
Standardize sections like Task Summary

Content requirements:

- Define section shell:
  - Outer container (neutral surface)
  - Inner content surface (white or light background)

- Define metadata layout:
  - Fixed grid columns across rows
  - Labels above values
  - Consistent alignment across rows

- Define row structure:
  - Row dividers vs banding rules
  - No independent column resizing per row

- Define action placement:
  - Actions (like Edit) must not break grid alignment
  - Use separate action row if needed

- Define spacing and padding rules

- CRITICAL RULE:
  Metadata sections must remain stable and aligned regardless of content

--------------------------------------------------
PART 2 — UPDATE EXISTING FILES
--------------------------------------------------

-----------------------------------
Update Guidelines.md (ROUTER)
-----------------------------------

Enhance routing logic:

- When request involves:
  - banners or badges → MUST load banners-badges.md
  - page header or layout → MUST load page-layout.md
  - structured metadata section → MUST load metadata-sections.md

- Strengthen reuse rule:

Add:
“Before creating a new pattern, search for an existing implementation and match it exactly.”

- Add correction rule:

“When fixing UI, replace incorrect styling rather than preserving it.”

- Add visual reference rule:

“If a design image is provided, treat layout and structure as authoritative unless explicitly told to reinterpret.”

-----------------------------------
Update visual-system.md
-----------------------------------

Add:

- Define semantic color categories:
  - Info (blue)
  - Success (green)
  - Warning (amber)
  - Neutral (gray)

- Add rule:
  These colors must come from existing implemented components, not new values.

-----------------------------------
Update components.md
-----------------------------------

- Remove ambiguity around badges
- Add reference:
  Badge and banner styling must defer to banners-badges.md

--------------------------------------------------
PART 3 — CONSTRAINTS
--------------------------------------------------

- Do NOT remove existing files
- Do NOT change file names
- Do NOT duplicate rules across files unnecessarily
- Keep modular structure intact
- Prefer clarity over brevity within each module

--------------------------------------------------
SUCCESS CRITERIA
--------------------------------------------------

- System now has explicit definitions for:
  - banners and badges
  - page layout
  - metadata sections

- Figma Make:
  - Stops inventing new badge/banner styles
  - Reuses existing patterns consistently
  - Produces stable layouts for structured sections

- Router correctly loads relevant modules based on task type