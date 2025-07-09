"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, Workflow, Shield, Star, Github, Heart, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

// Custom hook for intersection observer
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView] as const
}

// Animated counter component
function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [ref, isInView] = useInView()

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const startCount = 0

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setCount(Math.floor(progress * (end - startCount) + startCount))

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

// Typing animation component
function TypingAnimation({ text, delay = 100 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default function LandingPage() {
  const [heroRef, heroInView] = useInView()
  const [featuresRef, featuresInView] = useInView()
  const [testimonialsRef, testimonialsInView] = useInView()
  const [pricingRef, pricingInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden">
      {/* Animated cursor follower */}
      <div
        className="fixed w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full pointer-events-none z-50 opacity-20 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <FileText className="h-5 w-5 text-white transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
              dok.so
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {["Features", "Testimonials", "Pricing", "Contact"].map((item, index) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 animate-pulse"></div>
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              ref={heroRef}
              className={`space-y-8 transition-all duration-1000 ${
                heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all duration-300 hover:scale-105 animate-bounce"
                  style={{ animationDelay: "2s", animationDuration: "2s", animationIterationCount: "infinite" }}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Document Workflows
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="block">Secure AI-Driven</span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                    <TypingAnimation text="Document Workflows" delay={150} />
                  </span>
                </h1>
                <p
                  className={`text-xl text-gray-600 leading-relaxed transition-all duration-1000 delay-300 ${
                    heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                >
                  Transform your document processing with customized, secure AI workflows. dok.so understands complex formats and automates your document operations while keeping your data safe and compliant.
                </p>
              </div>

              <div
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${
                  heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                >
                  Request a Demo
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Learn More
                </Button>
              </div>

              <div
                className={`flex items-center space-x-8 text-sm text-gray-500 transition-all duration-1000 delay-700 ${
                  heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
              >
                {[
                  { icon: CheckCircle, text: "Enterprise Ready" },
                  { icon: CheckCircle, text: "GDPR Compliant" },
                  { icon: CheckCircle, text: "24/7 Support" },
                ].map((item, index) => (
                  <div
                    key={item.text}
                    className="flex items-center space-x-2 hover:text-gray-700 transition-colors duration-300"
                    style={{ animationDelay: `${800 + index * 200}ms` }}
                  >
                    <item.icon className="h-4 w-4 text-green-500 animate-pulse" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-300 ${
                heroInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="dok.so Dashboard Preview"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: 500, suffix: "+", label: "Companies Trust Us" },
              { number: 1000000, suffix: "+", label: "Documents Processed" },
              { number: 99, suffix: "%", label: "Accuracy Rate" },
              { number: 24, suffix: "/7", label: "Support Available" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="space-y-2 hover:scale-105 transition-transform duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                  <AnimatedCounter end={stat.number} />
                  <span className="text-purple-600">{stat.suffix}</span>
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center space-y-4 mb-16 transition-all duration-1000 ${
              featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700 hover:scale-105 transition-transform duration-300"
            >
              Core Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Powerful AI Document Processing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced AI technology understands, processes, and automates your document workflows with
              unprecedented accuracy and security.
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Complex Document Format Understanding",
                description:
                  "Our AI comprehends diverse document formats including PDFs, Word docs, spreadsheets, and scanned images with industry-leading accuracy.",
                gradient: "from-blue-500 to-cyan-500",
                delay: 0,
              },
              {
                icon: Workflow,
                title: "Agentic Document Workflows",
                description:
                  "Intelligent agents that can reason, make decisions, and execute complex document processing tasks autonomously while maintaining human oversight.",
                gradient: "from-green-500 to-emerald-500",
                delay: 200,
              },
              {
                icon: Shield,
                title: "Customized & Safe AI Workflows",
                description:
                  "Tailored AI solutions that adapt to your specific business needs while ensuring data privacy, security, and regulatory compliance at every step.",
                gradient: "from-purple-500 to-pink-500",
                delay: 400,
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group cursor-pointer ${
                  featuresInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: featuresInView ? `${feature.delay}ms` : "0ms",
                }}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center space-y-4 mb-16 transition-all duration-1000 ${
              testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700 hover:scale-105 transition-transform duration-300"
            >
              Customer Success
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600">
              See how organizations are transforming their document workflows with dok.so
            </p>
          </div>

          <div ref={testimonialsRef} className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "dok.so has revolutionized our document processing capabilities. The AI understands our complex housing documents perfectly, and the security features give us complete confidence in handling sensitive tenant information.",
                company: "Wiener Wohnen",
                industry: "Housing Management",
                initials: "WW",
                gradient: "from-blue-500 to-cyan-500",
                delay: 0,
              },
              {
                quote:
                  "The customized workflows from dok.so have streamlined our entire document pipeline. We've reduced processing time by 80% while improving accuracy and maintaining the highest security standards.",
                company: "skale.io",
                industry: "Technology Platform",
                initials: "SK",
                gradient: "from-green-500 to-emerald-500",
                delay: 300,
              },
            ].map((testimonial, index) => (
              <Card
                key={testimonial.company}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group ${
                  testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: testimonialsInView ? `${testimonial.delay}ms` : "0ms",
                }}
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current transition-all duration-300 hover:scale-125"
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 group-hover:text-gray-900 transition-colors duration-300">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                        {testimonial.company}
                      </div>
                      <div className="text-sm text-gray-500">{testimonial.industry}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center space-y-4 mb-16 transition-all duration-1000 ${
              pricingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-700 hover:scale-105 transition-transform duration-300"
            >
              Pricing Plans
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Choose Your Perfect Plan</h2>
            <p className="text-xl text-gray-600">
              Flexible pricing options to scale with your document processing needs
            </p>
          </div>

          <div ref={pricingRef} className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$99",
                description: "Perfect for small teams",
                features: ["Up to 1,000 documents/month", "Basic AI workflows", "Email support", "Standard security"],
                popular: false,
                delay: 0,
              },
              {
                name: "Professional",
                price: "$299",
                description: "Ideal for growing businesses",
                features: [
                  "Up to 10,000 documents/month",
                  "Advanced AI workflows",
                  "Priority support",
                  "Enhanced security",
                  "Custom integrations",
                ],
                popular: true,
                delay: 200,
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: [
                  "Unlimited documents",
                  "Custom AI workflows",
                  "24/7 dedicated support",
                  "Enterprise security",
                  "On-premise deployment",
                ],
                popular: false,
                delay: 400,
              },
            ].map((plan, index) => (
              <Card
                key={plan.name}
                className={`border-2 ${
                  plan.popular
                    ? "border-purple-500 relative hover:border-purple-600 scale-105"
                    : "border-gray-200 hover:border-purple-300"
                } transition-all duration-500 hover:scale-105 hover:shadow-xl group ${
                  pricingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: pricingInView ? `${plan.delay}ms` : "0ms",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white animate-pulse">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors duration-300">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold group-hover:scale-110 transition-transform duration-300 inline-block">
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && <span className="text-gray-500">/month</span>}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={feature}
                        className="flex items-center space-x-3 hover:translate-x-2 transition-transform duration-300"
                        style={{ transitionDelay: `${featureIndex * 100}ms` }}
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full mt-8 transition-all duration-300 hover:scale-105 group ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        : "bg-transparent border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div
            className={`space-y-8 transition-all duration-1000 ${
              ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Transform Your Document Workflows?</h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Join hundreds of organizations already using dok.so to streamline their document processing with secure,
              intelligent AI workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Schedule Demo
              </Button>
            </div>
            <p className="text-sm text-purple-200 animate-pulse">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">dok.so</span>
              </div>
              <p className="text-gray-400">Secure AI-driven document workflows for modern businesses.</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125">
                  <Heart className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Documentation"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Security", "Compliance"],
              },
            ].map((section, index) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block"
                        style={{ transitionDelay: `${linkIndex * 50}ms` }}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="hover:text-white transition-colors duration-300">&copy; 2024 dok.so. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
