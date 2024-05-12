export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      album: {
        Row: {
          artist_id: string | null
          artwork_id: string | null
          band_id: string | null
          created_at: string
          id: string
          release_date: string | null
          title: string
        }
        Insert: {
          artist_id?: string | null
          artwork_id?: string | null
          band_id?: string | null
          created_at?: string
          id?: string
          release_date?: string | null
          title: string
        }
        Update: {
          artist_id?: string | null
          artwork_id?: string | null
          band_id?: string | null
          created_at?: string
          id?: string
          release_date?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "album_artwork_id_fkey"
            columns: ["artwork_id"]
            isOneToOne: false
            referencedRelation: "artwork"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "album_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "band"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "albums_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
        ]
      }
      artist: {
        Row: {
          avatar_id: string | null
          band_id: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          avatar_id?: string | null
          band_id?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          avatar_id?: string | null
          band_id?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "artist_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "band"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artists_avatar_id_fkey"
            columns: ["avatar_id"]
            isOneToOne: false
            referencedRelation: "artwork"
            referencedColumns: ["id"]
          },
        ]
      }
      artists_group: {
        Row: {
          band_id: string
          created_at: string
          id: string
          member_1: string
          member_2: string | null
          member_3: string | null
          member_4: string | null
          member_5: string | null
          name: string | null
        }
        Insert: {
          band_id?: string
          created_at?: string
          id?: string
          member_1?: string
          member_2?: string | null
          member_3?: string | null
          member_4?: string | null
          member_5?: string | null
          name?: string | null
        }
        Update: {
          band_id?: string
          created_at?: string
          id?: string
          member_1?: string
          member_2?: string | null
          member_3?: string | null
          member_4?: string | null
          member_5?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "artists_group_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "band"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artists_group_member_1_fkey"
            columns: ["member_1"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artists_group_member_2_fkey"
            columns: ["member_2"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artists_group_member_3_fkey"
            columns: ["member_3"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artists_group_member_4_fkey"
            columns: ["member_4"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artists_group_member_5_fkey"
            columns: ["member_5"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
        ]
      }
      artwork: {
        Row: {
          created_at: string
          description: string | null
          height: number
          id: string
          title: string | null
          url: string
          width: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          height: number
          id?: string
          title?: string | null
          url: string
          width: number
        }
        Update: {
          created_at?: string
          description?: string | null
          height?: number
          id?: string
          title?: string | null
          url?: string
          width?: number
        }
        Relationships: []
      }
      band: {
        Row: {
          avatar_id: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          avatar_id?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          avatar_id?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "band_avatar_id_fkey"
            columns: ["avatar_id"]
            isOneToOne: false
            referencedRelation: "artwork"
            referencedColumns: ["id"]
          },
        ]
      }
      song: {
        Row: {
          album_id: string | null
          artist_id: string | null
          band_id: string | null
          created_at: string
          id: string
          name: string
          rhymes: Json | null
          track_no: number | null
        }
        Insert: {
          album_id?: string | null
          artist_id?: string | null
          band_id?: string | null
          created_at?: string
          id?: string
          name: string
          rhymes?: Json | null
          track_no?: number | null
        }
        Update: {
          album_id?: string | null
          artist_id?: string | null
          band_id?: string | null
          created_at?: string
          id?: string
          name?: string
          rhymes?: Json | null
          track_no?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "song_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "album"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "song_band_id_fkey"
            columns: ["band_id"]
            isOneToOne: false
            referencedRelation: "band"
            referencedColumns: ["id"]
          },
        ]
      }
      songs_group: {
        Row: {
          created_at: string
          id: string
          name: string
          song_1: string
          song_10: string | null
          song_2: string | null
          song_3: string | null
          song_4: string | null
          song_5: string | null
          song_6: string | null
          song_7: string | null
          song_8: string | null
          song_9: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          song_1: string
          song_10?: string | null
          song_2?: string | null
          song_3?: string | null
          song_4?: string | null
          song_5?: string | null
          song_6?: string | null
          song_7?: string | null
          song_8?: string | null
          song_9?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          song_1?: string
          song_10?: string | null
          song_2?: string | null
          song_3?: string | null
          song_4?: string | null
          song_5?: string | null
          song_6?: string | null
          song_7?: string | null
          song_8?: string | null
          song_9?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "songs_groups_song_1_fkey"
            columns: ["song_1"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_groups_song_10_fkey"
            columns: ["song_10"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_groups_song_2_fkey"
            columns: ["song_2"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_groups_song_3_fkey"
            columns: ["song_3"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_groups_song_4_fkey"
            columns: ["song_4"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_groups_song_5_fkey"
            columns: ["song_5"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_groups_song_6_fkey"
            columns: ["song_6"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_groups_song_7_fkey"
            columns: ["song_7"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_groups_song_8_fkey"
            columns: ["song_8"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "songs_groups_song_9_fkey"
            columns: ["song_9"]
            isOneToOne: false
            referencedRelation: "song"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      test: "test1" | "test2"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
