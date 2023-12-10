import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h3
        style={{
          margin: "0",
          backgroundColor: "palegreen",
          textAlign: "center",
        }}
      >
        Credentials
      </h3>
      {children}
    </>
  );
}

export default AuthLayout;
