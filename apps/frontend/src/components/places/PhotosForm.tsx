import axios from "axios";
import { useCallback, useState } from "react";
import Heading from "../ui/Heading";
import RenderPhotos from "./RenderPhoto";
import { FaUpload } from "react-icons/fa";

const PhotosForm = ({ register, addedPhotos, setAddedPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const dataWithPhoto = await axios.post("/api/hotels/uploads", {
      link: photoLink,
    });

    setAddedPhotos((prev) => {
      return [...prev, dataWithPhoto.data];
    });
    setPhotoLink("");
  };

  const uploadPhoto = useCallback(async (ev) => {
    ev.preventDefault();
    const file = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < file.length; i++) {
      data.append("photos", file[i]);
    }
    const res = await axios.post("/api/hotels/uploadPhotoByFile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setAddedPhotos((prev) => {
      return [...prev, ...res.data];
    });
  }, []);

  return (
    <>
      <Heading title="Photos" subtitle="more = better" />
      <div className="flex gap-2">
        <input
          type="text"
          multiple
          placeholder="Add photo by link"
          value={photoLink}
          {...register("photos")}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className=" bg-primary text-white py-3 px-6 min-w-max rounded-2xl hover:bg-blue-500"
          onClick={addPhotoByLink}
        >
          Add photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <RenderPhotos addedPhotos={addedPhotos} />

        <label className=" flex items-center gap-2 cursor-pointer justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className=" hidden"
            onChange={uploadPhoto}
          />
          <FaUpload size={24} color="gray" />
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosForm;
