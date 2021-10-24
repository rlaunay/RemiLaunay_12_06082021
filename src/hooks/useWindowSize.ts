import { useState } from "react";
import useEventListener from "./useEventListener";

type Size = {
  width: number;
  height: number
}

/**
 * Listen to window resize en return the new size of it
 * @returns {Size}
 */
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEventListener('resize', () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
  })

  return windowSize
}