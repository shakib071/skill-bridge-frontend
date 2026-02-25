import { Button } from "@/components/ui/button";
import { CalendarCheck, DollarSign, GraduationCap, Users } from "lucide-react";

const items = [
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Set Your Own Rate",
    desc: "You decide your hourly price — no platform cuts.",
  },
  {
    icon: <CalendarCheck className="w-5 h-5" />,
    title: "Flexible Schedule",
    desc: "Teach whenever you want. You control your availability.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Grow Your Students",
    desc: "Get discovered by students actively looking for tutors.",
  },
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Share Your Expertise",
    desc: "Turn your knowledge into impact and income.",
  },
];

export function BecomeTutorCTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-border bg-muted/30 p-10 md:p-16">
          
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
           
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 border border-primary/30 px-3 py-1 rounded-full">
                For Tutors
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
                Share What You Know.
                <br />
                <span className="text-primary">Earn What You Deserve.</span>
              </h2>
              <p className="text-muted-foreground text-base mb-8 leading-relaxed">
                Join hundreds of tutors on SkillBridge. Create your profile,
                set your availability, and start teaching students who need your
                expertise — on your own terms.
              </p>
              <Button size="lg" asChild>
                <a href="/register">Become a Tutor Today</a>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-2 p-5 rounded-xl border border-border bg-background hover:border-primary/40 transition-colors"
                >
                  <div className="text-primary">{item.icon}</div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

