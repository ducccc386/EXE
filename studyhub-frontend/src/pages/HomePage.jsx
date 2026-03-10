import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import BenefitsSection from "../components/BenefitsSection";
import ScheduleSection from "../components/ScheduleSection";
import SubjectsSection from "../components/SubjectsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
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