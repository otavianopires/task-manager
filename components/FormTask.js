import { fetchData, formatInputDateTimeLocal } from "@/lib/helpers";
import FormControl from "./ui/FormControl";
import Button from "./ui/Button";
import { useEffect, useState } from "react";

export default function FormTask({ id }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(formatInputDateTimeLocal(new Date()));
  const [errors, setErrors] = useState(false);
  const [message, setMessage] = useState(false);
  const [disable, setDisable] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Add task');

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

    let response = null;
    if (id === undefined) {
      response = await fetchData('/api/tasks', {
        title,
        description,
        startDate: taskStartDate.toISOString(),
      }, 'POST');
    } else {
      response = await fetchData(`/api/tasks/${id}`, {
        title,
        description,
        startDate: taskStartDate.toISOString(),
      }, 'PUT');
    }

    if (!response.success) {
      setErrors(response.error);
      setDisable(false);
      return;
    }

    if (id === undefined) {
      setTitle('');
      setDescription('');
      setStartDate(formatInputDateTimeLocal(new Date()));
    }

    setMessage(response.message);
    setDisable(false);
  }

  const handleDate = (e) => {
    console.log(e.target.value);
    setStartDate(e.target.value);
  }

  useEffect(() => {
    const getTask = async () => {
      const response = await fetchData(`/api/tasks/${id}`);
      if (response.success) {
        setTitle(response.task.title);
        setDescription(response.task.description);
        setStartDate(response.task.startDate.substring(0, 19));
      }
    }
    if (id !== undefined) {
      getTask();
      setButtonLabel('Update Task');
    }
  }, []);

  return (
    <>
      {errors &&
        <ul className="mb-6">
          {errors.map((error, key) => (
            <li key={key} className="bg-secondary text-onSecondary rounded-md py-2 px-4 mb-2">{error}</li>
          ))}
        </ul>
      }
      {message && <p className="text-secondary">{message}</p>}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
            value={startDate}
            onChange={handleDate}
          />
        </FormControl>
        <Button type="submit" size="lg" disabled={disable}>{buttonLabel}</Button>
      </form>
    </>
  )
}