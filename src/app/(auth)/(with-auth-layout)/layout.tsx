import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="div">
      <h3
      className="m-0 bg-[palegreen] text-center"
      >
        Credentials
      </h3>
      {children}
    </div>
  );
}

export default AuthLayout;
