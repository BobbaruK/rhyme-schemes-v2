import AlertWrapper from "@/components/AlertWrapper";
import BandArtistHero from "@/components/hero/BandArtistHero";
import RenderAlbums from "@/components/RenderAlbums";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Props {
  params: {
    bandId: string;
  };
}

const Band = async ({ params: { bandId } }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: bands, error: bandsError } = await supabase
    .from("band")
    .select(
      `
        id,
        name,
        artwork (*)
      `,
    )
    .eq("id", bandId);

  if (bandsError) return <AlertWrapper error={bandsError} />;

  const band = bands[0];

  return (
    <>
      {/* <div>
        <pre>{JSON.stringify(albums, null, 2)}</pre>
      </div> */}
      <BandArtistHero
        name={band.name}
        artwork={{
          url: band.artwork?.url,
          title: band.name,
          width: band.artwork?.width,
          height: band.artwork?.height,
          description: band.artwork?.description,
        }}
      />
      <RenderAlbums type="band" bandId={band.id} />
    </>
  );
};

export default Band;
