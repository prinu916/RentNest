import { CheckCircle2, Camera, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Real Photos",
    description: "Authentic pictures of actual rooms, no surprises",
  },
  {
    icon: CheckCircle2,
    title: "Honest Details",
    description: "Transparent information about every property",
  },
  {
    icon: Sparkles,
    title: "Budget-Friendly",
    description: "Affordable spaces that don't compromise on quality",
  },
  {
    icon: Shield,
    title: "No Stress",
    description: "Clear, simple process from search to move-in",
  },
];

const WhyRentNest = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Where Comfort Meets Affordability
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            RentNest helps you find rooms that feel welcoming, safe, and just right for you — whether you're a student, working professional, or moving to a new city for a fresh start.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)] hover:-translate-y-1 text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRentNest;
