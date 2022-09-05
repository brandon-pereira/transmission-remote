import { MouseEvent, useState } from 'react';

// On cmdClick on mac and cntrl click on windows
// select additional item or unselect if already selected
const onMetaClick = (newId: string) => (currentIds: string[]) => {
  if (!currentIds.includes(newId)) {
    return [...currentIds, newId];
  }
  return currentIds.filter((idx) => idx !== newId);
};

const onRegularClick = (newId: string) => () => {
  return [newId];
};

const onShiftClick =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_newId: string, _order: string[]) => (currentIds: string[]) => {
    return currentIds;
  };

function useSelections({
  data,
  initialItems,
}: {
  data: string[];
  initialItems?: string[];
}) {
  const [selections, setSelections] = useState<string[]>(initialItems || []);

  const onSelectItem = (e: MouseEvent<HTMLElement>, id: string) => {
    if (e.metaKey) {
      setSelections(onMetaClick(id));
    } else if (e.shiftKey) {
      setSelections(onShiftClick(id, data));
    } else {
      setSelections(onRegularClick(id));
    }
  };

  return <const>[selections, onSelectItem];
}

export default useSelections;
