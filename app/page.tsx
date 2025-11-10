import Hero from '@/components/Hero'
import HardwareShowcase from '@/components/HardwareShowcase'
import VisionSticky from '@/components/VisionSticky'
import PricingScarcity from '@/components/PricingScarcity'
import FAQ from '@/components/FAQ'
import Community from '@/components/Community'
import Footer from '@/components/Footer'
import AnalyticsClient from '@/components/AnalyticsClient'

export default function Page() {
  return (
    <main className="bg-flow">
      <AnalyticsClient />
      <Hero />
      <HardwareShowcase />
      <VisionSticky />
      <PricingScarcity />
      <FAQ />
      <Community />
      <Footer />
    </main>
  )
}
