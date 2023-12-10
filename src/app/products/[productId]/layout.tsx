import React from "react";

function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <h3
        style={{
          margin: "0",
          backgroundColor: "palevioletred",
          textAlign: "center",
        }}
      >
        Featured Product
      </h3>
    </>
  );
}

export default ProductLayout;
