"use client";
import avatar from "@/assets/images/avatar.png"
function Avatar() {
  return (
    <div className="w-7 h-7">
      <img
        className=" rounded-full "
        src={avatar}
        alt="avatar"
      />
    </div>
  );
}

export default Avatar;
