interface Props {
  team?: 'home' | 'away' | string;
}

/**
 * Generic ball marker drawn at the (already projected) origin of the
 * parent <g transform="translate(x,y)">. The outer halo uses the team
 * color when `team` is recognised.
 */
export function BallMarker({ team }: Props) {
  const haloClass =
    team === 'home'
      ? 'lmt-ball-halo lmt-ball-halo--home'
      : team === 'away'
        ? 'lmt-ball-halo lmt-ball-halo--away'
        : 'lmt-ball-halo';
  return (
    <g class="lmt-ball">
      <circle class={haloClass} r="26" />
      <circle r="9" fill="#ffffff" stroke="#0f172a" stroke-width="2" />
    </g>
  );
}
