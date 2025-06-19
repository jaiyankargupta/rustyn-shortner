import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";

const PageAuth = () => {
  const [login, setLogin] = React.useState(true);

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center">
        {login ? <Signin /> : <Signup />}
      </div>
    </>
  );
};

export default PageAuth;
