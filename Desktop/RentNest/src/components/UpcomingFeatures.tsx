import {
  LogIn,
  PlusCircle,
  Filter,
  Heart,
  MessageCircle,
  Map,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { useState } from "react";
import { toast } from "sonner";

const implementedFeatures = [
  { icon: LogIn, label: "Login / Signup" },
  { icon: Filter, label: "Advanced Filters" },
  { icon: Heart, label: "Save & Favorite Rooms" },
  { icon: MessageCircle, label: "Chat with Owners" },
  { icon: PlusCircle, label: "Post Your Property" },
  { icon: Map, label: "Map-Based Search" },
  { icon: Sparkles, label: "AI Recommendations" },
];

const upcomingFeatures = [
  // Add new upcoming features here
];

const UpcomingFeatures = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleFeatureClick = (feature: typeof implementedFeatures[0]) => {
    switch (feature.label) {
      case "Login / Signup":
        setShowAuthModal(true);
        break;
      case "Advanced Filters":
        navigate("/search");
        break;
      case "Save & Favorite Rooms":
        navigate("/search");
        break;
      case "Chat with Owners":
        navigate("/room/1"); // Navigate to first room as example
        break;
      case "Post Your Property":
        if (user) {
          navigate("/post-room");
        } else {
          setShowAuthModal(true);
        }
        break;
      case "Map-Based Search":
        navigate("/search");
        break;
      case "AI Recommendations":
        navigate("/recommendations");
        break;
      default:
        break;
    }
  };

  const handleUpcomingFeatureClick = (feature: typeof upcomingFeatures[0]) => {
    toast.info("This feature is coming soon!");
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Features & Roadmap
          </h2>
          <h3 className="text-2xl font-semibold text-center mb-8 text-green-600">
            ✅ Implemented Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {implementedFeatures.map((feature, index) => (
              <div
                key={index}
                onClick={() => handleFeatureClick(feature)}
                className="p-6 rounded-xl bg-green-50 border border-green-200 shadow-[var(--shadow-card)] flex flex-col items-center gap-3 text-center group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="p-4 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-green-600" />
                </div>
                <span className="font-medium text-sm">{feature.label}</span>
                <span className="text-xs text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Try it now →
                </span>
              </div>
            ))}
          </div>
        </div>

        {upcomingFeatures.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8">
              🚀 Coming Soon
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {upcomingFeatures.map((feature, index) => (
                <div
                  key={index}
                  onClick={() => handleUpcomingFeatureClick(feature)}
                  className="p-6 rounded-xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] hover:-translate-y-1 flex flex-col items-center gap-3 text-center group cursor-pointer"
                >
                  <div className="p-4 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <span className="font-medium text-sm">{feature.label}</span>
                  <span className="text-xs text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                    Coming soon →
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </section>
  );
};

export default UpcomingFeatures;
