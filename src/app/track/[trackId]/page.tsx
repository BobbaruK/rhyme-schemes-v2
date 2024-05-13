import AlbumSongHero from "@/components/hero/AlbumSongHero";
import AlertWrapper from "@/components/AlertWrapper";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Props {
  params: {
    trackId: string;
  };
}

const Track = async ({ params: { trackId } }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: songs, error: songsError } = await supabase
    .from("song")
    .select(
      `
			track_no,
			name,
			artist (*),
			band (*),
			album (
				id,
				title,
				release_date,
				artwork (*)
			)
		`,
    )
    .eq("id", trackId);

  if (songsError) return <AlertWrapper error={songsError} />;

  const song = songs[0];

  return (
    <div className="container flex flex-col gap-10">
      {/* <div>
        <pre>{JSON.stringify(songs, null, 4)}</pre>
      </div> */}
      <AlbumSongHero
        opts={{
          dataType: "song",
          artwork: {
            url: song.album?.artwork?.url,
            title: song.name,
            width: song.album?.artwork?.width,
            height: song.album?.artwork?.height,
            description: song.album?.artwork?.description,
          },
          name: song.name,
          band: song.band,
          artist: song.artist,
          release_date: song.album?.release_date,
          songsLength: songs.length,
          album: song.album,
        }}
      />
      Track: {trackId}
    </div>
  );
};

export default Track;
