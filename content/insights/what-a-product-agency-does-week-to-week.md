---
title: "What a product development agency actually does, week to week"
date: 2026-08-26
category: "Working together"
summary: "A plain account of where the hours go in a two-week sprint, what you should expect to see, and the warning signs that a build has gone quiet."
draft: false
---

"Product development agency" is a phrase that could mean almost anything. If you've never bought a software build before, it's hard to know what you're paying for between the kickoff call and the launch.

Here's the honest version, using a standard two-week sprint.

## Week one: decisions and scaffolding

The first days of a sprint are mostly about removing ambiguity before it becomes code.

- **Turning tickets into decisions.** Every ticket hides a question: what happens if the payment fails halfway, or what an admin sees that a user doesn't. These get answered up front, because answering them mid-implementation is where rework comes from.
- **Interface and data work.** Screens get built against real data shapes, not lorem ipsum. If the data model is wrong, you want to find out now.
- **The unglamorous plumbing.** Environments, error tracking, deploy pipelines. Boring, and the reason week six isn't chaos.

You should see a deploy going out during this week, even if what it contains is half-finished. A build that only deploys at the end of a sprint is hiding its state from you.

## Week two: making it real, then showing it

- **Edge cases and states.** Empty, loading, error, permission-denied. This is often half the work and almost none of the demo, which is exactly why it gets skipped by teams that are behind.
- **Testing against real behaviour.** Not just "does it work" but "does it work when someone does the thing we didn't plan for."
- **The demo.** A live URL, not a slide. You click through it yourself.

That last point matters more than it sounds. Watching someone else drive a demo is how problems stay hidden; five minutes of clicking it yourself is how they surface.

## What you should be getting, every sprint

1. A working URL you can open without asking anyone.
2. A short written note: what shipped, what slipped, what's next, what we need from you.
3. An updated roadmap: the same document as last sprint, revised rather than replaced.
4. Visibility on the budget burn against the plan.

If any of those four are missing, ask for them. If they stay missing, that's information about the engagement.

## What we need from you

Usually about two hours a week: one demo, plus timely answers to questions only you can answer. That second part is where most delays actually come from, not the engineering, but a decision sitting in someone's inbox for four days while the sprint runs out.

## The warning signs of a build going quiet

- Status is described in percentages ("the backend is 80% done") rather than working features.
- Demos start being rescheduled, or become screen-shares of code.
- The roadmap stops being updated, or reappears as a new document with the old dates removed.
- Questions get answered with "we'll handle it" instead of a decision and an owner.

None of these mean the project is doomed. All of them mean it's time to ask direct questions, early, while there's still budget to correct with.

## Why this is worth knowing before you hire anyone

You don't need to understand the code to hold a build accountable. You need to know what a healthy week looks like: a deploy, a demo, a written note, an updated plan, and to notice when those stop arriving.

That's most of what separates clients who get good outcomes from clients who find out in month four.
