const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return (
    installer
      .default(
        extensions.map((name) => installer[name]),
        forceDownload
      )
      // eslint-disable-next-line no-console
      .catch(console.log)
  );
};

export default installExtensions;
