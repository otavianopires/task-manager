import { adminOptions } from "@/lib/helpers";
import FormTask from "@/components/FormTask";

export default function NewTaskPage() {

  return (
    <div className="">
      <h1>New Task</h1>
      <FormTask />
    </div>
  )
}

NewTaskPage.auth = adminOptions;