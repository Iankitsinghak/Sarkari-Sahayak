"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { saveUserProfile } from "@/services/auth-service";
import type { UserProfile } from "@/lib/types";

// ✅ Validation Schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z.string().regex(/^\d+$/, "Enter a valid age"),
  gender: z.enum(["Male", "Female", "Other"]),
  occupation: z.string().min(2, "Occupation is required"),
  income: z.string().regex(/^\d+$/, "Enter a valid income"),
  aadhaarLinked: z.boolean(),
});

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdate: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
}

export default function ProfileDialog({
  isOpen,
  onClose,
  onProfileUpdate,
  initialProfile,
}: ProfileDialogProps) {
  const { user } = useAuth(); // 🔥 logged-in user
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialProfile
      ? {
          ...initialProfile,
          aadhaarLinked: initialProfile.aadhaarLinked === "Yes",
        }
      : {
          name: "",
          age: "",
          gender: "Male",
          occupation: "",
          income: "",
          aadhaarLinked: false,
        },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    if (!user) return;

    setLoading(true);
    try {
      const updatedProfile: UserProfile = {
        ...values,
        aadhaarLinked: values.aadhaarLinked ? "Yes" : "No",
      };

      // 🔥 Save to Firestore
      await saveUserProfile(user.uid, updatedProfile);

      // Update UI instantly
      onProfileUpdate(updatedProfile);

      onClose();
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Occupation */}
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your occupation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Income */}
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Income</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your income" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Aadhaar Linked */}
            <FormField
              control={form.control}
              name="aadhaarLinked"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-3">
                  <FormLabel>Aadhaar Linked</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit */}
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
