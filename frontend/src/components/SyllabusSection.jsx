import React from 'react';
import { ShieldCheck, Compass, AlertTriangle, Wrench, HeartPulse, Check, ArrowRight } from 'lucide-react';

export default function SyllabusSection({ onStartExam }) {
  const domains = [
    {
      title: 'Defensive Driving Techniques',
      subtitle: 'Hazard Perception & Collision Avoidance',
      icon: Compass,
      color: 'teal',
      topics: [
        'SIPDE Method (Scan, Identify, Predict, Decide, Execute)',
        '3-Second safe following distance and wet weather multipliers',
        'Hydroplaning recovery and skid control without panic braking',
        'Night driving glare mitigation and proper headlight dip etiquette',
        'Blind spot management and head-check requirements'
      ]
    },
    {
      title: 'Traffic Signs & Regulations',
      subtitle: 'Indian Motor Vehicles Act 2019/2020 Compliance',
      icon: AlertTriangle,
      color: 'amber',
      topics: [
        'Mandatory regulatory signs (Stop, Yield/Give Way, Speed Limits)',
        'Cautionary and warning signs (curves, pedestrian crossings)',
        'Roundabout priority rules and multi-lane overtaking ethics',
        'Pavement markings: Solid vs broken center lines & stop lines',
        'Blood alcohol concentration (BAC) legal limits & penal provisions'
      ]
    },
    {
      title: 'Vehicle Safety & Inspection',
      subtitle: 'Preventative Maintenance & Pre-trip Protocols',
      icon: Wrench,
      color: 'blue',
      topics: [
        'FLOWER / POWER pre-departure vehicle inspection routine',
        'Tire tread depth legal limit (1.6 mm) and cold pressure checks',
        'Anti-lock Braking System (ABS) and warning lamp diagnostics',
        'Three-point seatbelt occupant physics and child restraint seats',
        'Engine coolant, fluid leak detection and electrical battery care'
      ]
    },
    {
      title: 'First Aid & Emergency Response',
      subtitle: 'Accident Golden Hour & Fire Safety',
      icon: HeartPulse,
      color: 'rose',
      topics: [
        'The Trauma Golden Hour and immediate resuscitation priority',
        'Good Samaritan legal protections under Supreme Court guidelines',
        'PASS method for vehicle fire extinguishers (Pull, Aim, Squeeze, Sweep)',
        'Recovery position for breathing unconscious crash victims',
        'High-speed highway breakdown reflective warning triangle placement'
      ]
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full border border-teal-200">
            Comprehensive Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Topics Covered in the Certification Exam
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Every candidate is assessed on 15 dynamically selected questions across these four high-priority safety domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {domains.map((domain, idx) => {
            const Icon = domain.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{domain.title}</h3>
                    <p className="text-xs text-slate-500 font-medium">{domain.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  {domain.topics.map((topic, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-relaxed">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action card */}
        <div className="mt-12 text-center bg-white rounded-2xl p-8 border border-slate-200 max-w-2xl mx-auto shadow-xs">
          <h4 className="text-xl font-bold text-slate-900">Ready to test your road safety knowledge?</h4>
          <p className="text-xs text-slate-500 mt-2">
            The exam takes only 15 minutes. 70% required to qualify for certificate. Only ₹100 upon passing.
          </p>
          <div className="mt-5">
            <button
              onClick={onStartExam}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition shadow-md shadow-teal-900/10"
            >
              <span>Begin MCQ Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
