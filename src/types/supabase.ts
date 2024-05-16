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
          artist_id: string
          artwork_id: string | null
          created_at: string
          id: string
          release_date: string | null
          title: string
        }
        Insert: {
          artist_id: string
          artwork_id?: string | null
          created_at?: string
          id?: string
          release_date?: string | null
          title: string
        }
        Update: {
          artist_id?: string
          artwork_id?: string | null
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
            foreignKeyName: "artists_avatar_id_fkey"
            columns: ["avatar_id"]
            isOneToOne: false
            referencedRelation: "artwork"
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
      song: {
        Row: {
          album_id: string | null
          artist_id: string
          created_at: string
          id: string
          name: string
          rhymes: Json | null
          track_no: number | null
          url: string
        }
        Insert: {
          album_id?: string | null
          artist_id: string
          created_at?: string
          id?: string
          name: string
          rhymes?: Json | null
          track_no?: number | null
          url?: string
        }
        Update: {
          album_id?: string | null
          artist_id?: string
          created_at?: string
          id?: string
          name?: string
          rhymes?: Json | null
          track_no?: number | null
          url?: string
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
        ]
      }
    }
    Views: {
      random_songs: {
        Row: {
          album_id: string | null
          artist_id: string | null
          created_at: string | null
          id: string | null
          name: string | null
          rhymes: Json | null
          track_no: number | null
        }
        Insert: {
          album_id?: string | null
          artist_id?: string | null
          created_at?: string | null
          id?: string | null
          name?: string | null
          rhymes?: Json | null
          track_no?: number | null
        }
        Update: {
          album_id?: string | null
          artist_id?: string | null
          created_at?: string | null
          id?: string | null
          name?: string | null
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
        ]
      }
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
