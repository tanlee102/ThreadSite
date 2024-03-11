import useResizeObserver from '@react-hook/resize-observer'
import * as React from "react";

export const useSize = (target) => {
    const [size, setSize] = React.useState()
  
    React.useLayoutEffect(() => {
      setSize(target.current.getBoundingClientRect())
    }, [target])
  
    // Where the magic happens
    useResizeObserver(target, (entry) => setSize(entry.contentRect))
    return size
  }
  