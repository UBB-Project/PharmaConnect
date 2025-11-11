## Login / Register Navigation Flow

- Audience: pharmacies (sellers) and shoppers (buyers)
- Page: `/login` (Login tab is default; Register available via tab)
- Behavior: Cosmetic only; submitting either form redirects to `/`

### Ways to arrive at the Login/Register page
1. From Home hero CTAs
   - Click “Start selling” → navigates to `/login`
   - Click “Shop products” → navigates to `/login`
2. From Header (any page)
   - Click “Log out” → confirmation popup → Confirm → navigates to `/login`
3. Direct URL
   - Visit `/login` directly in the browser

### On the Login/Register page
- Default view: Login tab (email + password)
- Switch to Register tab for name fields (first, second, last)
- Pressing Login/Register triggers an animated sequence, then redirects to `/`

### Notes for developers
- Route is defined at `/login`
- Redirection after submit uses client-side navigation to `/`
- This is a visual-only implementation; no backend auth calls yet


