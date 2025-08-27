import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleCheckIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col font-epilogue">
      <HeroSection />
      <AboutSection />
      <AdditionalFeaturesSection />
      <TestimonialSection />
    </main>
  );
}

const features = [
  {
    icon: <BuildingIcon />,
    title: 'Online Registration',
    description:
      'Start your company with our online incorporation service and maintain compliance with our secretarial services.',
  },
  {
    icon: <CalculatorIcon />,
    title: 'Data Verification',
    description:
      'We make bookkeeping easy through our accounting solution and give you access to an accountant for questions at any ',
  },
  {
    icon: <MoneyIcon />,
    title: 'Learn and Training',
    description:
      'We will be there to support you with your audit & tax filing every year and ensure you never miss a deadline with our reminders.',
  },
];

function HeroSection() {
  return (
    <section className="bg-primary/5 px-24 pt-4 pb-12">
      <div className="grid grid-cols-2 items-center">
        <article className="flex flex-col gap-6">
          <h1 className="font-extrabold text-6xl leading-20">
            Vortex <br />
            Center <span className="text-primary">(Welcome)</span>
          </h1>
          <p className="text-muted-foreground leading-8">
            We provide the professional services you need to start & run a
            company in Malaysia and we've build a platform to make it as simple
            as 1-2-3
          </p>
          <div className="flex gap-4">
            <Link className={buttonVariants({ size: 'lg' })} href="/signup">
              Daftar Sekarang
            </Link>
            <Button size="lg" variant="outline">
              Switch to Our Apps
            </Button>
          </div>
        </article>
        <Image
          alt="Hero Image"
          className="size-full object-cover"
          height={500}
          quality={100}
          src="/images/hero.png"
          width={500}
        />
      </div>
      <div className="-translate-y-12 flex w-full max-w-[90%] gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard(props: FeatureCardProps) {
  const { title, description, icon } = props;

  return (
    <Card className="basis-1/4 shadow-sm">
      <CardHeader>
        <div className="mb-6 flex size-14 items-center justify-center rounded-lg border-2 border-primary shadow-[-4px_4px_0px_rgba(68,63,222,0.5)]">
          {icon}
        </div>
        <CardTitle className="mb-2.5">{title}</CardTitle>
        <CardDescription className="leading-6">{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function BuildingIcon() {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Building</title>
      <path
        d="M30 26.25H27.75V12C27.75 11.5359 27.5656 11.0907 27.2374 10.7626C26.9092 10.4344 26.4641 10.25 26 10.25H17.75V3.99999C17.7499 3.68325 17.6638 3.37249 17.5009 3.10084C17.338 2.82918 17.1045 2.60683 16.8251 2.45748C16.5458 2.30813 16.2312 2.23739 15.9148 2.25281C15.5985 2.26822 15.2922 2.3692 15.0288 2.54499L5.02875 9.21125C4.78911 9.37113 4.59265 9.5877 4.4568 9.84174C4.32095 10.0958 4.24992 10.3794 4.25 10.6675V26.25H2C1.80109 26.25 1.61032 26.329 1.46967 26.4697C1.32902 26.6103 1.25 26.8011 1.25 27C1.25 27.1989 1.32902 27.3897 1.46967 27.5303C1.61032 27.671 1.80109 27.75 2 27.75H30C30.1989 27.75 30.3897 27.671 30.5303 27.5303C30.671 27.3897 30.75 27.1989 30.75 27C30.75 26.8011 30.671 26.6103 30.5303 26.4697C30.3897 26.329 30.1989 26.25 30 26.25ZM26 11.75C26.0663 11.75 26.1299 11.7763 26.1768 11.8232C26.2237 11.8701 26.25 11.9337 26.25 12V26.25H17.75V11.75H26ZM5.75 10.6675C5.75008 10.6264 5.76027 10.586 5.77967 10.5498C5.79907 10.5136 5.82709 10.4828 5.86125 10.46L15.8612 3.79249C15.8989 3.7674 15.9426 3.75297 15.9877 3.75076C16.0329 3.74854 16.0778 3.75862 16.1177 3.77991C16.1576 3.8012 16.191 3.83291 16.2143 3.87167C16.2376 3.91043 16.2499 3.95478 16.25 3.99999V26.25H5.75V10.6675ZM13.75 14V16C13.75 16.1989 13.671 16.3897 13.5303 16.5303C13.3897 16.671 13.1989 16.75 13 16.75C12.8011 16.75 12.6103 16.671 12.4697 16.5303C12.329 16.3897 12.25 16.1989 12.25 16V14C12.25 13.8011 12.329 13.6103 12.4697 13.4697C12.6103 13.329 12.8011 13.25 13 13.25C13.1989 13.25 13.3897 13.329 13.5303 13.4697C13.671 13.6103 13.75 13.8011 13.75 14ZM9.75 14V16C9.75 16.1989 9.67098 16.3897 9.53033 16.5303C9.38968 16.671 9.19891 16.75 9 16.75C8.80109 16.75 8.61032 16.671 8.46967 16.5303C8.32902 16.3897 8.25 16.1989 8.25 16V14C8.25 13.8011 8.32902 13.6103 8.46967 13.4697C8.61032 13.329 8.80109 13.25 9 13.25C9.19891 13.25 9.38968 13.329 9.53033 13.4697C9.67098 13.6103 9.75 13.8011 9.75 14ZM9.75 21V23C9.75 23.1989 9.67098 23.3897 9.53033 23.5303C9.38968 23.671 9.19891 23.75 9 23.75C8.80109 23.75 8.61032 23.671 8.46967 23.5303C8.32902 23.3897 8.25 23.1989 8.25 23V21C8.25 20.8011 8.32902 20.6103 8.46967 20.4697C8.61032 20.329 8.80109 20.25 9 20.25C9.19891 20.25 9.38968 20.329 9.53033 20.4697C9.67098 20.6103 9.75 20.8011 9.75 21ZM13.75 21V23C13.75 23.1989 13.671 23.3897 13.5303 23.5303C13.3897 23.671 13.1989 23.75 13 23.75C12.8011 23.75 12.6103 23.671 12.4697 23.5303C12.329 23.3897 12.25 23.1989 12.25 23V21C12.25 20.8011 12.329 20.6103 12.4697 20.4697C12.6103 20.329 12.8011 20.25 13 20.25C13.1989 20.25 13.3897 20.329 13.5303 20.4697C13.671 20.6103 13.75 20.8011 13.75 21Z"
        fill="#5575A5"
      />
    </svg>
  );
}

function CalculatorIcon() {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Calculator</title>
      <path
        d="M22 7.25H10C9.80109 7.25 9.61032 7.32902 9.46967 7.46967C9.32902 7.61032 9.25 7.80109 9.25 8V14C9.25 14.1989 9.32902 14.3897 9.46967 14.5303C9.61032 14.671 9.80109 14.75 10 14.75H22C22.1989 14.75 22.3897 14.671 22.5303 14.5303C22.671 14.3897 22.75 14.1989 22.75 14V8C22.75 7.80109 22.671 7.61032 22.5303 7.46967C22.3897 7.32902 22.1989 7.25 22 7.25ZM21.25 13.25H10.75V8.75H21.25V13.25ZM25 3.25H7C6.53587 3.25 6.09075 3.43437 5.76256 3.76256C5.43437 4.09075 5.25 4.53587 5.25 5V27C5.25 27.4641 5.43437 27.9092 5.76256 28.2374C6.09075 28.5656 6.53587 28.75 7 28.75H25C25.4641 28.75 25.9092 28.5656 26.2374 28.2374C26.5656 27.9092 26.75 27.4641 26.75 27V5C26.75 4.53587 26.5656 4.09075 26.2374 3.76256C25.9092 3.43437 25.4641 3.25 25 3.25ZM25.25 27C25.25 27.0663 25.2237 27.1299 25.1768 27.1768C25.1299 27.2237 25.0663 27.25 25 27.25H7C6.9337 27.25 6.87011 27.2237 6.82322 27.1768C6.77634 27.1299 6.75 27.0663 6.75 27V5C6.75 4.9337 6.77634 4.87011 6.82322 4.82322C6.87011 4.77634 6.9337 4.75 7 4.75H25C25.0663 4.75 25.1299 4.77634 25.1768 4.82322C25.2237 4.87011 25.25 4.9337 25.25 5V27ZM12.25 18.5C12.25 18.7472 12.1767 18.9889 12.0393 19.1945C11.902 19.4 11.7068 19.5602 11.4784 19.6549C11.2499 19.7495 10.9986 19.7742 10.7561 19.726C10.5137 19.6777 10.2909 19.5587 10.1161 19.3839C9.9413 19.2091 9.82225 18.9863 9.77402 18.7439C9.72579 18.5014 9.75054 18.2501 9.84515 18.0216C9.93976 17.7932 10.1 17.598 10.3055 17.4607C10.5111 17.3233 10.7528 17.25 11 17.25C11.3315 17.25 11.6495 17.3817 11.8839 17.6161C12.1183 17.8505 12.25 18.1685 12.25 18.5ZM17.25 18.5C17.25 18.7472 17.1767 18.9889 17.0393 19.1945C16.902 19.4 16.7068 19.5602 16.4784 19.6549C16.2499 19.7495 15.9986 19.7742 15.7561 19.726C15.5137 19.6777 15.2909 19.5587 15.1161 19.3839C14.9413 19.2091 14.8222 18.9863 14.774 18.7439C14.7258 18.5014 14.7505 18.2501 14.8452 18.0216C14.9398 17.7932 15.1 17.598 15.3055 17.4607C15.5111 17.3233 15.7528 17.25 16 17.25C16.3315 17.25 16.6495 17.3817 16.8839 17.6161C17.1183 17.8505 17.25 18.1685 17.25 18.5ZM22.25 18.5C22.25 18.7472 22.1767 18.9889 22.0393 19.1945C21.902 19.4 21.7068 19.5602 21.4784 19.6549C21.2499 19.7495 20.9986 19.7742 20.7561 19.726C20.5137 19.6777 20.2909 19.5587 20.1161 19.3839C19.9413 19.2091 19.8223 18.9863 19.774 18.7439C19.7258 18.5014 19.7505 18.2501 19.8451 18.0216C19.9398 17.7932 20.1 17.598 20.3055 17.4607C20.5111 17.3233 20.7528 17.25 21 17.25C21.3315 17.25 21.6495 17.3817 21.8839 17.6161C22.1183 17.8505 22.25 18.1685 22.25 18.5ZM12.25 23.5C12.25 23.7472 12.1767 23.9889 12.0393 24.1945C11.902 24.4 11.7068 24.5602 11.4784 24.6549C11.2499 24.7495 10.9986 24.7742 10.7561 24.726C10.5137 24.6777 10.2909 24.5587 10.1161 24.3839C9.9413 24.2091 9.82225 23.9863 9.77402 23.7439C9.72579 23.5014 9.75054 23.2501 9.84515 23.0216C9.93976 22.7932 10.1 22.598 10.3055 22.4607C10.5111 22.3233 10.7528 22.25 11 22.25C11.3315 22.25 11.6495 22.3817 11.8839 22.6161C12.1183 22.8505 12.25 23.1685 12.25 23.5ZM17.25 23.5C17.25 23.7472 17.1767 23.9889 17.0393 24.1945C16.902 24.4 16.7068 24.5602 16.4784 24.6549C16.2499 24.7495 15.9986 24.7742 15.7561 24.726C15.5137 24.6777 15.2909 24.5587 15.1161 24.3839C14.9413 24.2091 14.8222 23.9863 14.774 23.7439C14.7258 23.5014 14.7505 23.2501 14.8452 23.0216C14.9398 22.7932 15.1 22.598 15.3055 22.4607C15.5111 22.3233 15.7528 22.25 16 22.25C16.3315 22.25 16.6495 22.3817 16.8839 22.6161C17.1183 22.8505 17.25 23.1685 17.25 23.5ZM22.25 23.5C22.25 23.7472 22.1767 23.9889 22.0393 24.1945C21.902 24.4 21.7068 24.5602 21.4784 24.6549C21.2499 24.7495 20.9986 24.7742 20.7561 24.726C20.5137 24.6777 20.2909 24.5587 20.1161 24.3839C19.9413 24.2091 19.8223 23.9863 19.774 23.7439C19.7258 23.5014 19.7505 23.2501 19.8451 23.0216C19.9398 22.7932 20.1 22.598 20.3055 22.4607C20.5111 22.3233 20.7528 22.25 21 22.25C21.3315 22.25 21.6495 22.3817 21.8839 22.6161C22.1183 22.8505 22.25 23.1685 22.25 23.5Z"
        fill="#5575A5"
      />
    </svg>
  );
}

function MoneyIcon() {
  return (
    <svg
      fill="none"
      height="32"
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Money</title>
      <path
        d="M16 20.75C16.9395 20.75 17.8578 20.4714 18.639 19.9495C19.4201 19.4275 20.0289 18.6857 20.3884 17.8177C20.7479 16.9498 20.842 15.9947 20.6587 15.0733C20.4755 14.1519 20.0231 13.3055 19.3588 12.6412C18.6945 11.9769 17.8481 11.5245 16.9267 11.3413C16.0053 11.158 15.0502 11.2521 14.1823 11.6116C13.3143 11.9711 12.5725 12.5799 12.0505 13.361C11.5286 14.1422 11.25 15.0605 11.25 16C11.25 17.2598 11.7504 18.468 12.6412 19.3588C13.532 20.2496 14.7402 20.75 16 20.75ZM16 12.75C16.6428 12.75 17.2711 12.9406 17.8056 13.2977C18.3401 13.6548 18.7566 14.1624 19.0026 14.7563C19.2486 15.3501 19.313 16.0036 19.1876 16.634C19.0621 17.2645 18.7526 17.8436 18.2981 18.2981C17.8436 18.7526 17.2645 19.0621 16.634 19.1876C16.0036 19.313 15.3501 19.2486 14.7563 19.0026C14.1624 18.7566 13.6548 18.3401 13.2977 17.8056C12.9406 17.2711 12.75 16.6428 12.75 16C12.75 15.138 13.0924 14.3114 13.7019 13.7019C14.3114 13.0924 15.138 12.75 16 12.75ZM30 7.25H2C1.80109 7.25 1.61032 7.32902 1.46967 7.46967C1.32902 7.61032 1.25 7.80109 1.25 8V24C1.25 24.1989 1.32902 24.3897 1.46967 24.5303C1.61032 24.671 1.80109 24.75 2 24.75H30C30.1989 24.75 30.3897 24.671 30.5303 24.5303C30.671 24.3897 30.75 24.1989 30.75 24V8C30.75 7.80109 30.671 7.61032 30.5303 7.46967C30.3897 7.32902 30.1989 7.25 30 7.25ZM2.75 13.6025C3.91454 13.2927 4.97659 12.6808 5.82869 11.8287C6.68079 10.9766 7.2927 9.91454 7.6025 8.75H24.3975C24.7073 9.91454 25.3192 10.9766 26.1713 11.8287C27.0234 12.6808 28.0855 13.2927 29.25 13.6025V18.3975C28.0855 18.7073 27.0234 19.3192 26.1713 20.1713C25.3192 21.0234 24.7073 22.0855 24.3975 23.25H7.6025C7.2927 22.0855 6.68079 21.0234 5.82869 20.1713C4.97659 19.3192 3.91454 18.7073 2.75 18.3975V13.6025ZM29.25 12.0363C28.4904 11.7709 27.8004 11.3376 27.2314 10.7686C26.6624 10.1996 26.2291 9.50963 25.9638 8.75H29.25V12.0363ZM6.03625 8.75C5.77088 9.50963 5.33757 10.1996 4.7686 10.7686C4.19962 11.3376 3.50963 11.7709 2.75 12.0363V8.75H6.03625ZM2.75 19.9638C3.50963 20.2291 4.19962 20.6624 4.7686 21.2314C5.33757 21.8004 5.77088 22.4904 6.03625 23.25H2.75V19.9638ZM25.9638 23.25C26.2291 22.4904 26.6624 21.8004 27.2314 21.2314C27.8004 20.6624 28.4904 20.2291 29.25 19.9638V23.25H25.9638Z"
        fill="#5575A5"
      />
    </svg>
  );
}

const partners = [
  {
    alt: 'Dewan Kerajinan Nasional',
    src: '/images/dkn.png',
  },
  {
    alt: 'HK',
    src: '/images/hk.png',
  },
  {
    alt: 'Kapal Api',
    src: '/images/kapal-api.png',
  },
  {
    alt: 'Kimia Farma',
    src: '/images/kimia-farma.png',
  },
  {
    alt: 'Bank Jatim',
    src: '/images/bank-jatim.png',
  },
  {
    alt: 'Provinsi Jawa Timur',
    src: '/images/jatim.png',
  },
];

function AboutSection() {
  return (
    <section className="px-24">
      <div className="space-y-6 py-14">
        <h2 className="text-center font-semibold text-2xl">
          Mitra Bekerjasama dengan
        </h2>
        <div className="flex items-center justify-center gap-16">
          {partners.map((partner) => (
            <Image
              alt={partner.alt}
              className="h-[50px] w-auto"
              height={100}
              key={partner.alt}
              quality={100}
              src={partner.src}
              width={100}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 items-center gap-16 py-14">
        <Image
          alt="About"
          className="size-full object-cover"
          height={500}
          quality={100}
          src="/images/about.png"
          width={500}
        />
        <article className="space-y-6">
          <h2 className="font-semibold text-primary">ABOUT US</h2>
          <h1 className="font-semibold text-5xl">Apa itu Vortex</h1>
          <p className="text-muted-foreground leading-7">
            Program pengembangan kompetensi bagi pemuda yang menekankan pada “On
            The Job Learning” dengan memberikan kesempatan pekerjaan temporer
            (proyek/tugas) berbayar dari klien dunia usaha atau organisasi.
          </p>
          <Button size="lg">Get In Touch</Button>
        </article>
      </div>
    </section>
  );
}

const additionalFeatures = [
  {
    title: 'Vortex sebagai wadah milenial',
    description:
      'Wadah bagi millennial dan dunia usaha untuk terhubung sesuai dengan profil.',
  },
  {
    title: 'Vortex sudah diseleksi dari  kriteria',
    description:
      'Pihak-pihak yang terlibat, materi dan rekomendasi yang ada di Vortex sudah diseleksi berdasarkan kriteria',
  },
  {
    title: 'Kombinasi aspek digital dan non-digital',
    description:
      'Membuka kesempatan kerja yang didukung oleh pihak pemerintah dan swasta di level nasional',
  },
];

function AdditionalFeaturesSection() {
  return (
    <section className="relative bg-primary/5 px-24 pt-14">
      <div className="-z-10 absolute top-0 left-0 size-full overflow-hidden">
        <Decoration />
      </div>
      <div className="grid grid-cols-2 items-end gap-16">
        <Image
          alt="Additional Features"
          className="mx-auto object-cover"
          height={500}
          quality={100}
          src="/images/additional-features.png"
          width={500}
        />
        <article className="space-y-5 pb-14">
          <h1 className="font-semibold text-5xl leading-16">
            Kenapa <br />
            memakai <span className="text-primary">Vortex</span>?
          </h1>
          <div className="max-w-3/4 space-y-5 [&>*:nth-child(2)]:translate-x-6">
            {additionalFeatures.map((feature) => (
              <AdditionalFeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

type AdditionalFeatureCardProps = {
  title: string;
  description: string;
};

function AdditionalFeatureCard(props: AdditionalFeatureCardProps) {
  const { title, description } = props;

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleCheckIcon className="fill-pink-400 stroke-card" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function Decoration() {
  return (
    <svg
      fill="none"
      height="754"
      viewBox="0 0 1378 754"
      width="1378"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Decoration</title>
      <path
        d="M-940 539.387C-800.667 541.054 -509 658.888 -396 315.388C-314.322 67.102 -2.47971 122.186 173 79.8875C326.5 42.8875 340 -56.6125 173 -85.1125C15.2803 -112.029 -41 157.388 340 184.388C783.388 215.809 792.5 527.887 722 684.387C651.5 840.887 890.5 1004.39 1151.5 958.887C1360.3 922.487 1439.5 1092.05 1453 1181.39"
        stroke="url(#paint0_linear_1_88)"
        strokeWidth="5"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1_88"
          x1="-531.5"
          x2="1381.5"
          y1="-53.6125"
          y2="-57.6125"
        >
          <stop stopColor="#CEE0FA" />
          <stop offset="0.255208" stopColor="#E3D6FF" />
          <stop offset="0.510417" stopColor="#FCDBF4" />
          <stop offset="0.776042" stopColor="#FFF4DE" />
          <stop offset="1" stopColor="#FADADA" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const statistics = [
  {
    label: 'Talenta Bergabung',
    value: '2.3k+',
  },
  {
    label: 'Klien',
    value: '75',
  },
  {
    label: 'Mentor',
    value: '124',
  },
  {
    label: 'Project',
    value: '2.2k+',
  },
];

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
];

function TestimonialSection() {
  return (
    <section>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between py-14">
        {statistics.map((statistic) => (
          <div className="space-y-4 text-center" key={statistic.label}>
            <p className="font-semibold text-4xl text-primary">
              {statistic.value}
            </p>
            <p>{statistic.label}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <article className="w-full max-w-2/5 space-y-16 px-24 py-14">
          <div className="space-y-4">
            <h2 className="font-semibold text-primary">TESTIMONIAL</h2>
            <h1 className="font-semibold text-5xl leading-16">
              Ulasan tentang client Vortex
            </h1>
          </div>
          <div className="space-y-4">
            <h2 className="font-semibold text-5xl text-primary">A+ Rating</h2>
            <p>Avg rating 4.8 makes us the best Website.</p>
          </div>
        </article>
        <div className="w-full max-w-3/5 bg-primary/5 py-14 pl-14 flex gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

type TestimonialCardProps = {
  rating: number;
  testimonial: string;
  name: string;
  avatar: string;
};

function TestimonialCard(props: TestimonialCardProps) {
  const { rating, testimonial, name, avatar } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: rating }).map((_, index) => (
              <StarIcon
                key={index}
                className="fill-yellow-500 stroke-card size-6"
              />
            ))}
          </div>
          <p className="text-xl font-semibold translate-y-0.5">
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
        <p className="text-xl font-semibold">{name}</p>
      </CardFooter>
    </Card>
  );
}
