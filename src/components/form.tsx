"use client";

import { login } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginInitialState = {
  message: "",
  errors: {
    email: "",
    password: "",
    credentials: "",
    unknown: "",
  },
};

const Form = () => {
  const [formState, formAction] = useFormState(login, loginInitialState);

  return (
    <form action={formAction} className="space-y-4 w-full max-w-sm">
      <Input name="email" placeholder="email" />
      {formState.errors.email && (
        <p className="text-red-600">{formState.errors.email}</p>
      )}
      <Input name="password" type="password" placeholder="password" />
      {formState.errors.password && (
        <p className="text-red-600">{formState.errors.password}</p>
      )}
      <Button variant="secondary" className="w-full" type="submit">
        submit
      </Button>
    </form>
  );
};

export default Form;
