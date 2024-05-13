import AlertWrapper from "@/components/AlertWrapper";
import BandArtistHero from "@/components/hero/BandArtistHero";
import RenderAlbums from "@/components/RenderAlbums";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Props {
  params: {
    artistId: string;
  };
}

const Artist = async ({ params: { artistId } }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: artists, error: artistsError } = await supabase
    .from("artist")
    .select(
      `
        id,
        name,
        artwork (*)
      `,
    )
    .eq("id", artistId);

  if (artistsError) return <AlertWrapper error={artistsError} />;

  const artist = artists[0];

  return (
    <>
      <BandArtistHero
        name={artist.name}
        artwork={{
          url: artist.artwork?.url,
          title: artist.name,
          width: artist.artwork?.width,
          height: artist.artwork?.height,
          description: artist.artwork?.description,
        }}
      />
      <RenderAlbums type="artist" bandId={artist.id} />
    </>
  );
};

export default Artist;
