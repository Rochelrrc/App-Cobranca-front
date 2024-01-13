import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface Step1Props {
  apiError: string;
  setApiError: React.Dispatch<React.SetStateAction<string>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  register: UseFormRegister<RegisterFormTypes>;
  handleSubmit: UseFormHandleSubmit<RegisterFormTypes, undefined>;
  errors: FieldErrors<RegisterFormTypes>;
}

export interface Step2Props {
  apiError: string;
  setApiError: React.Dispatch<React.SetStateAction<string>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  register: UseFormRegister<RegisterFormTypes>;
  handleSubmit: UseFormHandleSubmit<RegisterFormTypes, undefined>;
  errors: FieldErrors<RegisterFormTypes>;
  watchPassword: string;
}
