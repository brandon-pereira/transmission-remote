import { SVGProps, memo } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path
      fill="currentColor"
      d="M17.586 7H15V4.414zm3.121.293-6-6A1.008 1.008 0 0 0 14 1H6a2.997 2.997 0 0 0-3 3v16a2.997 2.997 0 0 0 3 3h12a2.997 2.997 0 0 0 3-3V8a.997.997 0 0 0-.293-.707zM13 3v5a1 1 0 0 0 1 1h5v11c0 .276-.111.525-.293.707S18.276 21 18 21H6c-.276 0-.525-.111-.707-.293S5 20.276 5 20V4c0-.276.111-.525.293-.707S5.724 3 6 3zM9 16h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2h-2v-2a1 1 0 0 0-2 0v2H9a1 1 0 0 0 0 2z"
    />
  </svg>
);

const AddFilesIcon = memo(SvgComponent);
export default AddFilesIcon;
