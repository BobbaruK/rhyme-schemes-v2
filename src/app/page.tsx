import AlertWrapper from "@/components/AlertWrapper";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { dateFormatter } from "@/utils/dateFormatter";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import noImage from "../../public/noimage.svg";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: albums, error: albumsError } = await supabase
    .from("album")
    .select(
      `
      id,
      title,
      release_date,
      artwork (
        url,
        width,
        height,
        description
      )
    `,
    )
    .order("release_date", { ascending: false, nullsFirst: false });

  if (albumsError) return <AlertWrapper error={albumsError} />;

  return (
    <div className="container flex flex-col gap-4">
      {/* <div>
        <pre>
          {JSON.stringify(albums, null, 2)}
        </pre>
      </div> */}
      {albums?.map(async (album) => (
        <Card
          key={album.id}
          className="flex flex-col items-center justify-start overflow-hidden text-center sm:flex-row sm:text-start"
        >
          <Link href={`/album/${album.id}`} className="grow sm:max-w-[200px]">
            <Image
              src={album.artwork?.url || noImage}
              alt={`${album.title}${
                album.artwork?.description && " - " + album.artwork.description
              }`}
              width={album.artwork?.width}
              height={album.artwork?.height}
              className=" block h-auto w-full max-w-full object-cover sm:h-[200px] sm:w-[200px]"
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
                {album.release_date && (
                  <small>({dateFormatter(album.release_date)})</small>
                )}
              </Link>
            </CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
