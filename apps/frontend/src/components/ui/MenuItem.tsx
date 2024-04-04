"use client";
interface MenuItemProps {
  onClick: () => void;
  label: string;
  img?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, img }) => {
  return (
    <div
      onClick={onClick}
      className="
        font-semibold
        py-3
        px-4
        rounded-full
        hover:bg-neutral-100
      "
    >
      <div className=" flex gap-4 items-center">
        <img className=" rounded-full" src={img} />
        {label}
      </div>
    </div>
  );
};

export default MenuItem;
