
import Navbar from "@/components/ui/Navbar";
import Hero from '@/components/ui/Hero';
import LogoSlider from "@/components/ui/Slides";
import BroadcastFeature from "@/components/ui/Feature";
import ChatbotFeature from "@/components/ui/Chatbot";
import CTASection from "@/components/ui/Cta";
import Footer from "@/components/ui/Footer";
import BusinessAnalyticsFeature from "@/components/ui/Analytics";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <LogoSlider />
      
      <BroadcastFeature />
      <BusinessAnalyticsFeature />
      <ChatbotFeature />
      <CTASection />
      <Footer />
    </div>
  );
}
