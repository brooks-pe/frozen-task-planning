Change type:
Data population + component enhancement + conditional UI

Scope:
Create Task flyout panel — Execution Statement field only

Objective:
Improve Execution Statement selection by introducing realistic data, better dropdown usability, and a persistent full-detail display after selection.

---

1. Populate Execution Statement Dropdown

Replace empty state with a list of selectable options.

Each option should include:

* A short descriptive title (truncate with ellipsis if needed)
* Use realistic execution statement examples (provided below)

DO NOT display full paragraph text inside dropdown options.

---

2. Dropdown Option Format

Each option should:

* Be a single-line label
* Use Body text (14px)
* Truncate with ellipsis if too long

Example format:
"Surface Ship Undersea Warfare Modernization..."
"Autonomous Mine Detection Capability Expansion..."

Do NOT include multi-line text in dropdown.

---

3. Add Execution Statement Details Field

When a user selects an execution statement:

Display a new read-only field directly below the dropdown.

Field label:
Execution Statement Details

Field behavior:

* Displays full 1–3 sentence execution statement
* Read-only (non-editable)
* Always visible after selection

---

4. Execution Statement Details Styling

* Use Body text (14px, NOT 13px)
* Use a read-only text area or container
* Light neutral background (subtle contrast from page)
* Maintain strong text readability (no gray-on-gray)

Do NOT:

* Collapse or hide this field after selection
* Use placeholder styling
* Use disabled text styling

---

5. No Hover Interaction (For Now)

Do NOT implement hover tooltips or hover cards.

Focus on:

* Clear dropdown selection
* Persistent detail display below

---

6. Sample Data (Use Exactly)

Include the following execution statements:

1. Surface Ship Undersea Warfare Modernization
   Enhance surface ship undersea warfare capabilities through integration of advanced sonar systems, improved signal processing, and upgraded mission planning tools to support distributed maritime operations.

2. Autonomous Mine Detection Capability Expansion
   Develop and deploy autonomous systems capable of detecting and classifying naval mines using advanced sensor fusion, machine learning algorithms, and unmanned surface and underwater platforms.

3. Maritime ISR Sensor Integration & Data Fusion
   Integrate multi-domain intelligence, surveillance, and reconnaissance sensors to enable real-time data fusion, improved situational awareness, and enhanced decision-making across maritime operations.

4. Littoral Combat Systems Readiness Improvement
   Improve readiness and operational availability of littoral combat systems through targeted maintenance enhancements, system upgrades, and logistics optimization initiatives.

5. Expeditionary Mine Countermeasure Mission Support
   Support expeditionary mine countermeasure missions by developing deployable systems, enhancing mission planning capabilities, and improving interoperability across joint forces.

6. Unmanned Surface Vehicle Payload Integration
   Design and integrate modular payload systems for unmanned surface vehicles to support surveillance, mine detection, and electronic warfare missions in contested environments.

---

Constraints:

* Do NOT modify other fields
* Do NOT change layout structure
* Do NOT introduce new interaction patterns
* Follow guidelines.md strictly (typography, contrast, spacing)

---

Success Criteria:

* Dropdown contains realistic execution statements
* Options are scannable and truncated
* Selecting an option reveals full details below
* Full statement is readable and properly styled
* No gray-on-gray text issues
