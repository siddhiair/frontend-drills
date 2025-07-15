import type React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="container px-4 mx-auto">{children}</div>;
};

export default Container;
