import useSelectedTorrents from 'renderer/hooks/useSelectedTorrents';
import useServers from 'renderer/hooks/useServers';
import Button from '../../components/Button/Button';
import AddFilesIcon from '../../components/Icons/AddFilesIcon';
import RemoveIcon from '../../components/Icons/RemoveIcon';
import ServerIcon from '../../components/Icons/ServerIcon';
import TitleBar from '../../components/TitleBar/TitleBar';

function Header() {
  const [selectedItems] = useSelectedTorrents();
  const { activeServer } = useServers();

  return (
    <TitleBar
      leftButtons={
        <>
          <Button
            type="button"
            aria-label="Add Torrent"
            onClick={() => {
              window.electron.transmission.openFilePicker();
            }}
            icon={<AddFilesIcon />}
          />
          {Boolean(selectedItems.length) && (
            <Button
              type="button"
              aria-label="Delete Torrents"
              icon={<RemoveIcon />}
              onClick={() => {
                window.electron.transmission.deleteTorrents(selectedItems);
              }}
            />
          )}
        </>
      }
      rightButtons={
        <Button
          onClick={() => {
            window.electron.transmission.openServerSettings();
          }}
          type="button"
          icon={<ServerIcon />}
        >
          {activeServer?.host}:{activeServer?.port}
        </Button>
      }
    />
  );
}

export default Header;
