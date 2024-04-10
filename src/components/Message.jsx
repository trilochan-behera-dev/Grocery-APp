import { Link } from "react-router-dom";

const Message = ({ type, message, icon, link, linkMessage, subMessage }) => {
  const color =
    type === "Error"
      ? "text-[#1683b9]"
      : type === "Success"
      ? "text-[#7FD287]"
      : "text-[#E86F6F]";
  const bgColor =
    type === "Error"
      ? "bg-[#1683b9]"
      : type === "Success"
      ? "bg-[#7FD287]"
      : "bg-[#E86F6F]";
  return (
    <div className="flex flex-col items-center justify-center h-96 font-bold text-2xl gap-6">
      <img src={icon} className="h-16 w-16" />
      <p className={color}>{message}</p>
      <p className={`${color} text-base md:w-1/2 text-center`}>{subMessage}</p>
      <Link to={link}>
        <div
          className={`w-fit shadow-2xl text-base px-4 py-2 text-center rounded-full border border-gray-200 cursor-pointer ${bgColor} text-white font-bold`}
        >
          {linkMessage}
        </div>
      </Link>
    </div>
  );
};

export default Message;
