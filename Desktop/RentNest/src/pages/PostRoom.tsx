import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AuthModal } from "@/components/AuthModal";
import { PlusCircle, Upload } from "lucide-react";

const postRoomSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  city: z.string().min(1, "City is required"),
  locality: z.string().min(1, "Locality is required"),
  rent: z.number().min(1000, "Rent must be at least ₹1000"),
  deposit: z.number().min(0, "Deposit must be at least ₹0"),
  roomType: z.enum(["Single", "Double", "Triple", "Studio"]),
  amenities: z.array(z.string()).min(1, "Select at least one amenity"),
  image: z.string().optional(),
});

type PostRoomForm = z.infer<typeof postRoomSchema>;

const PostRoom = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostRoomForm>({
    resolver: zodResolver(postRoomSchema),
    defaultValues: {
      amenities: [],
    },
  });

  const selectedAmenities = watch("amenities") || [];

  const allAmenities = [
    "Wi-Fi",
    "AC",
    "Furnished",
    "Kitchen",
    "Parking",
    "Balcony",
    "Study Desk",
    "Private Bathroom",
    "Locker",
  ];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const current = selectedAmenities;
    if (checked) {
      setValue("amenities", [...current, amenity]);
    } else {
      setValue("amenities", current.filter((a) => a !== amenity));
    }
  };

  const onSubmit = async (data: PostRoomForm) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create new room object
      const newRoom = {
        id: Date.now().toString(),
        ...data,
        ownerName: user.name,
        ownerPhone: user.email, // Using email as phone for demo
        available: true,
        image: data.image || "/placeholder.svg", // Default image
      };

      // Store in localStorage (in real app, this would be an API call)
      const existingRooms = JSON.parse(localStorage.getItem("postedRooms") || "[]");
      const updatedRooms = [...existingRooms, newRoom];
      localStorage.setItem("postedRooms", JSON.stringify(updatedRooms));

      toast.success("Room posted successfully!");
      navigate("/search");
    } catch (error) {
      toast.error("Failed to post room. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Login Required</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p>You need to be logged in to post a room.</p>
              <AuthModal
                open={showAuthModal}
                onOpenChange={setShowAuthModal}
                trigger={
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Login to Post Room
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container px-4 mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Post Your Room
            </h1>
            <p className="text-xl text-muted-foreground">
              Share your room details and find the perfect tenant
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Cozy Single Room in Saket"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="roomType">Room Type *</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("roomType", value as any)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Double">Double</SelectItem>
                        <SelectItem value="Triple">Triple</SelectItem>
                        <SelectItem value="Studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.roomType && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.roomType.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="e.g., Delhi"
                      {...register("city")}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="locality">Locality *</Label>
                    <Input
                      id="locality"
                      placeholder="e.g., Saket"
                      {...register("locality")}
                    />
                    {errors.locality && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.locality.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rent">Monthly Rent (₹) *</Label>
                    <Input
                      id="rent"
                      type="number"
                      placeholder="e.g., 12000"
                      {...register("rent", { valueAsNumber: true })}
                    />
                    {errors.rent && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.rent.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="deposit">Security Deposit (₹) *</Label>
                    <Input
                      id="deposit"
                      type="number"
                      placeholder="e.g., 24000"
                      {...register("deposit", { valueAsNumber: true })}
                    />
                    {errors.deposit && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.deposit.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your room, amenities, and any additional information..."
                    rows={4}
                    {...register("description")}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Amenities *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {allAmenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={(checked) =>
                            handleAmenityChange(amenity, checked as boolean)
                          }
                        />
                        <Label htmlFor={amenity} className="text-sm">
                          {amenity}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.amenities && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.amenities.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="image">Image URL (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image"
                      placeholder="https://example.com/image.jpg"
                      {...register("image")}
                    />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Leave empty to use default image
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Posting Room..." : "Post Room"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  );
};

export default PostRoom;
