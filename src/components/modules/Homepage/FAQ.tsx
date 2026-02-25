import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

const faqs = [
  {
    question: "How do I book a session with a tutor?",
    answer:
      "Browse tutors, open a tutor's profile, and select an available time slot. Once you confirm the booking, it will appear in your student dashboard under upcoming sessions.",
  },
  {
    question: "How do I become a tutor on SkillBridge?",
    answer:
      "Register an account and select the Tutor role. Then go to Create Tutor Profile, fill in your details like subjects, hourly rate, languages, and experience. Once your profile is live, students can find and book you.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Yes. Go to your dashboard → Sessions and cancel the booking before the session starts. Both student and tutor can cancel or mark sessions as completed.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Each tutor sets their own hourly rate. The total price is automatically calculated based on the session duration and the tutor's rate at the time of booking.",
  },
  {
    question: "Can I leave a review after a session?",
    answer:
      "Yes. Once a session is marked as completed, you can go to your dashboard → Reviews and leave a rating and comment for the tutor.",
  },
  {
    question: "What happens if my account is suspended?",
    answer:
      "If your account is suspended or banned by an admin, you will be automatically redirected to a suspension notice page and logged out. Contact support if you believe this was a mistake.",
  },
  {
    question: "Is SkillBridge free to use?",
    answer:
      "Creating an account and browsing tutors is completely free. You only pay the tutor's hourly rate when booking a session.",
  },
];

export function FAQ() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 border border-primary/30 px-3 py-1 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base">
            Everything you need to know about SkillBridge.
          </p>
        </div>

   
        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-xl px-5 bg-muted/20 hover:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-sm font-semibold text-left hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground mb-3">
            Still have questions?
          </p>
          <Button variant="outline" asChild>
            <a href="mailto:shakibhasan071@gmail.com">Contact Support</a>
          </Button>
        </div>
      </div>
    </section>
  );
}

