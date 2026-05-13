interface Props {
  name: string;
  /** Side preference of the tip relative to the ball ('above' default). */
  side?: 'above' | 'below';
}

/**
 * Speech-bubble style tooltip showing the player name above the ball.
 * Rendered inside the same parent <g> as the BallMarker so the
 * translation applies.
 */
export function PlayerTip({ name, side = 'above' }: Props) {
  const dy = side === 'above' ? -42 : 42;
  const arrowD =
    side === 'above'
      ? 'M -6,-9 L 0,-2 L 6,-9 Z'
      : 'M -6,9 L 0,2 L 6,9 Z';
  const width = Math.max(64, Math.min(220, name.length * 11 + 28));
  return (
    <g class="lmt-tip" transform={`translate(0 ${dy})`}>
      <rect
        x={-width / 2}
        y="-16"
        width={width}
        height="28"
        rx="6"
        fill="#ffffff"
      />
      <path d={arrowD} fill="#ffffff" />
      <text
        x="0"
        y="3"
        text-anchor="middle"
        font-size="14"
        font-weight="700"
        fill="#0f172a"
      >
        {name}
      </text>
    </g>
  );
}
