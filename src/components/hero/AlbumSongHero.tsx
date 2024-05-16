import { DeckState } from "@/stores/deck-store";
import { Database, Tables } from "@/types/supabase";
import { dateFormatter } from "@/utils/dateFormatter";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import noImage from "../../../public/noimage.svg";

interface Props {
  album: Tables<"album"> | null;
  artist: Tables<"artist">;
  artwork: Tables<"artwork"> | null | undefined;
  dataType: "album" | "song";
  name: Database["public"]["Tables"]["album"]["Row"]["title"];
  playBtn: ReactNode;
  playlist: DeckState["playlist"];
  release_date:
    | Database["public"]["Tables"]["album"]["Row"]["release_date"]
    | undefined;
  songsLength?: number;
  trackId: Database["public"]["Tables"]["song"]["Row"]["id"];
}

const AlbumSongHero = ({
  album,
  artist,
  artwork,
  dataType,
  name,
  playBtn,
  playlist,
  release_date,
  songsLength = 0,
  trackId,
}: Props) => {
  const getSongDetails = () => {
    return {
      id: trackId,
      songArtist: artist ? artist.name : "No Name",
      songName: name,
    };
  };

  const songDetails = getSongDetails();

  return (
    <div>
      {/* <div>
        <pre>{JSON.stringify(playlist, null, 4)}</pre>
      </div> */}
      <div className="hero flex flex-col gap-4 sm:flex-row">
        <Image
          src={artwork?.url || noImage}
          alt={`${name}${artwork?.description && " - " + artwork.description}`}
          width={artwork?.width}
          height={artwork?.height}
          className=" block h-auto w-full max-w-full rounded-md object-cover  sm:h-[300px] sm:w-[300px]"
          sizes={`
            (max-width: 375px) 310px,
            (max-width: 639px) 574px,
            300px
          `}
        />
        <div className="flex grow flex-col justify-end gap-4">
          <div>
            <p>{dataType}</p>
            <h1
              className="line-clamp-1 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
              title={dataType === "album" && album ? album?.title : name}
            >
              {dataType === "album" && album ? album?.title : name}
            </h1>
            <h2 className="text-md  md:text-lg">
              <strong>
                {artist && (
                  <>
                    <Link href={`/artist/${artist.id}`}>{artist.name}</Link>{" "}
                    &bull;
                  </>
                )}
              </strong>{" "}
              {dataType === "song" && (
                <>
                  <Link href={`/album/${album?.id}`}>{album?.title}</Link>{" "}
                  &bull;
                </>
              )}{" "}
              {release_date && <>{dateFormatter(release_date)} &bull;</>}{" "}
              {dataType === "song" && <>02:38</>}
              {songsLength > 0 && dataType === "album" && (
                <>
                  {songsLength}{" "}
                  {songsLength === 1 ? <>track</> : <>track-uri</>}
                </>
              )}
            </h2>
          </div>
          <div className="">{playBtn}</div>
        </div>
      </div>
    </div>
  );
};

export default AlbumSongHero;
