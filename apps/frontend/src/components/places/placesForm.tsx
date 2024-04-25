import { useState } from "react";
import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Heading from "../ui/Heading";
import Button from "../ui/Button";
import Input from "../ui/Input";
import toast from "react-hot-toast";
import Perks from "./Perks";
import Upload from "./UploadPhotos";

const PlacesForm = () => {
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      type: "",
      name: "",
      title: "",
      country: "",
      address: "",
      photos: "",
      description: "",
      perks: [],
      cheapestPrice: 0,
      extraInfo: "",
      checkIn: "",
      checkOut: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    data.photos = addedPhotos;
    console.log("addedPhotos form", addedPhotos);

    setLoading(true);
    try {
      const res = await axios.post("/api/hotels", data);
      navigate("/");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className=" flex flex-col mx-5">
        <Heading title="Add new place" center />

        <Heading title="Type" subtitle="type for your place " />
        <Input
          id="type"
          type="text"
          disabled={loading}
          register={register}
          errors={errors}
          required
          placeholder="Type of place (hotel, restaurant, etc)"
        />
        <Heading title="Name" subtitle="Name for your place" />
        <Input
          id="name"
          type="text"
          disabled={loading}
          register={register}
          errors={errors}
          required
          placeholder="Name of place (Hotel California, etc.)"
        />
        <Heading
          title="Title"
          subtitle="Title for your place. should be short and as in advertisement"
        />
        <Input
          id="title"
          type="text"
          disabled={loading}
          register={register}
          errors={errors}
          required
          placeholder="Title (My lovely hotel, etc.)"
        />
        <Heading title="country" />
        <Input
          id="country"
          type="text"
          disabled={loading}
          register={register}
          errors={errors}
          required
          placeholder="city of place (New York, etc.)"
        />
        <Heading title="Address" subtitle="Address for this place" />
        <Input
          id="address"
          type="text"
          disabled={loading}
          register={register}
          errors={errors}
          required
          placeholder="Address of place (1234 Main St, etc.)"
        />
        <Upload
          register={register}
          setAddedPhotos={setAddedPhotos}
          addedPhotos={addedPhotos}
        />
        <Heading title="Description" subtitle="Description of the place" />
        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className=" h-32 resize-none rounded-lg p-2 border-2 border-neutral-300 "
        />
        <Perks register={register} />
        <Heading title="Extra info" subtitle="house rules etc." />
        <textarea
          placeholder="Extra info"
          {...register("extraInfo", { required: true })}
          className=" h-32 resize-none rounded-lg p-2 border-2 border-neutral-300 "
        />
        <Heading title="cheapest price" subtitle="" />
        <Input
          id="cheapestPrice"
          type="number"
          disabled={loading}
          register={register}
          errors={errors}
          required
          placeholder="price for the cheapest room"
        />
        <Heading
          title="Check in & out times"
          subtitle="Add check in and out times, remember to have some time window cleaning the room between guests "
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Check in"
            {...register("checkIn", { required: true })}
          />
          <input
            type="text"
            placeholder="Check out"
            {...register("checkOut", { required: true })}
          />
        </div>
        <div className=" my-4">
          <Button
            label="SAVE"
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default PlacesForm;
