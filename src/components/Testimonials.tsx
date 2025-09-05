
import React, { useRef } from "react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  email: string;
  phone: string;
  yearsKnown: string;
  backgroundImage?: string;
}

const testimonials: TestimonialProps[] = [
  {
    content:
      "Detail‑oriented and fast. Great at breaking down complex tasks and delivering reliable automation.",
    author: "Challarapu Vidyasagar",
    role: "Team Lead, Tata Consultancy Services",
    email: "chvs.sagar345@gmail.com",
    phone: "+1 904 898 8825",
    yearsKnown: "3 years",
    backgroundImage: "/background-section1.png",
  },
  {
    content:
      "Curious, rigorous, and dependable in research. Communicates findings clearly and iterates quickly.",
    author: "Nancy Lan Guo",
    role: "Research Professor, Binghamton University",
    email: "nguo1@binghamton.edu",
    phone: "+1 607 777 4884",
    yearsKnown: "1 year",
    backgroundImage: "/background-section2.png",
  },
  {
    content:
      "A collaborative teammate who ships. Pragmatic problem‑solver with solid test engineering instincts.",
    author: "Krishna Chaitanya",
    role: "Automation Tester, Tata Consultancy Services",
    email: "tirupathichaitanya99@gmail.com",
    phone: "+91 95428 00139",
    yearsKnown: "3 years",
    backgroundImage: "/background-section3.png",
  },
  {
    content:
      "Consistent, thoughtful, and eager to learn. Balances speed with maintainability.",
    author: "Sriharsha Madala",
    role: "Senior Developer, Microsoft (Mentor)",
    email: "sriharsha.madala@gmail.com",
    phone: "+1 979 587 9579",
    yearsKnown: "10+ years",
    backgroundImage: "/background-section1.png",
  },
];

const TestimonialCard = ({
  content,
  author,
  role,
  email,
  phone,
  yearsKnown,
  backgroundImage = "/background-section1.png",
}: TestimonialProps) => {
  return (
    <div
      className="bg-cover bg-center rounded-lg p-6 sm:p-8 h-full flex flex-col justify-between text-white relative overflow-hidden"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="relative z-0">
        <p className="text-base sm:text-lg mb-6 font-medium leading-relaxed">{`"${content}"`}</p>
        <div className="space-y-1">
          <h4 className="font-semibold text-lg sm:text-xl">{author}</h4>
          <p className="text-white/80 text-sm sm:text-base">{role}</p>
          <p className="text-white/80 text-sm">
            <a href={`mailto:${email}`} className="underline underline-offset-2">{email}</a> • <a href={`tel:${phone.replace(/\s/g,'')}`} className="underline underline-offset-2">{phone}</a> • {yearsKnown}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return <section className="py-12 bg-white relative" id="testimonials" ref={sectionRef}> {/* Reduced from py-20 */}
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="flex items-center gap-4 mb-6">
          <div className="pulse-chip">
            <span>References</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <TestimonialCard
              key={index}
              content={t.content}
              author={t.author}
              role={t.role}
              email={t.email}
              phone={t.phone}
              yearsKnown={t.yearsKnown}
              backgroundImage={t.backgroundImage}
            />
          ))}
        </div>
      </div>
    </section>;
};

export default Testimonials;


