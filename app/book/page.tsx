"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Lock, 
  Mail, 
  Minus, 
  Plus, 
  Calendar as CalendarIcon, 
  Phone, 
  ChevronLeft, 
  ChevronRight,
  Ticket,
  Users,
  Info,
  ArrowRight,
  MessageCircle,
  Sparkles,
  User,
  MapPin,
  Home,
  ShoppingCart,
  ShieldCheck
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/sections/PageHero";

const BookPage = () => {
  const [step, setStep] = useState(1);
  const [counts, setCounts] = useState({
    adult: 0,
    kids: 0,
    senior: 0
  });

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`
  );
  const [selectedDateFull, setSelectedDateFull] = useState(
    today.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    state: "",
    pincode: ""
  });

  const totalAmount = (counts.adult * 799) + (counts.kids * 599) + (counts.senior * 300);

  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const ticketTypes = [
    {
      id: "adult",
      title: "Adults",
      subtitle: "All-Day Entrance",
      price: 799,
      originalPrice: 899,
      popular: true,
      icon: <Users className="w-8 h-8 text-secondary" />
    },
    {
      id: "kids",
      title: "Kids",
      subtitle: "90 CM - 120 CM",
      price: 599,
      originalPrice: 700,
      popular: false,
      icon: <span className="text-4xl">👦</span>
    },
    {
      id: "senior",
      title: "Senior Citizen",
      subtitle: "All-Day Entrance",
      price: 300,
      originalPrice: 600,
      popular: false,
      icon: <span className="text-4xl">👵</span>
    }
  ];

  const updateCount = (type: string, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type as keyof typeof prev] + delta)
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Dynamic calendar generator
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getStartDay = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const startDay = getStartDay(currentMonth.getFullYear(), currentMonth.getMonth());
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDay + 1;
    return day > 0 && day <= daysInMonth ? day : null;
  });

  const handleDateSelect = (day: number) => {
    const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateObj < today) return;

    const dateStr = `${day.toString().padStart(2, '0')}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${currentMonth.getFullYear()}`;
    setSelectedDate(dateStr);
    
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    };
    setSelectedDateFull(dateObj.toLocaleDateString('en-US', options));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const prevDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    // Don't go back before the current month
    if (prevDate < new Date(today.getFullYear(), today.getMonth(), 1)) return;
    setCurrentMonth(prevDate);
  };

  // Sync full date when short date is typed manually
  useEffect(() => {
    const parts = selectedDate.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const year = parseInt(parts[2]);
      
      if (!isNaN(day) && !isNaN(month) && !isNaN(year) && year > 2000) {
        const dateObj = new Date(year, month, day);
        if (!isNaN(dateObj.getTime())) {
          const options: Intl.DateTimeFormatOptions = { 
            weekday: 'short', 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          };
          setSelectedDateFull(dateObj.toLocaleDateString('en-US', options));
        }
      }
    }
  }, [selectedDate]);

  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col">
      <Header />

      <PageHero 
        title={step === 1 ? <>Book Your Pass <br /> In Just a Few Clicks!</> : <>Complete Your <br /> Booking</>}
        subtitle={step === 1 ? "Get ready for unlimited fun with 40+ activities, exciting water rides, zones & more." : "Almost there! Provide your details to secure your spot at La La Land Park."}
        bgImage="/images/hero-bg-image-4.png"
        badgeText="Ticket Booking"
        primaryBtnText="Instant Confirmation"
        primaryBtnLink="#booking-form"
        secondaryBtnText="View Pricing"
        secondaryBtnLink="/packages"
      />

      {/* Main Content */}
      <section className="relative z-30 -mt-12 md:-mt-20 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Stepper Card - Professional Redesign */}
          <div className="relative mb-16 px-2 md:px-0">
            <div className="bg-white rounded-[40px] shadow-2xl shadow-zinc-200/60 border border-zinc-100 p-6 md:p-10 flex items-center justify-between gap-2 md:gap-4 relative overflow-hidden">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-3 relative z-10 flex-1 group">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-3xl flex items-center justify-center transition-all duration-700 ${
                  step >= 1 ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110' : 'bg-zinc-100 text-zinc-400'
                }`}>
                  <Ticket className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="text-center">
                  <p className={`text-[10px] md:text-[12px] uppercase tracking-widest transition-colors duration-500 ${step >= 1 ? 'text-secondary' : 'text-zinc-400'}`}>
                    Select Tickets
                  </p>
                  <p className="hidden md:block text-[10px] text-zinc-400 mt-1">Ticket & Date</p>
                </div>
              </div>

              {/* Progress Line 1 */}
              <div className="flex-grow h-1.5 md:h-2 bg-zinc-100 rounded-full relative mb-12 md:mb-14">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-1000 ease-out origin-left"
                  style={{ transform: `scaleX(${step > 1 ? 1 : 0})` }}
                />
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-3 relative z-10 flex-1 group">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-3xl flex items-center justify-center transition-all duration-700 ${
                  step >= 2 ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110' : 'bg-zinc-100 text-zinc-400'
                }`}>
                  <User className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="text-center">
                  <p className={`text-[10px] md:text-[12px] uppercase tracking-widest transition-colors duration-500 ${step >= 2 ? 'text-secondary' : 'text-zinc-400'}`}>
                    Visitor Info
                  </p>
                  <p className="hidden md:block text-[10px] text-zinc-400 mt-1">Your Details</p>
                </div>
              </div>

              {/* Progress Line 2 */}
              <div className="flex-grow h-1.5 md:h-2 bg-zinc-100 rounded-full relative mb-12 md:mb-14">
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-1000 ease-out origin-left"
                  style={{ transform: `scaleX(${step > 2 ? 1 : 0})` }}
                />
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-3 relative z-10 flex-1 group">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-3xl flex items-center justify-center transition-all duration-700 ${
                  step >= 3 ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-110' : 'bg-zinc-100 text-zinc-400'
                }`}>
                  <ShieldCheck className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <div className="text-center">
                  <p className={`text-[10px] md:text-[12px] uppercase tracking-widest transition-colors duration-500 ${step >= 3 ? 'text-secondary' : 'text-zinc-400'}`}>
                    Secure Pay
                  </p>
                  <p className="hidden md:block text-[10px] text-zinc-400 mt-1">Complete Pay</p>
                </div>
              </div>

            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side: Form Content */}
            <div className="lg:w-2/3 space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-[40px] shadow-2xl shadow-zinc-200/50 p-8 md:p-12 border border-zinc-50"
                  >
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                        <Ticket className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-secondary uppercase leading-none">Select Tickets</h2>
                        <p className="text-muted-foreground text-sm mt-1">Choose your ticket type and number of visitors</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {ticketTypes.map((ticket) => (
                          <div 
                          key={ticket.id}
                          className={`relative bg-white rounded-[30px] p-6 text-center border-2 transition-all ${
                            counts[ticket.id as keyof typeof counts] > 0 ? 'border-primary bg-primary/5' : 'border-zinc-100'
                          } ${ticket.popular ? 'shadow-lg' : ''}`}
                        >
                          {ticket.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-foreground px-4 py-1 rounded-full text-[8px] uppercase tracking-widest">
                              Popular
                            </div>
                          )}
                          
                          <div className="flex justify-center mb-4">
                            {ticket.icon}
                          </div>
                          
                          <h3 className="text-lg font-black text-secondary uppercase leading-none">{ticket.title}</h3>
                          <p className="text-[10px] text-zinc-400 mt-1 mb-4">{ticket.subtitle}</p>
                          
                          <div className="flex items-center justify-center gap-2 mb-6">
                             <span className="text-xs text-zinc-300 line-through">₹{ticket.originalPrice}</span>
                            <span className="text-2xl text-primary">₹{ticket.price}</span>
                          </div>

                          <div className="flex items-center justify-center gap-6">
                            <button 
                              onClick={() => updateCount(ticket.id, -1)}
                              className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-xl text-secondary w-6">{counts[ticket.id as keyof typeof counts]}</span>
                            <button 
                              onClick={() => updateCount(ticket.id, 1)}
                              className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-primary hover:text-white transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                            <CalendarIcon className="w-5 h-5" />
                          </div>
                          <h3 className="text-lg font-black text-secondary uppercase">Select Visit Date</h3>
                        </div>
                        
                        <div className="relative mb-8">
                          <input 
                            type="text" 
                            placeholder="dd-mm-yyyy"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-secondary text-secondary"
                          />
                          <CalendarIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        </div>

                        <div className="space-y-3">
                          <p className="text-[10px] text-zinc-400 flex gap-2">
                            <span className="text-success">•</span> Only kids with height between 90-120 CM are allowed with Kids pass.
                          </p>
                          <p className="text-[10px] text-zinc-400 flex gap-2">
                            <span className="text-success">•</span> Infants (below 90 CM) enter FREE.
                          </p>
                          <p className="text-[10px] text-zinc-400 flex gap-2">
                            <span className="text-success">•</span> Physically challenged visitors enter FREE.
                          </p>
                        </div>
                      </div>

                      {/* Calendar Widget */}
                      <div className="bg-zinc-50 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-6">
                          <button 
                            onClick={prevMonth}
                            className="text-zinc-400 hover:text-secondary transition-colors disabled:opacity-20"
                            disabled={currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()}
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <h4 className="text-sm font-black text-secondary uppercase tracking-widest">
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </h4>
                          <button 
                            onClick={nextMonth}
                            className="text-zinc-400 hover:text-secondary transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-2 mb-2">
                          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                            <div key={d} className="text-[8px] text-zinc-300 text-center">{d}</div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-7 gap-2">
                          {calendarDays.map((day, i) => {
                            const dateObj = day ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) : null;
                            const isPast = dateObj ? dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate()) : false;
                            const isSelected = day && parseInt(selectedDate.split('-')[0]) === day && 
                                             parseInt(selectedDate.split('-')[1]) === currentMonth.getMonth() + 1 &&
                                             parseInt(selectedDate.split('-')[2]) === currentMonth.getFullYear();

                            return (
                              <button 
                                key={i}
                                disabled={!day || isPast}
                                onClick={() => day && handleDateSelect(day)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] transition-all ${
                                  isSelected
                                    ? 'bg-primary text-white shadow-lg' 
                                    : day 
                                      ? isPast 
                                        ? 'text-zinc-200 cursor-not-allowed' 
                                        : 'text-secondary hover:bg-primary/5' 
                                      : 'text-transparent cursor-default'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setStep(2)}
                      className="w-full mt-12 py-5 bg-primary text-white rounded-full text-xs uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-3 group shadow-xl shadow-primary/20"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-[40px] shadow-2xl shadow-zinc-200/50 p-8 md:p-12 border border-zinc-50"
                  >
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-secondary-soft/20 flex items-center justify-center text-secondary">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-secondary uppercase leading-none">Your Details</h2>
                        <p className="text-zinc-400 text-sm mt-1">Please enter your details to continue</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] text-secondary uppercase tracking-widest ml-1">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                          <input 
                            type="text" 
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            className="w-full pl-16 pr-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-secondary uppercase tracking-widest ml-1">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="enter your email"
                            className="w-full pl-16 pr-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-secondary uppercase tracking-widest ml-1">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                          <input 
                            type="text" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="w-full pl-16 pr-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-secondary uppercase tracking-widest ml-1">City / Town *</label>
                        <div className="relative">
                          <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                          <input 
                            type="text" 
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter your city"
                            className="w-full pl-16 pr-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] text-secondary uppercase tracking-widest ml-1">Address *</label>
                        <div className="relative">
                          <Home className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-300" />
                          <input 
                            type="text" 
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                            className="w-full pl-16 pr-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-secondary uppercase tracking-widest ml-1">State *</label>
                        <select 
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary appearance-none"
                        >
                          <option>Kerala</option>
                          <option>Tamil Nadu</option>
                          <option>Karnataka</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-secondary uppercase tracking-widest ml-1">Pincode *</label>
                        <input 
                          type="text" 
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="Enter your pincode"
                          className="w-full px-6 py-4 rounded-2xl bg-zinc-50 border-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-secondary"
                        />
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-success/5 rounded-2xl flex items-center gap-4 text-[10px] text-success">
                      <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center text-white shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      Your information is safe with us and will only be used for your booking and notifications.
                    </div>

                    <div className="mt-12 flex items-center justify-between gap-6">
                      <button 
                        onClick={() => setStep(1)}
                        className="px-10 py-5 border-2 border-zinc-100 rounded-full text-xs uppercase tracking-widest text-zinc-400 hover:border-secondary hover:text-secondary transition-all flex items-center gap-2"
                      >
                        ← Back
                      </button>
                      <button 
                        onClick={() => setStep(3)}
                        className="flex-grow py-5 bg-primary text-white rounded-full text-xs uppercase tracking-widest hover:bg-primary-dark transition-all flex items-center justify-center gap-3 group shadow-xl shadow-primary/20"
                      >
                        Continue to Payment
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Summary Bar - Only visible in Step 1 */}
              {step === 1 && (
                <div className="bg-white rounded-full p-4 md:p-6 shadow-xl border border-zinc-50 flex flex-wrap items-center justify-center md:justify-between gap-6 px-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[8px] text-zinc-400 uppercase tracking-widest">Adults</p>
                      <p className="text-sm text-secondary">₹{counts.adult * 799}</p>
                    </div>
                  </div>
                  <div className="w-[1px] h-10 bg-zinc-100 hidden md:block" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                      <span>👦</span>
                    </div>
                    <div>
                      <p className="text-[8px] text-zinc-400 uppercase tracking-widest">Kids (90-120cm)</p>
                      <p className="text-sm text-secondary">₹{counts.kids * 599}</p>
                    </div>
                  </div>
                  <div className="w-[1px] h-10 bg-zinc-100 hidden md:block" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                      <span>👵</span>
                    </div>
                    <div>
                      <p className="text-[8px] text-zinc-400 uppercase tracking-widest">Senior Citizen</p>
                      <p className="text-sm text-secondary">₹{counts.senior * 300}</p>
                    </div>
                  </div>
                  <div className="w-[1px] h-10 bg-zinc-100 hidden md:block" />
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[8px] text-zinc-400 uppercase tracking-widest">Infant / Physically Challenged</p>
                      <p className="text-sm text-success">FREE</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side: Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="sidebar-step1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[40px] shadow-xl border border-zinc-50 overflow-hidden group"
                  >
                    <div className="relative h-48 bg-secondary-soft/30 flex items-center justify-center overflow-hidden">
                       <div className="relative z-10 scale-125">
                          <div className="flex items-end gap-2">
                            <div className="w-8 h-16 bg-accent/40 rounded-t-lg" />
                            <div className="w-12 h-24 bg-accent rounded-t-xl relative">
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-bottom-[24px] border-bottom-accent-dark" />
                            </div>
                            <div className="w-8 h-16 bg-accent/40 rounded-t-lg" />
                          </div>
                       </div>
                    </div>
                    <div className="p-10">
                      <h3 className="text-2xl font-black text-secondary uppercase mb-6">Enjoy More, Pay Less!</h3>
                      <ul className="space-y-4">
                        {[
                          "40+ Thrilling Rides & Activities",
                          "Water Rides &  Zones",
                          "Kids Play Area",
                          "Fun for All Age Groups",
                          "Safe, Clean & Family Friendly"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-zinc-500 text-sm">
                            <div className="w-5 h-5 rounded-full bg-success-soft flex items-center justify-center text-success">
                              <CheckCircle2 className="w-3 h-3" />
                            </div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="sidebar-step2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-[40px] shadow-xl border border-zinc-50 p-8 space-y-6"
                  >
                    <div className="flex items-center gap-4 border-b border-zinc-50 pb-6">
                      <div className="w-12 h-12 rounded-full bg-secondary-soft/20 flex items-center justify-center text-secondary">
                        <ShoppingCart className="w-6 h-6 opacity-40" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-secondary uppercase leading-none">Your Order Summary</h3>
                        <p className="text-zinc-400 text-xs mt-1">Review your selected items</p>
                      </div>
                    </div>

                    <div className="bg-secondary-soft/20 rounded-3xl p-6 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-secondary shadow-sm">
                        <CalendarIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest">Visit Date</p>
                        <p className="text-sm text-secondary">{selectedDateFull}</p>
                      </div>
                    </div>

                    <div className="space-y-4 px-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">👤</span>
                          <span className="text-xs text-zinc-500">Adults ({counts.adult})</span>
                        </div>
                        <span className="text-xs text-secondary">₹{counts.adult * 799}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">👦</span>
                          <span className="text-xs text-zinc-500">Kids ({counts.kids})</span>
                        </div>
                        <span className="text-xs text-secondary">₹{counts.kids * 599}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">👵</span>
                          <span className="text-xs text-zinc-500">Senior Citizen ({counts.senior})</span>
                        </div>
                        <span className="text-xs text-secondary">₹{counts.senior * 300}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-dashed border-zinc-200 flex items-center justify-between">
                      <span className="text-lg text-secondary uppercase">Total Amount</span>
                      <span className="text-2xl text-success">₹{totalAmount}.00</span>
                    </div>

                    <div className="p-4 bg-secondary/5 rounded-2xl flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-white shrink-0">
                        <Ticket className="w-5 h-5" />
                      </div>
                      <p className="text-[9px] text-secondary leading-tight italic">
                        Tickets are valid only for the selected date. Non-refundable & non-transferable.
                      </p>
                    </div>

                    <div className="p-4 bg-success/5 rounded-2xl flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-success flex items-center justify-center text-white shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-success uppercase leading-none mb-1">SSL Secured Checkout</p>
                        <p className="text-[9px] text-success leading-tight italic">Your payment details are 100% safe with us.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Help Card - Always visible */}
              <div className="bg-white rounded-[40px] shadow-xl border border-zinc-50 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-secondary">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-secondary uppercase leading-none">Need Help Booking?</h4>
                    <p className="text-zinc-400 text-xs mt-1">Our team is here to help you!</p>
                  </div>
                </div>
                
                <a 
                  href="tel:+917511183000"
                  className="flex items-center justify-center gap-3 py-5 rounded-2xl border-2 border-primary text-primary text-sm transition-all hover:bg-primary/5"
                >
                  <Phone className="w-5 h-5" />
                  Call us: +91 75111 83000
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer Section */}
      <section className="py-20 relative overflow-hidden bg-muted/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-gradient-to-r from-primary via-accent to-secondary rounded-[50px] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="relative z-10 max-w-xl text-center md:text-left">
               <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-none mb-4">Your Day of Fun Begins Here</h2>
               <p className="text-white/80 mb-8"> • Water Rides • Kids Play • Family Fun <br /> <span className="text-accent">Don't wait in line. Book online and save time!</span></p>
               <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* <button className="px-10 py-5 bg-accent text-foreground rounded-full text-xs uppercase tracking-widest shadow-xl hover:bg-white transition-all flex items-center gap-2">
                    Book Tickets <Ticket className="w-4 h-4" />
                  </button> */}
                  <button className="px-10 py-5 bg-white text-secondary rounded-full text-xs uppercase tracking-widest shadow-xl hover:bg-secondary-soft transition-all flex items-center gap-2">
                    Chat on WhatsApp <MessageCircle className="w-4 h-4 text-success fill-success" />
                  </button>
               </div>
            </div>
            
            {/* Castle Illustration Placeholder */}
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 opacity-90">
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-2">
                  <div className="w-12 h-32 bg-blue-400 rounded-t-xl" />
                  <div className="w-20 h-48 bg-blue-500 rounded-t-2xl relative">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-bottom-[40px] border-bottom-blue-300" />
                  </div>
                  <div className="w-12 h-32 bg-blue-400 rounded-t-xl" />
               </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BookPage;
