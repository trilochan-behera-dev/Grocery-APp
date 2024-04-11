import Message from "./Message";

const Error = () => {
  return (
    <div className="py-8">
      <Message
        type="Error"
        icon="./svg/404.svg"
        message="404 - Page Not Found"
        subMessage="The requested page could not be found."
        link="/"
        linkMessage="Back To Home"
      />
    </div>
  );
};

export default Error;
