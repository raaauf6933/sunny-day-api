import { toggle } from "../utils/lists/lists";
import isEqual from "lodash/isEqual";
import { useState } from "react";

import useStateFromProps from "./useStateFromProps";

function merge(prevData, prevState, data) {
  return Object.keys(prevState).reduce(
    (acc, key) => {
      if (!isEqual(data[key], prevData[key])) {
        acc[key] = data[key];
      }

      return acc;
    },
    { ...prevState }
  );
}

function handleRefresh(data, newData, setChanged) {
  if (isEqual(data, newData)) {
    setChanged(false);
  }
}

function useForm(initial = { placeholder: "placeholder" }, onSubmit) {
  const [hasChanged, setChanged] = useState(false);

  var [data, setData] = useStateFromProps(initial, {
    mergeFunc: merge,
    onRefresh: (newData) => handleRefresh(data, newData, setChanged),
  });

  function toggleValue(event, cb) {
    const { name, value } = event.target;
    const field = data[name];

    if (Array.isArray(field)) {
      if (!hasChanged) {
        setChanged(true);
      }
      setData({
        ...data,
        [name]: toggle(value, field, isEqual),
      });
    }

    if (typeof cb === "function") {
      cb();
    }
  }

  function change(event) {
    const { name, value } = event.target;

    if (!(name in data)) {
      console.error(`Unknown form field: ${name}`);
      return;
    } else {
      if (data[name] !== value) {
        setChanged(true);
      }
      setData((data) => ({
        ...data,
        [name]: value,
      }));
    }
  }

  function reset() {
    setData(initial);
  }

  function set(newData) {
    setData((data) => ({
      ...data,
      ...newData,
    }));
  }

  async function submit() {
    if (typeof onSubmit === "function") {
      const result = onSubmit(data);
      if (result) {
        const errors = await result;
        if (!errors) {
          setChanged(false);
        }
      }
    }
  }

  // Additional method for SMOP requirements.
  // This is a quick solution if you want to do anything after a successful asyn request
  async function submitWithOpts(_opts = {}) {
    const defaultOpts = {
      clearUserType: false,
    };
    const opts = { ...defaultOpts, ..._opts };
    const { clearUserType } = opts;
    if (typeof onSubmit === "function") {
      const result = onSubmit({ ...data, ..._opts });
      if (result) {
        const errors = await result;
        if (errors.length === 0) {
          setChanged(false);
          // Clear user type dropdown after a successful save
          if (clearUserType) {
            setData((data) => ({
              ...data,
              permissionGroup: "",
            }));
          }
        }
      }
    }
  }

  function triggerChange() {
    setChanged(true);
  }

  return {
    change,
    data,
    hasChanged,
    reset,
    set,
    submit,
    submitWithOpts,
    toggleValue,
    triggerChange,
  };
}

export default useForm;
