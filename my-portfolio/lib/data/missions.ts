import type { DnaFormCode } from "@/lib/data/dna-forms";

export type Mission = {
  id: string;
  title: string;
  summary: string;
  badge: string;
  stack: string[];
  // Repository names under the Yasith-SE GitHub account.
  repos: string[];
  // DNA forms this mission draws on, used to link missions to the telemetry panel.
  forms: DnaFormCode[];
};

export const MISSIONS: Mission[] = [
  {
    id: "clothecity",
    title: "ClotheCity // Full-Stack 3D E-Commerce",
    summary:
      "3D storefront with an Angular front end and a Spring Boot API secured with JWT, plus AI integration.",
    badge: "3D COMMERCE",
    stack: ["Angular", "Java Spring Boot", "JWT", "AI Integration"],
    repos: ["frontend_ClotheCity_angular", "ClotheCityBackend"],
    forms: ["01", "02", "05"],
  },
  {
    id: "minishop",
    title: "MiniShop E-Commerce Ecosystem",
    summary:
      "An e-commerce ecosystem built across a Laravel 11 Blade application and a Python/HTML project.",
    badge: "MULTI-STACK",
    stack: ["Laravel 11", "Blade", "Python", "HTML"],
    repos: ["MiniShop-project-laravel", "Minishop-py"],
    forms: ["01", "02"],
  },
  {
    id: "blog",
    title: "Full-Stack Blog Platform",
    summary:
      "Typed Next.js blog with Tailwind CSS styling and Supabase handling the data layer.",
    badge: "SUPABASE",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    repos: ["blog-app-project"],
    forms: ["01", "04"],
  },
  {
    id: "ceylon-autocar",
    title: "Ceylon AutoCar Rental System",
    summary:
      "Car rental website with a JavaScript front end backed by a Java Spring Boot management system.",
    badge: "RENTAL OPS",
    stack: ["JavaScript", "Java Spring Boot"],
    repos: [
      "Ceylon-Autocar-Car-Rental-website--frontend",
      "Car-rental-management-System_backend",
    ],
    forms: ["01", "02"],
  },
  {
    id: "musiceq",
    title: "musicEQ Mobile",
    summary: "Audio equalizer mobile application built with Dart and Flutter.",
    badge: "MOBILE",
    stack: ["Dart", "Flutter"],
    repos: ["musicEQ_mobile_flutter"],
    forms: ["03"],
  },
  {
    id: "systems-suite",
    title: "Book Rental & Student Management Systems",
    summary:
      "A suite of Java systems covering book rentals, student records, ticketing, chat, retail and food ordering.",
    badge: "BACKEND SUITE",
    stack: ["Java", "Backend Services"],
    repos: [
      "Book_Rental_Management_System",
      "Student_Management_System",
      "TicketMaster",
      "Chat-Everywhere-backend",
      "Super-Mart-Ceylon",
      "Online-Food-Ordering-System-Backend",
    ],
    forms: ["02", "04"],
  },
];
