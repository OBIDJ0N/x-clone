"use client";

import { userSchema } from "@/lib/validation";
import { IUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Button from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import useEditModal from "@/hooks/use-edit-modal";
import { toast } from "@/hooks/use-toast";

interface Props {
  user: IUser;
}

export default function EditForm({ user }: Props) {
  const router = useRouter();
  const editModal = useEditModal();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      location: user.location || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      await axios.put(`/api/users/${user._id}?type=updateFields`, values);
      router.refresh();
      editModal.onClose();
    } catch (error: any) {
      if (error.response.data.error) {
        return toast({
          title: "Error",
          description: error.response.data.error,
          variant: "destructive",
        });
      } else {
        return toast({
          title: "Error",
          description: "Something went wrong. Please try ag",
          variant: "destructive",
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative -top-8 mx-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Bio" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Location" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          label="Save"
          secondary
          large
          fullWidth
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}
