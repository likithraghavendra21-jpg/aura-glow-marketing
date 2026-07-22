import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Search,
  Share2,
  Megaphone,
  Linkedin,
  Star,
  Radio,
  BarChart3,
  Globe,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Check,
  Menu,
  X,
  Sparkles,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import heroAura from "@/assets/hero-warm.jpg";
import seoImg from "@/assets/services/seo.jpg";
import socialImg from "@/assets/services/social.jpg";
import adsImg from "@/assets/services/ads.jpg";
import linkedinImg from "@/assets/services/linkedin.jpg";
import reviewsImg from "@/assets/services/reviews.jpg";
import offlineImg from "@/assets/services/offline.jpg";
import analyticsImg from "@/assets/services/analytics.jpg";
import websiteImg from "@/assets/services/website.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const services = [
  { icon: Search, image: seoImg, title: "SEO & Content Creation", desc: "Rank higher, capture organic traffic, and turn content into a compounding revenue engine." },
  { icon: Share2, image: socialImg, title: "Social Media & Influencer Marketing", desc: "Build a magnetic brand presence across Instagram, TikTok, and YouTube with proven creators." },
  { icon: Megaphone, image: adsImg, title: "Google & Meta Ads Management", desc: "Performance-driven paid campaigns optimized daily to lower CPA and scale profitably." },
  { icon: Linkedin, image: linkedinImg, title: "LinkedIn B2B Lead Generation", desc: "Fill your pipeline with qualified decision-makers through outbound and organic LinkedIn." },
  { icon: Star, image: reviewsImg, title: "Google Review & Reputation", desc: "Systematically build 5-star reviews and dominate local search trust signals." },
  { icon: Radio, image: offlineImg, title: "Offline & Hybrid Marketing", desc: "Outdoor billboards, print, and event marketing integrated with your digital funnel." },
  { icon: BarChart3, image: analyticsImg, title: "Lead Gen Systems & Analytics", desc: "Custom CRM, tracking, and dashboards so every rupee spent is measured and optimized." },
  { icon: Globe, image: websiteImg, title: "Website Design & Development", desc: "Custom, fast-loading websites designed to convert visitors into leads and sales for your business." },
];

const stats = [
  { value: 10, suffix: "x", label: "Average Client ROI" },
  { value: 250, suffix: "+", label: "Businesses Scaled" },
  { value: 50, suffix: "M+", label: "Ad Spend Managed" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

function useCountUp(target: number, start: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

function StatCard({ stat, inView }: { stat: (typeof stats)[number]; inView: boolean }) {
  const v = useCountUp(stat.value, inView);
  return (
    <div className="glass rounded-2xl p-8 text-center card-hover">
      <div className="text-5xl md:text-6xl font-bold text-gradient font-[var(--font-display)]">
        {v}
        {stat.suffix}
      </div>
      <div className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">
        {stat.label}
      </div>
    </div>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About Us" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9 rounded-xl bg-aura animate-pulse-glow" />
          <span className="text-xl font-bold tracking-tight">
            Aura<span className="text-gradient">Marketi</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-aura hover:after:w-full after:transition-all after:duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex">
          <Button className="btn-glow bg-aura text-primary-foreground border-0 font-semibold">
            Get a Free Audit <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </a>
        <button
          className="md:hidden p-2 rounded-lg glass"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden mx-6 mt-3 glass rounded-2xl p-6 animate-fade-up">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium"
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}>
              <Button className="w-full bg-aura text-primary-foreground border-0">
                Get a Free Audit
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background aura */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroAura}
          alt=""
          width={1536}
          height={1536}
          className="absolute right-[-15%] top-[-8%] w-[80%] max-w-[900px] opacity-80 animate-float mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-primary/40"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: `${2 + (i % 4)}px`,
              height: `${2 + (i % 4)}px`,
              animation: `float ${5 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium text-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Full-service growth partner
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Where <span className="text-gradient">data meets creativity</span>, businesses grow.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Full-service digital marketing strategies engineered to scale your revenue, capture
            leads, and dominate your market.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact">
              <Button
                size="lg"
                className="btn-glow bg-aura text-primary-foreground border-0 font-semibold text-base px-8 h-14"
              >
                Grow My Business <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a href="#services">
              <Button
                size="lg"
                variant="outline"
                className="glass border-border text-base px-8 h-14 hover:bg-card"
              >
                Explore Services
              </Button>
            </a>
          </div>
          <div className="mt-14 flex flex-wrap gap-8 text-sm text-muted-foreground">
            {["No long contracts", "Weekly reporting", "Dedicated strategist"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" /> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <div className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              What we do
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Services engineered to <span className="text-gradient">drive growth</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              End-to-end digital marketing under one roof. Strategy, execution, and measurable
              outcomes — from first click to loyal customer.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="glass rounded-2xl h-full card-hover group relative overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    width={800}
                    height={512}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 h-12 w-12 rounded-xl bg-aura grid place-items-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <s.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id="about" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <div className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
              Why AuraMarketi
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">
              Results that <span className="text-gradient">compound</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              We don't sell vanity metrics. We bring consistent, high-quality leads to businesses —
              tracked, attributed, and tied to revenue.
            </p>
          </div>
        </Reveal>

        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <StatCard stat={s} inView={inView} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Revenue-first thinking",
              desc: "Every campaign ties back to pipeline and profit — not likes or impressions.",
            },
            {
              title: "Senior team on every account",
              desc: "No juniors running your ad spend. Strategists with 8+ years lead your growth.",
            },
            {
              title: "Full transparency",
              desc: "Live dashboards. Weekly reports. You always know what's working and what's next.",
            },
          ].map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="glass rounded-2xl p-8 card-hover h-full">
                <div className="h-10 w-10 rounded-lg bg-aura grid place-items-center mb-5">
                  <Check className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-muted-foreground">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [service, setService] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      business: String(fd.get("business") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service,
      message: String(fd.get("message") ?? ""),
    };
    if (!payload.service) {
      toast.error("Please select a service.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setSubmitted(true);
      toast.success("Thanks — we'll be in touch within 24 hours.");
      setTimeout(() => setSubmitted(false), 6000);
      form.reset();
      setService("");
    } catch (err) {
      console.error(err);
      toast.error("Couldn't send your message. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <div>
              <div className="text-sm uppercase tracking-widest text-accent font-semibold mb-4">
                Let's talk
              </div>
              <h2 className="text-4xl md:text-6xl font-bold">
                Get your <span className="text-gradient">free audit</span>.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Tell us about your business and we'll send back a custom growth plan within 24
                hours — no strings attached.
              </p>
              <div className="mt-10 space-y-5">
                <a
                  href="tel:9535368816"
                  className="flex items-center gap-4 glass rounded-2xl p-5 card-hover group"
                >
                  <div className="h-12 w-12 rounded-xl bg-aura grid place-items-center shrink-0">
                    <Phone className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      Call us
                    </div>
                    <div className="text-lg font-semibold group-hover:text-gradient">
                      +91 95353 68816
                    </div>
                  </div>
                </a>
                <div className="flex items-center gap-4 glass rounded-2xl p-5">
                  <div className="h-12 w-12 rounded-xl bg-aura grid place-items-center shrink-0">
                    <Mail className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      Email
                    </div>
                    <div className="text-lg font-semibold truncate">hello@auramarketi.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 glass rounded-2xl p-5">
                  <div className="h-12 w-12 rounded-xl bg-aura grid place-items-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      Based in
                    </div>
                    <div className="text-lg font-semibold">Bengaluru, India</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <form
              onSubmit={onSubmit}
              className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden"
            >
              {submitted ? (
                <div className="min-h-[500px] flex flex-col items-center justify-center text-center animate-fade-up">
                  <div className="relative h-24 w-24 mb-6">
                    <div className="absolute inset-0 rounded-full bg-aura animate-pulse-glow" />
                    <div className="relative h-full w-full rounded-full bg-aura grid place-items-center">
                      <Check className="h-12 w-12 text-primary-foreground" strokeWidth={3} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold">Message received.</h3>
                  <p className="mt-3 text-muted-foreground max-w-sm">
                    Our team will review your details and reach out within 24 hours with a custom
                    growth plan.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name" className="mb-2 block">Full Name</Label>
                      <Input id="name" name="name" required placeholder="Jane Doe" className="h-12 bg-background/40" />
                    </div>
                    <div>
                      <Label htmlFor="business" className="mb-2 block">Business Name</Label>
                      <Input id="business" name="business" required placeholder="Acme Inc." className="h-12 bg-background/40" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="phone" className="mb-2 block">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" className="h-12 bg-background/40" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2 block">Email Address</Label>
                      <Input id="email" name="email" type="email" required placeholder="jane@acme.com" className="h-12 bg-background/40" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="service" className="mb-2 block">Service You're Interested In</Label>
                    <Select value={service} onValueChange={setService} required>
                      <SelectTrigger id="service" className="h-12 bg-background/40 w-full">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((s) => (
                          <SelectItem key={s.title} value={s.title}>{s.title}</SelectItem>
                        ))}
                        <SelectItem value="not-sure">Not sure — advise me</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message" className="mb-2 block">Message</Label>
                    <Textarea id="message" name="message" required placeholder="Tell us about your goals..." className="min-h-32 bg-background/40" />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="btn-glow w-full bg-aura text-primary-foreground border-0 font-semibold h-14 text-base disabled:opacity-70"
                  >
                    {submitting ? "Sending..." : (<>Send Message <ArrowRight className="ml-2 h-5 w-5" /></>)}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    We respect your inbox. No spam, ever.
                  </p>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-14 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-aura animate-pulse-glow" />
              <span className="text-xl font-bold">
                Aura<span className="text-gradient">Marketi</span>
              </span>
            </div>
            <p className="mt-4 text-muted-foreground max-w-sm">
              A full-service digital marketing agency turning clicks into loyal customers.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-10 w-10 grid place-items-center rounded-xl glass hover:bg-aura transition-all duration-300 group"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-4">Quick Links</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#home" className="hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-foreground transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-4">Get in Touch</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="tel:9535368816" className="hover:text-foreground transition-colors">+91 95353 68816</a></li>
              <li>hello@auramarketi.com</li>
              <li>Bengaluru, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border text-sm text-muted-foreground flex flex-wrap gap-4 justify-between">
          <div>© {new Date().getFullYear()} AuraMarketi. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Toaster theme="dark" position="top-center" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
