import Button from "@/components/ui/button";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark-red/20 via-background to-background" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <p className="text-2xl font-bold uppercase text-center text-accent mb-4">
          404
        </p>
        <div>
          <Image
            src="/images/ikuyo-cry.webp"
            alt=""
            width={240}
            height={240}
            className="w-56 h-56 rounded-lg shadow-lg object-cover"
          />
        </div>
        <h1 className="mt-3 text-4xl font-black text-primary-text md:text-5xl">
          <span className="bg-linear-to-r from-light-red to-primary-text bg-clip-text text-transparent">
            Page not found
          </span>
        </h1>
        <p className="mt-4 max-w-md text-muted-text">
          Even Kita couldn't find this page...
        </p>
        <div className="mt-8">
          <Button link="/dashboard" variant="primary" size="lg">
            Back to dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}
