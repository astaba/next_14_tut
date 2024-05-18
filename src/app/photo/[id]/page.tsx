import Image from "next/image";
import wondersImages, { WonderImage } from "@/app/feed/wonders";

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo: WonderImage = wondersImages.find((p) => p.id === id)!;
  return (
    <div className="container mx-auto my-10">
      <div className="mx-auto w-1/2">
        <div>
          <h1 className="my-4 text-center text-3xl font-bold">{photo.name}</h1>
        </div>
        <Image
          alt={photo.name}
          src={photo.src}
          className="aspect-square h-auto w-full object-cover "
        />

        <div className="bg-white py-4">
          <h3>{photo.photographer}</h3>
          <h3>{photo.location}</h3>
        </div>
      </div>
    </div>
  );
}
