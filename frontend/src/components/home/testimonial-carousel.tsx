'use client';

import { StarIcon } from 'lucide-react';

import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const testimonials = [
  {
    rating: 5,
    testimonial:
      'Semoga dapat membantu dalam mencari pekerjaan dan meningkatkan skill',
    name: 'Ranti Sotejo',
    avatar: '/images/ranti-sotejo.png',
  },
  {
    rating: 4,
    testimonial:
      'Vortex menyajikan informasi mulai dari program, basis data Klien, Talenta, Mentor hingga tips.',
    name: 'Ahmad Raka',
    avatar: '/images/ahmad-raka.png',
  },
  {
    rating: 5,
    testimonial:
      'Vortex lebih mempermudah saya dalam mencari pekerjaan dan meningkatkan skill',
    name: 'Arif Hidayat Setiawan',
    avatar: '/images/ahmad-raka.png',
  },
];

export function TestimonialCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(testimonials.length);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex w-full max-w-3/5 flex-col gap-4 bg-primary/5 py-14 pl-14">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={setApi}
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem className="basis-1/2" key={testimonial.name}>
              <div className="p-1">
                <TestimonialCard key={testimonial.name} {...testimonial} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center gap-2 py-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              index === current - 1 ? 'bg-primary' : 'bg-primary/50'
            }`}
            // biome-ignore lint/suspicious/noArrayIndexKey: Carousel
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

type TestimonialCardProps = {
  rating: number;
  testimonial: string;
  name: string;
  avatar: string;
};

export function TestimonialCard(props: TestimonialCardProps) {
  const { rating, testimonial, name, avatar } = props;

  return (
    <Card className="select-none border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: rating }).map((_, index) => (
              <StarIcon
                className="size-6 fill-yellow-500 stroke-card"
                // biome-ignore lint/suspicious/noArrayIndexKey: No other way to do this
                key={index}
              />
            ))}
          </div>
          <p className="translate-y-0.5 font-semibold text-xl">
            {rating.toFixed(1)}
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl leading-10">&quot;{testimonial}&quot;</p>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <p className="font-semibold text-xl">{name}</p>
      </CardFooter>
    </Card>
  );
}
