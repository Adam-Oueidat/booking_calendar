"use client";
import { useActionState } from "react";
import TextInput from "../../modal/TextInput";
import { addAdmin } from "@/src/app/api/admin/admin_actions";
import Button from "../../modal/Button";
type AddAdminState = {
  error: string | null;
  success: string | null;
};

const initialState: AddAdminState = {
  error: null,
  success: null,
};

export default function AddAdminForm() {
  const [state, addAdminAction] = useActionState<AddAdminState, FormData>(
    async (state, formData) => {
      const email = formData.get("email") as string;
      const result = await addAdmin(email);
      if (result?.error) {
        return { ...state, error: result.error, success: null };
      }
      return { ...state, error: null, success: "Admin added successfully" };
    },
    initialState
  );
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-cph-paper mb-4">
        Add new admin
      </h2>
      <form action={addAdminAction} className="space-y-6">
        <div className="mb-4">
          <TextInput id="email" name="email" placeholder="Email" type="email" />
        </div>
        {state.error && (
          <div className="bg-cph-rust/15 border border-cph-rust/30 text-cph-rust px-4 py-3 rounded-lg">
            {state.error}
          </div>
        )}
        <Button type="submit">Add admin</Button>
      </form>
    </div>
  );
}
