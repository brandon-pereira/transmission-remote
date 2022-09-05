import createSharedHook from './internal/createSharedHook';
import useSelections from './internal/useSelections';
import useTorrents from './useTorrents';

function useInternalSelectedTorrents() {
  const { torrents } = useTorrents();
  const [selectedItems, onSelectItem] = useSelections({
    data: torrents?.map((t) => t.id) || [],
  });

  return <const>[selectedItems, onSelectItem];
}

const { useConsumer: useSelectedTorrents, Provider } = createSharedHook(
  useInternalSelectedTorrents
);

export { Provider };
export default useSelectedTorrents;
