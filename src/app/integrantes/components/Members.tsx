import Image from "next/image";
import { FormEvent, ChangeEvent, useState } from "react";

interface MembersProps {
  name: string;
  email: string;
  image: string;
  id: string;
  deleteMember: (id: string) => void;
  editMember: (id: string, newImage?: string, newName?: string, newEmail?: string) => void;
}

const Members = (props: MembersProps) => {
  const [isEditing, setEditing] = useState(false);
  const [newImage, setNewImage] = useState(props.image);
  const [newName, setNewName] = useState(props.name);
  const [newEmail, setNewEmail] = useState(props.email);

  const handleChangeNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImageUrl = URL.createObjectURL(file);
      setNewImage(newImageUrl);
    }
  };

  const handleChangeNewName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleChangeNewEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    props.editMember(props.id, newImage, newName, newEmail);

    setEditing(false);
  };

  // 🔹 Modal de edición
  const editingTemplate = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newFoto" className="block text-sm font-medium text-gray-700">
              New member image
            </label>
            <input
              type="file"
              id="newFoto"
              accept="image/*"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm text-sm p-2"
              onChange={handleChangeNewImage}
            />
          </div>

          <div>
            <label htmlFor="newName" className="block text-sm font-medium text-gray-700">
              New member name
            </label>
            <input
              type="text"
              id="newName"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm text-sm p-2"
              value={newName}
              onChange={handleChangeNewName}
            />
          </div>

          <div>
            <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">
              New member email
            </label>
            <input
              type="email"
              id="newEmail"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm text-sm p-2"
              value={newEmail}
              onChange={handleChangeNewEmail}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // 🔹 Vista normal de la tarjeta
  const cardTemplate = (
  <div className="flex flex-col gap-2 p-2 min-w-full lg:min-w-[20rem] max-w-xs sm:flex-row sm:items-center sm:gap-6 sm:py-4 border rounded-lg bg-[var(--forestgreen)]">
    <Image
      src={props.image}
      alt={`Imagen de ${props.name}`}
      width={90}
      height={90}
      className="mx-auto block h-24 w-24 rounded-full sm:mx-0 sm:shrink-0 object-cover"
    />
    <div className="flex flex-col justify-between text-center sm:text-left w-full">
      <div className="overflow-hidden text-ellipsis break-words">
        <p className="text-lg font-semibold text-black">{props.name}</p>
        <p className="font-medium text-gray-500 break-all">{props.email}</p>
      </div>
      <div className="flex flex-row justify-between gap-2 pt-2">
        <button
          type="button"
          className="border border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white px-3 py-1 rounded"
          onClick={() => setEditing(true)}
        >
          Edit
        </button>
        <button
          type="button"
          className="border border-red-200 text-red-600 hover:border-transparent hover:bg-red-600 hover:text-white px-3 py-1 rounded"
          onClick={() => props.deleteMember(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);


  return (
    <li className="w-full">
      {cardTemplate}
      {isEditing && editingTemplate}
    </li>
  );
};

export default Members;
