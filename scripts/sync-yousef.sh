#!/usr/bin/env bash
# Mirrors Yousef's demo sites and portfolio preview images into public/y/.
# Runs in GitHub Actions (the sites live on surge.sh).
set -euo pipefail
OUT=public/y
mkdir -p "$OUT/previews"
SITES="volt:volt-mobile-eg mazag:mazag-coffee-eg rukn:rukn-developments azm:azm-athletic raqy:raqy ibtesama:ibtesama-dental eish:eish-w-melh refq:refq-vet-eg misk:misk-perfume-eg qeshta:qeshta-sweets-eg mahara:mahara-courses-eg sekka:sekka-trips-eg hekaya:hekaya-books-eg"
for i in $(seq 1 13); do
  curl -fsSL "https://yousef-samir-web.surge.sh/assets/preview-current-$i-v2.webp" -o "$OUT/previews/$i.webp"
done
for pair in $SITES; do
  id=${pair%%:*}; host="https://${pair#*:}.surge.sh"
  dir="$OUT/$id"; mkdir -p "$dir"
  curl -fsSL "$host/" -o "$dir/index.html"
  # every same-site file the page references (HTML, inline CSS/JS strings)
  grep -oE '["'"'"'(]\.?/?(assets/[^"'"'"' )?#]+|[A-Za-z0-9_-]+\.(png|jpg|jpeg|webp|avif|svg|ico|webmanifest|json|woff2?|mp4|webm|css|js))' "$dir/index.html" \
    | sed -E 's/^["'"'"'(]//; s#^\./##; s#^/##' | sort -u | while read -r f; do
      [ -z "$f" ] && continue
      mkdir -p "$dir/$(dirname "$f")"
      curl -fsSL "$host/$f" -o "$dir/$f" 2>/dev/null || rm -f "$dir/$f"
    done
  # manifest may reference more icons
  if [ -f "$dir/manifest.webmanifest" ]; then
    grep -oE '"src" *: *"[^"]+"' "$dir/manifest.webmanifest" | sed -E 's/.*"([^"]+)"$/\1/; s#^/##' | while read -r f; do
      mkdir -p "$dir/$(dirname "$f")"; curl -fsSL "$host/$f" -o "$dir/$f" 2>/dev/null || true; done
  fi
  echo "$id: $(find "$dir" -type f | wc -l) files, $(du -sh "$dir" | cut -f1)"
done
