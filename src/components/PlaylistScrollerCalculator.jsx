import {
  CSS_REM__MIN_SPACE_BETWEEN,
  CSS_REM__PLAYLISTART_SIZE,
  CSS_REM__SLIDER_PADDING,
  PLAYLISTSCROLLER_ID,
} from "./PlaylistScroller";
import React, { useCallback, useLayoutEffect } from "react";
import { createGlobalStyle, css } from "styled-components";

import { rem2px } from "../utilities/css-util";
import { usePropertyValue } from "../hooks/propertyValue";

export const KEY__ITEMS_PER_PAGE = "--pscalc--items-per-page";

export function PlaylistScrollerCalculator() {
  const [itemsPerPage, setItemsPerPage] = usePropertyValue(KEY__ITEMS_PER_PAGE);

  const recalcIpp = useCallback(() => {
    if (!itemsPerPage) return;
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
  }, [itemsPerPage, setItemsPerPage]);

  useLayoutEffect(() => {
    recalcIpp();
    window.addEventListener("resize", () => recalcIpp());
    return window.removeEventListener("resize", () => recalcIpp());
  }, [recalcIpp]);

  return <VariableManager />;
}

const VariableManager = createGlobalStyle(css`
  :root {
    --pscalc--items-per-page: 4;
  }
`);
