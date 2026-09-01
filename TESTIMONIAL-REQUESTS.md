# Getting the real quotes, D8

The trust bar now carries live, checkable work rather than placeholder
logos. The quote carousel is still empty in production, and it stays empty
until real people say real things and agree to be quoted.

Nothing in this file goes on the site. These are drafts for the founder to
send, edit or ignore. The site publishes a quote only after the person has
seen the exact wording that will appear next to their name and said yes to
it in writing.

## Why not just write them

A fabricated review attributed to a named real person is not a placeholder,
it is a false statement of fact about that person, published to induce a
purchase. It exposes the studio to a defamation and false-advertising
problem, it damages the named person, and it is the one thing on this site
that a prospective client could disprove in a single phone call. The whole
positioning here is "measured, not claimed". One invented quote makes every
real number next to it worthless.

## 1. Baniri Technologies, for the Vuvu.ng study

To: Koni Fiwaji

Two asks, both small.

First, permission. I have written up the Vuvu.ng work as a case study on my
studio site. It describes what the product does and how it was delivered.
It names Baniri Technologies as the client. Are you happy to be named? If
you would rather I describe it as "a Nigerian fintech" instead, that is
completely fine and I will change it today.

Second, numbers. I have two figures from my own records that I would like
to publish: two releases over sixteen weeks, and a 45 per cent reduction in
defects and launch issues after the QA and UAT process we put in. I do not
want to publish either unless you can confirm them, because the site says
in print that every figure on it is client-confirmed. If they are wrong,
tell me what the right ones are.

And if you have two sentences on what working together was like, I would be
glad to run them. Something specific beats something flattering: the thing
that was hard, and what actually changed.

## 2. AfroMadeIt Global, for the site build

To: Peggy Joseph

I have written up the AfroMadeIt site build as a case study, labelled
honestly as in-house rather than as a client engagement, because it would be
dishonest to present my own company as a client.

If you are willing, a short quote from you as CEO would carry real weight,
specifically on the positioning work rather than the build: the part where
we argued about what the firm actually claims and who it is talking to
first. Two or three sentences. Say the awkward bit if there was one.

## 3. LinkedIn recommendations

The cleanest source of real quotes. A recommendation on LinkedIn is public,
attributable, and already carries the person's name, photo and role, which
is most of what makes a testimonial persuasive.

Worth asking: Koni Fiwaji and anyone on the Baniri engineering side who ran
sprints with you, Peggy Joseph, and whoever you reported into at
FamoDFarmer.

Ask for something specific rather than something nice:

> Would you be willing to leave me a recommendation? If it helps, the thing
> I would most like it to speak to is [ the scoping work / getting Vuvu into
> both stores / how the backlog was run ]. Two or three sentences is plenty,
> and please be honest rather than generous, it is more useful to me that
> way.

Then ask separately before republishing: a public LinkedIn recommendation is
public, but moving it onto a commercial site next to a price list is a new
context, and people should be asked.

## Where they go once they land

`src/lib/site.ts` → `TESTIMONIALS`. Replace a placeholder row with the real
quote, name and role, and delete `placeholder: true` from that row. That row
then renders in production. Nothing else needs changing.

Logos go in the same file under `TRUST_ITEMS`, and only with written
sign-off.
