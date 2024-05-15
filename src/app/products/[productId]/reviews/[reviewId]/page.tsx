import { notFound } from "next/navigation";

function getRandomInt(count: number) {
  return Math.floor(Math.random() * count);
}

export default function Review({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  if (parseInt(params.reviewId) > 1000) {
    notFound();
  }

  const count = getRandomInt(100);
  if (count < 75) {
    console.log({ count: count });
    throw new Error(`Error in Review ${params.reviewId} of product ${params.productId}
`);
  }

  return (
    <h1>
      Review {params.reviewId} of product {params.productId}
    </h1>
  );
}
