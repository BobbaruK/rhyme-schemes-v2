import { dateFormatter } from "@/utils/dateFormatter";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import noImage from "../../public/noimage.svg";
import AlertWrapper from "./AlertWrapper";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface Props {
  type: "band" | "artist";
  bandId: string;
}

const RenderAlbums = async ({ type, bandId }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const band_id = type === "artist" ? "artist_id" : "band_id";

  const { data: albums, error: albumsError } = await supabase
    .from("album")
    .select(
      `
				id,
				title,
				release_date,
				artwork (*)
			`,
    )
    .eq(band_id, bandId);

  if (albumsError) return <AlertWrapper error={albumsError} />;

  return (
    <div className="container">
      <h2>Albume:</h2>
      {albums.map((album) => (
        <Card
          key={album.id}
          className="flex flex-col items-center overflow-hidden sm:flex-row"
        >
          <Link href={`/album/${album.id}`}>
            <Image
              src={album.artwork?.url || noImage}
              alt={`${album.title}${
                album.artwork?.description && " - " + album.artwork.description
              }`}
              width={album.artwork?.width}
              height={album.artwork?.height}
              className=" block h-auto w-full max-w-full object-cover sm:h-[100px] sm:w-[100px]"
              sizes={`
					(max-width: 375px) 310px,
					(max-width: 639px) 574px,
					100px
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
};

export default RenderAlbums;
