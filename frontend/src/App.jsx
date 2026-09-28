import Header from './components/Header.jsx'
import HeroSection from './components/HeroSection.jsx'
import VoucherBanner from './components/VoucherBanner.jsx'
// import TastingProfile from './components/TastingProfile.jsx'
import MenuSection from './components/MenuSection.jsx'
import PhilosophySection from './components/PhilosophySection.jsx'
import VisitSection from './components/VisitSection.jsx'
import Footer from './components/Footer.jsx'
import BottomNavBar from './components/BottomNavBar.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen bg-background pb-24 text-on-surface antialiased selection:bg-secondary-fixed selection:text-primary-container md:pb-0">
      <Header />
      <main>
        <HeroSection />
        <VoucherBanner />
        {/* <TastingProfile /> */}
        <MenuSection />
        <PhilosophySection />
        <VisitSection />
      </main>
      <Footer />
      <BottomNavBar />
    </div>
  )
}
