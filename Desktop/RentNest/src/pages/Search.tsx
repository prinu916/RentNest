import { useState } from "react";
import { mockRooms } from "@/data/mockRooms";
import RoomCard from "@/components/RoomCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Search as SearchIcon, SlidersHorizontal, ChevronDown, Map, List } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for room markers
const roomIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Search = () => {
  const [searchCity, setSearchCity] = useState("");
  const [searchLocality, setSearchLocality] = useState("");
  const [roomType, setRoomType] = useState<string>("all");
  const [maxBudget, setMaxBudget] = useState<string>("");
  const [minBudget, setMinBudget] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [gender, setGender] = useState<string>("all");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const allAmenities = ["Wi-Fi", "AC", "Furnished", "Kitchen", "Parking", "Balcony", "Study Desk", "Private Bathroom"];

  const filteredRooms = mockRooms.filter((room) => {
    const cityMatch = !searchCity || room.city.toLowerCase().includes(searchCity.toLowerCase());
    const localityMatch = !searchLocality || room.locality.toLowerCase().includes(searchLocality.toLowerCase());
    const typeMatch = roomType === "all" || room.roomType === roomType;
    const minBudgetMatch = !minBudget || room.rent >= parseInt(minBudget);
    const maxBudgetMatch = !maxBudget || room.rent <= parseInt(maxBudget);
    const amenitiesMatch = selectedAmenities.length === 0 || selectedAmenities.every(amenity => room.amenities.includes(amenity));
    // Mock gender filter - in real app, this would be stored in room data
    const genderMatch = gender === "all" || true; // Always match for now

    return cityMatch && localityMatch && typeMatch && minBudgetMatch && maxBudgetMatch && amenitiesMatch && genderMatch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-12 bg-gradient-to-b from-muted/30 to-background">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Search for Your Perfect Room
              </h1>
              <p className="text-xl text-muted-foreground">
                Find rooms by city, locality, budget & amenities
              </p>
            </div>

            <div className="max-w-5xl mx-auto bg-card shadow-[var(--shadow-card)] rounded-2xl p-6 mb-12">
              {/* View Toggle */}
              <div className="flex justify-center mb-6">
                <div className="flex bg-muted rounded-lg p-1">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="flex items-center gap-2"
                  >
                    <List className="h-4 w-4" />
                    List View
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                    className="flex items-center gap-2"
                  >
                    <Map className="h-4 w-4" />
                    Map View
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">City</label>
                  <Input
                    placeholder="e.g., Delhi"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Locality</label>
                  <Input
                    placeholder="e.g., Saket"
                    value={searchLocality}
                    onChange={(e) => setSearchLocality(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Room Type</label>
                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Double">Double</SelectItem>
                      <SelectItem value="Triple">Triple</SelectItem>
                      <SelectItem value="Studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Max Budget</label>
                  <Input
                    type="number"
                    placeholder="e.g., 15000"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                  />
                </div>
              </div>

              <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full mb-4">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Advanced Filters
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Min Budget</label>
                      <Input
                        type="number"
                        placeholder="e.g., 5000"
                        value={minBudget}
                        onChange={(e) => setMinBudget(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Gender Preference</label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Amenities</label>
                      <div className="grid grid-cols-2 gap-2">
                        {allAmenities.map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={amenity}
                              checked={selectedAmenities.includes(amenity)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedAmenities([...selectedAmenities, amenity]);
                                } else {
                                  setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                                }
                              }}
                            />
                            <label htmlFor={amenity} className="text-sm">{amenity}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div className="flex gap-2">
                <Button className="flex-1" size="lg">
                  <SearchIcon className="mr-2 h-5 w-5" />
                  Search
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setSearchCity("");
                    setSearchLocality("");
                    setRoomType("all");
                    setMaxBudget("");
                    setMinBudget("");
                    setSelectedAmenities([]);
                    setGender("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-muted-foreground">
                Found <span className="font-semibold text-foreground">{filteredRooms.length}</span> rooms
              </p>
            </div>

            {viewMode === "list" ? (
              filteredRooms.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <SlidersHorizontal className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">No rooms found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )
            ) : (
              <div className="h-[600px] rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
                <MapContainer
                  center={filteredRooms.length > 0 ? [filteredRooms[0].latitude, filteredRooms[0].longitude] : [28.6139, 77.2090]}
                  zoom={filteredRooms.length > 0 ? 12 : 10}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredRooms.map((room) => (
                    <Marker key={room.id} position={[room.latitude, room.longitude]} icon={roomIcon}>
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <h3 className="font-semibold text-sm mb-1">{room.title}</h3>
                          <p className="text-xs text-muted-foreground mb-1">{room.locality}, {room.city}</p>
                          <p className="text-xs font-medium mb-2">₹{room.rent}/month</p>
                          <div className="flex gap-1 mb-2">
                            <span className="text-xs bg-muted px-2 py-1 rounded">{room.roomType}</span>
                            <span className="text-xs bg-muted px-2 py-1 rounded">₹{room.deposit} deposit</span>
                          </div>
                          <Button size="sm" className="w-full text-xs" onClick={() => window.open(`/room/${room.id}`, '_blank')}>
                            View Details
                          </Button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
