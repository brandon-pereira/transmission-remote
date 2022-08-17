import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path
      fill="currentColor"
      d="M4 1a2.997 2.997 0 0 0-3 3v4a2.997 2.997 0 0 0 3 3h16a2.997 2.997 0 0 0 3-3V4a2.997 2.997 0 0 0-3-3zm0 2h16c.276 0 .525.111.707.293S21 3.724 21 4v4c0 .276-.111.525-.293.707S20.276 9 20 9H4c-.276 0-.525-.111-.707-.293S3 8.276 3 8V4c0-.276.111-.525.293-.707S3.724 3 4 3zm0 10a2.997 2.997 0 0 0-3 3v4a2.997 2.997 0 0 0 3 3h16a2.997 2.997 0 0 0 3-3v-4a2.997 2.997 0 0 0-3-3zm0 2h16c.276 0 .525.111.707.293S21 15.724 21 16v4c0 .276-.111.525-.293.707S20.276 21 20 21H4c-.276 0-.525-.111-.707-.293S3 20.276 3 20v-4c0-.276.111-.525.293-.707S3.724 15 4 15zm2-8a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
    />
  </svg>
);

const ServerIcon = memo(SvgComponent);
export default ServerIcon;
