import Button from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import { ArrowRight, Calendar, TrendingUp, Star, Play, Search, BookOpen, Clock, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  centered?: boolean;
};

function FeatureCard({ title, description, icon: Icon, centered = false }: FeatureCardProps) {
  return (
    <div
      className={`flex flex-col bg-card p-8 rounded-xl border border-border w-full min-h-[200px] ${
        centered ? "items-center justify-center text-center" : ""
      }`}
    >
      <Icon className="w-12 h-12 mb-4 bg-primary/20 rounded-xl p-3 text-primary" />
      <h3 className={`text-primary-text font-bold mb-2 ${centered ? "" : "text-2xl"}`}>{title}</h3>
      <p className="text-muted-text text-sm">{description}</p>
    </div>
  );
}

const previewCardsText = [
  { id: 1, title: "Trending Now", description: "Stay updated with seasonal releases and hot picks.", icon: TrendingUp },
  { id: 2, title: "Rate & Review", description: "Share your opinions and discover ratings from others.", icon: Star },
  { id: 3, title: "Watch Trailers", description: "Get a sneak peek before you commit to a new series.", icon: Play },
];

const features = [
  { id: 1, title: "Advanced Search", description: "Stay updated with seasonal releases and hot picks.", icon: Search },
  { id: 2, title: "Smart Collections", description: "Share your opinions and discover ratings from others.", icon: BookOpen },
  { id: 3, title: "Rate & Review", description: "Get a sneak peek before you commit to a new series.", icon: Star },
  { id: 4, title: "Episode Tracking", description: "Get a sneak peek before you commit to a new series.", icon: Clock },
  { id: 5, title: "Watch Trailers", description: "Get a sneak peek before you commit to a new series.", icon: Play },
  { id: 6, title: "Community Insight", description: "Get a sneak peek before you commit to a new series.", icon: Users },
];

export default function Home() {
  return (
    <main>
      <section className="px-4 py-24 md:pt-40 pb-16 text-center text-primary-text">
        <div className="flex flex-col items-center max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold">
            Track Your <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-red-400">Favorite Show</span>
          </h1>
          <p className="text-lg md:text-2xl text-muted-text max-w-2xl mx-auto mt-6">
            Discover seasonal releases, build your watchlist, rate your favorites, and join a community of anime enthusiasts. All in one beautiful platform inspired by Japanese tradition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Button link="/dashboard" variant="primary" size="lg">Explore Now <ArrowRight /></Button>
            <Button variant="secondary" size="lg"><Calendar /> View Schedule</Button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {previewCardsText.map((card) => (
            <FeatureCard key={card.id} {...card} centered />
          ))}
        </div>
      </section>

      <section className="pt-16 pb-40 justify-items-center bg-secondary">
        <h1 className="text-primary-text text-center text-4xl md:text-6xl font-bold">
          Everything You Need
        </h1>
        <p className="text-lg md:text-2xl text-muted-text max-w-2xl mx-auto mt-4 mb-12 text-center">
          For anime fans, by anime fans.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto px-4">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </section>

      <section className="px-4 py-24">
        <div className="flex flex-col gap-8 md:flex-row mx-auto max-w-6xl">
          <div>
            <p className="text-primary text font-black mb-2">Complete Library</p>
            <h1 className="text-primary-text text-2xl font-medium md:text-4xl max-w-100 mb-2 text-left">
              Every <span className="font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-red-400">genre</span>, every <span className="font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-red-400">era</span>. All in one place.
            </h1>
            <p className="text-muted-text">
              Whether you're looking for the latest seasonal hits airing right now in Japan, or a nostalgic classic from the 90s, our deep index has you covered. Everything is meticulously organized with rich metadata and instant streaming availability.
            </p>
          </div>
          <div>
            <div className="bg-card p-8 rounded-xl border border-border w-full min-h-96">
              {/* TEMP PLACEHOLDER BEFORE IMAGE IS ADDED */}
            </div>
          </div>
        </div>
      </section>
      
      <section className = "px-4 py-12">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="text-primary-text text-4xl font-bold md:text-7xl mb-1 text-center">Ready to get started?</h1>
            <p className="text-muted-text text-center md:text-2xl">Join the community and start tracking your favorite shows today.</p>
            <Button variant="primary" size="lg">Get Started <ArrowRight /></Button>
          </div>
      </section>
      
      <Footer />
    </main>
  );
}
