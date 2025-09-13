import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  GraduationCap,
  Award,
  University,
  BookOpen,
  Users,
  Star,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Trophy,
  Building,
  Heart,
  Stethoscope,
  Microscope,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EnquiryForm from "@/components/Enquiryform";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CollegeLanding() {
  const [activeSection, setActiveSection] = useState("home");

  const stats = [
    { icon: Users, number: "10,000+", label: "Happy Students" },
    { icon: Trophy, number: "50+", label: "Courses Offered" },
    { icon: Award, number: "15+", label: "Years Experience" },
    { icon: Building, number: "3", label: "University Tie-ups" },
  ];

  const features = [
    {
      icon: Star,
      title: "UGC Approved",
      desc: "Government recognized and approved institution",
    },
    {
      icon: Award,
      title: "ISO Certified",
      desc: "Quality education with international standards",
    },
    {
      icon: CheckCircle,
      title: "NAAC A+ Rated",
      desc: "Top grade accreditation for excellence",
    },
    {
      icon: University,
      title: "Industry Partnerships",
      desc: "Strong connections with leading healthcare institutions",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        id="home"
        className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">
                  🏆 ISO 9001:2015 Certified
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Shape Your
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {" "}
                    Future
                  </span>
                  <br />
                  in Healthcare
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join India's premier institution for health sciences
                  education. Government approved courses, expert faculty, and
                  industry partnerships await you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  <a
                    href="#courses"
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Explore Courses
                  </a>
                </button>
                <Dialog className="bg-white">
                  {/* The DialogOverlay component controls the backdrop */}
                  <DialogOverlay className="bg-white/80" />
                  <DialogTrigger asChild>
                    <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200">
                      Enquire
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-full h-full bg-white overflow-auto" >
                    <DialogDescription>
                      <EnquiryForm />
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                {["UGC Approved", "AICTE Approved", "NAAC A+ Accredited"].map(
                  (badge) => (
                    <div key={badge} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-gray-700 font-medium">
                        {badge}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center">
                  <Stethoscope className="w-12 h-12 text-white" />
                </div>
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Start Your Journey
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-gray-700">
                        Healthcare Excellence
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Microscope className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">Advanced Labs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-700">
                        Industry Recognition
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SGND College?
            </h2>
            <p className="text-xl text-gray-600">
              Excellence in education, innovation in healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* University Partnerships */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <University className="w-8 h-8 text-blue-600" />
              University Partnerships
            </h2>
            <p className="text-gray-600">
              Collaborating with prestigious institutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "IEC University (H.P)",
              "NECU (Nagaland)",
              "Himalayan University (A.P)",
            ].map((uni, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <University className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{uni}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <BookOpen className="w-10 h-10 text-blue-600" />
              Our Courses
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive programs designed for healthcare excellence
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {/* Diploma (4 Sem) */}
            <AccordionItem value="diploma4" className="border rounded-xl px-6">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  Diploma Courses (4 Semesters) - Eligibility: 12th
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  {[
                    "Diploma in Dental Technician & Hygiene",
                    "Diploma in Dialysis Technician",
                    "Diploma in ECG Technician",
                    "Diploma in Health Care & Services",
                    "Diploma in Health Information Technology",
                    "Diploma in Medical Lab Technology (MLT)",
                    "Diploma in Medical Record Technology",
                    "Diploma in Multipurpose Health Worker",
                    "Diploma in Naturopathy & Yogic Sciences",
                    "Diploma in Nutrition & Dietics",
                    "Diploma in Operation Theatre Technology (OTT)",
                    "Diploma in Opthalmic Technician",
                    "Diploma in Optometry",
                    "Diploma in Radiology & Imaging Technology",
                    "Diploma in Refraction Optometry",
                    "Diploma in Ultra Sound Technology (UST)",
                    "Diploma in Veterinary Pharmacy",
                    "Diploma in X-Ray Technician",
                    "Diploma in Blood Transfusion Technology",
                    "Diploma in Cardiology Technician",
                    "Diploma in CT Scan Technician",
                    "Diploma in Pharma Sales",
                    "Diploma in CMs & ED",
                    "Diploma in Emergency Medical Services Technician",
                  ].map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{course}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* B.Sc Courses */}
            <AccordionItem value="bsc" className="border rounded-xl px-6">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  B.Sc Courses (6 Semesters) - Eligibility: 12th with Science
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  {[
                    "B.Sc. in Medical Lab Technology (BMLT)",
                    "B.Sc. in Radio-Imaging Technology (BRTT)",
                    "B.Sc. in Anesthesia Technology",
                    "B.Sc. in Biological Sciences",
                    "B.Sc. in Dialysis Technician",
                    "B.Sc. in Dietetics and Applied Nutrition",
                    "B.Sc. in Homeopathic Pharmacy",
                    "B.Sc. in Hospital Management",
                    "B.Sc. in C.S.S.D.",
                    "B.Sc. in Emergency Medical Services (EMT)",
                  ].map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-green-50 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{course}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Pharmacy */}
            <AccordionItem value="pharmacy" className="border rounded-xl px-6">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Microscope className="w-5 h-5 text-purple-600" />
                  </div>
                  School of Pharmacy - Eligibility: 12th Science
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  {[
                    "D-Pharmacy",
                    "B-Pharmacy",
                    "M-Pharmacy",
                    "Ayurveda Pharmacy",
                    "Veterinary Pharmacy",
                  ].map((course, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{course}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <br />
      {/* Contact Section */}
      <section
        id="contact"
        className="py-10 bg-gradient-to-br from-gray-900 to-blue-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300">
              Ready to start your healthcare journey?
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="text-gray-300">+91 98765 43210</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-300">info@sgndcollege.edu</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-gray-300">Punjab, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Shri Guru Nanak Dev College</h3>
              <p className="text-sm text-gray-400">
                Health & Science Excellence
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center flex-wrap gap-6">
              {[
                "UGC Approved",
                "AICTE Approved",
                "ISO Certified",
                "NAAC A+ Accredited",
                "Pharmacy Council of India",
                "Bar Council of India",
              ].map((item, index) => (
                <Badge
                  key={index}
                  className="bg-gray-800 text-gray-300 px-3 py-1 text-sm"
                >
                  {item}
                </Badge>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-800">
              <p className="text-gray-400">
                &copy; 2025 Shri Guru Nanak Dev College of Health & Science. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
