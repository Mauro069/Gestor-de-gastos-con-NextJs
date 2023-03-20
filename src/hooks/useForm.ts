import { useState } from "react";

// Define el tipo para las reglas de validación
type ValidationRules<T> = {
  [P in keyof T]?: (value: T[P]) => boolean;
};

// Define el tipo para las props del formulario
type FormProps<T> = {
  initialValues: T;
  onSubmit: (values: T) => void;
  validationRules?: ValidationRules<T>;
};

// Define el tipo para los errores del formulario
type FormErrors<T> = {
  [P in keyof T]?: string;
};

// Define el hook `useForm`
export const useForm = <T extends Record<string, any>>({
  initialValues, // Valores iniciales del formulario
  onSubmit, // Función que se ejecuta cuando se envía el formulario correctamente
  validationRules = {}, // Reglas de validación personalizadas para cada campo del formulario
}: FormProps<T>) => {
  // Crea el estado para los valores del formulario
  const [values, setValues] = useState<T>(initialValues);
  // Crea el estado para los errores del formulario
  const [errors, setErrors] = useState<FormErrors<T>>({});

  // Función que se ejecuta cuando se cambia el valor de un campo del formulario
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    // Actualiza el estado de los valores del formulario
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Crea un objeto vacío para los errores de validación
    const validationErrors: FormErrors<T> = {};

    // Itera por cada campo del formulario
    Object.entries(values).forEach(([key, value]) => {
      // Obtiene la regla de validación personalizada para el campo actual
      const rule = validationRules[key as keyof T];
      // Si hay una regla de validación y el valor actual del campo no cumple con la regla
      if (rule && !rule(value)) {
        // Agrega un mensaje de error para el campo actual
        validationErrors[key as keyof T] = `Invalid ${key}`;
      }
    });

    // Si hay errores de validación
    if (Object.keys(validationErrors).length > 0) {
      // Actualiza el estado de los errores del formulario
      setErrors(validationErrors);
    } else {
      // Si no hay errores de validación, llama a la función `onSubmit` con los valores del formulario
      onSubmit(values);
      setValues(initialValues);
    }
  };

  // Devuelve los valores del formulario, los errores de validación, la función `handleChange` y la función `handleSubmit`
  return { values, errors, handleChange, handleSubmit };
};
