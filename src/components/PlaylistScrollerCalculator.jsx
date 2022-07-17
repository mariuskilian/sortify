import {
  CSS_REM__MIN_SPACE_BETWEEN,
  CSS_REM__PLAYLISTART_SIZE,
  CSS_REM__SLIDER_PADDING,
  PLAYLISTSCROLLER_ID,
} from "./PlaylistScroller";
import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { createGlobalStyle, css } from "styled-components";

import { rem2px } from "../utilities/css-util";
import { useData } from "../contexts/DataContext";
import { usePropertyValue } from "../hooks/propertyValue";

export const KEY__ITEMS_PER_PAGE = "--pscalc--items-per-page";

export function PlaylistScrollerCalculator() {
  const [itemsPerPage, setItemsPerPage] = usePropertyValue(KEY__ITEMS_PER_PAGE);
  const [, setDoit] = useState(setTimeout(0));
  const data = useData();
  const deferredIpp = useDeferredValue(itemsPerPage);

  const recalcIpp = useCallback(() => {
    if (!deferredIpp) return;
    // Get first of each type of element
    const playlistScroller = document.getElementById(PLAYLISTSCROLLER_ID);
    if (!playlistScroller) return;
    // Get width of each
    const plScWidth =
      playlistScroller.getBoundingClientRect().width -
      rem2px(CSS_REM__SLIDER_PADDING);
    const plaWidth =
      rem2px(CSS_REM__PLAYLISTART_SIZE) + rem2px(CSS_REM__MIN_SPACE_BETWEEN);
    // Calculate how many items fit in each scroller
    const maxItemsPerPlSc = Math.floor(plScWidth / plaWidth);
    setItemsPerPage(maxItemsPerPlSc);
    // eslint-disable-next-line
  }, [data, deferredIpp]);

  const onResizeEnd = (func) => {
    setDoit((d) => {
      clearTimeout(d);
      return d;
    });
    setDoit(() => setTimeout(() => func(), 200));
  };

  useEffect(() => {
    recalcIpp();
    window.addEventListener("resize", () => onResizeEnd(recalcIpp));
    return window.removeEventListener("resize", () => onResizeEnd(recalcIpp));
    // eslint-disable-next-line
  }, [data, deferredIpp]);

  return <VariableManager />;
}

const VariableManager = createGlobalStyle(css`
  :root {
    --pscalc--items-per-page: 0;
  }
`);

// var doit;
