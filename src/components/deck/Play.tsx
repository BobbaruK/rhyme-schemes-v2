"use client";

import { useDeckStore } from "@/stores/deck-store-provider";
import { Button } from "../ui/button";
import { FaPlay } from "react-icons/fa6";
import { DeckState } from "@/stores/deck-store";

interface Props {
  songDetails: DeckState["songDetails"];
  playlist: DeckState["playlist"];
}

const Play = ({ songDetails, playlist }: Props) => {
  const { loadSongDetails, setPlaylist } = useDeckStore((state) => state);

  return (
    <Button
      className="h-10 w-10 rounded-full p-1"
      variant={"default"}
      onClick={() => {
        loadSongDetails(songDetails);
        setPlaylist(playlist);
      }}
    >
      <FaPlay size={20} className="relative -right-[1px]" />
    </Button>
  );
};

export default Play;
