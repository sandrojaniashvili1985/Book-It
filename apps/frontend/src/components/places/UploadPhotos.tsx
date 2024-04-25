import { ChangeEvent, useState } from "react";
import { FaUpload } from "react-icons/fa";
import Heading from "../ui/Heading";

const Upload = ({ register, setAddedPhotos, addedPhotos }) => {
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState<string[]>([]);
  const [photoLink, setPhotoLink] = useState("");

  const handelFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    for (let i = 0; i < e.target.files?.length; i++) {
      const file = e.target.files?.[i];
      PreviewFile(file);
    }
  };

  const PreviewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource((prev) => {
        return [...prev, reader.result as string];
      });
    };
  };

  const handelClickFile = (e) => {
    console.log("submitting...");
    e.preventDefault();
    if (!previewSource || previewSource.length === 0) return;
    for (let i = 0; i < previewSource.length; i++) {
      uploadImage(previewSource[i]);
    }
  };

  const uploadImage = async (base64EncodedImage: string) => {
    try {
      const uploaded = await fetch("/api/uploadPhotos", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      const photos = await uploaded.json();
      setAddedPhotos((prev) => {
        return [...prev, photos.secure_url];
      });
      console.log("addedPhotos", addedPhotos);

      setPreviewSource([]);
      setPhotoLink("");
    } catch (error) {
      console.error(error);
    }
  };

  const handelClick = (e) => {
    e.preventDefault();
    if (!photoLink) return;
    setPreviewSource((prev) => {
      return [...prev, photoLink];
    });
    setPhotoLink("");
  };

  return (
    <>
      <label>
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
            onClick={handelClick}
          >
            Add photo
          </button>
        </div>
      </label>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {previewSource &&
          previewSource.map((photo, index) => {
            return (
              <img
                key={index}
                src={photo}
                alt="chosen"
                className="w-full object-cover rounded-2xl border-2 border-neutral-300  transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary cursor-pointer"
              />
            );
          })}
        <label className=" flex items-center gap-2 cursor-pointer justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
          <input
            type="file"
            value={fileInputState}
            name="image"
            {...register("photos")}
            onChange={handelFileInputChange}
            className="hidden"
          />
          <FaUpload size={24} color="gray" />
          Upload
        </label>
      </div>
      <button onClick={handelClickFile}>Submit photo</button>
    </>
  );
};

export default Upload;
