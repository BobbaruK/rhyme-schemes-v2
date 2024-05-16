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
import { useDeckStore } from "@/stores/deck-store-provider";
import Image from "next/image";
import { PiPlaylistDuotone } from "react-icons/pi";
import noImage from "../../../public/noimage.svg";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MainDeck = () => {
  const router = useRouter();

  const { songDetails, playlist, loadSongDetails } = useDeckStore(
    (state) => state,
  );

  if (!songDetails) return null;

  console.log(playlist && playlist[0].album?.artwork.url);

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-primary py-4 text-primary-foreground">
      <div className="container flex items-center justify-between">
        <div>
          <p>id: {songDetails?.id}</p>
          <p>song: {songDetails?.songName}</p>
          <p>artist: {songDetails?.songArtist}</p>
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
                    `flex items-center justify-start gap-4 overflow-hidden ${song.id === songDetails.id ? "bg-secondary text-secondary-foreground" : ""}`,
                  )}
                >
                  <SheetClose
                    onClick={() => {
                      loadSongDetails({
                        id: song.id!,
                        songArtist: song.artist.name,
                        songName: song.name!,
                      });
                    }}
                  >
                    <Image
                      src={song.album ? song.album.artwork.url : noImage}
                      alt={song.name || ""}
                      width={song.album ? song.album.artwork?.width : 75}
                      height={song.album ? song.album.artwork?.height : 75}
                      className=" block h-auto w-full max-w-full rounded-md object-cover  sm:h-[75px] sm:w-[75px]"
                      sizes={`75px`}
                    />
                  </SheetClose>
                  <div className="flex flex-col items-start justify-start">
                    <CardHeader className="line-clamp-1 p-0">
                      <SheetClose
                        onClick={() => {
                          loadSongDetails({
                            id: song.id!,
                            songArtist: song.artist.name,
                            songName: song.name!,
                          });
                        }}
                      >
                        {song.name}
                      </SheetClose>
                    </CardHeader>
                    <CardDescription>
                      <SheetClose
                        onClick={() => {
                          router.push(`/artist/${song.artist.id}`);
                        }}
                      >
                        {song.artist.name}
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
