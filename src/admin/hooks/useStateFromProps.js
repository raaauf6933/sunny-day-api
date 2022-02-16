import isEqual from "lodash/isEqual";
import { useState } from "react";

function useStateFromProps(data, opts = {}) {
  const [state, setState] = useState(data);
  const [prevData, setPrevData] = useState(data);
  if (!opts) {
    opts = {};
  }

  const { mergeFunc, onRefresh } = opts;
  const shouldUpdate = !isEqual(prevData, data);

  if (shouldUpdate) {
    const newData =
      typeof mergeFunc === "function" ? mergeFunc(prevData, state, data) : data;
    setState(newData);
    setPrevData(data);
    if (typeof onRefresh === "function") {
      onRefresh(newData);
    }
  }

  return [state, setState];
}

export default useStateFromProps;
