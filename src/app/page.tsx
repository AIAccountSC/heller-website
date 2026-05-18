'use client'
import dynamic from 'next/dynamic'

// All components loaded dynamically with ssr:false to avoid window/IntersectionObserver SSR issues
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false })
const Header = dynamic(() => import('@/components/Header'), { ssr: false })
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false })
const Marquee = dynamic(() => import('@/components/Marquee'), { ssr: false })
const TrustBar = dynamic(() => import('@/components/TrustBar'), { ssr: false })
const Problem = dynamic(() => import('@/components/Problem'), { ssr: false })
const BeforeAfter = dynamic(() => import('@/components/BeforeAfter'), { ssr: false })
const BigNumbers = dynamic(() => import('@/components/BigNumbers'), { ssr: false })
const Audience = dynamic(() => import('@/components/Audience'), { ssr: false })
const Benefits = dynamic(() => import('@/components/Benefits'), { ssr: false })
const Comparison = dynamic(() => import('@/components/Comparison'), { ssr: false })
const Showcase = dynamic(() => import('@/components/Showcase'), { ssr: false })
const Process = dynamic(() => import('@/components/Process'), { ssr: false })
const AIDemo = dynamic(() => import('@/components/AIDemo'), { ssr: false })
const Portfolio = dynamic(() => import('@/components/Portfolio'), { ssr: false })
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false })
const Pricing = dynamic(() => import('@/components/Pricing'), { ssr: false })
const FAQ = dynamic(() => import('@/components/FAQ'), { ssr: false })
const FinalCTA = dynamic(() => import('@/components/FinalCTA'), { ssr: false })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false })
const RevealInit = dynamic(() => import('@/components/RevealInit'), { ssr: false })

export default function Page() {
  return (
    <>
      <a href="#main-content" className="skip-link">Zum Hauptinhalt springen</a>
      <RevealInit />
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <Hero />
        <Marquee />
        <TrustBar />
        <Problem />
        <BeforeAfter />
        <BigNumbers />
        <Audience />
        <Benefits />
        <Comparison />
        <Showcase />
        <Process />
        <AIDemo />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
