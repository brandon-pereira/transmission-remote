import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" width="1em" height="1em" {...props}>
    <path fill="currentColor" d="M4 4h10v24H4zm14 0h10v24H18z" />
  </svg>
);

const PauseIcon = memo(SvgComponent);
export default PauseIcon;
