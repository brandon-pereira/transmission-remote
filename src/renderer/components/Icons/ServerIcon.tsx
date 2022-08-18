import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" width="1em" height="1em" {...props}>
    <path
      fill="currentColor"
      d="M16 0C7.163 0 0 2.239 0 5v4c0 2.761 7.163 5 16 5s16-2.239 16-5V5c0-2.761-7.163-5-16-5z"
    />
    <path
      fill="currentColor"
      d="M16 17c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"
    />
    <path
      fill="currentColor"
      d="M16 26c-8.837 0-16-2.239-16-5v6c0 2.761 7.163 5 16 5s16-2.239 16-5v-6c0 2.761-7.163 5-16 5z"
    />
  </svg>
);

const ServerIcon = memo(SvgComponent);
export default ServerIcon;
