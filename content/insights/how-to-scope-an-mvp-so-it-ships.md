---
title: "How to scope an MVP so it actually ships"
date: 2026-08-12
category: "Scoping"
summary: "Most MVPs miss their date because the scope was written as a wish list instead of a decision. Here's the method we use to cut a build down to something that can survive a real deadline."
draft: false
---

Almost every late software project was late on day one. Not because the team was slow, but because the scope was a list of everything anyone mentioned, ordered by who said it loudest. The build then discovers, one week at a time, that the list was never achievable.

Scoping well is mostly a subtraction exercise. Here is how we run it.

## Start from the one thing that has to work

Write down the single sequence a user must complete for the product to have any value at all. For a lending product that might be: an applicant submits an application, an officer sees it, and a decision gets recorded. For a booking product: a customer picks a slot, pays, and both sides get a confirmation.

That sequence is your release. Everything else is a candidate for later.

The test for whether you have found it: if you removed any step, would the product still be worth using? If yes, that step isn't in the core sequence.

## Sort every remaining feature into three buckets

Take the rest of the wish list and put each item in exactly one bucket:

- **Blocks launch.** Without it, the core sequence breaks or you're legally or operationally unable to go live. Authentication usually lands here. So does anything a regulator requires.
- **Blocks scale.** It will hurt at a thousand users but not at fifty. Bulk actions, admin dashboards, and most reporting live here.
- **Someone would like it.** Everything else. Dark mode, the second integration, the export button someone requested in a meeting once.

Only the first bucket is in the MVP. The other two go into a written backlog that is visible, dated and never deleted, because the fastest way to make a stakeholder fight for a feature is to make them feel it vanished.

## Give every feature an owner-of-the-decision

Delays cluster around questions nobody has the authority to answer. Before the build starts, write the name of one person next to every open question in the scope. Not a team, a person.

This is the cheapest single intervention we know: it converts "we're blocked on the payment flow" into "we're waiting on a decision from a named person since Tuesday," which is a problem someone can actually solve.

## Price the cuts, not just the build

When a scope has to shrink, most teams argue about what to remove in the abstract. It's a much shorter conversation when each item carries a number: this admin dashboard is roughly two weeks, this second payment provider roughly one.

You don't need precision here. Rough, comparable numbers are enough to make the trade-off visible: two weeks of dashboard, or two weeks earlier to market.

## Write it down and make it boring

The output of scoping is one document that says: this is the sequence we're building, these are the things explicitly not in it, this is the date, this is what changes cost. Both sides sign it.

That document isn't bureaucracy. It's the thing that lets you say yes to a mid-build change without resentment, because everyone can see what the change displaces.

## The uncomfortable part

A well-scoped MVP looks embarrassingly small on paper. That feeling is correct and you should ship it anyway. The alternative isn't a bigger launch, it's a launch that keeps moving three weeks to the right, every three weeks, until the budget decides the scope for you.
