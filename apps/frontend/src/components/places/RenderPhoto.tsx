function RenderPhotos({ addedPhotos }) {
  return addedPhotos.map((photo) => (
    <div key={photo}>
      <img
        src={`http://localhost:5000/api/hotels/uploads/${photo}`}
        alt="photo"
        className="w-full object-cover rounded-2xl border-2 border-neutral-300  transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary cursor-pointer"
      />
    </div>
  ));
}
export default RenderPhotos;
