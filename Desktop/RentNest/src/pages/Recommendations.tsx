import { useMemo, useState } from "react";
import { mockRooms, Room } from "@/data/mockRooms";
import { useFavorites } from "@/contexts/FavoritesContext";
import RoomCard from "@/components/RoomCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, TrendingUp, Users, MapPin, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Recommendations = () => {
  const { favorites } = useFavorites();
  const [recommendationType, setRecommendationType] = useState<'personalized' | 'trending' | 'budget' | 'luxury'>('personalized');

  const recommendedRooms = useMemo(() => {
    if (favorites.length === 0) {
      // Enhanced fallback recommendations based on type
      switch (recommendationType) {
        case 'trending':
          return mockRooms
            .sort((a, b) => b.rent - a.rent)
            .slice(0, 6);
        case 'budget':
          return mockRooms
            .filter(room => room.rent <= 10000)
            .sort((a, b) => a.rent - b.rent)
            .slice(0, 6);
        case 'luxury':
          return mockRooms
            .filter(room => room.rent >= 15000)
            .sort((a, b) => b.rent - a.rent)
            .slice(0, 6);
        default:
          return mockRooms
            .sort((a, b) => b.rent - a.rent)
            .slice(0, 6);
      }
    }

    // Get favorite rooms
    const favoriteRooms = mockRooms.filter(room => favorites.includes(room.id));

    // Enhanced similarity scoring algorithm
    const recommendations = mockRooms
      .filter(room => !favorites.includes(room.id)) // Exclude already favorited
      .map(room => {
        let score = 0;
        let reasons: string[] = [];

        // Same city +2 (increased weight)
        if (favoriteRooms.some(fav => fav.city === room.city)) {
          score += 2;
          reasons.push("Same city");
        }

        // Same room type +2 (increased weight)
        if (favoriteRooms.some(fav => fav.roomType === room.roomType)) {
          score += 2;
          reasons.push("Same room type");
        }

        // Shared amenities +0.8 per shared amenity (increased weight)
        const sharedAmenities = favoriteRooms.flatMap(fav => fav.amenities).filter(amenity =>
          room.amenities.includes(amenity)
        );
        score += sharedAmenities.length * 0.8;
        if (sharedAmenities.length > 0) {
          reasons.push(`${sharedAmenities.length} shared amenities`);
        }

        // Similar rent range (within 25% of average favorite rent) +1
        const avgFavoriteRent = favoriteRooms.reduce((sum, fav) => sum + fav.rent, 0) / favoriteRooms.length;
        if (Math.abs(room.rent - avgFavoriteRent) / avgFavoriteRent <= 0.25) {
          score += 1;
          reasons.push("Similar price range");
        }

        // Location proximity bonus (Delhi NCR rooms get slight boost if user likes Delhi)
        if (favoriteRooms.some(fav => fav.city === "Delhi") &&
            (room.city === "Delhi" || room.city === "Haryana")) {
          score += 0.5;
          reasons.push("Nearby location");
        }

        // Room availability bonus
        if (room.available) {
          score += 0.3;
        }

        return { room, score, reasons };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item);

    return recommendations;
  }, [favorites, recommendationType]);

  const getRecommendationStats = () => {
    if (favorites.length === 0) return null;

    const favoriteRooms = mockRooms.filter(room => favorites.includes(room.id));
    const avgRent = favoriteRooms.reduce((sum, room) => sum + room.rent, 0) / favoriteRooms.length;
    const preferredCities = [...new Set(favoriteRooms.map(room => room.city))];
    const preferredTypes = [...new Set(favoriteRooms.map(room => room.roomType))];

    return { avgRent, preferredCities, preferredTypes };
  };

  const stats = getRecommendationStats();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 mx-auto">
            {/* User Stats Section */}
            {stats && (
              <div className="mb-8">
                <div className="bg-card rounded-2xl p-6 shadow-[var(--shadow-card)]">
                  <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    Your Preferences
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Budget</p>
                        <p className="font-semibold">₹{Math.round(stats.avgRent)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Preferred Cities</p>
                        <p className="font-semibold">{stats.preferredCities.join(", ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Room Types</p>
                        <p className="font-semibold">{stats.preferredTypes.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendation Type Selector */}
            {favorites.length === 0 && (
              <div className="mb-8">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Button
                    variant={recommendationType === 'personalized' ? 'default' : 'outline'}
                    onClick={() => setRecommendationType('personalized')}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Popular
                  </Button>
                  <Button
                    variant={recommendationType === 'trending' ? 'default' : 'outline'}
                    onClick={() => setRecommendationType('trending')}
                    className="flex items-center gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Trending
                  </Button>
                  <Button
                    variant={recommendationType === 'budget' ? 'default' : 'outline'}
                    onClick={() => setRecommendationType('budget')}
                    className="flex items-center gap-2"
                  >
                    <DollarSign className="h-4 w-4" />
                    Budget
                  </Button>
                  <Button
                    variant={recommendationType === 'luxury' ? 'default' : 'outline'}
                    onClick={() => setRecommendationType('luxury')}
                    className="flex items-center gap-2"
                  >
                    <Star className="h-4 w-4" />
                    Luxury
                  </Button>
                </div>
              </div>
            )}

            <div className="text-center mb-8">
              <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI-Powered Recommendations
              </h1>
              <p className="text-xl text-muted-foreground">
                {favorites.length > 0
                  ? "Based on your favorites, here are rooms you might like"
                  : `Discover ${recommendationType} rooms that match common preferences`
                }
              </p>
            </div>

            {recommendedRooms.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedRooms.map((item) => {
                  const room = favorites.length > 0 ? item.room : item;
                  const reasons = favorites.length > 0 ? item.reasons : [];

                  return (
                    <div key={room.id} className="relative">
                      <RoomCard room={room} />
                      {reasons && reasons.length > 0 && (
                        <div className="absolute top-2 right-2 z-10">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                            {reasons.length} match{reasons.length > 1 ? 'es' : ''}
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No recommendations available</h3>
                <p className="text-muted-foreground">
                  Try adding some rooms to your favorites to get personalized recommendations
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Recommendations;
