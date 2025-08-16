'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { UserProfile } from '@/lib/types';
import {
  casteCategories,
  disabilityStatuses,
  educationLevels,
  genders,
  incomeLevels,
  indianStates,
  occupations,
} from '@/lib/data';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  age: z.coerce.number().min(1, 'Age is required.').max(120),
  gender: z.string().min(1, 'Gender is required.'),
  locationState: z.string().min(1, 'State is required.'),
  locationDistrict: z.string().min(1, 'District is required.'),
  incomeLevel: z.string().min(1, 'Income level is required.'),
  occupation: z.string().min(1, 'Occupation is required.'),
  educationLevel: z.string().min(1, 'Education level is required.'),
  casteCategory: z.string().min(1, 'Caste/Category is required.'),
  disabilityStatus: z.string().min(1, 'Disability status is required.'),
  aadhaarLinked: z.boolean(),
});

interface ProfileDialogProps {
  children: React.ReactNode;
  userProfile: UserProfile;
  onProfileUpdate: (newProfile: UserProfile) => void;
}

export default function ProfileDialog({ children, userProfile, onProfileUpdate }: ProfileDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...userProfile,
      aadhaarLinked: userProfile.aadhaarLinked === 'Yes',
    },
  });

  React.useEffect(() => {
    form.reset({
      ...userProfile,
      aadhaarLinked: userProfile.aadhaarLinked === 'Yes',
    });
  }, [userProfile, form]);

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    const updatedProfile: UserProfile = {
      ...values,
      aadhaarLinked: values.aadhaarLinked ? 'Yes' : 'No',
    };
    onProfileUpdate(updatedProfile);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Your Profile</DialogTitle>
          <DialogDescription>
            Keep your profile updated for the most accurate scheme recommendations.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea className="h-[60vh] pr-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genders.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="locationState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {indianStates.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <FormField
                  control={form.control}
                  name="locationDistrict"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mumbai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="incomeLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Income</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select income level" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {incomeLevels.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select occupation" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {occupations.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="educationLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education Level</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select education level" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {educationLevels.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <FormField
                  control={form.control}
                  name="casteCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caste/Category</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {casteCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="disabilityStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Disability Status</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {disabilityStatuses.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
                <FormField
                  control={form.control}
                  name="aadhaarLinked"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                         <FormLabel>Aadhaar Linked Bank Account?</FormLabel>
                      </div>
                      <FormControl>
                         <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
            </div>
            </ScrollArea>
            <DialogFooter className="pt-6">
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
