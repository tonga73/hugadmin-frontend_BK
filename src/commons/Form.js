import React from "react";
import { useForm } from "react-hook-form";

import { Form } from "react-daisyui";

export default function ({ defaultValues, children, onSubmit, styles, id }) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <Form
      id={id}
      className={(!!styles && styles) || ""}
      onSubmit={handleSubmit(onSubmit)}
    >
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child;
      })}
    </Form>
  );
}

export function Input({ register, name, styles, required, ...rest }) {
  return (
    <input
      className={styles}
      {...register(name, !!required && { required: true })}
      {...rest}
    />
  );
}

export function Select({ register, options, name, styles, required, ...rest }) {
  return (
    <select
      className={styles}
      {...register(name, !!required && { required: true })}
      {...rest}
    >
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
