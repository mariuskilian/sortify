import { useState } from "react";
import { TWOS } from "../utilities/math-util";

export function useClassicSelector() {
  const [selected, setSelected] = useState([]);
  const [lastSelected, setLastSelected] = useState(0);

  const singleSelect = (select) => {
    setSelected([select]);
    setLastSelected(select);
  };

  const invertSelect = (select) => {
    let newSelected = selected.filter((el) => el >= 0);
    if (selected.includes(select)) {
      newSelected = newSelected.filter((el) => el !== select);
      newSelected = newSelected.concat(TWOS.neg(select));
      setLastSelected(TWOS.neg(select));
    } else {
      newSelected = newSelected.concat(select);
      setLastSelected(select);
    }
    setSelected(() => newSelected);
  };

  const rangeSelect = (select) => {
    let newSelected = selected.splice(0, selected.indexOf(lastSelected) + 1);
    const rangeDirection = TWOS.sign(select - TWOS.abs(lastSelected));
    let rangeSelection = [];
    for (let i = select; i !== TWOS.abs(lastSelected); i -= rangeDirection)
      if (!newSelected.includes(i)) rangeSelection.push(i);
    newSelected = newSelected.concat(rangeSelection.reverse());
    setLastSelected(lastSelected);
    setSelected(() => newSelected);
  };

  const invertRangeSelect = (select) => {
    let newSelected = selected.concat([]);
    const lastSelected = selected[selected.length - 1];
    const rangeDirection = TWOS.sign(select - TWOS.abs(lastSelected));
    let rangeSelection = [];
    for (let i = select; i !== TWOS.abs(lastSelected); i -= rangeDirection) {
      if (newSelected.includes(i)) {
        newSelected = newSelected.filter((el) => el !== i);
        if (i === select) rangeSelection.push(TWOS.neg(i));
      } else {
        rangeSelection.push(i);
      }
    }
    newSelected = newSelected.filter((el) => el >= 0);
    newSelected = newSelected.concat(rangeSelection.reverse());
    setLastSelected(newSelected[newSelected.length - 1]);
    setSelected(() => newSelected);
  };

  const select = (i) => {
    const e = window.event;
    const shiftKey = e.shiftKey;
    const modiKey = e.metaKey || e.ctrlKey;

    if ((!shiftKey && !modiKey) || selected.length === 0) singleSelect(i);
    else if (shiftKey && !modiKey) rangeSelect(i);
    else if (!shiftKey && modiKey) invertSelect(i);
    else if (shiftKey && modiKey) invertRangeSelect(i);

    if (selected.length === 1 && selected[0] < 0) setSelected(() => []);
  };

  return [select, selected, lastSelected];
}
