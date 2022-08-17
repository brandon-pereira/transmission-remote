import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path
      fill="currentColor"
      d="M5.541 2.159A1 1 0 0 0 4 3v18a1 1 0 0 0 1.541.841l14-9a1 1 0 0 0 0-1.682zM6 4.832 17.151 12 6 19.168z"
    />
  </svg>
);

const PlayIcon = memo(SvgComponent);
export default PlayIcon;
