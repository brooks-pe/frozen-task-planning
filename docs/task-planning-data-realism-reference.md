# Task Planning Data Realism Reference

This reference is a small realism map for future Task Planning UI work in `syncpoint-prototype`. It is intended to reduce fake or internally inconsistent mock data in implementation prompts.

Primary grounding came from the uploaded PMS 420 planning exports and breakdown reports, with the current SyncPoint implementation used only as secondary context.

## 1. Requirement Hierarchy Mapping

Treat top-level requirement statements as `L1` and child requirement statements as `L2`.

Representative `L1` examples grounded in the requirement breakdown export:

- Execute maintenance and waterfront sustainment support for MCM mission packages in CONUS and OCONUS.
- Focus on sailors operating and maintaining their systems through training, technical manuals, and readiness benchmarks.
- Maintain availability of deployed MCM mission package systems through logistics, spares, and repair capability.
- Provide C5I-focused ISEA/SSA technical support, system enhancements, and sustainment.
- Incrementally improve the MCM mission through comms reliability, ATR integration, mine neutralization, and modular capability improvements.
- Logistics documentation requirements for tailored technical, logistics, and training policies supporting current and future PMS 420 capabilities.
- Mature, deliver, and sustain sUSV FoS capabilities aligned to fleet and combatant command objectives.
- For CODB: minimize complexity and maximize efficiency through cost reduction, digital transformation, and value-driven operations.

Representative `L2` examples that plausibly sit under those `L1` themes:

- Under sustainment: issue materials, transport equipment, and support waterfront execution.
- Under sailor training: formal PMA training modules, technical manual delivery, and operator proficiency sustainment.
- Under availability: spare parts refresh, repair turnaround, and fielded-system sustainment actions.
- Under C5I support: communication upgrades, command-and-control integration, and technical support activities.
- Under incremental MCM improvement: TBEC lift-capacity enhancement, ATR integration, comms reliability improvement, and modular capability demonstrations.
- Under logistics documentation: provisioning, configuration management, lifecycle support documentation, and tailored training procedures.
- Under sUSV FoS: payload maturation, engineering support, T&E, laydown/sustainment, and logistics/training support.
- Under CODB: cross-portfolio planning alignment, baseline reconciliation, and efficiency-focused planning tasks.

Notes:

- The requirement export appears to mix true hierarchy rows with rollup rows; some rows in the spreadsheet render as `System.Xml.XmlElement`. Use the human-readable requirement statements as the realism source and treat ambiguous rows cautiously.
- Some requirement themes repeat at multiple depths in the report; do not assume every repeated statement represents a distinct new branch.

## 2. Project / Requirement Alignment

Use project names and requirement themes that align naturally in the exported data.

Plausible alignments:

- `MCM Mission Package Sustainment`, `Mission Package (MP) Fleet Maintenance and Operations`, and related sustainment projects align with maintenance, deployed availability, repair, and waterfront-support requirements.
- `MCM MP Training` aligns with sailor training, PMA training, technical manual delivery, and readiness benchmark requirements.
- `Mission Package Integration`, `Multi-Vehicle Communications Systems (MVCS) (OPN)`, and `Mission Package Computing Environment (MPCE)` align with C5I support, communications, software, and systems-integration themes.
- `sUSV Payloads`, `sUSV Engineering`, `sUSV Next`, `sUSV T&E`, `sUSV Logistics/Training`, and `sUSV Management` align with sUSV force-objective, engineering, experimentation, payload, and sustainment requirements.
- `SUW MP Production` and `SUW MP Sustainment` align with broader modular capability, production, and sustainment themes.
- `NEXTGEN`, `Unmanned Surface Vehicle (USV)`, and related modernization projects align with incremental capability improvement, prototyping, and integration-oriented requirement themes.
- CODB should not be treated like a normal product/project bucket. It aligns better to cross-cutting planning, prioritization, reconciliation, and efficiency requirements.

## 3. Activity Realism

Realistic executing and performing activity examples from the task and activity reports:

- `PMS 420`
- `NSWC PC`
- `NSWC DD`
- `NSWC PHD`
- `NSWC Carderock`
- `NSWC Crane`
- `NUWC NPT`
- `NAWC TSD Orlando`
- `NSWC Corona`
- `DLA`
- `JHU/APL`
- `AAC`
- `Northrop Grumman`
- `Textron`
- `Saronic`
- `MAPC`

UI realism guidance:

- Prefer government activities such as `PMS 420`, `NSWC PC`, and `NSWC DD` as the most common executing activities.
- Use contractors and external orgs more often as performing activities, support partners, or specialized execution contexts rather than as the default primary activity everywhere.
- `NSWC PC` is especially prominent in the exports and is a strong default for many MCM and mission-package examples.

## 4. WBS Realism

The exported WBS is deeper and more specific than the current prototype mock data. Use realistic examples like these:

- `1 - LCS Mission Modules Program`
- `1.1 - MCM Mission Package`
- `1.1.1 - Airborne Mine Neutralization (AMN) MM, Near Surface Detection (NSD) MM, and Remote Minehunting (RMH) MM`
- `1.1.1.6 - Training`
- `1.1.1.6.2 - Services`
- `1.1.2 - Coastal Mine Reconnaissance (CMR) MM`
- `1.1.2.6 - Training`
- `1.1.5 - MCM Mission Package Production`
- `1.1.5.1 - LCS MCM Mission Modules`
- `1.4.1.1 - Mission Package Computing Environment (MPCE)`
- `1.4.2.1 - MVCS`
- `1.7.5.1 - MVCS Replacement/Attrition/Tech Refresh`
- `3.1.2 - MCM USV`

UI realism guidance:

- Treat WBS as a hierarchical code plus descriptive name, not just a flat code list.
- Training, services, sustainment, integration, production, and computing/communications appear repeatedly as meaningful WBS slices.
- Avoid generic placeholder WBS such as `5.1 Hull Systems` unless the screen is intentionally abstracted away from PMS 420 data.

## 5. Funding Realism

Realistic appropriation patterns in the task data:

- `OPN`
- `O&MN`
- `RDT&EN`
- `WPN` appears, but much less frequently than the three above

Realistic funding-source naming patterns in the funding export:

- `0603596N/3129 - LCS MM Common Equipment - 2026`
- `BLI 1600/LM008 - MPCE - 2026`
- `BLI 1600/LM016 - MVCS - 2026`
- `BLI 1600/LM015 - Containers - 2026`
- `BLI 1601/MC002 - MCM USV - 2026`

UI realism guidance:

- Funding source labels often combine a program/BLI-style code, a short capability name, and a fiscal year.
- A single task may map to more than one funding-source record, including different fiscal years.
- Appropriation should meaningfully narrow the funding-source set. Do not present one undifferentiated global funding-source list when the UI is meant to feel realistic.
- OPN, O&MN, and RDT&EN are the most important appropriations to represent in task-planning mock data.

## 6. Task Example Patterns

Realistic example task title/objective patterns aligned to the exported data:

- `MVCS TDA Support and Services`
- `MPCE Installation and Checkout Deliverables`
- `NSWC PC overarching production management for MPCE`
- `MVCS replacement/attrition/tech refresh program management support`
- `Proficiency Modules in Support of Formal Post Mission Analysis (PMA) Training`
- `Mine Countermeasures Sailor Travel`
- `Deliver the SeaWare LMS into MWTC`
- `Mine Countermeasure Support Equipment`

Good future mock-task patterns:

- short action-oriented title
- explicit capability or platform reference
- optionally include the planning year when the context is annualized
- align the task to a specific WBS area, activity, and requirement theme

Examples by requirement theme:

- Sustainment: `Waterfront sustainment support for deployed MCM mission packages`
- Training: `Formal PMA training module delivery for MCM sailors`
- C5I: `C5I technical support and software sustainment for mission-package communications`
- Modernization: `ATR integration support for modular MCM capability improvement`
- Logistics: `Tailored technical documentation and provisioning support for PMS 420 capabilities`
- sUSV: `Payload integration support for sUSV FoS capability delivery`

## 7. CODB Realism

CODB should be treated as a distinct planning context, not just another normal project row.

Realistic CODB characteristics from the requirement export:

- CODB is framed around complexity reduction, efficiency, digital transformation, value-driven decision-making, and operational optimization.
- CODB requirements read more like cross-portfolio management and planning outcomes than system-specific engineering deliverables.
- CODB examples should emphasize coordination, reconciliation, prioritization, and planning-baseline maintenance rather than platform-specific sustainment or hardware integration.

Good CODB example requirement/task patterns:

- `Baseline planning and reconciliation across PMS 420 priorities`
- `Cross-portfolio cost and funding efficiency review`
- `Planning alignment for digital process improvement initiatives`
- `CODB funding-source reconciliation by task and appropriation`
- `Portfolio-level requirement-to-task traceability cleanup`

UI realism guidance:

- Keep CODB distinct from product/capability programs like MVCS, MPCE, MCM MP production, or sUSV payload development.
- CODB should plausibly reuse the same activity, appropriation, WBS, and funding structures when needed, but the task semantics should stay planning-centric.
- If a UI needs a CODB requirement hierarchy, prefer management/planning verbs like `align`, `reconcile`, `prioritize`, `streamline`, and `optimize`.

## Source Notes

The most influential uploaded sources for this reference were:

- `requirement_breakdown_report_2026_4_1_80818.xlsx`
- `task_breakdown_report_2026_4_1_80805.xlsx`
- `wbs_breakdown_report_2026_4_1_80820.xlsx`
- `activity_breakdown_report_2026_4_1_80859.xlsx`
- `funding_sources_by_task_report_2026_4_1_80824.xlsx`

Secondary support came from:

- `org_breakdown_report_2026_4_1_80834.xlsx`
- `requirement_breakdown_by-task_all-fields.xlsx`
- `pms-420-program-requirements.pdf` as higher-level thematic context, though the spreadsheet exports provided the most concrete, reusable UI realism details.
