import { useState, useEffect } from "react";

export function usePropertyValue(property, ref = null) {
  const [propertyVal, _setPropertyVal] = useState(null);
  useEffect(() => {
    setPropertyVal(getPropertyValue(property, ref));
  }, [property, ref]);
  useEffect(() => {
    setPropertyValue(property, propertyVal, ref);
  }, [propertyVal, property, ref]);

  const setPropertyVal = (value) => {
    if (value instanceof Function)
      _setPropertyVal((oldVal) => value(oldVal).toString());
    else _setPropertyVal(value.toString());
  };
  return [propertyVal, setPropertyVal];
}

export function getPropertyValue(property, ref = null) {
  const element = ref ? ref.current : document.documentElement;
  if (element) return getComputedStyle(element).getPropertyValue(property);
}

function setPropertyValue(property, value, ref = null) {
  const element = ref ? ref.current : document.documentElement;
  if (element) element.style.setProperty(property, value);
}
