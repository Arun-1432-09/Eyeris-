'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  MessageSquare,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Glasses,
  Building2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { createWhatsAppBookingLink } from '@/components/booking/WhatsAppSync';

interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  company: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

interface Lead {
  id: string;
  customerName: string;
  phone: string;
  source: string;
  interest: string;
  stage: 'New Lead' | 'Contacted' | 'Interested' | 'Appointment Booked' | 'Store Visit' | 'Purchase' | 'Follow-up';
  date: string;
  valueEst: string;
}

interface LensFinderSubmission {
  id: string;
  date: string;
  answers: {
    screenHours: string;
    driving: string;
    ageGroup: string;
    outdoorSun: string;
    budgetGoal: string;
  };
  recommendation: string;
  status: string;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: 'LEAD-101',
    customerName: 'Vikram Reddy',
    phone: '9849012345',
    source: 'Instagram Reel (Blue Cut vs Progressive)',
    interest: 'ZEISS DriveSafe + Stepper Titanium',
    stage: 'Appointment Booked',
    date: 'Today, 02:15 PM',
    valueEst: '₹22,000',
  },
  {
    id: 'LEAD-102',
    customerName: 'Ananya Sharma',
    phone: '9988776655',
    source: 'Corporate Calculator (Microsoft)',
    interest: '₹20,000 Corporate Vision Claim + Ray-Ban Aviator',
    stage: 'Contacted',
    date: 'Today, 11:30 AM',
    valueEst: '₹19,500',
  },
  {
    id: 'LEAD-103',
    customerName: 'Dr. Srinivas Rao',
    phone: '9440112233',
    source: 'Global Eye Hospital Corridor Referral',
    interest: 'Digital Progressive Freeform German Surfacing',
    stage: 'Store Visit',
    date: 'Yesterday',
    valueEst: '₹28,500',
  },
  {
    id: 'LEAD-104',
    customerName: 'Priya Kulkarni',
    phone: '9123456780',
    source: 'Lens Finder Diagnostic',
    interest: 'Pediatric Myopia Management (Child age 9)',
    stage: 'New Lead',
    date: '2 hours ago',
    valueEst: '₹14,000',
  },
  {
    id: 'LEAD-105',
    customerName: 'Mohammed Zeeshan',
    phone: '9876501234',
    source: 'Direct Website Search',
    interest: 'Oakley Hex Jector + Crizal Blue Filter',
    stage: 'Purchase',
    date: '10 Nov 2026',
    valueEst: '₹16,800',
  },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'EYR-84920',
    customerName: 'Karthik Varma',
    phone: '9876543210',
    service: '₹20,000 Corporate Vision Insurance Claim & Styling',
    date: '2026-11-15',
    time: '06:00 PM - 07:00 PM (Peak Tech Hour Slot)',
    company: 'TCS Hyderabad',
    status: 'Confirmed',
    createdAt: '2026-11-14',
  },
  {
    id: 'EYR-73910',
    customerName: 'Sneha Patel',
    phone: '9812345678',
    service: 'Lens Consultation (Progressive / Digital / DriveSafe)',
    date: '2026-11-15',
    time: '04:00 PM - 05:00 PM (Late Afternoon Slot)',
    company: 'Amazon HITEC City',
    status: 'Confirmed',
    createdAt: '2026-11-14',
  },
  {
    id: 'EYR-61204',
    customerName: 'Rajesh Goud',
    phone: '9900112233',
    service: 'Doctor Rx Lens Fitting (Global Eye Hospital Connected Corridor)',
    date: '2026-11-16',
    time: '11:00 AM - 12:00 PM (Morning Slot)',
    company: 'Individual',
    status: 'Confirmed',
    createdAt: '2026-11-13',
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'crm' | 'appointments' | 'lensfinder'>('overview');
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [lensFinderSubmissions, setLensFinderSubmissions] = useState<LensFinderSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Hydrate with local storage
  useEffect(() => {
    try {
      const storedAppts = localStorage.getItem('eyeris_appointments');
      if (storedAppts) {
        setAppointments(JSON.parse(storedAppts));
      }
      const storedLFF = localStorage.getItem('eyeris_lens_finder_leads');
      if (storedLFF) {
        setLensFinderSubmissions(JSON.parse(storedLFF));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateLeadStage = (leadId: string, newStage: Lead['stage']) => {
    setLeads(leads.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l)));
  };

  const updateApptStatus = (apptId: string, newStatus: Appointment['status']) => {
    const updated = appointments.map((a) => (a.id === apptId ? { ...a, status: newStatus } : a));
    setAppointments(updated);
    try {
      localStorage.setItem('eyeris_appointments', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const filteredAppointments = appointments.filter(
    (a) =>
      a.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm) ||
      a.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLeads = leads.filter(
    (l) =>
      l.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm) ||
      l.interest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stages: Lead['stage'][] = [
    'New Lead',
    'Contacted',
    'Interested',
    'Appointment Booked',
    'Store Visit',
    'Purchase',
    'Follow-up',
  ];

  return (
    <div className="min-h-screen bg-background text-ivory-100 flex flex-col font-sans">
      
      {/* Top Admin Bar */}
      <header className="border-b border-white/10 bg-graphite px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-serif font-bold text-xl tracking-tight text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-400/40 text-brand-300 flex items-center justify-center font-mono text-sm">
              EY
            </span>
            <span>EYERIS OPTICALS</span>
          </Link>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-400/30">
            STAFF CONSOLE // CRM PIPELINE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-mono text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10"
          >
            ← Back to Store Website
          </Link>
          <div className="w-8 h-8 rounded-full bg-champagne-500/20 border border-champagne-400/30 flex items-center justify-center text-xs font-bold text-champagne-300">
            EO
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-surface border-r border-white/10 p-4 space-y-2 shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-mono tracking-wider transition ${
              activeTab === 'overview'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-400/40 font-bold'
                : 'text-neutral-400 hover:bg-graphite hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>EXECUTIVE OVERVIEW</span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-mono tracking-wider transition ${
              activeTab === 'crm'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-400/40 font-bold'
                : 'text-neutral-400 hover:bg-graphite hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>WHATSAPP CRM PIPELINE</span>
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-mono tracking-wider transition ${
              activeTab === 'appointments'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-400/40 font-bold'
                : 'text-neutral-400 hover:bg-graphite hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>APPOINTMENT CALENDAR</span>
          </button>

          <button
            onClick={() => setActiveTab('lensfinder')}
            className={`w-full p-3 rounded-xl flex items-center gap-3 text-xs font-mono tracking-wider transition ${
              activeTab === 'lensfinder'
                ? 'bg-brand-500/20 text-brand-300 border border-brand-400/40 font-bold'
                : 'text-neutral-400 hover:bg-graphite hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>LENS FINDER ENQUIRIES</span>
          </button>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <span className="text-[11px] font-mono text-neutral-400 block px-2">STORE DETAILS</span>
            <div className="p-3 rounded-xl bg-graphite border border-white/5 text-xs text-neutral-300 space-y-1">
              <p className="font-semibold text-white">EYERIS Opticals</p>
              <p className="text-[11px] text-neutral-400">KPHB Road No. 1, Hyderabad</p>
              <p className="text-[11px] text-brand-300">Global Eye Hospital Connected</p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-3xl font-serif font-bold text-white">Store Analytics &amp; Conversion</h2>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  Real-time pipeline metrics from KPHB showroom, WhatsApp referrals &amp; Hospital Corridor
                </p>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-1">
                  <span className="text-xs font-mono text-neutral-400">ACTIVE LEADS</span>
                  <div className="text-3xl font-serif font-bold text-white">{leads.length}</div>
                  <span className="text-[11px] text-brand-400 font-mono">↑ 4 new today</span>
                </div>

                <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-1">
                  <span className="text-xs font-mono text-neutral-400">UPCOMING VIP VISITS</span>
                  <div className="text-3xl font-serif font-bold text-champagne-300">{appointments.length}</div>
                  <span className="text-[11px] text-champagne-400 font-mono">Zero slot conflicts</span>
                </div>

                <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-1">
                  <span className="text-xs font-mono text-neutral-400">AVG TICKET SIZE</span>
                  <div className="text-3xl font-serif font-bold text-white">₹19,200</div>
                  <span className="text-[11px] text-brand-400 font-mono">60–70% Lenses + Frames</span>
                </div>

                <div className="p-5 rounded-2xl bg-surface border border-white/10 space-y-1">
                  <span className="text-xs font-mono text-neutral-400">CORPORATE CLAIMS</span>
                  <div className="text-3xl font-serif font-bold text-optic-blue">₹1.48L</div>
                  <span className="text-[11px] text-optic-blue font-mono">TCS, Infosys, Amazon</span>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className="p-6 rounded-2xl bg-surface border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-white">Latest Confirmed Appointments</h3>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-mono text-brand-300 hover:text-white"
                  >
                    View All →
                  </button>
                </div>

                <div className="divide-y divide-white/5">
                  {appointments.slice(0, 4).map((a) => (
                    <div key={a.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-white">{a.customerName}</span>
                        <span className="text-neutral-400 ml-2 font-mono">({a.phone})</span>
                        <p className="text-[11px] text-champagne-400">{a.service}</p>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-neutral-300">{a.date}</span>
                        <p className="text-[11px] text-brand-300 font-mono">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WHATSAPP CRM PIPELINE */}
          {activeTab === 'crm' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-white">WhatsApp Lead Pipeline</h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Track leads from initial inquiry to physical showroom purchase and follow-up
                  </p>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-graphite border border-white/10 text-xs text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
              </div>

              {/* Kanban / Pipeline Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4">
                {stages.slice(0, 4).map((st) => {
                  const stageLeads = filteredLeads.filter((l) => l.stage === st);
                  return (
                    <div key={st} className="p-4 rounded-2xl bg-surface border border-white/10 flex flex-col min-h-[450px]">
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                        <span className="font-mono text-xs font-bold text-champagne-300">{st.toUpperCase()}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-graphite text-neutral-400">
                          {stageLeads.length}
                        </span>
                      </div>

                      <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
                        {stageLeads.map((l) => (
                          <div key={l.id} className="p-4 rounded-xl bg-graphite border border-white/10 space-y-2 hover:border-brand-400/40 transition">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">{l.customerName}</span>
                              <span className="text-[10px] font-mono text-brand-300 font-bold">{l.valueEst}</span>
                            </div>
                            <p className="text-[11px] text-neutral-300">{l.interest}</p>
                            <span className="text-[10px] text-neutral-500 block font-mono">Source: {l.source}</span>

                            <div className="pt-2 flex items-center justify-between border-t border-white/5">
                              <a
                                href={createWhatsAppBookingLink(`Hello ${l.customerName}! Following up from EYERIS Opticals regarding your inquiry on ${l.interest}.`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[11px] font-mono text-brand-300 hover:text-white flex items-center gap-1"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>

                              <select
                                value={l.stage}
                                onChange={(e) => updateLeadStage(l.id, e.target.value as Lead['stage'])}
                                className="bg-surface text-[10px] font-mono text-neutral-300 rounded px-1.5 py-1 border border-white/10 focus:outline-none"
                              >
                                {stages.map((s) => (
                                  <option key={s} value={s}>
                                    Move: {s}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: APPOINTMENT CALENDAR */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-white">Appointment Schedule</h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Confirmed customer slots at KPHB Road No. 1 showroom
                  </p>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-graphite border border-white/10 text-xs text-white focus:outline-none focus:border-brand-400"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="rounded-2xl bg-surface border border-white/10 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-graphite text-neutral-400 font-mono border-b border-white/10">
                    <tr>
                      <th className="p-4">REF ID</th>
                      <th className="p-4">CUSTOMER</th>
                      <th className="p-4">SERVICE</th>
                      <th className="p-4">DATE &amp; TIME</th>
                      <th className="p-4">COMPANY</th>
                      <th className="p-4">STATUS</th>
                      <th className="p-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {filteredAppointments.map((a) => (
                      <tr key={a.id} className="hover:bg-white/[0.02]">
                        <td className="p-4 font-mono text-brand-300 font-bold">{a.id}</td>
                        <td className="p-4">
                          <p className="font-semibold text-white">{a.customerName}</p>
                          <p className="text-[11px] text-neutral-400 font-mono">{a.phone}</p>
                        </td>
                        <td className="p-4 text-neutral-300 max-w-xs">{a.service}</td>
                        <td className="p-4 font-mono">
                          <p className="text-white">{a.date}</p>
                          <p className="text-[11px] text-champagne-400">{a.time}</p>
                        </td>
                        <td className="p-4 text-neutral-400">{a.company}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono ${
                              a.status === 'Confirmed'
                                ? 'bg-brand-500/20 text-brand-300 border border-brand-400/30'
                                : a.status === 'Completed'
                                ? 'bg-champagne-500/20 text-champagne-300'
                                : 'bg-red-500/20 text-red-300'
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          {a.status !== 'Completed' && (
                            <button
                              onClick={() => updateApptStatus(a.id, 'Completed')}
                              className="px-2 py-1 rounded bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 font-mono text-[10px]"
                            >
                              Complete
                            </button>
                          )}
                          {a.status !== 'Cancelled' && (
                            <button
                              onClick={() => updateApptStatus(a.id, 'Cancelled')}
                              className="px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-300 font-mono text-[10px]"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: LENS FINDER ENQUIRIES */}
          {activeTab === 'lensfinder' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-serif font-bold text-white">Lens Finder Inquiries</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Questionnaire submissions with user lifestyle parameters
                </p>
              </div>

              {lensFinderSubmissions.length === 0 ? (
                <div className="p-12 rounded-2xl bg-surface border border-white/10 text-center space-y-2">
                  <Eye className="w-8 h-8 text-neutral-500 mx-auto" />
                  <p className="text-sm text-neutral-300 font-serif">No new questionnaire submissions logged yet.</p>
                  <p className="text-xs text-neutral-500 font-mono">
                    Submissions through the website Lens Finder will automatically appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lensFinderSubmissions.map((sub) => (
                    <div key={sub.id} className="p-5 rounded-2xl bg-surface border border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-brand-300 font-bold">{sub.id}</span>
                        <span className="text-neutral-500">{new Date(sub.date).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white">
                        Recommended: <span className="text-champagne-300">{sub.recommendation}</span>
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-neutral-400 font-mono">
                        <div>Screens: {sub.answers.screenHours}</div>
                        <div>Driving: {sub.answers.driving}</div>
                        <div>Age: {sub.answers.ageGroup}</div>
                        <div>Goal: {sub.answers.budgetGoal}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
