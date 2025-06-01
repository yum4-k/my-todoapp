import { supabase } from "@/lib/supabase";

export const todoRepository = {
  async create(userId: string, content: string) {
    const { data, error } = await supabase
      .from("todos")
      .insert({
        user_id: userId,
        content,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async find(userId: string) {
    const { data, error } = await supabase
      .from("todos")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    if (!data) return;
    return data;
  },
};
