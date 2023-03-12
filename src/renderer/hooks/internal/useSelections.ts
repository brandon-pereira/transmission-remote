import { MouseEvent, useState } from 'react';

// On cmdClick on mac and cntrl click on windows
// select additional item or unselect if already selected
const onMetaClick = (newId: number) => (currentIds: number[]) => {
  if (!currentIds.includes(newId)) {
    return [...currentIds, newId];
  }
  return currentIds.filter((idx) => idx !== newId);
};

const onRegularClick = (newId: number) => () => {
  return [newId];
};

const onShiftClick =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_newId: number, _order: number[]) => (currentIds: number[]) => {
    return currentIds;
  };

function useSelections({
  data,
  initialItems,
}: {
  data: number[];
  initialItems?: number[];
}) {
  const [selections, setSelections] = useState<number[]>(initialItems || []);

  const onSelectItem = (e: MouseEvent<HTMLElement>, id: number) => {
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
