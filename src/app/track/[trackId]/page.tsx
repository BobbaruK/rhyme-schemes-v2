import AlertWrapper from "@/components/AlertWrapper";
import Play from "@/components/deck/Play";
import AlbumSongHero from "@/components/hero/AlbumSongHero";
import { DeckState } from "@/stores/deck-store";
import { createClient } from "@/utils/supabase/server";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers";

interface Props {
  params: {
    trackId: string;
  };
}

const Track = async ({ params: { trackId } }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: song, error: songsError } = await supabase
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
    .eq("id", trackId)
    .single();

  if (songsError) return <AlertWrapper error={songsError} />;

  const { data: playlistAlbum, error: playlistAlbumError } = await supabase
    .from("song")
    .select(
      `
      *,
      artist (*),
      album (
        *,
        artwork (*)
      )
    `,
    )
    .order("album_id")
    .order("track_no")
    .eq("album_id", song.album_id!);

  if (playlistAlbumError) return <AlertWrapper error={playlistAlbumError} />;

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
      .neq("name", song.name);

  if (playlistRestRandomError)
    return <AlertWrapper error={playlistRestRandomError} />;

  const playlist = [song, ...playlistRestRandom] as DeckState["playlist"];

  return (
    <div className="container flex flex-col gap-10">
      {/* <div>
        <pre>{JSON.stringify(song, null, 4)}</pre>
      </div> */}
      <AlbumSongHero
        album={song.album}
        artist={song.artist!}
        artwork={song.album?.artwork}
        dataType="song"
        name={song.name}
        playlist={playlist}
        release_date={song.album?.release_date}
        trackId={song.id}
        playBtn={
          <Play
            songDetails={{
              id: song.id,
              songArtist: song.artist ? song.artist.name : "No Name",
              songName: song.name,
            }}
            playlist={playlist}
          />
        }
      />
      {/* <AlbumSongHero
        opts={{
          dataType: "song",
          artwork: song.album?.artwork,
          name: song.name,
          artist: song.artist,
          release_date: song.album?.release_date,
          songsLength: songs.length,
          album: song.album,
        }}
        playlist={playlist}
      /> */}
      Track: {trackId}
    </div>
  );
};

export default Track;
