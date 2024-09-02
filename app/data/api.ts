import { type ItemModel, type ChecklistModel } from "./DTOs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const db_tables = { items: "items", checklists: "checklists" };

export async function getChecklistItemsApi(uid: string) {
  let { data: checklist, error } = await supabase
    .from<ItemModel>(db_tables.items)
    .select("*")
    .eq("checklists_uid", uid);
  return checklist;
}

export async function addItemApi(itemName: string, uid: string) {
  const { data, error } = await supabase
    .from<ItemModel>(db_tables.items)
    .insert([{ task_name: itemName, checklists_uid: uid }]);
  if (data === null) throw "No item is inserted";
  if (data.length > 1) throw "More than one task is inserted";
  return data[0];
}

export async function updateItemApi(itemId: number, isCompleted: boolean) {
  const { data, error } = await supabase
    .from<ItemModel>(db_tables.items)
    .update({ is_completed: isCompleted })
    .eq("id", itemId);
  if (data === null) throw "No task is updated";
  if (data.length > 1) throw "More than one task is updated";
  return data[0];
}

export async function changeItemNameApi(newName: string, taskId: number) {
  const { data, error } = await supabase
    .from<ItemModel>(db_tables.items)
    .update({ task_name: newName })
    .eq("id", taskId);
}

export async function changeChecklistTitleApi(
  newTitle: string | null,
  uid: string
) {
  const { data, error } = await supabase
    .from<ChecklistModel>(db_tables.checklists)
    .update({ title: newTitle })
    .eq("uid", uid);
}

export async function createChecklistApi(uid: string, title: string | null) {
  const { data, error } = await supabase
    .from<ChecklistModel>(db_tables.checklists)
    .insert([
      {
        uid: uid,
        title: title,
      },
    ]);
  return data;
}

export async function deleteItemApi(itemId: number) {
  const { data, error } = await supabase
    .from<ItemModel>(db_tables.items)
    .delete()
    .eq("id", itemId);
  return data;
}

export async function getChecklistTitleApi(uid: string) {
  const { data, error } = await supabase
    .from<ChecklistModel>(db_tables.checklists)
    .select("title")
    .eq("uid", uid);
  return data;
}
