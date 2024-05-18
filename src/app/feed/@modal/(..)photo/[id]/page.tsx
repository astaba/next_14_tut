import Image from "next/image";
import wondersImages, { WonderImage } from "@/app/feed/wonders";
import Modal from "@/components/Modal";

export default function PhotoModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const photo: WonderImage = wondersImages.find((p) => p.id === id)!;

  return (
    <Modal>
      <Image
        alt={photo.name}
        src={photo.src}
        className="aspect-square h-auto w-full object-cover"
      />

      <div className="bg-white p-4">
        <h2 className="text-xl font-semibold">{photo.name}</h2>
        <p className="font-bold">{photo.photographer}</p>
        <h3>{photo.location}</h3>
      </div>
    </Modal>
  );
}
