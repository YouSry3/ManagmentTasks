

export interface IStatus {
  name: "pending" | "inprogress" | "completed";
  label: string;
  color: string;
}
 


export interface IRegisterProps {

  [key: string]: any;
}

export interface IRegisterInputValidation {
  name: "username" | "email" | "password";
  placeholder: string;
  type: string;
  validation: {
    required?: string;
    minLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}

export interface ILoginProps {
  identifier: string;
  password: string;
}
export interface ILoginInputValidation {
  name: "identifier" | "password";
  labelName:"Email address" | "Password";
  placeholder: string;
  type: string;
  validation: {
    required?: string;
    minLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
}


export interface IformTodoValidation{
  name: "title" | "description";
  placeholder: string;
  type: string;
  validation: {
    required?: string;
    minLength?: {
      value: number;
      message: string;
    };
  };
}

export interface Todo {
  id: string;
  title: string;
  description: string;
  todo_status: "pending" | "inprogress" | "completed";
}


export interface TodosResponse {
  data: Todo[];
}

export interface IErrorResponse {
  error: {
    // details?: {
    //   errors: {
    //     message: string;
    //   }[];
    // };
    message?: string;
  };
}