import type { IformTodoValidation, ILoginInputValidation, IRegisterInputValidation, ISideBar, IStatus } from "../interface";



export const imageUrl = "https://marketplace.canva.com/EAFB4DwUCvk/2/0/1131w/canva-white-paper-creative-printable-to-do-list-checklist-3YM72GN5G1g.jpg"

export const BTNsfilter : string[] = ["All","Pending","In Progress","Completed"]  

export const Statuses: IStatus[] = [
  { name: "pending", label: "Pending", color: "bg-yellow-500" },
  { name: "inprogress", label: "In Progress", color: "bg-blue-500" },
  { name: "completed", label: "Completed", color: "bg-green-500" },
];

export const SideBar:ISideBar[] =[
    {title:"🏠 Home",Url:"/"},
    {title:"📊 Dashboard",Url:"Dashboard"},
    {title:"⚙ Settings",Url:"Settings"}
]

export const FormTodo:IformTodoValidation[]=[
  {
    name: "title",
    placeholder: "Todo Title",
    type: "text",
    validation: {
      required: "Title is required",
      minLength: {
        value: 3,
        message: "Title must be at least 3 characters",
      },
    },
  },
  {
    name: "description",
    placeholder: "Todo Description",
    type: "text",
    validation: {
      required: "Description is required",
      minLength: {
        value: 5,
        message: "Description must be at least 5 characters",
      },
    },
  },
]
export const REGISTER_FORM: IRegisterInputValidation[] = [
  {
    name: "username",
    labelName: "Username",
    placeholder: "Username",
    type: "text",
    validation: {
      required: "Username is required",
      minLength: {
        value: 5,
        message: "Username must be at least 5 characters",
      },
    },
  },
  {
    name: "email",
    labelName: "Email address",
    placeholder: "Email address",
    type: "email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        message: "Invalid email format",
      },
    },
  },
  {
    name: "password",
    labelName: "Password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
];

export const LOGIN_FORM: ILoginInputValidation[] = [
  {
    name: "identifier",
    labelName:"Email address",
    placeholder: "Email address",
    type: "email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        message: "Invalid email format",
      },
    },
  },
  {
    name: "password",
    labelName:"Password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },

]