import { Suspense, lazy } from "react"
import Header from "../components/Header/Header"
import HeroSection from "../components/HeroSection/HeroSection"
import AIToolsShowcase from "../components/AIToolsShowcase/AIToolsShowcase"
import HoverSidebar from "../components/HoverSidebar/HoverSidebar"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"

const FeaturesSection = lazy(() => import("../components/FeaturesSection/FeaturesSection"))
const PricingSection = lazy(() => import("../components/PricingSection/PricingSection"))
const DemoSection = lazy(() => import("../components/DemoSection/DemoSection"))
const TestimonialsSection = lazy(() => import("../components/TestimonialsSection/TestimonialsSection"))
const FAQSection = lazy(() => import("../components/FAQSection/FAQSection"))
const Footer = lazy(() => import("../components/Footer/Footer"))

  const HomePage =()=>{
  return (
    <div className="homepage">
      <Header />
      <HeroSection />
      <AIToolsShowcase />

      <Suspense fallback={<LoadingSpinner />}>
        <FeaturesSection />
        <PricingSection />
        <DemoSection />
        <TestimonialsSection />
        <FAQSection />
        <Footer />
      </Suspense>

      <HoverSidebar />
    </div>
  )
}

export default HomePage
