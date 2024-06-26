import React from "react";
import { Metadata } from "next";

type ProductProps = { params: { productId: string } };

export const generateMetadata = async ({
  params,
}: ProductProps): Promise<Metadata> => {
  const productName = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Samsung ${params.productId}`);
    }, 200);
  });

  return {
    title: {
      absolute: `Product ${productName}`,
    },
  };
};

function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <h3
      className="m-0 bg-[palevioletred] text-center"
      >
        Featured Product
      </h3>
    </>
  );
}

export default ProductLayout;
