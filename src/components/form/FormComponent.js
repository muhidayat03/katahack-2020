import React from "react";
import { InputText, InputLeftElement, InputGroup } from '@aksara-ui/core';
import Select from "./Select"; 


export function renderInput(field) {
  console.log(field)
  const Icon = field.icon
  return (
    <div style={{ marginBottom: 16 }}>

      <InputGroup>
        {field.icon &&
          <InputLeftElement >
            <Icon></Icon>
            {/* <IconUser/> */}
          </InputLeftElement>
        }
        <InputText
          {...field.input}
          type={field.type}
          disabled={field.disable}
          placeholder={field.placeholder}
        />
      </InputGroup>
      {field.meta.touched && field.meta.error && (
        <div style={{ color: 'red', fontSize: 12, margin: 4 }}>{field.meta.error}</div>
      )}
    </div>
  );
}

export function renderSelect(field) {
  const handleBlur = () => {
    setTimeout(() => {
      const { input } = field;
      input.onBlur(input.value);
    }, 1);
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <Select
        {...field.input}
        onChange={(value) => field.input.onChange(value)}
        onBlur={handleBlur}
        options={field.options}
        isSearchable={true}
        isClearable={field.isClearable}
        isMulti={field.isMulti}
        isDisabled={field.isDisabled}
        placeholder={field.placeholder}
      />
      {
        field.meta.touched && field.meta.error && (
          <div style={{ color: 'red', fontSize: 12, margin: 4 }}>{field.meta.error}</div>
        )
      }
    </div>
  );
}



