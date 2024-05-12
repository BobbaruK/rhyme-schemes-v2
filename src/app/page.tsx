import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormatter } from "@/utils/dateFormatter";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: albums, error: albumsError } = await supabase.from("album")
    .select(`
      id,
      title,
      release_date,
      artwork (
        url,
        width,
        height,
        description
      )
    `);

  if (albumsError) return <p>something went wrong</p>;

  return (
    <div className="container flex flex-col gap-4">
      {albums?.map(async (album) => (
        <Card
          key={album.id}
          className="flex flex-col items-center justify-start overflow-hidden text-center sm:flex-row sm:text-start">
          <Link href={`/album/${album.id}`}>
            {/* TODO: image src: handle null */}
            <Image
              src={album.artwork?.url!}
              alt={`${album.title}${
                album.artwork?.description && " - " + album.artwork.description
              }`}
              width={album.artwork?.width}
              height={album.artwork?.height}
              className="h-auto max-w-full object-cover sm:max-h-[150px] sm:max-w-[200px]"
              sizes={`
                (max-width: 375px) 310px,
                (max-width: 639px) 574px,
                200px
              `}
            />
          </Link>
          <CardHeader>
            <CardTitle>
              <Link href={`/album/${album.id}`}>
                {album.title}{" "}
                <small>({dateFormatter(album.release_date)})</small>
              </Link>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
