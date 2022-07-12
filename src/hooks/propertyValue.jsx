import { useEffect, useState } from "react";

export function usePropertyValue(property, ref = null) {
  const [val, _setVal] = useState(null);
  useEffect(() => {
    setVal(getPropertyValue(property, ref));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setPropertyValue(property, val, ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  const setVal = (value) => {
    if (value instanceof Function)
      _setVal((oldVal) => value(oldVal).toString());
    else _setVal(value.toString());
  };
  return [val, setVal];
}

export function getPropertyValue(property, ref = null) {
  const element = ref ? ref.current : document.documentElement;
  if (element) return getComputedStyle(element).getPropertyValue(property);
}

function setPropertyValue(property, value, ref = null) {
  const element = ref ? ref.current : document.documentElement;
  if (element) element.style.setProperty(property, value);
}
