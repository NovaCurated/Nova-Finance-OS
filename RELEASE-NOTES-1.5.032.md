# Nova Finance OS 1.5.032: sharper scarf backgrounds

## Install
Upload **index.html** and **sw.js**. Both files are version 1.5.032. No SQL is needed.

index.html is now about 1.2MB, up from about 780KB, because the photos are larger. It only downloads again when the app updates.

## Why the backgrounds looked poor
In 1.5.031 each screen had one small, phone-shaped photo (460px wide). On a computer that was stretched across the whole window, roughly 3.5 times its size, which made it blurry and blocky.

## What changed
- **Computers:** each screen now has its own wide photo, drawn in the top-right corner at about its real size. It is never stretched across the page. It fades out to the left and downwards, so the rest of the page is plain.
- **Phones:** same layout as before, with larger photos (640px wide instead of 460px).
- **All photos:** saved in a cleaner format (WebP) with the film grain smoothed slightly, which removes the blocky patches.

Nothing else changed: same design on each screen, same figures and wording.

## Limit
The photos you sent are 1080px wide (WhatsApp shrinks them). That is the ceiling on sharpness. If you have the original files from the shoot, send those and I can make the backgrounds larger and sharper still.

## Tests
`test-results.txt` shows 42/42 passed on two runs. The scarf test now also checks, at 1280 and 1920 wide, that the design is drawn no larger than the photo itself.
