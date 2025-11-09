import { Button } from "@/components/ui/button";
import { Search, Home } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-secondary text-primary-foreground">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Home className="h-16 w-16 mx-auto opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Find Your Next Space?
          </h2>
          <p className="text-xl md:text-2xl opacity-90">
            Let's help you move into a room that feels like home.
          </p>
          <div className="pt-4">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg shadow-2xl hover:scale-105 transition-[var(--transition-smooth)]"
            >
              <Link to="/search">
                <Search className="mr-2 h-5 w-5" />
                Search Rooms Now
              </Link>
            </Button>
          </div>
          <p className="text-sm opacity-75">
            RentNest — Find Your Space, Live Your Story. 🏠✨
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
