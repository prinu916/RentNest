import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { useState } from "react";
import heroImage from "@/assets/hero-room.jpg";

const HeroSection = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  const handlePostProperty = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      navigate('/post-room');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium">
            <Home className="h-4 w-4" />
            Find Your Perfect Space
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Find a Place You'll Love to Call{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Home
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover cozy rooms, friendly spaces, and affordable stays near you. Because home isn't just a room — it's comfort, connection, and peace of mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild variant="hero" size="lg" className="text-lg">
              <Link to="/search">
                <Search className="mr-2 h-5 w-5" />
                Find a Room
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="text-lg"
              onClick={handlePostProperty}
            >
              Post Your Property
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Currently serving <span className="font-semibold text-foreground">Delhi, Chandigarh & Haryana</span> — more cities coming soon
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
