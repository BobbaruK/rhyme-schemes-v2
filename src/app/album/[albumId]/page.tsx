import AlbumSongHero from "@/components/hero/AlbumSongHero";
import AlertWrapper from "@/components/AlertWrapper";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { DeckState } from "@/stores/deck-store";
import Play from "@/components/deck/Play";

interface Props {
  params: {
    albumId: string;
  };
}

const Album = async ({ params: { albumId } }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: album, error: albumsError } = await supabase
    .from("album")
    .select(
      `
      *,
      artist (*),
      artwork (*)`,
    )
    .eq("id", albumId)
    .single();

  const { data: albumSongs, error: albumSongsError } = await supabase
    .from("song")
    .select(
      `
      *,
      artist (*),
      album (
        *,
        artwork (*)
      )`,
    )
    .eq("album_id", albumId)
    .order("track_no", { ascending: true, nullsFirst: false });

  if (albumsError) return <AlertWrapper error={albumsError} />;
  if (albumSongsError) return <AlertWrapper error={albumSongsError} />;

  const { data: playlistRestRandom, error: playlistRestRandomError } =
    await supabase
      .from("random_songs")
      .select(
        `
        *,
        artist (*),
        album (
          *,
          artwork (*)
        )`,
      )
      .neq("album_id", albumSongs[0].album_id);

  if (playlistRestRandomError)
    return <AlertWrapper error={playlistRestRandomError} />;

  const playlist = [
    ...albumSongs,
    ...playlistRestRandom,
  ] as DeckState["playlist"];

  return (
    <div className="container flex flex-col gap-10">
      {/* <div>
        <pre>{JSON.stringify(albumSongs, null, 4)}</pre>
      </div> */}
      <AlbumSongHero
        playlist={playlist}
        dataType={"album"}
        artwork={album.artwork}
        name={album.title}
        artist={album.artist!}
        release_date={album.release_date}
        songsLength={albumSongs.length}
        album={null}
        trackId={albumSongs[0].id}
        playBtn={
          <Play
            songDetails={{
              id: albumSongs[0].id,
              songArtist: albumSongs[0].artist
                ? albumSongs[0].artist.name
                : "No Name",
              songName: albumSongs[0].name,
              url: albumSongs[0].url,
              songArtwork: albumSongs[0].album?.artwork!,
            }}
            playlist={playlist}
          />
        }
      />
      {/* <AlbumSongHero
        opts={{
          dataType: "album",
          artwork: album.artwork,
          name: album.title,
          artist: album.artist,
          release_date: album.release_date,
          songsLength: albumSongs.length,
        }}
        playlist={playlist}
      /> */}
      <div className="flex flex-col gap-4">
        {albumSongs.map((song) => (
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
