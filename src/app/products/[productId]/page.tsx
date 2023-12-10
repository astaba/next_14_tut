// import { Metadata } from "next";

type ProductProps = { params: { productId: string } };

// // export const generateMetadata = ({ params }: ProductProps): Metadata => {
// //   return {
// //     title: `Product ${params.productId}`,
// //   };
// // };

// export const generateMetadata = async ({
//   params,
// }: ProductProps): Promise<Metadata> => {
//   const productName = await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(`Samsung ${params.productId}`);
//     }, 200);
//   });

//   return {
//     title: `Product ${productName}`,
//   };
// };

export default function Product({ params }: ProductProps) {
  return <h1>Details about product {params.productId}</h1>;
}
