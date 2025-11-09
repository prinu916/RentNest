import { Search, Star, Home } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "1",
    title: "Search Rooms",
    description: "Find rooms near your destination with our easy search filters",
  },
  {
    icon: Star,
    number: "2",
    title: "Shortlist Favorites",
    description: "Select the spaces that match your needs and budget",
  },
  {
    icon: Home,
    number: "3",
    title: "Connect & Move In",
    description: "Reach out to owners and welcome to your new space!",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Your journey to finding the perfect room is just three simple steps away
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-secondary" />
              )}
              <div className="relative bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)]">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-2xl mb-6 shadow-[var(--shadow-soft)]">
                  {step.number}
                </div>
                <div className="mb-4">
                  <step.icon className="h-10 w-10 text-primary mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
