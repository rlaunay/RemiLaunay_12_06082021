import { useEffect, useRef } from "react";

/**
 * Hook for attach event to an element
 * @param {string} eventType Type of event we want to listen
 * @param {Function} cb Callback fonction when event will be trigger
 * @param {HTMLElement | Window} element element to add the event listener
 */
export default function useEventListener(
  eventType: string,
  cb: (e: Event) => void,
  element: HTMLElement | Window = window
) {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  }, [cb])

  useEffect(() => {
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}