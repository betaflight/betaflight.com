---
title: Build Server Retention Policy
date: 2026-07-22
authors: ['blckmn']
---

To keep our build server sustainable, we're introducing retention limits on the firmware builds we host.

<!--truncate-->

## What's Changing

- **Release Candidate (RC) builds** will be kept for **30 days**, then removed.
- **Point releases** will be kept for a **maximum of 2 years**, then removed.

## What Stays Available

The **latest point release of every major version from 4.3 onwards** will always remain available, regardless of age. Even once the 2-year window has passed, you'll still be able to download the final build of each major release (4.3.x, 4.4.x, 4.5.x, and so on).

## Please Note

We may remove any point release at any time where it's in the interests of the community to do so, for example due to a safety issue.

If you rely on an older build, we recommend downloading and archiving it locally before it ages out.

Remember that every release is tagged in our source repository, so you can clone [betaflight/betaflight](https://github.com/betaflight/betaflight) and build any version yourself, at any time.
