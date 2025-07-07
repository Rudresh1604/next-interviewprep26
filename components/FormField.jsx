import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "./ui/input";

const FormFieldComponent = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} </FormLabel>
          <FormControl>
            <Input
              type={type}
              className="input"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
