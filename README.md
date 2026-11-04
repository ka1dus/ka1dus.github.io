# Max Chan: portfolio site

Plain HTML, CSS and JS with no build step. Every page works when opened from any static host.

```
index.html                      home: hero, featured video, work, experience, skills, contact
work/so101-stacking-game.html   case study 01
work/airport-perception.html    case study 02 (Botmind)
work/gibson-assistant.html      case study 03 (Botmind)
assets/css/site.css             all styles (colour tokens at the top, light + dark)
assets/js/site.js               theme toggle, scroll reveal, video play-on-view, image lightbox
assets/media/                   compressed videos (H.264, faststart) and JPEG stills
assets/MaxChanResume.pdf          linked from the header and contact section
assets/Max_Chan_Resume.pdf        earlier general résumé (not linked)
```

## Preview locally

```bash
cd ~/portfolio && python3 -m http.server 8765
```

Then open http://localhost:8765.

## Adding media later

Compress video first (keeps the site fast), then add a figure where it belongs:

```bash
ffmpeg -i in.mov -an -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -movflags +faststart out.mp4
```

```html
<figure>
  <div class="fig-media dark">
    <video data-autoplay muted loop playsinline preload="none" poster="../assets/media/x/clip.jpg">
      <source src="../assets/media/x/clip.mp4" type="video/mp4">
    </video>
  </div>
  <figcaption><span class="mono">Fig. 3</span><span>Caption.</span></figcaption>
</figure>
```

## Deploy (GitHub Pages)

```bash
cd ~/portfolio && git init && git add . && git commit -m "Portfolio site"
gh repo create ka1dus.github.io --public --source . --push
```

The site is then live at https://ka1dus.github.io. Any static host (Netlify, Vercel, Cloudflare Pages) also works with no settings.
