'use client';

import React from 'react';
import { Building2, Stethoscope, ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { EYERIS_LOCATION_URL } from '@/components/booking/WhatsAppSync';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface HospitalConnectionProps {
  onOpenBooking: () => void;
}

export const HospitalConnection: React.FC<HospitalConnectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-24 sm:py-36 bg-[#050505] text-white border-b border-[#292929] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal variant="fadeUp" className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#707070] mb-3">
            GROUND-FLOOR INTERCONNECTED CORRIDOR // KPHB ROAD NO. 1
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            WHERE VISION <br />
            <span className="font-light text-[#A1A1A6]">MEETS EXPERTISE.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1A6] font-light mt-4 leading-relaxed">
            The hospital next door offers comprehensive clinical eye examinations, optometrist consultations, and power testing. Eyeris is internally connected via the ground-floor hospital counter, allowing you to collect your prescription printout and select your frames and lenses in one single visit.
          </p>
        </ScrollReveal>

        {/* Architectural Line-Art Visual & Flow Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Architectural Line-Art of Two Connected Buildings (7 cols) */}
          <ScrollReveal variant="fadeUp" delay={0.1} className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#101010] border border-[#292929] relative overflow-hidden flex flex-col justify-between min-h-[420px]">
              
              {/* Top Architecture Label */}
              <div className="flex items-center justify-between text-xs font-mono text-[#A1A1A6] pb-4 border-b border-[#292929]">
                <span className="uppercase tracking-widest">Architectural Elevation</span>
                <span>KPHB Road No. 1 • Kukatpally</span>
              </div>

              {/* Minimal Line-Art Vector Illustration of Two Connected Buildings */}
              <div className="my-auto py-8 flex items-center justify-center">
                <svg className="w-full max-w-lg h-56" viewBox="0 0 500 220" fill="none">
                  {/* Building 1: Global Eye Hospital */}
                  <rect x="40" y="30" width="160" height="170" rx="4" stroke="#444444" strokeWidth="1.5" />
                  <line x1="40" y1="65" x2="200" y2="65" stroke="#292929" strokeWidth="1" />
                  <line x1="40" y1="100" x2="200" y2="100" stroke="#292929" strokeWidth="1" />
                  <line x1="40" y1="135" x2="200" y2="135" stroke="#292929" strokeWidth="1" />
                  {/* Hospital Grid Windows */}
                  <rect x="65" y="42" width="25" height="15" rx="2" stroke="#666666" strokeWidth="1" />
                  <rect x="110" y="42" width="25" height="15" rx="2" stroke="#666666" strokeWidth="1" />
                  <rect x="155" y="42" width="25" height="15" rx="2" stroke="#666666" strokeWidth="1" />
                  <rect x="65" y="77" width="25" height="15" rx="2" stroke="#666666" strokeWidth="1" />
                  <rect x="110" y="77" width="25" height="15" rx="2" stroke="#666666" strokeWidth="1" />
                  <rect x="155" y="77" width="25" height="15" rx="2" stroke="#666666" strokeWidth="1" />
                  <rect x="65" y="112" width="25" height="15" rx="2" stroke="#666666" strokeWidth="1" />
                  <rect x="110" y="112" width="25" height="15" rx="2" stroke="#666666" strokeWidth="1" />
                  <rect x="155" y="112" width="25" height="15" rx="2" stroke="#666666" strokeWidth="1" />

                  {/* Building 2: Eyeris Opticals Standalone Showroom */}
                  <rect x="300" y="60" width="160" height="140" rx="4" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="300" y1="95" x2="460" y2="95" stroke="#292929" strokeWidth="1" />
                  <line x1="300" y1="130" x2="460" y2="130" stroke="#292929" strokeWidth="1" />
                  {/* Showroom Display Windows */}
                  <rect x="325" y="72" width="110" height="16" rx="2" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="325" y="105" width="110" height="18" rx="2" stroke="#FFFFFF" strokeWidth="1" />
                  <rect x="325" y="142" width="110" height="40" rx="2" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="3 3" />

                  {/* Ground Floor Connecting Corridor Link */}
                  <rect x="200" y="145" width="100" height="55" fill="rgba(255,255,255,0.04)" stroke="#D4AF37" strokeWidth="1.5" />
                  <line x1="200" y1="172" x2="300" y2="172" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Labels on Building Roofs */}
                  <text x="50" y="22" fill="#A1A1A6" fontSize="9" fontFamily="monospace" letterSpacing="1">
                    GLOBAL EYE HOSPITAL
                  </text>
                  <text x="315" y="52" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                    EYERIS OPTICALS
                  </text>
                  <text x="210" y="137" fill="#D4AF37" fontSize="8" fontFamily="monospace" letterSpacing="1">
                    GROUND CORRIDOR
                  </text>
                </svg>
              </div>

              {/* Bottom Clarification */}
              <div className="pt-4 border-t border-[#292929] flex items-center justify-between text-xs font-mono text-[#707070]">
                <span>Medical examinations attributed exclusively to Global Eye Hospital.</span>
                <span className="text-white">Zero City Travel</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Key Corridor Attributes (5 cols) */}
          <ScrollReveal variant="fadeUp" delay={0.2} className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-[#101010] border border-[#292929] space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-white font-semibold">
                <Stethoscope className="w-4 h-4 text-white" />
                <span>Global Eye Hospital Services</span>
              </div>
              <ul className="text-xs text-[#A1A1A6] space-y-2 font-mono pl-6 list-disc">
                <li>Doctor consultations &amp; clinical eye examinations</li>
                <li>Optometrist consultations &amp; computerized eye power testing</li>
                <li>Retina screenings &amp; comprehensive vision assessments</li>
                <li>Prescription eye drops and specialized eye medicines</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-[#101010] border border-[#292929] space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-white font-semibold">
                <Building2 className="w-4 h-4 text-white" />
                <span>Eyeris Opticals Ground-Floor Role</span>
              </div>
              <ul className="text-xs text-[#A1A1A6] space-y-2 font-mono pl-6 list-disc">
                <li>Immediate physical transfer of doctor prescription printouts</li>
                <li>Wide collection of international frames for all face shapes</li>
                <li>Pantoscopic tilt and custom digital lens surfacing calibration</li>
                <li>Same-day delivery coordination on standard single-vision powers</li>
              </ul>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={onOpenBooking}
                className="flex-1 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-mono font-semibold text-xs tracking-wider transition text-center"
              >
                BOOK EXAM &amp; FITTING VISIT
              </button>

              <a
                href={EYERIS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-full border border-[#292929] hover:bg-white/5 text-white font-mono text-xs tracking-wider flex items-center justify-center transition"
                title="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
