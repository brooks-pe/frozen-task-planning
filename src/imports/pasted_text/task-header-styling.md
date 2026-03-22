Task: Fix Task Workspace Header Styling to Match SyncPoint Page Patterns

Context:
The Task Workspace header for TSK-0501 has been implemented, but it is NOT following established SyncPoint HiFi layout and styling patterns.

We need to correct the structure and styling so it aligns with the standard page header pattern used in modules like Execution Planning.

---

### ❗ Issues to Fix

1. The top action row does NOT match the system pattern
2. Button styles are incorrect
3. Header section spacing and hierarchy are off
4. The layout does not match the standard "page header block" used elsewhere

---

### ✅ Required Structure (Match Existing Pattern)

Use the Execution Planning page header as the reference pattern.

---

## 1. Top Action Row (Replace Current Implementation)

Layout:

* Left: Back to Tasks button
* Right: Clone Task button

### Left Button:

* Label: ← Back to Tasks
* Style: **Secondary Outline (Neutral)**
* Includes left arrow icon
* This replaces the "Version" dropdown row entirely

### Right Button:

* Label: Clone Task
* Style: **Secondary Outline (Accent)**
* Use accent color (blue) for border/text
* Matches other action buttons in system

### Layout Rules:

* Buttons sit on same horizontal row
* Use standard page padding/margins
* No container or card wrapping this row

---

## 2. Header Block (Below Action Row)

This must follow the SAME structure as Execution Planning:

### Title (H1):

Coastal Surveillance Radar Modernization

* Large, bold
* Primary page heading style

### Subtitle (Description):

TSK-0501 Task Summary

* Smaller, muted text
* Directly beneath title
* Tight spacing (not too far apart)

---

## 3. Breadcrumb Placement

Move breadcrumb to MATCH system pattern:

Home / Task Planning / Tasks / TSK-0501

* Positioned ABOVE the title (not below buttons)
* Styled consistently with other pages
* Proper spacing between breadcrumb and title

---

## 4. Spacing + Alignment

* Maintain vertical rhythm:

  * Action row
  * Breadcrumb
  * Title
  * Subtitle

* Align everything to the same left grid line

* Ensure right-side Clone button aligns with page content edge

---

## 5. Remove / Avoid

* ❌ No version dropdown
* ❌ No extra containers or cards
* ❌ No custom layout deviations
* ❌ No misaligned button styles

---

### Outcome Goal:

The Task Workspace header should visually match the Execution Planning header pattern exactly, with:

* Proper button hierarchy
* Clean alignment
* Consistent typography
* Standard spacing

This ensures consistency across the SyncPoint system and reinforces a unified UX.
