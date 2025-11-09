import { useParams, Link } from "react-router-dom";
import { mockRooms } from "@/data/mockRooms";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChatWithOwner } from "@/components/ChatWithOwner";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  IndianRupee,
  User,
  Phone,
  CheckCircle2,
  ArrowLeft,
  Home,
} from "lucide-react";

const RoomDetails = () => {
  const { id } = useParams();
  const room = mockRooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Room Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The room you're looking for doesn't exist
            </p>
            <Button asChild>
              <Link to="/search">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 mx-auto">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/search">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Link>
          </Button>

          <ChatWithOwner ownerName={room.ownerName} roomTitle={room.title} />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-[500px] object-cover"
                />
              </div>

              <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                      {room.title}
                    </h1>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-5 w-5 mr-2" />
                      {room.locality}, {room.city}
                    </div>
                  </div>
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium">
                    {room.roomType}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 py-6 border-t border-b">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Monthly Rent
                    </div>
                    <div className="flex items-center text-3xl font-bold text-primary">
                      <IndianRupee className="h-6 w-6" />
                      {room.rent.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Security Deposit
                    </div>
                    <div className="flex items-center text-3xl font-bold">
                      <IndianRupee className="h-6 w-6" />
                      {room.deposit.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-2xl font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div className="mt-8">
                  <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {room.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <CheckCircle2 className="h-5 w-5 text-secondary" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] sticky top-24">
                <h3 className="text-2xl font-semibold mb-6">Contact Owner</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Owner</div>
                      <div className="font-semibold">{room.ownerName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="p-2 bg-secondary/10 rounded-full">
                      <Phone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="font-semibold">{room.ownerPhone}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full"
                    size="lg"
                    variant="default"
                  >
                    <a href={`tel:${room.ownerPhone}`}>
                      <Phone className="mr-2 h-5 w-5" />
                      Call Owner
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="w-full"
                    size="lg"
                    variant="secondary"
                  >
                    <a
                      href={`https://wa.me/${room.ownerPhone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                  <div className="flex items-center gap-2 text-secondary text-sm font-medium">
                    <CheckCircle2 className="h-5 w-5" />
                    This room is currently available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoomDetails;
