---
# SEED STRUCTURE — not publishable as-is.
#
# Rules baked into this template (see the v2.1 addendum, I.2):
#   1. Every finding and prediction needs `source` and `observedOn`.
#      Entries missing either are dropped at load time, so an undated
#      assertion cannot ship.
#   2. No invented metrics. If a number was not observed, leave the
#      bracket in place — a bracket is honest, a guess is not.
#   3. Never name, rate or disparage the incumbent agency or developer.
#      Critique the artefact, never the people who made it.
#   4. Respectful tone throughout. A teardown that reads as an attack
#      loses the client it is aimed at.
#   5. `draft: true` keeps it out of the index and the sitemap. Flip it
#      only after D15 (format approved) and D16 (this subject approved
#      for publication).
title: "[ Headline finding — what the analysis concluded ]"
subject: "[ Public site or product name — pending D16 ]"
subjectUrl: ""
sector: "[ Sector ]"
auditedOn: 2026-08-31
summary: "[ Two sentences: what was analysed, and the single biggest opportunity found. Written as an observation, not a verdict on anyone's work. ]"
hypothesis: "[ The conversion hypothesis: what specific change is expected to move which specific number, and why. One sentence. ]"
findings:
  - claim: "[ What was observed — factual and checkable ]"
    detail: "[ Why it matters commercially, in plain language. No adjectives about whoever built it. ]"
    source: "[ How it was observed: Lighthouse run, manual keyboard pass, public pricing page, etc. ]"
    observedOn: "2026-08-31"
  - claim: "[ Second observation ]"
    detail: "[ Commercial consequence ]"
    source: "[ Method ]"
    observedOn: "2026-08-31"
architecture:
  - title: "[ Proposed change 01 ]"
    body: "[ What we would build instead, and the trade-off it accepts. ]"
  - title: "[ Proposed change 02 ]"
    body: "[ What we would build instead, and the trade-off it accepts. ]"
predictions:
  - metric: "[ Metric — e.g. mobile largest contentful paint ]"
    current: "[ Observed value ]"
    predicted: "[ Predicted value after the change ]"
    measurementPlan: "[ How this gets measured after launch, by whom, and over what window — so the prediction can be proved wrong. ]"
    source: "[ How the current value was observed ]"
    observedOn: "2026-08-31"
draft: true
---
