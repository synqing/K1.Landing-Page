import Hero from '@/components/Hero'
import HardwareShowcase from '@/components/HardwareShowcase'
import VisionSticky from '@/components/VisionSticky'
import PricingScarcity from '@/components/PricingScarcity'
import WhoIsThisFor from '@/components/WhoIsThisFor'
import FAQ from '@/components/FAQ'
import Community from '@/components/Community'
import Footer from '@/components/Footer'
import AnalyticsClient from '@/components/AnalyticsClient'

/**
 * The main page component for the application's root route.
 *
 * This component assembles the various sections of the landing page,
 * including the Hero, Hardware Showcase, FAQ, and Footer. It also
 * includes the `AnalyticsClient` component to enable tracking.
 *
 * @returns {JSX.Element} The rendered main page.
 */
export default function Page() {
  return (
    <main className="bg-flow">
      <AnalyticsClient />
      <Hero />
      <HardwareShowcase />
      <VisionSticky />
      <Community />
      <WhoIsThisFor />
      <PricingScarcity />
      <FAQ />
      <Footer />
    </main>
  )
}
