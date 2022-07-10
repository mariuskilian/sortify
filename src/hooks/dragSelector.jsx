import { useState } from "react";

export function useDragSelector() {
  const [selected, setSelected] = useState([]);
  const [lastSelected, setLastSelected] = useState(0);

  const singleSelect = (select) => {
    setSelected((s) => [...s, select]);
    setLastSelected(select);
  };

  const singleDeselect = (select) => {
    setSelected((s) => s.filter((i) => i !== select));
    setLastSelected(select);
  };

  const rangeSelect = (select) => {
    const rangeDirection = Math.sign(lastSelected - select);
    let selection = [];
    for (let i = select; i !== lastSelected; i += rangeDirection)
      if (!selected.includes(i)) selection.push(i);
    if (!selected.includes(lastSelected)) selection.push(lastSelected);
    setSelected((s) => s.concat(selection.reverse()));
  };

  const rangeDeselect = (select) => {
    if (lastSelected > select)
      setSelected((s) => s.filter((i) => i < select || i > lastSelected));
    else setSelected((s) => s.filter((i) => i > select || i < lastSelected));
  };

  const select = (select, isClick = false) => {
    const e = window.event;
    const shiftKey = e.shiftKey;
    const modiKey = e.metaKey || e.ctrlKey;

    if (isClick) {
      if (shiftKey) {
        if (modiKey) rangeSelect(select);
        else rangeDeselect(select);
      } else {
        if (modiKey) singleDeselect(select);
        else singleSelect(select);
      }
    } else if (true) {
      if (!modiKey) rangeSelect(select);
      else rangeDeselect(select);
    }

    if (selected.length === 1 && selected[0] < 0) setSelected(() => []);
  };

  return [select, selected];
}
