import { Database, Tables } from "@/types/supabase";
import { createStore } from "zustand/vanilla";

type RandomSongs = Tables<"random_songs"> & {
  artist: Tables<"artist">;
  album: (Tables<"album"> & { artwork: Tables<"artwork"> }) | null;
};

export type DeckState = {
  trackId: string | null;
  songDetails: {
    id: Database["public"]["Tables"]["song"]["Row"]["id"];
    songName: Database["public"]["Tables"]["song"]["Row"]["name"];
    songArtist: Database["public"]["Tables"]["artist"]["Row"]["name"];
  } | null;
  playlist: RandomSongs[] | null;
};

export type DeckActions = {
  loadToDeck: (trackId: string | null) => void;
  loadSongDetails: (songDetails: DeckState["songDetails"]) => void;
  setPlaylist: (playList: DeckState["playlist"]) => void;
};

export type DeckStore = DeckState & DeckActions;

export const initDeckStore = (): DeckState => {
  return {
    trackId: null,
    songDetails: null,
    playlist: null,
  };
};

export const defaultInitState: DeckState = {
  trackId: null,
  songDetails: null,
  playlist: null,
};

export const createDeckStore = (initState: DeckState = defaultInitState) => {
  return createStore<DeckStore>()((set) => ({
    ...initState,
    loadToDeck: (trackId) => set(() => ({ trackId })),
    loadSongDetails: (songDetails) =>
      set(() => ({
        songDetails,
      })),
    setPlaylist: (playlist) =>
      set(() => ({
        playlist,
      })),
  }));
};
