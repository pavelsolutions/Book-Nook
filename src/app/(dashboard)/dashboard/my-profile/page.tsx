"use client";

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Check,
  Edit3,
  Mail,
  MapPin,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProfileForm = {
  name: string;
  email: string;
  image: string;
  bio: string;
  phone: string;
  location: string;
};

const initialFormData: ProfileForm = {
  name: "",
  email: "",
  image: "",
  bio: "",
  phone: "",
  location: "",
};

export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] =
    useState<ProfileForm>(initialFormData);

  useEffect(() => {
    if (!user) return;

    setFormData((previous) => ({
      ...previous,
      name: user.name ?? "",
      email: user.email ?? "",
      image: user.image ?? "",
    }));
  }, [user]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData((previous) => ({
      ...previous,
      name: user?.name ?? "",
      email: user?.email ?? "",
      image: user?.image ?? "",
    }));

    setIsEditing(false);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    setIsSaving(true);

    try {
      const result = await authClient.updateUser({
        name: formData.name.trim(),
        image: formData.image.trim() || null,
      });

      if (result.error) {
        toast.error(result.error.message || "Profile update failed.");
        return;
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#E5F6F8] dark:bg-[#071D2B]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#BDEAF0] border-t-[#0B6A80] dark:border-[#1E3A4A] dark:border-t-[#20B8C4]" />

          <p className="mt-4 text-sm text-[#55717D] dark:text-[#9FB4C2]">
            Loading your profile...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#E5F6F8] px-4 dark:bg-[#071D2B]">
        <Card className="w-full max-w-md rounded-3xl border border-[#D5E7EA] bg-white shadow-sm dark:border-[#1E3A4A] dark:bg-[#102A3A]">
          <CardContent className="p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5F6F8] dark:bg-[#103746]">
              <UserRound className="h-7 w-7 text-[#0B6A80] dark:text-[#20B8C4]" />
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#0B3347] dark:text-[#E6F0F5]">
              Login Required
            </h2>

            <p className="mt-2 text-sm text-[#647985] dark:text-[#9FB4C2]">
              Please login to view and edit your profile.
            </p>

            <Link href="/sign-in">
              <Button className="mt-5 rounded-xl bg-[#0B6A80] text-white hover:bg-[#084F63] dark:bg-[#20B8C4] dark:text-[#071D2B] dark:hover:bg-[#42CBD4]">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  const avatarLetter =
    formData.name.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#E5F6F8] px-4 py-6 dark:bg-[#071D2B] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#55717D] transition hover:text-[#0B6A80] dark:text-[#9FB4C2] dark:hover:text-[#20B8C4]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-[#0B3347] dark:text-[#E6F0F5] sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-[#647985] dark:text-[#9FB4C2] sm:text-base">
              Manage your personal information.
            </p>
          </div>

          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="rounded-xl bg-[#0B6A80] px-5 text-white shadow-sm transition hover:bg-[#084F63] dark:bg-[#20B8C4] dark:text-[#071D2B] dark:hover:bg-[#42CBD4]"
            >
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Main Layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          {/* Profile Summary */}
          <Card className="overflow-hidden rounded-3xl border border-[#D5E7EA] bg-white shadow-[0_10px_30px_rgba(11,51,71,0.07)] dark:border-[#1E3A4A] dark:bg-[#102A3A]">
            {/* Cover */}
            <div className="relative h-24 overflow-hidden bg-gradient-to-r from-[#0B3347] via-[#0B6A80] to-[#13A8B8] dark:from-[#071D2B] dark:via-[#103746] dark:to-[#20B8C4]">
              <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-white/10" />
              <div className="absolute -bottom-16 left-8 h-36 w-36 rounded-full bg-[#BDEAF0]/10" />
            </div>

            <CardContent className="px-6 pb-6">
              {/* Avatar */}
              <div className="-mt-12 flex justify-center">
                <div className="relative">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt={formData.name || "Profile photo"}
                      className="h-24 w-24 rounded-full border-4 border-white bg-[#E5F6F8] object-cover shadow-md dark:border-[#102A3A] dark:bg-[#071D2B]"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#D5F1F4] text-3xl font-bold text-[#0B6A80] shadow-md dark:border-[#102A3A] dark:bg-[#103746] dark:text-[#20B8C4]">
                      {avatarLetter}
                    </div>
                  )}

                  {isEditing && (
                    <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#13A8B8] text-white dark:border-[#102A3A] dark:bg-[#20B8C4] dark:text-[#071D2B]">
                      <Camera className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>

              {/* User Details */}
              <div className="mt-4 text-center">
                <h2 className="break-words text-xl font-bold text-[#0B3347] dark:text-[#E6F0F5]">
                  {formData.name || "Your Name"}
                </h2>

                <p className="mt-1 break-all text-sm text-[#647985] dark:text-[#9FB4C2]">
                  {formData.email}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#E5F6F8] px-3 py-1.5 text-xs font-semibold text-[#0B6A80] dark:bg-[#103746] dark:text-[#20B8C4]">
                  <span className="h-2 w-2 rounded-full bg-[#13A8B8] dark:bg-[#20B8C4]" />
                  BookNook Member
                </div>
              </div>

              {/* About */}
              <div className="mt-6 border-t border-[#DDECEF] pt-5 dark:border-[#1E3A4A]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#78909C] dark:text-[#9FB4C2]">
                  About Me
                </p>

                <p className="mt-2 text-sm leading-6 text-[#526B78] dark:text-[#B6C7D2]">
                  {formData.bio || "Add a short bio about yourself."}
                </p>
              </div>

              {/* Contact Details */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#526B78] dark:text-[#B6C7D2]">
                  <Mail className="h-4 w-4 shrink-0 text-[#0B6A80] dark:text-[#20B8C4]" />
                  <span className="break-all">{formData.email}</span>
                </div>

                {formData.phone && (
                  <div className="flex items-center gap-3 text-sm text-[#526B78] dark:text-[#B6C7D2]">
                    <Phone className="h-4 w-4 shrink-0 text-[#0B6A80] dark:text-[#20B8C4]" />
                    {formData.phone}
                  </div>
                )}

                {formData.location && (
                  <div className="flex items-center gap-3 text-sm text-[#526B78] dark:text-[#B6C7D2]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#0B6A80] dark:text-[#20B8C4]" />
                    {formData.location}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="rounded-3xl border border-[#D5E7EA] bg-white shadow-[0_10px_30px_rgba(11,51,71,0.07)] dark:border-[#1E3A4A] dark:bg-[#102A3A]">
            <CardHeader className="border-b border-[#DDECEF] px-6 py-5 dark:border-[#1E3A4A] sm:px-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-bold text-[#0B3347] dark:text-[#E6F0F5]">
                    Personal Information
                  </CardTitle>

                  <CardDescription className="mt-1 text-[#78909C] dark:text-[#9FB4C2]">
                    {isEditing
                      ? "Edit your profile details below."
                      : "Your profile details are shown here."}
                  </CardDescription>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E5F6F8] dark:bg-[#103746]">
                  <UserRound className="h-5 w-5 text-[#0B6A80] dark:text-[#20B8C4]" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 py-6 sm:px-8">
              <form onSubmit={handleSave} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-[#294B5C] dark:text-[#D3E0E8]"
                  >
                    Full Name
                  </Label>

                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    placeholder="Enter your full name"
                    className="h-11 rounded-xl border-[#D5E7EA] focus-visible:border-[#13A8B8] focus-visible:ring-[#13A8B8]/20 disabled:bg-[#F5FAFA] disabled:text-[#78909C] dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E6F0F5] dark:placeholder:text-[#78909C] dark:disabled:bg-[#0B2635] dark:disabled:text-[#9FB4C2]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-[#294B5C] dark:text-[#D3E0E8]"
                  >
                    Email Address
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="h-11 rounded-xl border-[#D5E7EA] bg-[#F5FAFA] text-[#78909C] dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#9FB4C2]"
                  />

                  <p className="text-xs text-[#78909C] dark:text-[#9FB4C2]">
                    Your login email cannot be changed here.
                  </p>
                </div>

                {/* Profile Photo URL */}
                <div className="space-y-2">
                  <Label
                    htmlFor="image"
                    className="text-sm font-semibold text-[#294B5C] dark:text-[#D3E0E8]"
                  >
                    Profile Photo URL
                  </Label>

                  <Input
                    id="image"
                    name="image"
                    type="url"
                    value={formData.image}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="https://example.com/photo.jpg"
                    className="h-11 rounded-xl border-[#D5E7EA] focus-visible:border-[#13A8B8] focus-visible:ring-[#13A8B8]/20 disabled:bg-[#F5FAFA] dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E6F0F5] dark:placeholder:text-[#78909C] dark:disabled:bg-[#0B2635]"
                  />

                  <p className="text-xs text-[#78909C] dark:text-[#9FB4C2]">
                    Paste an image URL to change your profile picture.
                  </p>
                </div>

                {/* About Me */}
                <div className="space-y-2">
                  <Label
                    htmlFor="bio"
                    className="text-sm font-semibold text-[#294B5C] dark:text-[#D3E0E8]"
                  >
                    About Me
                  </Label>

                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Write something about yourself..."
                    rows={3}
                    className="resize-none rounded-xl border-[#D5E7EA] focus-visible:border-[#13A8B8] focus-visible:ring-[#13A8B8]/20 disabled:bg-[#F5FAFA] dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E6F0F5] dark:placeholder:text-[#78909C] dark:disabled:bg-[#0B2635]"
                  />
                </div>

                {/* Phone and Location */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-semibold text-[#294B5C] dark:text-[#D3E0E8]"
                    >
                      Phone Number
                    </Label>

                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter phone number"
                      className="h-11 rounded-xl border-[#D5E7EA] focus-visible:border-[#13A8B8] focus-visible:ring-[#13A8B8]/20 disabled:bg-[#F5FAFA] dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E6F0F5] dark:placeholder:text-[#78909C] dark:disabled:bg-[#0B2635]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="text-sm font-semibold text-[#294B5C] dark:text-[#D3E0E8]"
                    >
                      Location
                    </Label>

                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="City, Country"
                      className="h-11 rounded-xl border-[#D5E7EA] focus-visible:border-[#13A8B8] focus-visible:ring-[#13A8B8]/20 disabled:bg-[#F5FAFA] dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#E6F0F5] dark:placeholder:text-[#78909C] dark:disabled:bg-[#0B2635]"
                    />
                  </div>
                </div>

                {/* Save and Cancel */}
                {isEditing && (
                  <div className="flex flex-col-reverse gap-3 border-t border-[#DDECEF] pt-5 dark:border-[#1E3A4A] sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="h-11 rounded-xl border-[#D5E7EA] px-5 text-[#294B5C] hover:bg-[#F5FAFA] dark:border-[#1E3A4A] dark:bg-[#0B2635] dark:text-[#D3E0E8] dark:hover:bg-[#1E3A4A]"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="h-11 rounded-xl bg-[#0B6A80] px-5 text-white hover:bg-[#084F63] dark:bg-[#20B8C4] dark:text-[#071D2B] dark:hover:bg-[#42CBD4]"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}