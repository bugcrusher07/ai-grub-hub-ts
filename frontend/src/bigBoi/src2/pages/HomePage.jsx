import { Suspense, lazy } from "react"
import Header from "../components/Header/Header"
import HeroSection from "../components/HeroSection/HeroSection"
import AIToolsShowcase from "../components/AIToolsShowcase/AIToolsShowcase"
import HoverSidebar from "../components/HoverSidebar/HoverSidebar"
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner"
import { useAuth } from "../../../useAuth"
import { SignInPrompt } from "../../../signInPrompt"
import { useState } from "react"

const FeaturesSection = lazy(() => import("../components/FeaturesSection/FeaturesSection"))
const PricingSection = lazy(() => import("../components/PricingSection/PricingSection"))
const DemoSection = lazy(() => import("../components/DemoSection/DemoSection"))
const TestimonialsSection = lazy(() => import("../components/TestimonialsSection/TestimonialsSection"))
const FAQSection = lazy(() => import("../components/FAQSection/FAQSection"))
const Footer = lazy(() => import("../components/Footer/Footer"))

  const HomePage =()=>{
  const [showSignInPrompt,setShowSignInPrompt] = useState(true);
  const {user,loading,error,setError} = useAuth();
  return (
    <div className="homepage">
      {(showSignInPrompt)&&(loading===false) && ((error) || (!user)) &&<SignInPrompt isOpen={true} onClose={()=>{setShowSignInPrompt(false)}}/>}
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
