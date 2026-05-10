"use client";

import { useLang } from "../context/LangContext";

const supervisor = {
  name: "Dr. [Supervisor Name]",
  nameUr: "ڈاکٹر [نگران کا نام]",
  title: "Assistant Professor",
  titleUr: "اسسٹنٹ پروفیسر",
  department: "Department of Computer Science",
  departmentUr: "شعبہ کمپیوٹر سائنس",
  description: "Supervised and guided the research methodology, model architecture, and overall project direction for the Urdu News Bias Detection system.",
  descriptionUr: "اردو خبروں میں جانبداری کی شناخت کے نظام کی تحقیقی حکمت عملی، ماڈل کے فن تعمیر اور مجموعی پراجیکٹ کی سمت کی نگرانی اور رہنمائی فراہم کی۔",
  initial: "S",
};

const teamMembers = [
  {
    name: "Baseer Ahmed Tahir",
    nameUr: "بصیر احمد طاہر",
    role: "Team Lead / Full-Stack Developer",
    roleUr: "ٹیم لیڈ / فل اسٹیک ڈویلپر",
    id: "BSCS-XXXX",
    description: "Led the project development, built the full-stack web application with Next.js frontend and FastAPI backend, and integrated the ML pipeline into the production system.",
    descriptionUr: "پراجیکٹ کی ترقی کی قیادت کی، Next.js فرنٹ اینڈ اور FastAPI بیک اینڈ کے ساتھ فل اسٹیک ویب ایپلیکیشن بنائی، اور ML پائپ لائن کو پروڈکشن سسٹم میں ضم کیا۔",
    initial: "B",
  },
  {
    name: "[Member 2 Name]",
    nameUr: "[رکن 2 کا نام]",
    role: "ML Engineer / Data Scientist",
    roleUr: "ایم ایل انجینئر / ڈیٹا سائنٹسٹ",
    id: "BSCS-XXXX",
    description: "Developed and trained the bias detection ML models, including the TF-IDF + LaBSE hybrid pipeline and SHAP-based explainability module.",
    descriptionUr: "تعصب کی نشاندہی کے ML ماڈلز تیار اور تربیت دی، بشمول TF-IDF + LaBSE ہائبرڈ پائپ لائن اور SHAP پر مبنی وضاحتی ماڈیول۔",
    initial: "M",
  },
  {
    name: "[Member 3 Name]",
    nameUr: "[رکن 3 کا نام]",
    role: "Data Collection & Research",
    roleUr: "ڈیٹا اکٹھا کرنا اور تحقیق",
    id: "BSCS-XXXX",
    description: "Collected and curated the Urdu news dataset of 10,000+ samples, performed annotation, and contributed to the research paper and literature review.",
    descriptionUr: "10,000+ نمونوں کا اردو خبروں کا ڈیٹا سیٹ جمع اور تیار کیا، تشریح انجام دی، اور تحقیقی مقالے اور ادب کے جائزے میں حصہ ڈالا۔",
    initial: "R",
  },
];

export default function TeamPage() {
  const { lang } = useLang();
  const isUr = lang === "ur";

  return (
    <div>
      {/* Header */}
      <header className="border-b-2 border-black py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="kicker text-black mb-2">{isUr ? "فائنل ائیر پراجیکٹ" : "FINAL YEAR PROJECT"}</div>
          <h1 className="text-5xl md:text-7xl font-playfair font-black mb-4 tracking-tighter">
            {isUr ? "ہماری ٹیم" : "OUR TEAM"}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-lora italic">
            {isUr
              ? "اس پراجیکٹ کے پیچھے لوگ"
              : "The people behind this project."}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Supervisor Section */}
        <section className="mb-16 animate-fade-in-up stagger-1">
          <div className="kicker text-gray-500 mb-6 text-[10px] border-b border-black pb-2">
            {isUr ? "پراجیکٹ نگران" : "PROJECT SUPERVISOR"}
          </div>
          <div className="border-2 border-black p-1">
            <div className="border border-black p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Supervisor Avatar */}
              <div className="w-32 h-32 bg-black flex items-center justify-center shrink-0">
                <span className="text-5xl font-playfair font-black text-white">
                  {supervisor.initial}
                </span>
              </div>
              {/* Supervisor Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-playfair font-black tracking-tighter mb-1">
                  {isUr ? supervisor.nameUr : supervisor.name}
                </h2>
                <div className="kicker text-link-blue text-[11px] mb-1">
                  {isUr ? supervisor.titleUr : supervisor.title}
                </div>
                <div className="kicker text-gray-500 text-[10px] mb-4">
                  {isUr ? supervisor.departmentUr : supervisor.department}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {isUr ? supervisor.descriptionUr : supervisor.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members Section */}
        <section>
          <div className="kicker text-gray-500 mb-6 text-[10px] border-b border-black pb-2">
            {isUr ? "ٹیم کے اراکین" : "TEAM MEMBERS"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className={`border-2 border-black p-1 card-hover animate-fade-in-up stagger-${idx + 2}`}
              >
                <div className="border border-black p-6 flex flex-col items-center text-center h-full">
                  {/* Member Avatar */}
                  <div className="w-24 h-24 bg-black flex items-center justify-center mb-4">
                    <span className="text-4xl font-playfair font-black text-white">
                      {member.initial}
                    </span>
                  </div>
                  {/* Member Info */}
                  <h3 className="text-xl font-playfair font-black tracking-tighter mb-1">
                    {isUr ? member.nameUr : member.name}
                  </h3>
                  <div className="kicker text-link-blue text-[10px] mb-1">
                    {isUr ? member.roleUr : member.role}
                  </div>
                  <div className="kicker text-gray-400 text-[9px] mb-4">
                    {member.id}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {isUr ? member.descriptionUr : member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* University Info */}
        <section className="mt-16 border-t-2 border-black pt-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="kicker text-gray-400 text-[10px] mb-2">
                {isUr ? "یونیورسٹی" : "UNIVERSITY"}
              </div>
              <p className="font-playfair font-bold text-lg">[University Name]</p>
            </div>
            <div>
              <div className="kicker text-gray-400 text-[10px] mb-2">
                {isUr ? "شعبہ" : "DEPARTMENT"}
              </div>
              <p className="font-playfair font-bold text-lg">Computer Science</p>
            </div>
            <div>
              <div className="kicker text-gray-400 text-[10px] mb-2">
                {isUr ? "سال" : "SESSION"}
              </div>
              <p className="font-playfair font-bold text-lg">2025–2026</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
