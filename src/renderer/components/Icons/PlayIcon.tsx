import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" width="1em" height="1em" {...props}>
    <path fill="currentColor" d="m6 4 20 12L6 28z" />
  </svg>
);

const PlayIcon = memo(SvgComponent);
export default PlayIcon;
