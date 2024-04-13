import { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import axios from "axios";

interface ItemWithoutThumbnailsDemoProps {
  id?: string;
}

export default function ItemWithoutThumbnailsDemo({
  id,
}: ItemWithoutThumbnailsDemoProps) {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchSinglePlace = async () => {
      const { data } = await axios.get("/api/hotels/" + id);
      setImages(
        data.photos.map((photo) => ({
          id: photo,
          itemImageSrc: `https://book-it-backend.vercel.app/api/hotels/uploads/${photo}`,
          alt: "photo",
        }))
      );
    };
    fetchSinglePlace();
  }, [id]);

  const itemTemplate = (item) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{
          width: "100%",
          display: "block",
          height: "18em",
          borderRadius: "10px",
        }}
      />
    );
  };

  return (
    <div className="card">
      <Galleria
        value={images}
        numVisible={5}
        circular
        style={{ maxWidth: "640px" }}
        showThumbnails={false}
        showItemNavigators
        item={itemTemplate}
      />
    </div>
  );
}
