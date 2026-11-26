/** Soft colour fields behind the glass. Fixed, decorative. */
export function Ambient() {
  return (
    <div aria-hidden className="ambient">
      <i style={{ width: '46vw', height: '46vw', top: '-12vw', insetInlineStart: '-8vw', background: '#1f7a62' }} />
      <i style={{ width: '38vw', height: '38vw', top: '30vh', insetInlineEnd: '-12vw', background: '#7a5a1f', animationDelay: '-9s' }} />
      <i style={{ width: '40vw', height: '40vw', bottom: '-14vw', insetInlineStart: '22vw', background: '#243b7a', animationDelay: '-17s', opacity: 0.4 }} />
    </div>
  )
}
