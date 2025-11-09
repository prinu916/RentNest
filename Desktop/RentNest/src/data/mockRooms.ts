import room1 from "@/assets/room-1.jpg";
import room2 from "@/assets/room-2.jpg";
import room3 from "@/assets/room-3.jpg";
import room4 from "@/assets/room-4.jpg";
import room5 from "@/assets/room-5.jpg";
import room6 from "@/assets/room-6.jpg";

export interface Room {
  id: string;
  title: string;
  city: string;
  locality: string;
  rent: number;
  deposit: number;
  roomType: "Single" | "Double" | "Triple" | "Studio";
  amenities: string[];
  image: string;
  description: string;
  ownerName: string;
  ownerPhone: string;
  available: boolean;
  latitude: number;
  longitude: number;
}

export const mockRooms: Room[] = [
  {
    id: "1",
    title: "Cozy Single Room in Saket",
    city: "Delhi",
    locality: "Saket",
    rent: 12000,
    deposit: 24000,
    roomType: "Single",
    amenities: ["Wi-Fi", "AC", "Furnished", "Study Desk"],
    image: room1,
    description: "A peaceful single room with modern furniture, perfect for students and working professionals. Located in a safe neighborhood with easy access to metro.",
    ownerName: "Rajesh Kumar",
    ownerPhone: "+91 98765 43210",
    available: true,
    latitude: 28.5244,
    longitude: 77.2066,
  },
  {
    id: "2",
    title: "Bright Shared Room for Students",
    city: "Delhi",
    locality: "Laxmi Nagar",
    rent: 7000,
    deposit: 14000,
    roomType: "Double",
    amenities: ["Wi-Fi", "Kitchen", "Parking"],
    image: room2,
    description: "Spacious double sharing room with natural light and modern amenities. Ideal for students looking for affordable accommodation.",
    ownerName: "Priya Sharma",
    ownerPhone: "+91 98765 43211",
    available: true,
    latitude: 28.6304,
    longitude: 77.2773,
  },
  {
    id: "3",
    title: "Premium Studio Apartment",
    city: "Chandigarh",
    locality: "Sector 17",
    rent: 18000,
    deposit: 36000,
    roomType: "Studio",
    amenities: ["Wi-Fi", "AC", "Kitchen", "Furnished", "Balcony"],
    image: room3,
    description: "Modern studio apartment with kitchenette, perfect for professionals. Located in the heart of Chandigarh with excellent connectivity.",
    ownerName: "Amit Singh",
    ownerPhone: "+91 98765 43212",
    available: true,
    latitude: 30.7333,
    longitude: 76.7794,
  },
  {
    id: "4",
    title: "Furnished Room with Balcony",
    city: "Haryana",
    locality: "Gurgaon - DLF Phase 2",
    rent: 15000,
    deposit: 30000,
    roomType: "Single",
    amenities: ["Wi-Fi", "AC", "Furnished", "Balcony", "Parking"],
    image: room4,
    description: "Premium single room with attached balcony, AC, and modern furnishing. Close to IT parks and shopping centers.",
    ownerName: "Neha Gupta",
    ownerPhone: "+91 98765 43213",
    available: true,
    latitude: 28.4720,
    longitude: 77.1031,
  },
  {
    id: "5",
    title: "Budget Triple Sharing Room",
    city: "Delhi",
    locality: "Rohini",
    rent: 5500,
    deposit: 11000,
    roomType: "Triple",
    amenities: ["Wi-Fi", "Kitchen", "Locker"],
    image: room5,
    description: "Affordable triple sharing room with individual lockers and shared kitchen facilities. Perfect for students on a budget.",
    ownerName: "Vikram Yadav",
    ownerPhone: "+91 98765 43214",
    available: true,
    latitude: 28.7383,
    longitude: 77.0822,
  },
  {
    id: "6",
    title: "Luxury Private Room with Bathroom",
    city: "Chandigarh",
    locality: "Sector 35",
    rent: 20000,
    deposit: 40000,
    roomType: "Single",
    amenities: ["Wi-Fi", "AC", "Furnished", "Private Bathroom", "Parking"],
    image: room6,
    description: "Elegant private room with attached bathroom and premium amenities. Ideal for professionals seeking comfort and privacy.",
    ownerName: "Kavita Mehta",
    ownerPhone: "+91 98765 43215",
    available: true,
    latitude: 30.7225,
    longitude: 76.7617,
  },
];
