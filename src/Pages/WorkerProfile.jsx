import { useParams } from "react-router-dom";

export default function WorkerProfile() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Worker Profile</h1>
      <p>Worker ID: {id}</p>

      <div className="mt-4">
        <p>Name: Example Worker</p>
        <p>Job: Mason</p>
        <p>Rating: ⭐⭐⭐⭐</p>
      </div>
    </div>
  );
}
