import Image from "next/image";
import noImage from "../../../public/noimage.svg";
import { Database } from "@/types/supabase";
import { cn } from "@/lib/utils";

interface Props {
  name: Database["public"]["Tables"]["album"]["Row"]["title"];
  artwork: {
    url: Database["public"]["Tables"]["album"]["Row"]["artwork_id"] | undefined;
    title: Database["public"]["Tables"]["album"]["Row"]["title"];
    width: Database["public"]["Tables"]["artwork"]["Row"]["width"] | undefined;
    height:
      | Database["public"]["Tables"]["artwork"]["Row"]["height"]
      | undefined;
    description:
      | Database["public"]["Tables"]["artwork"]["Row"]["description"]
      | undefined;
  };
}

const BandArtistHero = ({ name, artwork }: Props) => {
  return (
    <div className="relative">
      <Image
        src={artwork?.url || noImage}
        alt={`${name}${artwork?.description && " - " + artwork.description}`}
        width={artwork?.width}
        height={artwork?.height}
        className="absolute inset-0 z-0  h-full w-full object-cover"
        sizes={`100vh`}
      />
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1/3 w-full bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))] via-10%"></div>
      <div className="container relative z-20 flex h-[min(40vh,400px)] flex-col justify-end gap-10 py-4">
        <h1
          className={cn(
            `line-clamp-1 text-2xl font-bold leading-normal text-foreground sm:text-3xl md:text-4xl lg:text-5xl`,
          )}
        >
          {name}
        </h1>
      </div>
    </div>
  );
};

export default BandArtistHero;
