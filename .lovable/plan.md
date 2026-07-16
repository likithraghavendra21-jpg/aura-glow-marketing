## Changes to `src/routes/index.tsx` and `src/styles.css`

### 1. Update hero headline
Replace the current two-line slogan ("Transforming Clicks into Customers. / Elevate Your Aura Online.") with a single styled line:

> **Where data meets creativity, businesses grow.**

The phrase "data meets creativity" will use the warm gradient text style for emphasis; the rest stays in the default foreground color.

### 2. Fix the "Grow My Business" button visibility
Root cause: the button uses `bg-[var(--gradient-aura)]`, but Tailwind's `bg-[...]` arbitrary value sets `background-color`, which cannot accept a `linear-gradient(...)` value — so the button renders with no fill (appears transparent). The same bug affects the navbar CTA, mobile menu CTA, and the icon tiles reusing that class.

Fix by introducing a dedicated utility in `src/styles.css`:

```css
@utility bg-aura {
  background-image: var(--gradient-aura);
  background-color: var(--primary); /* solid fallback */
}
```

Then replace every `bg-[var(--gradient-aura)]` occurrence in `src/routes/index.tsx` with `bg-aura`. This keeps the same visual gradient while guaranteeing a visible fill.

### 3. Add related images to every service card
- Generate 7 small warm-toned illustration images (one per service: SEO, Social Media, Google/Meta Ads, LinkedIn B2B, Reviews, Offline/Hybrid, Analytics) saved under `src/assets/services/`.
- Extend the `services` array with an `image` field importing each asset.
- Update the service card layout in `Services()` so each card shows the image at the top (rounded, `aspect-[16/10]`, `object-cover`, subtle zoom on hover) with the icon badge overlapping the image's bottom-left corner, followed by the existing title and description. Layout remains the same 3-column responsive grid.

### 4. Verification
Run typecheck and visually confirm in the preview that:
- Hero shows the new slogan.
- "Grow My Business" button has a visible warm gradient fill.
- Each service card displays its themed image.
