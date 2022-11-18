export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Features: {
        Row: {
          id: number
          feature: string
          status: string
          user_id: string
        }
        Insert: {
          id?: number
          feature: string
          status: string
          user_id: string
        }
        Update: {
          id?: number
          feature?: string
          status?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
