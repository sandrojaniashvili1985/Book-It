
interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start my-2"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 text-sm">{subtitle}</div>
    </div>
  );
};

export default Heading;
