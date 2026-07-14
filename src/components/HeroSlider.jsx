import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const timeoutRef = useRef(null);

    const slides = [
        {
            id: 1,
            tag: "Tech & Gadgets",
            title: "Next-Gen Electronics Collection",
            description: "Upgrade your sound and lifestyle with our premium wireless bluetooth headphones, smart accessories, and cutting-edge tech gadgets.",
            link: "/collection/Electronics%20%26%20Gadgets",
            bgImage: "/hero-electronics.jpg",
            bgImageMobile: "/hero-electronics-mobile.jpg",
            buttonText: "Shop Electronics",
            theme: "dark", // dark background, needs light text
            textColor: "text-white",
            tagBg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            descColor: "text-gray-300"
        },
        {
            id: 2,
            tag: "Cosmetics & Skincare",
            title: "Luxury Beauty & Personal Care",
            description: "Nourish your skin and revitalize your body with our dermatologist-approved daily moisturizers, shampoos, perfumes, and premium grooming kits.",
            link: "/collection/Beauty%20%26%20Personal%20Care",
            bgImage: "/hero-beauty.jpg",
            bgImageMobile: "/hero-beauty-mobile.jpg",
            buttonText: "Explore Beauty Care",
            theme: "light", // light background, needs dark text
            textColor: "text-gray-900 dark:text-white",
            tagBg: "bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400 border-pink-500/20",
            descColor: "text-gray-650 dark:text-gray-300"
        },
        {
            id: 3,
            tag: "Best Sellers",
            title: "Shop the Complete Catalog",
            description: "Dazzle your senses and explore our entire curated range of high-quality products. Enjoy free worldwide shipping on all orders today.",
            link: "/products",
            bgImage: "/hero-general.jpg",
            bgImageMobile: "/hero-general-mobile.jpg",
            buttonText: "View All Products",
            theme: "dark", // dark background, needs light text
            textColor: "text-white",
            tagBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
            descColor: "text-gray-300"
        }
    ];

    const slideCount = slides.length;

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    // Track window resize to toggle between mobile and desktop images
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // 768px is the 'md' breakpoint
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-advance slides
    useEffect(() => {
        if (!isHovered) {
            resetTimeout();
            timeoutRef.current = setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % slideCount);
            }, 6000); // Advance every 6 seconds
        }
        return () => resetTimeout();
    }, [currentSlide, isHovered]);

    const nextSlide = (e) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev + 1) % slideCount);
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
    };

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full h-screen overflow-hidden shadow-lg group select-none"
        >
            {/* Slides container */}
            {slides.map((slide, index) => {
                const isActive = index === currentSlide;
                return (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-center ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                            }`}
                        style={{ backgroundImage: `url(${isMobile ? slide.bgImageMobile : slide.bgImage})` }}
                    >
                        {/* Gradient tint overlay for better legibility on mobile */}
                        <div className={`absolute inset-0 md:bg-transparent ${slide.theme === 'dark'
                            ? 'bg-gradient-to-r from-black/80 via-black/40 to-transparent'
                            : 'bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent'
                            }`} />

                        {/* Slide Content */}
                        <div className="absolute inset-y-0 left-0 w-full md:w-3/5 flex flex-col justify-center px-8 sm:px-16 md:pl-20 md:pr-4 z-20">
                            {/* Tag */}
                            <span
                                className={`self-start text-[10px] sm:text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border mb-3 sm:mb-4 transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                    } ${slide.tagBg}`}
                                style={{ transitionDelay: '200ms' }}
                            >
                                {slide.tag}
                            </span>

                            {/* Title */}
                            <h1
                                className={`text-2xl sm:text-4xl lg:text-5xl font-black leading-tight sm:leading-none tracking-tight mb-3 sm:mb-4 transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                                    } ${slide.textColor}`}
                                style={{ transitionDelay: '400ms' }}
                            >
                                {slide.title}
                            </h1>

                            {/* Description */}
                            <p
                                className={`text-xs sm:text-sm md:text-base max-w-lg mb-6 sm:mb-8 leading-relaxed font-semibold transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    } ${slide.descColor}`}
                                style={{ transitionDelay: '600ms' }}
                            >
                                {slide.description}
                            </p>

                            {/* CTA Button */}
                            <div
                                className={`transition-all duration-700 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                                style={{ transitionDelay: '800ms' }}
                            >
                                <Link
                                    to={slide.link}
                                    className={`inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold px-6 py-3 rounded-2xl transition-all shadow-md ${slide.theme === 'dark'
                                        ? 'bg-white hover:bg-gray-100 text-gray-900 shadow-white/5 hover:shadow-lg'
                                        : 'bg-gray-900 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-500 shadow-gray-900/10 hover:shadow-lg'
                                        }`}
                                >
                                    {slide.buttonText}
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xs border border-white/10 transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 hover:scale-105 cursor-pointer"
                title="Previous Slide"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-xs border border-white/10 transition-all opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 hover:scale-105 cursor-pointer"
                title="Next Slide"
            >
                <ChevronRight size={20} />
            </button>

            {/* Bullet Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all duration-305 cursor-pointer ${index === currentSlide
                            ? 'w-6 bg-blue-600 dark:bg-blue-500'
                            : 'w-2 bg-black/30 dark:bg-white/30 hover:bg-black/50 dark:hover:bg-white/50'
                            }`}
                        title={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
