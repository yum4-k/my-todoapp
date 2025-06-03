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

  async update(id: number, todo: { content?: string; is_completed?: boolean }) {
    const { data, error } = await supabase
      .from("todos")
      .update(todo)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  async delete(id: number) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  },
};
