Task: Update Task Summary Metadata Fields — Add WBS, Project, and Associated Tasks

Context:
We are refining the Task Summary section in the SyncPoint Task Workspace.

Current Task Summary is missing several important metadata fields.

We need to add:

Project

WBS Attribute

Associated Tasks

We also need to rebalance the field layout so the summary remains a clean three-row metadata grid.

This is a correction pass only.
Do NOT redesign the Task Summary component.

OBJECTIVE

Update the Task Summary metadata grid to:

Add missing fields:

Project

WBS Attribute

Associated Tasks

Reorganize field placement to maintain a clean three-row structure

Preserve existing styling, spacing, and overall Task Summary layout

UPDATED FIELD LAYOUT (REQUIRED)

TOP ROW:

Execution Statement

Executing Activity

Project

WBS Attribute

Appropriation

SECOND ROW:

Requested

Allocated

Gap

Planning Year

Period of Performance

THIRD ROW:

Project Lead

Activity Lead

Operational Status

Previous Task

Associated Tasks

Next Task

FIELD CONTENT GUIDANCE

Add realistic placeholder/example values:

Project
Example:
Coastal Surveillance Modernization

WBS Attribute
Example:
5.2 — Sensor Fusion Systems

Associated Tasks
Example:
None linked
or
2 linked tasks

Use whichever reads more naturally in the current mockup.

PLACEMENT RULES

Move Planning Year from the current top row to the second row

Place WBS Attribute and Project in the top row

Place Associated Tasks in the third row near Previous Task / Next Task

Keep lineage-related fields grouped together

VISUAL RULES

Maintain existing Task Summary visual style

Keep label/value formatting consistent with all other summary fields

Do NOT introduce new card structures

Do NOT alter spacing tokens or typography hierarchy

Preserve current border/grid behavior

DATA SEMANTICS

These fields are important metadata and should read as part of the core task summary, not optional extras.

Grouping intent:

Top row = structural task context

Second row = planning/funding/timeframe context

Third row = people, status, and lineage context

DO NOT CHANGE

Task Summary container

Header, collapse behavior, or Edit button

Existing badges and semantic color treatments

Banner below Task Summary

Any other page sections

OUTCOME

A corrected Task Summary that:

includes Project, WBS Attribute, and Associated Tasks

preserves a clean three-row layout

groups related metadata more logically

better reflects the core planning structure of the task