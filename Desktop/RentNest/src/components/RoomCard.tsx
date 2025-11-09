import { Room } from "@/data/mockRooms";
import { Button } from "@/components/ui/button";
import { MapPin, IndianRupee, Users, Home, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const { user } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite(room.id)) {
      removeFromFavorites(room.id);
    } else {
      addToFavorites(room.id);
    }
  };

  return (
    <div className="group rounded-2xl overflow-hidden bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] hover:-translate-y-2">
      <Link to={`/room/${room.id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={room.image}
            alt={room.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {room.roomType}
          </div>
          {user && (
            <button
              onClick={handleFavoriteClick}
              className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${isFavorite(room.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
          )}
        </div>
      </Link>

      <div className="p-6 space-y-4">
        <div>
          <Link to={`/room/${room.id}`}>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {room.title}
            </h3>
          </Link>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {room.locality}, {room.city}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <div className="flex items-center text-2xl font-bold text-primary">
              <IndianRupee className="h-5 w-5" />
              {room.rent.toLocaleString()}
              <span className="text-sm text-muted-foreground font-normal ml-1">/mo</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Deposit: ₹{room.deposit.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        <Button asChild className="w-full" variant="default">
          <Link to={`/room/${room.id}`}>View Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default RoomCard;
