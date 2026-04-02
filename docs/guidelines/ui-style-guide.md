# SyncPoint UI Style Guide

## Text Style Foundation v0.1

### Purpose

Establish a practical, semantic text color foundation for SyncPoint so future UI work converges on high-contrast, enterprise-readable patterns before implementation migration begins.

This guidance is documentation-first and governance-focused. It defines the approved text tokens, clarifies usage intent, and reduces drift caused by ad hoc hex values, alpha-based text styling, and near-duplicate color variants.

### Core Principles

- Readability over softness.
- Clarity over trend-driven subtlety.
- Semantic reuse over ad hoc hex values.
- Avoid alpha-based text colors for standard UI content.
- Avoid gray-on-gray treatments that reduce scanability.
- Keep primary and decision-critical content high contrast.

### Approved Text Tokens

| Semantic Token | Hex Value | Primary Intent |
|---|---|---|
| `text-default` | `#1C2024` | Primary body text, headings, field values, table text, core labels |
| `text-secondary` | `#60646C` | Supporting but still important information |
| `text-muted` | `#80838D` | Helper text, captions, low-priority metadata, instructional/supporting copy only |
| `text-disabled` | `#8B8D98` | Disabled controls and unavailable states only |
| `text-link` | `#147DB9` | Clickable text links and navigational text actions |
| `text-link-hover` | `#001E31` | Hover state for text links |
| `text-accent` | `#004B72` | Intentional emphasis where link styling is not appropriate |
| `text-success` | `#218358` | Positive/success state text |
| `text-warning` | `#AB6400` | Warning/caution text |
| `text-error` | `#CE2C31` | Error/destructive/validation text |
| `text-info` | `#00749E` | Informational state text |
| `text-inverse` | `#FFFFFF` | Text on dark/accent surfaces only |

### Text Usage Rules

- `text-muted` and `text-disabled` are different semantic roles and must not be treated as interchangeable.
- `text-muted` must not be used for primary content or key workflow information.
- Use `text-link` for clickable text.
- Do not introduce new one-off text hex values when an approved semantic token exists.
- Avoid inline text colors unless there is a documented exception.
- Avoid alpha/opacity-based text for standard UI text.
- Consolidate duplicate blues and status colors under semantic roles during future migrations.

### Current Baseline and Drift

Current strong anchors from active runtime usage:

- `#1C2024`: default and primary text
- `#60646C`: secondary text
- `#004B72`: emphasis/action text
- `#80838D` and `#8B8D98`: muted/disabled-style text

Known drift patterns to reduce:

- many near-duplicate blues and grays
- inline style color usage
- alpha-based text colors
- ad hoc status color variants

Accessibility caution:

- Treat `text-muted` (`#80838D`) as supporting/helper/meta text only, not primary content.

### Legacy Migration Guidance

- Replace direct literal text colors with semantic roles when implementation support exists.
- Replace duplicate link blues with `text-link` or `text-accent` based on role.
- Replace ad hoc status colors with approved semantic status tokens.
- Replace low-contrast helper/body grays with `text-muted` or `text-secondary` based on semantic importance.

### Current Anti-Patterns To Avoid

- Gray-on-gray text.
- Disabled-looking text used for active content.
- Inline hex values when semantic roles already exist.
- Multiple near-identical blues for links/actions.
- Multiple near-identical status colors.
- Alpha-based text for standard enterprise content.

## Border Style Foundation v0.1

### Purpose

Establish a practical, semantic border foundation for SyncPoint so future UI work converges on stronger structural separation and enterprise-readable contrast before implementation migration begins.

This guidance is documentation-first and governance-focused. It defines approved border tokens, usage intent, and migration direction to reduce drift from overly faint neutrals, alpha-heavy borders, and duplicated structural values.

### Core Principles

- Structural clarity over atmospheric softness.
- Borders should perform real separation work.
- Background tone changes may support borders but should not replace them.
- Tables, panels, forms, and grouped sections need clearly visible boundaries.
- Very soft alpha borders should be avoided for core structure.
- Focus and interactive borders must remain visually distinct from neutral structure.

### Approved Border Tokens

| Semantic Token | Hex Value | Primary Intent |
|---|---|---|
| `border-subtle` | `#D9D9E0` | Secondary separators only |
| `border-default` | `#CDCED6` | Standard structural border for panels, tables, grouped sections, containers |
| `border-strong` | `#8B8D98` | Higher-emphasis structure |
| `divider-default` | `#D9D9E0` | Standard horizontal/vertical separators |
| `panel-border` | `#CDCED6` | Panel shells, cards, side panels |
| `table-gridline` | `#CDCED6` | Table row/column boundaries |
| `input-border` | `#B9BBC6` | Default inputs, selects, filter controls |
| `border-disabled` | `#CDCED6` | Disabled controls only |
| `border-accent` | `#004B72` | Active/selected state border |
| `border-interactive` | `#004B72` | Active tabs, selected cards, active containers |
| `border-focus` | `#147DB9` | Keyboard/input focus and visible accessibility focus |
| `border-success` | `#5BB98B` | Semantic success boundaries |
| `border-warning` | `#E2A336` | Semantic warning boundaries |
| `border-error` | `#EB8E90` | Semantic error boundaries |
| `border-info` | `#60B3D7` | Semantic informational boundaries |

### Border Usage Rules

- `border-subtle` must not be used for core structure.
- `border-default` should be the default neutral structural border.
- Input borders should be slightly stronger than subtle separators.
- Focus borders must remain distinct from neutral borders.
- Do not introduce new one-off neutral border values when an approved semantic token exists.
- Avoid alpha-based borders for core structure.
- Consolidate duplicate neutral grays and status borders under semantic roles during future migrations.

### Current Baseline and Drift

Current baseline from active runtime usage:

- `#e0e1e6` is the dominant neutral border, but it is too faint for strong structural readability.
- `#004B72` is already the stable active/emphasis border color.

Known drift patterns to reduce:

- many alpha neutrals creating low-contrast structural ambiguity
- borders that are often too soft in tables, panels, and grouped surfaces
- background tone doing structural work that borders should do

### Legacy Migration Guidance

- Replace literal neutral borders with semantic roles when implementation support exists.
- Replace soft alpha structural borders with approved neutral border tokens.
- Replace duplicate table/panel/input border values with semantic equivalents.
- Replace ad hoc status border colors with approved semantic status tokens.
- Reduce reliance on background-only structural separation where a border is more appropriate.

### Current Anti-Patterns To Avoid

- Very faint neutral borders for core structure.
- Alpha-based structural borders.
- Gray-on-gray separation that depends too much on background tone.
- Inline border colors when semantic roles already exist.
- Multiple near-identical neutral grays for the same structural purpose.
- Multiple near-identical status borders.
- Borders so weak that tables/forms/panels lose scanability.

## Rollout Process Guidance

Rollout sequencing and migration process guidance lives in `docs/guidelines/contrast-rollout-playbook.md`.
