import { Database } from "@/types/supabase";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import noImage from "../../../public/noimage.svg";
import { Button } from "../ui/button";
import { FaPlay } from "react-icons/fa6";
import { dateFormatter } from "@/utils/dateFormatter";

type Band = Omit<
  Database["public"]["Tables"]["band"]["Row"],
  "avatar_id" | "created_at"
>;

type Artist = Omit<
  Database["public"]["Tables"]["artist"]["Row"],
  "avatar_id" | "band_id" | "created_at"
>;

type Album = Omit<
  Database["public"]["Tables"]["album"]["Row"],
  "artist_id" | "artwork_id" | "band_id" | "created_at"
>;

interface Props {
  opts:
    | {
        dataType: "album";
        artwork: {
          url:
            | Database["public"]["Tables"]["album"]["Row"]["artwork_id"]
            | undefined;
          title: Database["public"]["Tables"]["album"]["Row"]["title"];
          width:
            | Database["public"]["Tables"]["artwork"]["Row"]["width"]
            | undefined;
          height:
            | Database["public"]["Tables"]["artwork"]["Row"]["height"]
            | undefined;
          description:
            | Database["public"]["Tables"]["artwork"]["Row"]["description"]
            | undefined;
        };
        name: Database["public"]["Tables"]["album"]["Row"]["title"];
        band: Band | null;
        artist: Artist | null;
        release_date:
          | Database["public"]["Tables"]["album"]["Row"]["release_date"]
          | undefined;
        songsLength: number;
      }
    | {
        dataType: "song";
        artwork: {
          url:
            | Database["public"]["Tables"]["album"]["Row"]["artwork_id"]
            | undefined;
          title: Database["public"]["Tables"]["album"]["Row"]["title"];
          width:
            | Database["public"]["Tables"]["artwork"]["Row"]["width"]
            | undefined;
          height:
            | Database["public"]["Tables"]["artwork"]["Row"]["height"]
            | undefined;
          description:
            | Database["public"]["Tables"]["artwork"]["Row"]["description"]
            | undefined;
        };
        name: Database["public"]["Tables"]["album"]["Row"]["title"];
        band: Band | null;
        artist: Artist | null;
        release_date:
          | Database["public"]["Tables"]["album"]["Row"]["release_date"]
          | undefined;
        songsLength: number;
        album: Album | null;
      };
}

const AlbumSongHero = ({ opts }: Props) => {
  return (
    <div>
      {/* <div>
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div> */}
      <div className="hero flex flex-col gap-4 sm:flex-row">
        <Image
          src={opts.artwork.url || noImage}
          alt={`${opts.name}${opts.artwork?.description && " - " + opts.artwork.description}`}
          width={opts.artwork?.width}
          height={opts.artwork?.height}
          className=" block h-auto w-full max-w-full rounded-md object-cover  sm:h-[300px] sm:w-[300px]"
          sizes={`
            (max-width: 375px) 310px,
            (max-width: 639px) 574px,
            300px
          `}
        />
        <div className="flex grow flex-col justify-end gap-4">
          <div>
            <p>{opts.dataType}</p>
            <h1
              className="line-clamp-1 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
              title={opts.name}
            >
              {opts.name}
            </h1>
            <h2 className="text-md  md:text-lg">
              <strong>
                {opts.band && (
                  <>
                    <Link href={`/band/${opts.band.id}`}>{opts.band.name}</Link>{" "}
                    &bull;
                  </>
                )}
                {opts.artist && (
                  <>
                    <Link href={`/artist/${opts.artist.id}`}>
                      {opts.artist.name}
                    </Link>{" "}
                    &bull;
                  </>
                )}
              </strong>{" "}
              {opts.dataType === "song" && (
                <>
                  <Link href={`/album/${opts.album?.id}`}>
                    {opts.album?.title}
                  </Link>{" "}
                  &bull;
                </>
              )}{" "}
              {opts.release_date && (
                <>{dateFormatter(opts.release_date)} &bull;</>
              )}{" "}
              {opts.dataType === "song" && <>02:38</>}
              {opts.songsLength > 0 && opts.dataType === "album" && (
                <>
                  {opts.songsLength}{" "}
                  {opts.songsLength === 1 ? <>track</> : <>track-uri</>}
                </>
              )}
            </h2>
          </div>
          <div className="">
            <Button className="h-10 w-10 rounded-full p-1" variant={"default"}>
              <FaPlay size={20} className="relative -right-[1px]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumSongHero;
