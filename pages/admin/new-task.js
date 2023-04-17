import { adminOptions, fetchData, formateInputDateTimeLocal } from "@/lib/helpers";
import { useState } from "react"
import Button from "@/components/ui/Button";
import FormControl from "@/components/ui/FormControl";

export default function NewTaskPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [errors, setErrors] = useState(false);
  const [message, setMessage] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(false);
    setMessage(false);
    setDisable(true);

    var taskStartDate = new Date(startDate);

    // Set empty errors list and validate task fields.
    const errorsList = []

    if (title.length === 0 ) {
      errorsList.push('Please type a title')
    }

    if (description.length === 0 ) {
      errorsList.push('Please type a description')
    }

    if (taskStartDate <= new Date() ) {
      errorsList.push('Please select a date in the future')
    }

    if (errorsList.length > 0) {
      setErrors(errorsList);
      setDisable(false);
      return;
    }

    const response = await fetchData('/api/tasks', {
      title,
      description,
      startDate: taskStartDate.toISOString(),
    });

    if (!response.success) {
      setErrors(response.error);
      setDisable(false);
      return;
    }

    setTitle('');
    setDescription('');
    setStartDate(new Date());
    setMessage(response.message);
    setDisable(false);
  }

  return (
    <div className="">
      <h1>New Task</h1>
      {errors &&
        <ul className="mb-6">
          {errors.map((error, key) => (
            <li key={key} className="bg-secondary text-onSecondary rounded-md py-2 px-4 mb-2">{error}</li>
          ))}
        </ul>
      }
      {message && <p className="text-secondary">{message}</p>}
      <form  onSubmit={handleSubmit}>
        <FormControl>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </textarea>
        </FormControl>
        <FormControl>
          <input
            type="datetime-local"
            id="start-date"
            name="start-date"
            value={formateInputDateTimeLocal(startDate)}
            min={formateInputDateTimeLocal(new Date())}
            onChange={(e) => setStartDate(e.target.value)} />
        </FormControl>
        <Button type="submit" size="lg" disabled={disable}>Add task</Button>
      </form>
    </div>
  )
}

NewTaskPage.auth = adminOptions;