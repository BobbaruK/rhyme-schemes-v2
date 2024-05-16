"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { RandomSong } from "@/stores/deck-store";
import { useDeckStore } from "@/stores/deck-store-provider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PiPlaylistDuotone, PiSpeakerHighFill } from "react-icons/pi";
import noImage from "../../../public/noimage.svg";
import { Card, CardDescription, CardHeader } from "../ui/card";

const MainDeck = () => {
  const router = useRouter();

  const { songDetails, playlist } = useDeckStore((state) => state);

  if (!songDetails) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-primary py-4 text-primary-foreground">
      <div className="container flex items-center justify-between gap-4">
        <Image
          src={songDetails.songArtwork ? songDetails.songArtwork.url : noImage}
          alt={songDetails.songName}
          width={75}
          height={75}
          className="hidden h-[75px] w-[75px] rounded-md object-cover md:block"
          sizes={`96px`}
        />
        <div className="text-start md:text-center">
          {/* <p>id: {songDetails?.id}</p> */}
          <p className="line-clamp-1">
            {songDetails?.songArtist} - {songDetails?.songName}
          </p>
          {/* <p>url: {songDetails?.url ? "are" : "n-are"}</p> */}
        </div>
        <Sheet>
          <SheetTrigger>
            <PiPlaylistDuotone size={30} />
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-4 overflow-y-auto p-2 py-3">
            <SheetHeader>
              <SheetTitle>Playlist</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1">
              {playlist?.map((song) => (
                <Card
                  key={song.id}
                  className={cn(
                    `flex items-center justify-start gap-2 overflow-hidden ${song.id === songDetails.id ? "bg-secondary text-secondary-foreground" : ""}`,
                  )}
                >
                  <CloseSheetWrapper song={song} type="image" />
                  <div className="flex flex-col items-start justify-start p-1">
                    <CardHeader className="p-0">
                      <CloseSheetWrapper song={song} type="title" />
                    </CardHeader>
                    <CardDescription>
                      <SheetClose
                        onClick={() => {
                          router.push(`/artist/${song.artist.id}`);
                        }}
                      >
                        <span className="line-clamp-1 text-start">
                          {song.artist.name}
                        </span>
                      </SheetClose>
                    </CardDescription>
                  </div>
                </Card>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MainDeck;

function CloseSheetWrapper({
  song,
  type,
}: {
  song: RandomSong;
  type: "title" | "image";
}) {
  const { songDetails, loadSongDetails } = useDeckStore((state) => state);

  if (!songDetails) return null;

  if (type === "title")
    return (
      <>
        {song.id === songDetails.id ? (
          <div
            className="flex items-center justify-start gap-2"
            onClick={() => {
              loadSongDetails({
                id: song.id!,
                songArtist: song.artist.name,
                songName: song.name!,
                url: song.url,
                songArtwork: song.album?.artwork!,
              });
            }}
          >
            <PiSpeakerHighFill />
            <span className="line-clamp-1 text-start">{song.name}</span>
          </div>
        ) : (
          <SheetClose
            className="flex items-center justify-start gap-2"
            onClick={() => {
              loadSongDetails({
                id: song.id!,
                songArtist: song.artist.name,
                songName: song.name!,
                url: song.url,
                songArtwork: song.album?.artwork!,
              });
            }}
          >
            <span className="line-clamp-1 text-start">{song.name}</span>
          </SheetClose>
        )}
      </>
    );

  if (type === "image") {
    return (
      <>
        {song.id === songDetails.id ? (
          <div
            className="h-[50px] w-[50px] min-w-[50px] sm:h-[75px] sm:w-[75px] sm:min-w-[75px]"
            onClick={() => {
              loadSongDetails({
                id: song.id!,
                songArtist: song.artist.name,
                songName: song.name!,
                url: song.url,
                songArtwork: song.album?.artwork!,
              });
            }}
          >
            <Image
              src={song.album ? song.album.artwork.url : noImage}
              alt={song.name || ""}
              width={song.album ? song.album.artwork?.width : 75}
              height={song.album ? song.album.artwork?.height : 75}
              className="block h-full w-full object-cover"
              sizes={`
                (max-width: 640px) 64px,
                96px
              `}
            />
          </div>
        ) : (
          <SheetClose
            className="h-[50px] w-[50px] min-w-[50px] sm:h-[75px] sm:w-[75px] sm:min-w-[75px]"
            onClick={() => {
              loadSongDetails({
                id: song.id!,
                songArtist: song.artist.name,
                songName: song.name!,
                url: song.url,
                songArtwork: song.album?.artwork!,
              });
            }}
          >
            <Image
              src={song.album ? song.album.artwork.url : noImage}
              alt={song.name || ""}
              width={song.album ? song.album.artwork?.width : 75}
              height={song.album ? song.album.artwork?.height : 75}
              className="block h-full w-full object-cover"
              sizes={`
                (max-width: 640px) 64px,
                96px
              `}
            />
          </SheetClose>
        )}
      </>
    );
  }
}
