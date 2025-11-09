import { Home } from "lucide-react";

const MissionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Home className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Our Mission</h2>
          <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed">
            At RentNest, we believe{" "}
            <span className="text-foreground font-semibold">
              everyone deserves a safe and happy place to live.
            </span>
          </p>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A home where mornings feel lighter, nights feel calmer, and life feels easier.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
