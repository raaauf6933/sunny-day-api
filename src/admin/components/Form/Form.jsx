import React from "react";
import useForm from "./../../hooks/useForm";

function FormComponent(props) {
  const { children, initial, resetOnSubmit, onSubmit } = props;
  const renderProps = useForm(initial, onSubmit);

  function handleSubmit(event, cb) {
    const { reset, submit } = renderProps;
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    if (cb) {
      cb();
    }
    if (resetOnSubmit) {
      reset();
    }
    submit();
  }

  return <form onSubmit={handleSubmit}>{children(renderProps)}</form>;
}

export default FormComponent;
