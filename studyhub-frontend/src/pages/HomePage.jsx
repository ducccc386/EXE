import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection         from "../components/sections/HeroSection";
import StatsSection        from "../components/sections/StatsSection";
import BenefitsSection     from "../components/sections/BenefitsSection";
import ScheduleSection     from "../components/sections/ScheduleSection";
import SubjectsSection     from "../components/sections/SubjectsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <BenefitsSection />
      <ScheduleSection />
      <SubjectsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
