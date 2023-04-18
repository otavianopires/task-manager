import { adminOptions, fetchData } from "@/lib/helpers";
import { useRouter } from "next/router";
import Link from "next/link";
import FormTask from "@/components/FormTask";

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = router.query;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (confirm(`Delete ${id}??`) == true) {
      console.log('Delete this shit');

      const response = await fetchData(`/api/tasks/${id}`, {}, 'DELETE');

      if (!response.success) {
        setErrors(response.error);
        return;
      }

      router.push('/admin/tasks');
    }
  }

  return (
    <div className="">
      <h1>Edit Task</h1>
      <FormTask id={id} />
      <div className="mt-6">
        <Link href="#" onClick={handleDelete} className="font-bold">Delete task</Link>
      </div>
    </div>
  )
}

EditTaskPage.auth = adminOptions;