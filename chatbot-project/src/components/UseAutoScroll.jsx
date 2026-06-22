import { useRef, useEffect } from 'react'

export function useAutoScroll(dependencies) {
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- this line helps to remove eslint unwanted warning showing on line no. 11.
  }, dependencies);

  return chatMessagesRef;
}