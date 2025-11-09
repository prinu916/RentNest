import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyRentNest from "@/components/WhyRentNest";
import HowItWorks from "@/components/HowItWorks";
import UpcomingFeatures from "@/components/UpcomingFeatures";
import MissionSection from "@/components/MissionSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyRentNest />
      <HowItWorks />
      <UpcomingFeatures />
      <MissionSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
