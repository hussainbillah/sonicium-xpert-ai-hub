
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director, TechCorp",
    image: "",
    content: "SoniciumXpert has transformed our marketing operations. The AI-powered content generation alone has saved us countless hours and improved our campaign performance by 47%.",
    stars: 5
  },
  {
    name: "Michael Chen",
    role: "E-commerce Manager, ShopWave",
    image: "",
    content: "After struggling with multiple disconnected tools, finding SoniciumXpert was a game-changer. Now we manage all our channels in one place with amazing analytics.",
    stars: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Digital Marketing Lead, GrowthFirm",
    image: "",
    content: "The campaign optimization suggestions from SoniciumXpert's AI have consistently outperformed our manual optimizations by at least 30%. Outstanding platform!",
    stars: 4
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">What Our Clients Say</h2>
        <p className="section-subtitle text-center">
          Trusted by marketing professionals worldwide
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border border-gray-200 bg-white opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.2 * index}s`, animationFillMode: 'forwards' }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-sonicium-100 text-sonicium-800">{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
