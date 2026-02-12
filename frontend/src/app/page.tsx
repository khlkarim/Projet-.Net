import { ArrowRight, Clock, ShoppingBag, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FeaturedAnnouncements } from "~/app/_components/featured-announcements";
import { RecentReviews } from "~/app/_components/recent-reviews";
import { VehicleType } from "~/types/enums";
import { HeroBadge } from "~/ui/components/hero-badge";
import { Button } from "~/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/ui/primitives/card";

const vehicleTypeMeta: Record<
  keyof typeof VehicleType,
  { label: string; image: string }
> = {
  CONVERTIBLE: {
    label: "Convertible",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=60",
  },
  COUPE: {
    label: "Coupe",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&auto=format&fit=crop&q=60",
  },
  HATCHBACK: {
    label: "Hatchback",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&auto=format&fit=crop&q=60",
  },
  MOTORCYCLE: {
    label: "Motorcycle",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  SEDAN: {
    label: "Sedan",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&auto=format&fit=crop&q=60",
  },
  SUV: {
    label: "SUV",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=60",
  },
  TRUCK: {
    label: "Truck",
    image:
      "https://images.unsplash.com/photo-1597007030730-9d6a4c8b1e5f?w=800&auto=format&fit=crop&q=60",
  },
  VAN: {
    label: "Van",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228b0c1e?w=800&auto=format&fit=crop&q=60",
  },
  WAGON: {
    label: "Wagon",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800&auto=format&fit=crop&q=60",
  },
};

// Mocks for static sections
const featuresWhyChooseUs = [
  {
    description:
      "We verify every vehicle and seller to ensure a safe and trustworthy marketplace.",
    icon: <Star className="h-6 w-6 text-primary" />,
    title: "Verified Listings",
  },
  {
    description:
      "Our platform uses secure payment gateways to protect your financial information.",
    icon: <ShoppingBag className="h-6 w-6 text-primary" />,
    title: "Secure Transactions",
  },
  {
    description:
      "Our support team is available around the clock to assist with any inquiries.",
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "24/7 Support",
  },
  {
    description:
      "Wide range of vehicles from verified sellers at competitive market prices.",
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: "Best Value",
  },
];

export default function HomePage() {
  return (
    <>
      <main
        className={`
          flex min-h-screen flex-col gap-y-16 bg-gradient-to-b from-muted/50
          via-muted/25 to-background
        `}
      >
        {/* Hero Section */}
        <section
          className={`
            relative overflow-hidden py-24
            md:py-32
          `}
        >
          <div
            className={`
              bg-grid-black/[0.02] absolute inset-0
              bg-[length:20px_20px]
            `}
          />
          <div
            className={`
              relative z-10 container mx-auto max-w-7xl px-4
              sm:px-6
              lg:px-8
            `}
          >
            <div
              className={`
                grid items-center gap-10
                lg:grid-cols-2 lg:gap-12
              `}
            >
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1
                    className={`
                      font-display text-4xl leading-tight font-bold
                      tracking-tight text-foreground
                      sm:text-5xl
                      md:text-6xl
                      lg:leading-[1.1]
                    `}
                  >
                    Find Your Dream{" "}
                    <span
                      className={`
                        bg-gradient-to-r from-primary to-primary/70 bg-clip-text
                        text-transparent
                      `}
                    >
                      Ride Today
                    </span>
                  </h1>
                  <p
                    className={`
                      max-w-[700px] text-lg text-muted-foreground
                      md:text-xl
                    `}
                  >
                    Discover the best deals on cars, motorcycles, and more.
                    Verified sellers, transparent pricing, and secure transactions.
                  </p>
                </div>
                <div
                  className={`
                    flex flex-col gap-3
                    sm:flex-row
                  `}
                >
                  <Link href="/announcements">
                    <Button
                      className={`
                        h-12 gap-1.5 px-8 transition-colors duration-200
                      `}
                      size="lg"
                    >
                      Browse Announcements <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/account">
                    <Button
                      className="h-12 px-8 transition-colors duration-200"
                      size="lg"
                      variant="outline"
                    >
                      Make an Announcement
                    </Button>
                  </Link>
                </div>
              </div>
              <div
                className={`
                  relative mx-auto hidden aspect-square w-full max-w-md
                  overflow-hidden rounded-xl border shadow-lg
                  lg:block
                `}
              >
                <div
                  className={`
                    absolute inset-0 z-10 bg-gradient-to-tr from-primary/20
                    via-transparent to-transparent
                  `}
                />
                <Image
                  alt="Luxury Car"
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                />
              </div>
            </div>
          </div>
          <div
            className={`
              absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent
              via-primary/20 to-transparent
            `}
          />
        </section>

        {/* Featured Categories */}
        <section
          className={`
            py-12
            md:py-16
          `}
        >
          <div
            className={`
              container mx-auto max-w-7xl px-4
              sm:px-6
              lg:px-8
            `}
          >
            <div className="mb-8 flex flex-col items-center text-center">
              <h2
                className={`
                  font-display text-3xl leading-tight font-bold tracking-tight
                  md:text-4xl
                `}
              >
                Browse by Type
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p className="mt-4 max-w-2xl text-center text-muted-foreground">
                Find the perfect vehicle for your needs from our wide selection
              </p>
            </div>

            <div
              className="
    grid grid-cols-2 gap-4
    md:grid-cols-4 md:gap-6
  "
            >
              {Object.entries(vehicleTypeMeta)
                .slice(0, 4)
                .map(([key, meta]) => (
                  <Link
                    key={key}
                    aria-label={`Browse ${meta.label} vehicles`}
                    className="
          group relative flex flex-col space-y-4 overflow-hidden
          rounded-2xl border bg-card shadow transition-all
          duration-300 hover:shadow-lg
        "
                    href={`/announcements?type=${key}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div
                        className="
              absolute inset-0 z-10 bg-gradient-to-t
              from-background/80 to-transparent
            "
                      />

                      <Image
                        alt={meta.label}
                        className="
              object-cover transition duration-300
              group-hover:scale-105
            "
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        src={meta.image}
                      />
                    </div>

                    <div className="relative z-20 -mt-6 p-4">
                      <div className="mb-1 text-lg font-medium">
                        {meta.label}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        View Listings
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className={`
            py-12
            md:py-16
          `}
          id="features"
        >
          <div
            className={`
              container mx-auto max-w-7xl px-4
              sm:px-6
              lg:px-8
            `}
          >
            <div className="mb-8 flex flex-col items-center text-center">
              <h2
                className={`
                  font-display text-3xl leading-tight font-bold tracking-tight
                  md:text-4xl
                `}
              >
                Why Choose Us
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
              <p
                className={`
                  mt-4 max-w-2xl text-center text-muted-foreground
                  md:text-lg
                `}
              >
                We offer the best platform for buying, selling, and renting vehicles
              </p>
            </div>
            <div
              className={`
                grid gap-8
                md:grid-cols-2
                lg:grid-cols-4
              `}
            >
              {featuresWhyChooseUs.map((feature) => (
                <Card
                  className={`
                    rounded-2xl border-none bg-background shadow transition-all
                    duration-300
                    hover:shadow-lg
                  `}
                  key={feature.title}
                >
                  <CardHeader className="pb-2">
                    <div
                      className={`
                        mb-3 flex h-12 w-12 items-center justify-center
                        rounded-full bg-primary/10
                      `}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          className={`
            bg-muted/50 py-12
            md:py-16
          `}
        >
          <div
            className={`
              container mx-auto max-w-7xl px-4
              sm:px-6
              lg:px-8
            `}
          >
            <div className="mb-8 flex flex-col items-center text-center">
              <h2
                className={`
                  font-display text-3xl leading-tight font-bold tracking-tight
                  md:text-4xl
                `}
              >
                What Our Users Say
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
            </div>

            <RecentReviews />

          </div>
        </section>

        {/* CTA Section */}
        <section
          className={`
            py-12
            md:py-16
          `}
        >
          <div
            className={`
              container mx-auto max-w-7xl px-4
              sm:px-6
              lg:px-8
            `}
          >
            <div
              className={`
                relative overflow-hidden rounded-xl bg-primary/10 p-8 shadow-lg
                md:p-12
              `}
            >
              <div
                className={`
                  bg-grid-white/[0.05] absolute inset-0
                  bg-[length:16px_16px]
                `}
              />
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h2
                  className={`
                    font-display text-3xl leading-tight font-bold tracking-tight
                    md:text-4xl
                  `}
                >
                  Ready to Hit the Road?
                </h2>
                <p
                  className={`
                    mt-4 text-lg text-muted-foreground
                    md:text-xl
                  `}
                >
                  Join thousands of satisfied customers and experience the best
                  vehicle marketplace. Sign up today and find your perfect match.
                </p>
                <div
                  className={`
                    mt-6 flex flex-col items-center justify-center gap-3
                    sm:flex-row
                  `}
                >
                  <Link href="/auth/sign-up">
                    <Button
                      className="h-12 px-8 transition-colors duration-200"
                      size="lg"
                    >
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link href="/announcements">
                    <Button
                      className="h-12 px-8 transition-colors duration-200"
                      size="lg"
                      variant="outline"
                    >
                      Browse Announcements
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
