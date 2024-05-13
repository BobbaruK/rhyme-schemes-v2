import AlbumSongHero from "@/components/hero/AlbumSongHero";
import AlertWrapper from "@/components/AlertWrapper";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

interface Props {
  params: {
    albumId: string;
  };
}

const Album = async ({ params: { albumId } }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: albums, error: albumsError } = await supabase
    .from("album")
    .select(
      `
        title,
        release_date,
        band (
          id,
          name
        ),
        artist (
          id,
          name
        ),
        artwork (*)
      `,
    )
    .eq("id", albumId);

  const { data: songs, error: songsError } = await supabase
    .from("song")
    .select(`*`)
    .eq("album_id", albumId)
    .order("track_no", { ascending: true, nullsFirst: true });

  if (albumsError) return <AlertWrapper error={albumsError} />;
  if (songsError) return <AlertWrapper error={songsError} />;

  const album = albums[0]; //we filter by id and the id is unique

  return (
    <div className="container flex flex-col gap-10">
      {/* <div>
      <pre>{JSON.stringify(album, null, 4)}</pre>
    </div> */}
      <AlbumSongHero
        opts={{
          dataType: "album",
          artwork: {
            url: album.artwork?.url,
            title: album.title,
            width: album.artwork?.width,
            height: album.artwork?.height,
            description: album.artwork?.description,
          },
          name: album.title,
          band: album.band,
          artist: album.artist,
          release_date: album.release_date,
          songsLength: songs.length,
        }}
      />
      <div className="flex flex-col gap-4">
        {songs.map((song) => (
          <div key={song.id}>
            <Link href={`/track/${song.id}`} className="flex  gap-2">
              <span className="w-8 text-end">
                {song.track_no && <>{song.track_no}.</>}
              </span>
              {song.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
