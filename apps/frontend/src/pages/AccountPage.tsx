import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUserCircle, FaList } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import PlacesPage from "./PlacesPage";
import { useAuthStore } from "@/components/hooks/useAuthStore";

const AccountPage = () => {
  const { subpage = "profile" } = useParams();
  const { user, logout, setIsLoggedOut } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div>
      <nav className="flex justify-center gap-4 mt-8">
        <Link
          to={"/account/profile"}
          className={`
          px-4
          md:py-1
          md:px-3
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          hover:shadow-md
          hover:text-white
          cursor-pointer
          hover:bg-blue-500 transition-all duration-300 ease-in-out
          ${
            (subpage === "profile" || subpage === undefined) &&
            "bg-primary text-white"
          }`}
        >
          <FaUserCircle size={24} />
          my profile
        </Link>
        <Link
          to={"/account/bookings"}
          className={`
          px-4
          md:py-1
          md:px-3
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          hover:shadow-md
          hover:text-white
          cursor-pointer
          hover:bg-blue-500 transition-all duration-300 ease-in-out
          ${subpage === "bookings" && "bg-primary text-white"}`}
        >
          <FaList size={18} />
          my bookings
        </Link>
        <Link
          to={"/account/places"}
          className={`
          px-4
          md:py-1
          md:px-3
          border-[1px]
          border-neutral-200
          flex
          flex-row
          items-center
          gap-3
          rounded-full
          hover:shadow-md
          hover:text-white
          cursor-pointer
          hover:bg-blue-500 transition-all duration-300 ease-in-out
          ${
            (subpage === "places" || subpage === undefined) &&
            "bg-primary text-white"
          }`}
        >
          <MdPlace size={18} />
          my accommodations
        </Link>
      </nav>
      <div className="mt-8">
        {subpage === "profile" || subpage === undefined ? (
          <div className="flex justify-center items-center flex-col">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">Profile</h2>
            </div>
            <div className="mt-8">
              <div className="flex gap-2 ">
                <p className="text-gray-500">ID: </p>
                <p>{user?.id} </p>
              </div>
              <div className="flex gap-2 ">
                <p className="text-gray-500">Name: </p>
                <p>{user?.username} </p>
              </div>
              <div className="flex gap-2">
                <p className="text-gray-500">Email: </p>
                <p>{user?.email}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    logout();
                    setIsLoggedOut();
                    navigate("/");
                  }}
                  className=" bg-primary hover:bg-blue-500 text-white px-6 py-2 rounded-full mt-4 "
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : subpage === "bookings" ? (
          <div>bookings</div>
        ) : (
          <PlacesPage />
        )}
      </div>
    </div>
  );
};

export default AccountPage;
