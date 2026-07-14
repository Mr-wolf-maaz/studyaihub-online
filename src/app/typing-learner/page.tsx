"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Keyboard, Clock, Target, Zap, RotateCcw, Award, BarChart3,
  BookOpen, Gamepad2, Trophy, Moon, Sun, ChevronRight,
  Flame, CheckCircle2, Download, X, Play,
} from "lucide-react";

type Language = "english" | "urdu" | "hindi";
type Tab = "lessons" | "test" | "practice" | "games" | "stats" | "profile";

/* ─── Key Maps (physical QWERTY key code → target language character) ─── */
const codeToUrdu: Record<string, string> = {
  KeyQ:"ق",KeyW:"و",KeyE:"ع",KeyR:"ر",KeyT:"ت",KeyY:"ے",KeyU:"ء",KeyI:"ی",KeyO:"و",KeyP:"پ",
  KeyA:"ا",KeyS:"س",KeyD:"د",KeyF:"ف",KeyG:"گ",KeyH:"ہ",KeyJ:"ج",KeyK:"ک",KeyL:"ل",Semicolon:"؛",
  KeyZ:"ز",KeyX:"ش",KeyC:"چ",KeyV:"ط",KeyB:"ب",KeyN:"ن",KeyM:"م",Comma:"،",Period:"۔",Slash:"/",
  Space:" ",
};
const codeToHindi: Record<string, string> = {
  KeyQ:"ौ",KeyW:"ै",KeyE:"ा",KeyR:"ी",KeyT:"ू",KeyY:"ब",KeyU:"ह",KeyI:"ग",KeyO:"द",KeyP:"ज",
  KeyA:"ो",KeyS:"े",KeyD:"्",KeyF:"ि",KeyG:"ु",KeyH:"प",KeyJ:"र",KeyK:"क",KeyL:"त",Semicolon:"च",
  KeyZ:"ॆ",KeyX:"ं",KeyC:"म",KeyV:"न",KeyB:"व",KeyN:"ल",KeyM:"स",Comma:",",Period:"।",Slash:"/",
  Space:" ",
};
const codeToEnglish: Record<string, string> = {
  KeyQ:"q",KeyW:"w",KeyE:"e",KeyR:"r",KeyT:"t",KeyY:"y",KeyU:"u",KeyI:"i",KeyO:"o",KeyP:"p",
  KeyA:"a",KeyS:"s",KeyD:"d",KeyF:"f",KeyG:"g",KeyH:"h",KeyJ:"j",KeyK:"k",KeyL:"l",Semicolon:";",
  KeyZ:"z",KeyX:"x",KeyC:"c",KeyV:"v",KeyB:"b",KeyN:"n",KeyM:"m",Comma:",",Period:".",Slash:"/",
  Space:" ",BracketLeft:"[",BracketRight:"]",Quote:"'",Backquote:"`",Digit1:"1",Digit2:"2",Digit3:"3",Digit4:"4",Digit5:"5",Digit6:"6",Digit7:"7",Digit8:"8",Digit9:"9",Digit0:"0",Minus:"-",Equal:"=",
};
const codeMaps: Record<Language, Record<string, string>> = { english: codeToEnglish, urdu: codeToUrdu, hindi: codeToHindi };

// Reverse map: character → key code
function buildReverseMap(map: Record<string, string>): Record<string, string> {
  const rev: Record<string, string> = {};
  for (const [code, ch] of Object.entries(map)) { rev[ch] = code; }
  return rev;
}

/* ─── Keyboard Layouts (visual) ─── */
const kbLayouts: Record<Language, { code: string; label: string }[][]> = {
  english: [
    [{code:"Backquote",label:"`"},{code:"Digit1",label:"1"},{code:"Digit2",label:"2"},{code:"Digit3",label:"3"},{code:"Digit4",label:"4"},{code:"Digit5",label:"5"},{code:"Digit6",label:"6"},{code:"Digit7",label:"7"},{code:"Digit8",label:"8"},{code:"Digit9",label:"9"},{code:"Digit0",label:"0"},{code:"Minus",label:"-"},{code:"Equal",label:"="}],
    [{code:"KeyQ",label:"Q"},{code:"KeyW",label:"W"},{code:"KeyE",label:"E"},{code:"KeyR",label:"R"},{code:"KeyT",label:"T"},{code:"KeyY",label:"Y"},{code:"KeyU",label:"U"},{code:"KeyI",label:"I"},{code:"KeyO",label:"O"},{code:"KeyP",label:"P"},{code:"BracketLeft",label:"["},{code:"BracketRight",label:"]"}],
    [{code:"KeyA",label:"A"},{code:"KeyS",label:"S"},{code:"KeyD",label:"D"},{code:"KeyF",label:"F"},{code:"KeyG",label:"G"},{code:"KeyH",label:"H"},{code:"KeyJ",label:"J"},{code:"KeyK",label:"K"},{code:"KeyL",label:"L"},{code:"Semicolon",label:";"},{code:"Quote",label:"'"}],
    [{code:"KeyZ",label:"Z"},{code:"KeyX",label:"X"},{code:"KeyC",label:"C"},{code:"KeyV",label:"V"},{code:"KeyB",label:"B"},{code:"KeyN",label:"N"},{code:"KeyM",label:"M"},{code:"Comma",label:","},{code:"Period",label:"."},{code:"Slash",label:"/"}],
  ],
  urdu: [
    [{code:"Digit1",label:"۱"},{code:"Digit2",label:"۲"},{code:"Digit3",label:"۳"},{code:"Digit4",label:"۴"},{code:"Digit5",label:"۵"},{code:"Digit6",label:"۶"},{code:"Digit7",label:"۷"},{code:"Digit8",label:"۸"},{code:"Digit9",label:"۹"},{code:"Digit0",label:"۰"},{code:"Minus",label:"-"},{code:"Equal",label:"="}],
    [{code:"KeyQ",label:"ق"},{code:"KeyW",label:"و"},{code:"KeyE",label:"ع"},{code:"KeyR",label:"ر"},{code:"KeyT",label:"ت"},{code:"KeyY",label:"ے"},{code:"KeyU",label:"ء"},{code:"KeyI",label:"ی"},{code:"KeyO",label:"و"},{code:"KeyP",label:"پ"}],
    [{code:"KeyA",label:"ا"},{code:"KeyS",label:"س"},{code:"KeyD",label:"د"},{code:"KeyF",label:"ف"},{code:"KeyG",label:"گ"},{code:"KeyH",label:"ہ"},{code:"KeyJ",label:"ج"},{code:"KeyK",label:"ک"},{code:"KeyL",label:"ل"},{code:"Semicolon",label:"؛"}],
    [{code:"KeyZ",label:"ز"},{code:"KeyX",label:"ش"},{code:"KeyC",label:"چ"},{code:"KeyV",label:"ط"},{code:"KeyB",label:"ب"},{code:"KeyN",label:"ن"},{code:"KeyM",label:"م"},{code:"Comma",label:"،"},{code:"Period",label:"۔"},{code:"Slash",label:"/"}],
  ],
  hindi: [
    [{code:"Digit1",label:"१"},{code:"Digit2",label:"२"},{code:"Digit3",label:"३"},{code:"Digit4",label:"४"},{code:"Digit5",label:"५"},{code:"Digit6",label:"६"},{code:"Digit7",label:"७"},{code:"Digit8",label:"८"},{code:"Digit9",label:"९"},{code:"Digit0",label:"०"},{code:"Minus",label:"-"},{code:"Equal",label:"="}],
    [{code:"KeyQ",label:"ौ"},{code:"KeyW",label:"ै"},{code:"KeyE",label:"ा"},{code:"KeyR",label:"ी"},{code:"KeyT",label:"ू"},{code:"KeyY",label:"ब"},{code:"KeyU",label:"ह"},{code:"KeyI",label:"ग"},{code:"KeyO",label:"द"},{code:"KeyP",label:"ज"}],
    [{code:"KeyA",label:"ो"},{code:"KeyS",label:"े"},{code:"KeyD",label:"्"},{code:"KeyF",label:"ि"},{code:"KeyG",label:"ु"},{code:"KeyH",label:"प"},{code:"KeyJ",label:"र"},{code:"KeyK",label:"क"},{code:"KeyL",label:"त"},{code:"Semicolon",label:"च"}],
    [{code:"KeyZ",label:"ॆ"},{code:"KeyX",label:"ं"},{code:"KeyC",label:"म"},{code:"KeyV",label:"न"},{code:"KeyB",label:"व"},{code:"KeyN",label:"ल"},{code:"KeyM",label:"स"},{code:"Comma",label:","},{code:"Period",label:"।"},{code:"Slash",label:"/"}],
  ],
};

/* ─── Finger mapping (key code → finger index 0-9) ─── */
const fingerMapCode: Record<string, number> = {
  Backquote:0,Digit1:0,Digit2:1,Digit3:2,Digit4:3,Digit5:3,Digit6:6,Digit7:6,Digit8:7,Digit9:8,Digit0:9,Minus:9,Equal:9,
  KeyQ:0,KeyW:1,KeyE:2,KeyR:3,KeyT:3,KeyY:6,KeyU:6,KeyI:7,KeyO:8,KeyP:9,BracketLeft:9,BracketRight:9,
  KeyA:0,KeyS:1,KeyD:2,KeyF:3,KeyG:3,KeyH:6,KeyJ:6,KeyK:7,KeyL:8,Semicolon:9,Quote:9,
  KeyZ:0,KeyX:1,KeyC:2,KeyV:3,KeyB:3,KeyN:6,KeyM:7,Comma:8,Period:9,Slash:9,
  Space:3,
};
const fingerColors = ["#ef4444","#f97316","#eab308","#22c55e","#22c55e","#06b6d4","#3b82f6","#8b5cf6","#ec4899","#ec4899"];
const fingerNames = ["L.Pinky","L.Ring","L.Middle","L.Index","L.Index","R.Index","R.Index","R.Middle","R.Ring","R.Pinky"];

/* ─── Lesson Data ─── */
const lessonsData: Record<Language, { beginner: { name: string; text: string }[]; intermediate: { name: string; text: string }[]; advanced: { name: string; text: string }[] }> = {
  english: {
    beginner: [
      { name: "Home Row: F & J", text: "f j f j f j j f j f ff jj fj jf fj jf" },
      { name: "Home Row: D & K", text: "d k d k d k k d k d dd kk dk kd dk kd df jk fd kj" },
      { name: "Home Row: S & L", text: "s l s l s l l s l s ss ll sl ls sl ls sd kl ds lk" },
      { name: "Home Row: A & ;", text: "a ; a ; a ; ; a ; a aa ;; a; ;a as ;l sa l;" },
      { name: "Home Row: G & H", text: "g h g h g h h g h g gg hh gh hg gh hg gad had" },
      { name: "Full Home Row", text: "asdf jkl; asdf jkl; gh fj dk sl a; sad fad lad had gas dash flash glad" },
      { name: "Top Row: Q & P", text: "q p q p q p p q p q qq pp qp pq qu pu" },
      { name: "Top Row: W & O", text: "w o w o w o o w o w ww oo wo ow ow wo work word" },
      { name: "Top Row: E & I", text: "e i e i e i i e i e ee ii ei ie ie ei email idle" },
      { name: "Top Row: R & U", text: "r u r u r u u r u r rr uu ru ur ru ur run rule" },
      { name: "Top Row: T & Y", text: "t y t y t y y t y t tt yy ty yt ty yt try type" },
      { name: "Full Top Row", text: "query write power point queen require output property type your require" },
      { name: "Bottom Row", text: "zinc verb next move cash box command zinc verb move next cash box command" },
      { name: "All Letters", text: "the quick brown fox jumps over the lazy dog pack my box with five dozen liquor jugs" },
      { name: "Numbers", text: "123 456 789 012 345 678 901 234 567 890 1024 2048 9999" },
    ],
    intermediate: [
      { name: "Common Words", text: "the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us" },
      { name: "Sentences", text: "The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. A stitch in time saves nine. Actions speak louder than words. Every cloud has a silver lining. Practice makes perfect." },
      { name: "Paragraphs", text: "Programming is the art of telling another human being what one wants the computer to do. It requires logical thinking and attention to detail. Every line of code serves a purpose in the larger system." },
      { name: "Email Writing", text: "Dear Team, I hope this email finds you well. I wanted to follow up on our discussion from yesterday regarding the project timeline. Please review and provide feedback by Friday. Best regards." },
      { name: "Code Typing", text: "function calculateSum(arr) { return arr.reduce((acc, val) => acc + val, 0); } const result = calculateSum([1, 2, 3, 4, 5]); console.log(result);" },
    ],
    advanced: [
      { name: "Legal Document", text: "WHEREAS the Party of the First Part hereby agrees to indemnify and hold harmless the Party of the Second Part against any and all claims damages losses and expenses arising from the aforementioned transaction." },
      { name: "Technical Writing", text: "The microservices architecture decomposes monolithic applications into loosely coupled independently deployable services each encapsulating a specific business capability communicating through well defined APIs." },
      { name: "Speed Drill", text: "algorithm implementation synchronization asynchronous concurrency polymorphism encapsulation inheritance abstraction dependency injection middleware infrastructure scalability optimization authentication authorization" },
    ],
  },
  urdu: {
    beginner: [
      { name: "ا اور ب", text: "ا ب ا ب ا ب ب ا ب ا اب با اب با" },
      { name: "ق اور و", text: "ق و ق و ق و و ق و ق قو وق قو وق" },
      { name: "ع اور ر", text: "ع ر ع ر ع ر ر ع ر ععر رع عر رع" },
      { name: "ت اور ی", text: "ت ی ت ی ت ی ی ت ی تتی یت تی یت" },
      { name: "ف اور ک", text: "ف ک ف ک ف ک ک ف ک ف فک کف فک کف" },
      { name: "سادہ الفاظ", text: "اردو پاکستان تعلیم کتاب قلم روشن" },
    ],
    intermediate: [
      { name: "عام الفاظ", text: "اور ہے کی میں نے کو یہ وہ پر سے ایک تھا ہو گی کا بھی لیکن اب تک جب کہ یہاں وہاں کچھ بہت سب پھر کر دی" },
      { name: "جملے", text: "اردو ایک خوبصورت زبان ہے۔ تعلیم سب سے ضروری ہے۔ مشق کامل بناتی ہے۔" },
      { name: "پیراگراف", text: "ٹیکنالوجی نے ہماری زندگیوں کو بہت تبدیل کر دیا ہے۔ کمپیوٹر اور انٹرنیٹ نے تعلیم اور کاروبار میں انقلاب لا دیا ہے۔" },
    ],
    advanced: [
      { name: "ادبی اردو", text: "پاکستان میں تعلیمی نظام کو بہتر بنانے کے لیے جامع اصلاحات کی ضرورت ہے۔ جدید ٹیکنالوجی کو نصاب میں شامل کرنا ضروری ہے۔" },
    ],
  },
  hindi: {
    beginner: [
      { name: "क और ब", text: "क ब क ब क ब ब क ब क कब बक कब बक" },
      { name: "प और र", text: "प र प र प र र प र पपर रप पर रप" },
      { name: "ह और ग", text: "ह ग ह ग ह ग ग ह ग हहग गह हग गह" },
      { name: "त और द", text: "त द त द त द द त द ततद दत तद दत" },
      { name: "सामान्य शब्द", text: "हिन्दी भारत शिक्षा किताब प्यार" },
    ],
    intermediate: [
      { name: "सामान्य शब्द", text: "और है की में ने को यह वह पर से एक था हो गी का भी लेकिन अब तक जब कि यहाँ वहाँ कुछ बहत सब फिर कर दी" },
      { name: "वाक्य", text: "हिन्दी एक सुन्दर भाषा है। शिक्षा सबसे जरूरी है। अभ्यास पूर्ण बनाता है।" },
      { name: "अनुच्छेद", text: "प्रौद्योगिकी ने हमारे जीवन को पूरी तरह बदल दिया है। कंप्यूटर और इंटरनेट ने शिक्षा में क्रांति ला दी है।" },
    ],
    advanced: [
      { name: "साहित्यिक हिन्दी", text: "भारत में शिक्षा प्रणाली को बेहतर बनाने के लिए व्यापक सुधारों की आवश्यकता है। आधुनिक प्रौद्योगिकी को पाठ्यक्रम में शामिल करना आवश्यक है।" },
    ],
  },
};

const testTexts: Record<Language, string[]> = {
  english: [
    "The quick brown fox jumps over the lazy dog near the riverbank while the sun sets behind the mountains painting the sky in shades of orange and purple",
    "Programming is not about typing speed but about thinking clearly and solving problems efficiently with elegant code that others can understand",
    "Success is not final failure is not fatal it is the courage to continue that counts and the determination to keep moving forward despite obstacles",
  ],
  urdu: [
    "اردو زبان برصغیر کی سب سے خوبصورت اور شاعرانہ زبانوں میں سے ایک ہے جس کی تاریخ بہت پرانی ہے",
    "ٹیکنالوجی نے ہماری زندگیوں کو بہت تبدیل کر دیا ہے اور ہر شعبے میں انقلاب لا دیا ہے",
    "تعلیم سب سے ضروری چیز ہے اور ہر انسان کو تعلیم حاصل کرنی چاہیے تاکہ وہ ترقی کر سکے",
  ],
  hindi: [
    "हिन्दी भारत की राजभाषा है और दुनिया की सबसे अधिक बोली जाने वाली भाषाओं में से एक है",
    "प्रौद्योगिकी ने हमारे जीवन को पूरी तरह बदल दिया है और हर क्षेत्र में क्रांति ला दी है",
    "शिक्षा सबसे जरूरी चीज़ है और हर इंसान को शिक्षा प्राप्त करनी चाहिए ताकि वह विकास कर सके",
  ],
};

const achievements = [
  { id: "first_lesson", name: "First Steps", desc: "Complete your first lesson", icon: "🎯" },
  { id: "speed_30", name: "Getting Fast", desc: "Reach 30 WPM", icon: "⚡" },
  { id: "speed_50", name: "Speed Demon", desc: "Reach 50 WPM", icon: "🚀" },
  { id: "speed_100", name: "Typing Master", desc: "Reach 100 WPM", icon: "👑" },
  { id: "perfect", name: "Perfectionist", desc: "Get 100% accuracy", icon: "💯" },
  { id: "streak_7", name: "Weekly Warrior", desc: "7 day streak", icon: "🔥" },
  { id: "tests_10", name: "Test Taker", desc: "Complete 10 tests", icon: "📝" },
  { id: "multi_lang", name: "Polyglot", desc: "Practice all 3 languages", icon: "🌍" },
  { id: "game_5", name: "Gamer", desc: "Play 5 typing games", icon: "🎮" },
];

interface Stats {
  lessonsCompleted: number; bestWpm: number; testsCompleted: number;
  perfectTests: number; totalMinutes: number; streak: number; gamesPlayed: number;
  wpmHistory: number[]; accuracyHistory: number[];
  sessionHistory: { wpm: number; accuracy: number; mode: string; date: string; language: string }[];
  unlockedAchievements: string[];
  languagesUsed: Set<string>;
}
const defaultStats: Stats = {
  lessonsCompleted: 0, bestWpm: 0, testsCompleted: 0, perfectTests: 0,
  totalMinutes: 0, streak: 0, gamesPlayed: 0,
  wpmHistory: [], accuracyHistory: [], sessionHistory: [], unlockedAchievements: [],
  languagesUsed: new Set(),
};

/* ─── Certificate ─── */
function Certificate({ wpm, language, onClose }: { wpm: number; language: string; onClose: () => void }) {
  const certRef = useRef<HTMLDivElement>(null);
  const certId = `SAH-${Date.now().toString(36).toUpperCase()}`;

  const downloadCert = async () => {
    if (!certRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;
    const canvas = await html2canvas(certRef.current, { scale: 2, backgroundColor: "#ffffff" });
    const pdf = new jsPDF("l", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdfWidth, Math.min(pdfHeight, pdf.internal.pageSize.getHeight()));
    pdf.save(`StudyAIHub_Certificate_${certId}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end"><button onClick={onClose} className="p-1 hover:bg-slate-100 rounded"><X size={20} /></button></div>
        <div ref={certRef} className="border-4 border-double border-amber-600 p-8 text-center" style={{ background: "linear-gradient(135deg, #fffbeb, #fef3c7)" }}>
          <div className="text-5xl mb-4">🎓</div>
          <h2 className="text-3xl font-bold text-amber-800 mb-1">Certificate of Achievement</h2>
          <p className="text-amber-600 mb-6">StudyAIHub Typing Learner</p>
          <p className="text-lg text-slate-600">Typing Speed Achieved</p>
          <p className="text-5xl font-extrabold text-amber-600 my-3">{wpm} WPM</p>
          <p className="text-lg text-slate-600 mb-4">in {language}</p>
          <div className="flex justify-between mt-8 text-sm text-slate-500"><span>ID: {certId}</span><span>{new Date().toLocaleDateString()}</span></div>
        </div>
        <button onClick={downloadCert} className="mt-4 w-full bg-amber-600 text-white py-3 rounded-xl font-medium hover:bg-amber-700 flex items-center justify-center gap-2"><Download size={18} /> Download Certificate PDF</button>
      </div>
    </div>
  );
}

/* ─── Simple Word Game ─── */
function TypingGame({ language, onDone }: { language: Language; onDone: (wpm: number, accuracy: number) => void }) {
  const allWords = testTexts[language][0].split(" ");
  const [targetWord, setTargetWord] = useState(allWords[0]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [totalChars, setTotalChars] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (timeLeft <= 0) { onDone(Math.round(score / 1), totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100); return; }
    const t = setInterval(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, score, totalChars, correctChars, onDone]);

  const nextWord = () => allWords[Math.floor(Math.random() * allWords.length)];

  const handleSubmit = () => {
    if (!input.trim()) return;
    const isCorrect = input.trim() === targetWord;
    setTotalChars((t) => t + targetWord.length);
    if (isCorrect) { setScore((s) => s + 1); setCorrectChars((c) => c + targetWord.length); }
    setInput("");
    setTargetWord(nextWord());
  };

  return (
    <div className={`rounded-2xl border p-6 bg-gradient-to-br from-emerald-900 to-teal-900 text-white`}>
      <div className="flex justify-between mb-4">
        <span className="bg-emerald-600 px-3 py-1 rounded-full text-sm font-bold">Score: {score}</span>
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${timeLeft <= 10 ? "bg-red-600" : "bg-slate-700"}`}>⏱ {timeLeft}s</span>
      </div>
      <div className="text-center mb-6">
        <p className="text-slate-400 text-sm mb-2">Type this word:</p>
        <p className="text-4xl font-bold tracking-wider">{targetWord}</p>
      </div>
      <div className="flex gap-2 max-w-md mx-auto">
        <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSubmit(); } }}
          placeholder="Type here and press Enter..."
          className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white text-center text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        <button onClick={handleSubmit} className="bg-emerald-600 px-6 py-3 rounded-lg font-bold hover:bg-emerald-700">Go</button>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function TypingLearnerPage() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "english";
    return (localStorage.getItem("tl_lang") as Language) || "english";
  });
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("tl_dark") === "true";
  });
  const [tab, setTab] = useState<Tab>("lessons");
  const [stats, setStats] = useState<Stats>(() => {
    if (typeof window === "undefined") return defaultStats;
    const s = localStorage.getItem("tl_stats");
    if (s) { const parsed = JSON.parse(s); return { ...parsed, languagesUsed: new Set(parsed.languagesUsed || []) }; }
    return defaultStats;
  });

  const [lessonLevel, setLessonLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [typingKey, setTypingKey] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [errors, setErrors] = useState(0);
  const [pressedCode, setPressedCode] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Test
  const [testDuration, setTestDuration] = useState(60);
  const [customDuration, setCustomDuration] = useState("");
  const [testTimeLeft, setTestTimeLeft] = useState(0);
  const [testActive, setTestActive] = useState(false);
  const [testComplete, setTestComplete] = useState(false);

  // Game
  const [showGame, setShowGame] = useState(false);

  // Certificate
  const [showCert, setShowCert] = useState(false);

  const langLessons = lessonsData[language];
  const codeMap = codeMaps[language];
  const reverseMap = buildReverseMap(codeMap);
  const kbLayout = kbLayouts[language];

  // Save stats
  const saveStats = useCallback((s: Stats) => {
    setStats(s);
    const toSave = { ...s, languagesUsed: [...s.languagesUsed] };
    localStorage.setItem("tl_stats", JSON.stringify(toSave));
  }, []);

  // Preferences loaded via lazy initialization above
  useEffect(() => { localStorage.setItem("tl_lang", language); }, [language]);
  useEffect(() => { localStorage.setItem("tl_dark", String(darkMode)); }, [darkMode]);

  const getText = useCallback(() => {
    if (tab === "lessons") return langLessons[lessonLevel]?.[currentLessonIdx]?.text || "";
    return testTexts[language][Math.floor(Math.random() * testTexts[language].length)];
  }, [tab, langLessons, lessonLevel, currentLessonIdx, language]);

  const startNew = useCallback(() => {
    setCurrentText(getText());
    setUserInput(""); setStartTime(null); setIsActive(false); setIsComplete(false); setErrors(0);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [getText]);

  // Compute the current text based on context
  const currentLesson = langLessons[lessonLevel]?.[currentLessonIdx];
  const computedText = tab === "lessons" ? (currentLesson?.text || "") : (testTexts[language][0] || "");
  const contextKey = `${tab}-${language}-${lessonLevel}-${currentLessonIdx}`;
  // Use key to reset typing state - React will remount the inner component
  const [typingResetKey, setTypingResetKey] = useState(contextKey);
  if (contextKey !== typingResetKey) {
    setTypingResetKey(contextKey);
    setCurrentText(computedText);
    setUserInput(""); setStartTime(null); setIsActive(false); setIsComplete(false); setErrors(0);
  }

  // Test timer
  useEffect(() => {
    if (!testActive || testTimeLeft <= 0) return;
    const t = setInterval(() => {
      setTestTimeLeft((v) => {
        if (v <= 1) { setTestActive(false); setTestComplete(true); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [testActive, testTimeLeft]);

  const startTest = () => {
    setTestTimeLeft(testDuration); setTestActive(true); setTestComplete(false);
    setUserInput(""); setStartTime(null); setIsActive(false); setErrors(0);
    setCurrentText(testTexts[language][Math.floor(Math.random() * testTexts[language].length)]);
  };

  // Core input processor
  const processInput = useCallback((newValue: string) => {
    if (isComplete || (tab === "test" && testComplete)) return;
    if (!startTime) { setStartTime(Date.now()); setIsActive(true); }

    const oldErrs = userInput.split("").filter((ch, i) => i < currentText.length && ch !== currentText[i]).length;
    const newErrs = newValue.split("").filter((ch, i) => i < currentText.length && ch !== currentText[i]).length;
    if (newErrs > oldErrs) setErrors((e) => e + (newErrs - oldErrs));

    setUserInput(newValue);

    if (tab !== "test" && newValue.length >= currentText.length) {
      setIsActive(false); setIsComplete(true);
      const elapsed = (Date.now() - (startTime || Date.now())) / 60000;
      const wpm = Math.round(newValue.trim().split(/\s+/).length / Math.max(elapsed, 0.01));
      const accuracy = Math.round(newValue.split("").filter((ch, i) => ch === currentText[i]).length / newValue.length * 100);

      const newStats = { ...stats };
      newStats.lessonsCompleted++;
      if (wpm > newStats.bestWpm) newStats.bestWpm = wpm;
      if (accuracy === 100) newStats.perfectTests++;
      newStats.testsCompleted++;
      newStats.totalMinutes += elapsed;
      newStats.wpmHistory = [...newStats.wpmHistory, wpm].slice(-30);
      newStats.accuracyHistory = [...newStats.accuracyHistory, accuracy].slice(-30);
      newStats.sessionHistory = [{ wpm, accuracy, mode: tab, date: new Date().toLocaleString(), language } as Stats["sessionHistory"][0], ...newStats.sessionHistory].slice(0, 50);
      const langs = new Set(newStats.languagesUsed); langs.add(language); newStats.languagesUsed = langs;

      // Check achievements
      const conds: Record<string, boolean> = {
        first_lesson: newStats.lessonsCompleted >= 1, speed_30: newStats.bestWpm >= 30,
        speed_50: newStats.bestWpm >= 50, speed_100: newStats.bestWpm >= 100,
        perfect: newStats.perfectTests >= 1, streak_7: newStats.streak >= 7,
        tests_10: newStats.testsCompleted >= 10, multi_lang: langs.size >= 3,
        game_5: newStats.gamesPlayed >= 5,
      };
      for (const [id, cond] of Object.entries(conds)) {
        if (cond && !newStats.unlockedAchievements.includes(id)) newStats.unlockedAchievements.push(id);
      }
      saveStats(newStats);
    }
  }, [isComplete, testComplete, startTime, userInput, currentText, tab, stats, language, saveStats]);

  // Handle keyboard input for Urdu/Hindi
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (language === "english") return; // Let browser handle English

    if (e.key === "Backspace") {
      e.preventDefault();
      processInput(userInput.slice(0, -1));
      return;
    }
    if (e.key === "Enter") { e.preventDefault(); processInput(userInput + "\n"); return; }
    if (e.key.length === 1 || e.code in codeMap) {
      e.preventDefault();
      const mappedChar = codeMap[e.code] || e.key;
      processInput(userInput + mappedChar);
    }
  }, [language, userInput, processInput, codeMap]);

  // Handle physical keyboard press highlighting
  useEffect(() => {
    const down = (e: KeyboardEvent) => { setPressedCode(e.code); };
    const up = () => { setPressedCode(null); };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  // Virtual keyboard click
  const handleVirtualKey = (code: string) => {
    if (isComplete || (tab === "test" && testComplete)) return;
    if (code === "Backspace") { processInput(userInput.slice(0, -1)); return; }
    if (code === "Space") { processInput(userInput + " "); return; }
    const char = codeMap[code];
    if (char) processInput(userInput + char);
  };

  const [now, setNow] = useState(0);
  useEffect(() => {
    const update = () => setNow(Date.now());
    update();
    if (!isActive) return;
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [isActive]);

  const wpm = isActive && startTime ? Math.round(userInput.trim().split(/\s+/).length / Math.max((now - startTime) / 60000, 0.01)) : 0;
  const accuracy = userInput.length > 0 ? Math.round(userInput.split("").filter((ch, i) => ch === currentText[i]).length / userInput.length * 100) : 100;
  const nextChar = currentText[userInput.length] || "";
  const nextKeyCode = reverseMap[nextChar] || "";

  const textDisplayRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to keep current typing position visible
  useEffect(() => {
    if (textDisplayRef.current) {
      const activeWord = textDisplayRef.current.querySelector('[data-word-active="true"]');
      if (activeWord) {
        activeWord.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [userInput]);

  // Render text as individual words - much easier to read and follow
  const renderText = () => {
    const words = currentText.split(" ");
    let charIdx = 0;
    return words.map((word, wi) => {
      const wordChars: React.ReactNode[] = [];
      // Add the word characters
      for (let ci = 0; ci < word.length; ci++) {
        const i = charIdx;
        let cls = darkMode ? "text-slate-600" : "text-slate-300";
        if (i < userInput.length) {
          cls = userInput[i] === currentText[i]
            ? (darkMode ? "text-emerald-400" : "text-emerald-600")
            : (darkMode ? "text-red-400 bg-red-900/30 rounded" : "text-red-500 bg-red-100 rounded");
        } else if (i === userInput.length) {
          cls = darkMode ? "text-white bg-indigo-600 rounded" : "text-slate-900 bg-indigo-200 rounded";
        }
        wordChars.push(<span key={`c${i}`} className={`${cls} font-mono inline`} style={{ fontSize: "18px" }}>{word[ci]}</span>);
        charIdx++;
      }
      // Add the space after the word (except last word)
      if (wi < words.length - 1) {
        const si = charIdx;
        let spaceCls = darkMode ? "text-slate-600" : "text-slate-300";
        if (si < userInput.length) {
          spaceCls = userInput[si] === " "
            ? (darkMode ? "text-emerald-400" : "text-emerald-600")
            : (darkMode ? "text-red-400 bg-red-900/30 rounded" : "text-red-500 bg-red-100 rounded");
        } else if (si === userInput.length) {
          spaceCls = darkMode ? "text-white bg-indigo-600 rounded" : "text-slate-900 bg-indigo-200 rounded";
        }
        wordChars.push(<span key={`s${si}`} className={`${spaceCls} font-mono inline`} style={{ fontSize: "18px" }}>{"\u00A0"}</span>);
        charIdx++;
      }

      // Determine if this word is the "active" word (contains the current cursor)
      const wordStart = charIdx - word.length - (wi < words.length - 1 ? 1 : 0);
      const wordEnd = charIdx - 1;
      const isActive = userInput.length >= wordStart && userInput.length <= wordEnd;

      return (
        <span
          key={`w${wi}`}
          data-word-active={isActive || undefined}
          className={`inline-block mr-2 mb-1.5 px-1.5 py-0.5 rounded-lg transition ${isActive ? (darkMode ? "bg-slate-700/50" : "bg-indigo-50") : ""}`}
        >
          {wordChars}
        </span>
      );
    });
  };

  const textDisplayClass = `mb-4 leading-relaxed font-mono break-words max-h-64 overflow-y-auto p-4 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-slate-50"}`;

  const bgC = darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900";
  const cardC = darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const subC = darkMode ? "text-slate-400" : "text-slate-500";
  const inputC = darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200";

  const onGameDone = (wpm: number, accuracy: number) => {
    setShowGame(false);
    const ns = { ...stats }; ns.gamesPlayed++;
    if (wpm > ns.bestWpm) ns.bestWpm = wpm;
    ns.sessionHistory = [{ wpm, accuracy, mode: "game", date: new Date().toLocaleString(), language } as Stats["sessionHistory"][0], ...ns.sessionHistory].slice(0, 50);
    ns.wpmHistory = [...ns.wpmHistory, wpm].slice(-30);
    ns.accuracyHistory = [...ns.accuracyHistory, accuracy].slice(-30);
    if (!ns.unlockedAchievements.includes("game_5") && ns.gamesPlayed >= 5) ns.unlockedAchievements.push("game_5");
    saveStats(ns);
  };

  return (
    <div className={`min-h-screen ${bgC} transition-colors duration-300`}>
      {/* Header */}
      <div className={`border-b ${darkMode ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"} px-4 py-4`}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Keyboard className="text-emerald-500" size={28} /> Typing Learner</h1>
            <p className={`text-sm ${subC} mt-0.5`}>Master typing in English, Urdu & Hindi</p>
          </div>
          <div className="flex items-center gap-2">
            {([["english","🇬🇧 Eng"],["urdu","🇵🇰 اردو"],["hindi","🇮🇳 हिन्दी"]] as const).map(([id, label]) => (
              <button key={id} onClick={() => setLanguage(id as Language)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${language === id ? "bg-emerald-600 text-white" : `${darkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}`}>
                {label}
              </button>
            ))}
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${darkMode ? "bg-slate-800 text-yellow-400" : "bg-slate-100 text-slate-600"}`}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b ${darkMode ? "border-slate-800" : "border-slate-200"}`}>
        <div className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {([
            ["lessons","Lessons",BookOpen], ["test","Test",Clock], ["practice","Practice",Target],
            ["games","Games",Gamepad2], ["stats","Stats",BarChart3], ["profile","Profile",Award],
          ] as const).map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id as Tab)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${tab === id ? "border-emerald-500 text-emerald-600" : `border-transparent ${subC}`} `}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* ─── LESSONS ─── */}
        {tab === "lessons" && (
          <div className="space-y-6">
            <div className="flex gap-2">
              {(["beginner","intermediate","advanced"] as const).map((lv) => (
                <button key={lv} onClick={() => { setLessonLevel(lv); setCurrentLessonIdx(0); }}
                  className={`flex-1 p-3 rounded-xl border-2 transition text-center capitalize ${lessonLevel === lv ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950" : `border-slate-200 ${darkMode ? "border-slate-700" : ""}`} `}>
                  <p className="font-bold text-sm">{lv}</p>
                  <p className={`text-xs ${subC}`}>{langLessons[lv].length} lessons</p>
                </button>
              ))}
            </div>
            <div className={`rounded-xl border ${cardC} p-4`}>
              <h3 className="font-bold text-sm mb-3 capitalize">{lessonLevel} Lessons</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                {langLessons[lessonLevel].map((l, i) => (
                  <button key={i} onClick={() => setCurrentLessonIdx(i)}
                    className={`p-3 rounded-lg border-2 text-left transition ${currentLessonIdx === i ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950" : `border-slate-200 ${darkMode ? "border-slate-700" : ""}`} `}>
                    <p className="font-medium text-xs">Lesson {i + 1}</p>
                    <p className={`text-xs ${subC} mt-0.5 truncate`}>{l.name}</p>
                    {currentLessonIdx === i && <CheckCircle2 size={12} className="text-emerald-500 mt-1" />}
                  </button>
                ))}
              </div>
            </div>

            <div className={`rounded-xl border ${cardC} p-4`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">{langLessons[lessonLevel][currentLessonIdx]?.name}</h3>
                <button onClick={startNew} className="flex items-center gap-1 text-sm text-emerald-600 font-medium"><RotateCcw size={14} /> Reset</button>
              </div>
            </div>

            <div className={`rounded-xl border ${cardC} overflow-hidden`}>
              <div className={`px-4 py-2 border-b ${darkMode ? "border-slate-800 bg-slate-800/50" : "bg-slate-50 border-slate-200"} flex items-center justify-between`}>
                <span className={`text-sm font-medium ${subC}`}>Type the text below</span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1"><Zap size={14} className="text-yellow-500" /> {wpm} WPM</span>
                  <span className="flex items-center gap-1"><Target size={14} className="text-emerald-500" /> {accuracy}%</span>
                </div>
              </div>
              <div className="p-6">
                <div className={textDisplayClass} ref={textDisplayRef} dir={language === "urdu" ? "rtl" : "ltr"}>{renderText()}</div>
                <textarea ref={inputRef} value={userInput}
                  onChange={language === "english" ? (e) => processInput(e.target.value) : undefined}
                  onKeyDown={language !== "english" ? handleKeyDown : undefined}
                  placeholder={isComplete ? "🎉 Great job!" : "Start typing here..."} disabled={isComplete}
                  dir={language === "urdu" ? "rtl" : "ltr"}
                  className={`w-full border-2 ${isComplete ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-700" : inputC} rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none transition`}
                  rows={4} />
              </div>
              {isComplete && (
                <div className={`border-t ${darkMode ? "border-emerald-800 bg-emerald-950" : "border-emerald-200 bg-emerald-50"} px-6 py-4 text-center`}>
                  <p className="text-lg font-bold text-emerald-600">🎉 Lesson Complete!</p>
                  <div className="flex justify-center gap-6 mt-2 text-sm text-emerald-600">
                    <span><strong>{stats.wpmHistory[stats.wpmHistory.length - 1] || 0}</strong> WPM</span>
                    <span><strong>{stats.accuracyHistory[stats.accuracyHistory.length - 1] || 100}%</strong> Accuracy</span>
                  </div>
                  <button onClick={() => { if (currentLessonIdx < langLessons[lessonLevel].length - 1) setCurrentLessonIdx(currentLessonIdx + 1); }}
                    className="mt-3 bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 inline-flex items-center gap-2">Next Lesson <ChevronRight size={14} /></button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── TEST ─── */}
        {tab === "test" && (
          <div className="space-y-6">
            {!testActive && !testComplete && (
              <div className={`rounded-xl border ${cardC} p-6 text-center`}>
                <h2 className="text-2xl font-bold mb-2">Typing Test</h2>
                <p className={`${subC} mb-4`}>Choose your test duration</p>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {[15, 30, 60, 120, 300].map((d) => (
                    <button key={d} onClick={() => { setTestDuration(d); setCustomDuration(""); }}
                      className={`px-6 py-3 rounded-xl border-2 font-bold transition ${testDuration === d && !customDuration ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-600" : `border-slate-200 ${darkMode ? "border-slate-700" : ""} ${subC}`} `}>
                      {d}s
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className={`text-sm ${subC}`}>Custom:</span>
                  <input
                    type="number" min="5" max="3600"
                    value={customDuration}
                    onChange={(e) => { const v = parseInt(e.target.value); setCustomDuration(e.target.value); if (v > 0) setTestDuration(v); }}
                    placeholder="seconds"
                    className={`w-24 border-2 ${darkMode ? "border-slate-700 bg-slate-800 text-white" : "border-slate-200 bg-white"} rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  />
                  <span className={`text-sm ${subC}`}>seconds</span>
                </div>
                <button onClick={startTest} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 inline-flex items-center gap-2"><Play size={20} /> Start {testDuration}s Test</button>
              </div>
            )}
            {(testActive || testComplete) && (
              <div className={`rounded-xl border ${cardC} overflow-hidden`}>
                <div className={`px-4 py-2 border-b ${darkMode ? "border-slate-800 bg-slate-800/50" : "bg-slate-50"} flex items-center justify-between`}>
                  <span className={`text-sm font-medium ${subC}`}>{testDuration}s Test</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`font-bold text-lg ${testTimeLeft <= 10 ? "text-red-500" : ""}`}>⏱ {testTimeLeft}s</span>
                    <span className="flex items-center gap-1"><Zap size={14} className="text-yellow-500" /> {wpm} WPM</span>
                    <span className="flex items-center gap-1"><Target size={14} className="text-emerald-500" /> {accuracy}%</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className={textDisplayClass} ref={textDisplayRef} dir={language === "urdu" ? "rtl" : "ltr"}>{renderText()}</div>
                  <textarea value={userInput}
                    onChange={language === "english" ? (e) => processInput(e.target.value) : undefined}
                    onKeyDown={language !== "english" ? handleKeyDown : undefined}
                    disabled={testComplete} dir={language === "urdu" ? "rtl" : "ltr"}
                    className={`w-full border-2 ${inputC} rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none transition`}
                    rows={4} placeholder="Start typing..." />
                </div>
                <div className={`h-1 ${darkMode ? "bg-slate-800" : "bg-slate-200"}`}>
                  <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${((testDuration - testTimeLeft) / testDuration) * 100}%` }} />
                </div>
              </div>
            )}
            {testComplete && (
              <div className={`rounded-xl border ${darkMode ? "border-emerald-800 bg-emerald-950" : "border-emerald-200 bg-emerald-50"} p-8 text-center`}>
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-3xl font-extrabold text-emerald-600 mb-4">Test Complete!</h2>
                <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-6">
                  <div><p className="text-3xl font-bold">{wpm}</p><p className={`text-sm ${subC}`}>WPM</p></div>
                  <div><p className="text-3xl font-bold">{accuracy}%</p><p className={`text-sm ${subC}`}>Accuracy</p></div>
                  <div><p className="text-3xl font-bold">{errors}</p><p className={`text-sm ${subC}`}>Errors</p></div>
                </div>
                <div className="flex justify-center gap-3">
                  <button onClick={() => { setTestComplete(false); startTest(); }} className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700">Try Again</button>
                  <button onClick={() => setShowCert(true)} className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 inline-flex items-center gap-2"><Award size={16} /> Get Certificate</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── PRACTICE ─── */}
        {tab === "practice" && (
          <div className="space-y-6">
            <div className={`rounded-xl border ${cardC} p-4`}>
              <h3 className="font-bold mb-3">Practice Mode</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Words","Sentences","Paragraphs","Numbers","Code","Custom"].map((m) => (
                  <button key={m} onClick={startNew} className={`p-3 rounded-lg border ${darkMode ? "border-slate-700 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-50"} text-sm font-medium transition`}>{m}</button>
                ))}
              </div>
            </div>
            <div className={`rounded-xl border ${cardC} overflow-hidden`}>
              <div className={`px-4 py-2 border-b ${darkMode ? "border-slate-800 bg-slate-800/50" : "bg-slate-50"} flex items-center justify-between`}>
                <span className={`text-sm font-medium ${subC}`}>Free Practice</span>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1"><Zap size={14} className="text-yellow-500" /> {wpm} WPM</span>
                  <span className="flex items-center gap-1"><Target size={14} className="text-emerald-500" /> {accuracy}%</span>
                  <button onClick={startNew} className="flex items-center gap-1 text-emerald-600 font-medium"><RotateCcw size={14} /> New</button>
                </div>
              </div>
              <div className="p-6">
                <div className={textDisplayClass} ref={textDisplayRef} dir={language === "urdu" ? "rtl" : "ltr"}>{renderText()}</div>
                <textarea value={userInput}
                  onChange={language === "english" ? (e) => processInput(e.target.value) : undefined}
                  onKeyDown={language !== "english" ? handleKeyDown : undefined}
                  placeholder="Start typing..." disabled={isComplete} dir={language === "urdu" ? "rtl" : "ltr"}
                  className={`w-full border-2 ${isComplete ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-700" : inputC} rounded-xl px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none transition`}
                  rows={4} />
              </div>
              {isComplete && (
                <div className={`border-t ${darkMode ? "border-emerald-800 bg-emerald-950" : "border-emerald-200 bg-emerald-50"} px-6 py-4 text-center`}>
                  <p className="text-lg font-bold text-emerald-600">🎉 Practice Complete!</p>
                  <button onClick={startNew} className="mt-3 bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">Practice More</button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── GAMES ─── */}
        {tab === "games" && (
          <div className="space-y-6">
            <div className={`rounded-xl border ${cardC} p-4`}>
              <h3 className="font-bold mb-3 flex items-center gap-2"><Gamepad2 className="text-emerald-500" size={18} /> Typing Games</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Word Rush", desc: "Type as many words as you can in 60 seconds!", icon: "⚡" },
                  { name: "Speed Challenge", desc: "How fast can you type?", icon: "🏎️" },
                  { name: "Daily Challenge", desc: "Today's special challenge", icon: "📅" },
                ].map((game) => (
                  <button key={game.name} onClick={() => setShowGame(true)}
                    className={`p-6 rounded-xl border-2 ${darkMode ? "border-slate-700 hover:border-emerald-600 hover:bg-slate-800" : "border-slate-200 hover:border-emerald-500 hover:bg-emerald-50"} text-left transition`}>
                    <span className="text-4xl">{game.icon}</span>
                    <h4 className="font-bold mt-3">{game.name}</h4>
                    <p className={`text-sm ${subC} mt-1`}>{game.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-emerald-600 font-medium mt-3"><Play size={14} /> Play</span>
                  </button>
                ))}
              </div>
            </div>
            {showGame && <TypingGame language={language} onDone={onGameDone} />}
          </div>
        )}

        {/* ─── STATS ─── */}
        {tab === "stats" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Best WPM", value: stats.bestWpm, Icon: Zap, color: "text-yellow-500" },
                { label: "Avg Accuracy", value: `${stats.accuracyHistory.length > 0 ? Math.round(stats.accuracyHistory.reduce((a, b) => a + b, 0) / stats.accuracyHistory.length) : 100}%`, Icon: Target, color: "text-emerald-500" },
                { label: "Tests Done", value: stats.testsCompleted, Icon: CheckCircle2, color: "text-blue-500" },
                { label: "Practice Time", value: `${Math.round(stats.totalMinutes)}m`, Icon: Clock, color: "text-purple-500" },
              ].map((s) => (
                <div key={s.label} className={`rounded-xl border ${cardC} p-4 text-center`}>
                  <s.Icon size={20} className={`mx-auto ${s.color} mb-2`} />
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className={`text-xs ${subC}`}>{s.label}</p>
                </div>
              ))}
            </div>
            <div className={`rounded-xl border ${cardC} p-4`}>
              <h3 className="font-bold text-sm mb-4">WPM Over Time</h3>
              {stats.wpmHistory.length > 0 ? (
                <div className="flex items-end gap-1 h-40">
                  {stats.wpmHistory.map((w, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end">
                      <span className="text-xs text-slate-500 mb-1">{w}</span>
                      <div className="w-full bg-emerald-500 rounded-t" style={{ height: `${Math.min((w / 120) * 100, 100)}%` }} />
                    </div>
                  ))}
                </div>
              ) : <p className={`text-center py-8 ${subC}`}>No data yet. Start typing!</p>}
            </div>
            {stats.sessionHistory.length > 0 && (
              <div className={`rounded-xl border ${cardC} p-4`}>
                <h3 className="font-bold text-sm mb-3">Recent Sessions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className={`text-left ${subC} border-b ${darkMode ? "border-slate-800" : "border-slate-200"}`}>
                      <th className="pb-2">Mode</th><th className="pb-2">Lang</th><th className="pb-2">WPM</th><th className="pb-2">Accuracy</th><th className="pb-2">Date</th>
                    </tr></thead>
                    <tbody>{stats.sessionHistory.slice(0, 10).map((s, i) => (
                      <tr key={i} className={`border-b ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
                        <td className="py-2 capitalize font-medium">{s.mode}</td>
                        <td className="py-2">{s.language}</td>
                        <td className={`py-2 font-bold ${s.wpm >= 50 ? "text-emerald-500" : s.wpm >= 25 ? "text-yellow-500" : "text-red-500"}`}>{s.wpm}</td>
                        <td className={`py-2 font-bold ${s.accuracy >= 95 ? "text-emerald-500" : s.accuracy >= 80 ? "text-yellow-500" : "text-red-500"}`}>{s.accuracy}%</td>
                        <td className={`py-2 ${subC}`}>{s.date}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── PROFILE ─── */}
        {tab === "profile" && (
          <div className="space-y-6">
            <div className={`rounded-xl border ${cardC} p-6 text-center`}>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">👤</div>
              <h2 className="text-xl font-bold">Typist</h2>
              <p className={subC}>Language: {language.charAt(0).toUpperCase() + language.slice(1)}</p>
              <div className="flex justify-center gap-6 mt-4">
                <div><p className="text-2xl font-bold text-emerald-500">{stats.bestWpm}</p><p className={`text-xs ${subC}`}>Best WPM</p></div>
                <div><p className="text-2xl font-bold text-blue-500">{stats.lessonsCompleted}</p><p className={`text-xs ${subC}`}>Lessons</p></div>
                <div><p className="text-2xl font-bold text-purple-500">{stats.testsCompleted}</p><p className={`text-xs ${subC}`}>Tests</p></div>
              </div>
              <button onClick={() => setShowCert(true)} className="mt-4 bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 inline-flex items-center gap-2"><Award size={16} /> Generate Certificate</button>
            </div>
            <div className={`rounded-xl border ${cardC} p-4`}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><Trophy size={16} className="text-amber-500" /> Achievements ({stats.unlockedAchievements.length}/{achievements.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {achievements.map((a) => {
                  const unlocked = stats.unlockedAchievements.includes(a.id);
                  return (
                    <div key={a.id} className={`p-3 rounded-xl border-2 transition ${unlocked ? "border-amber-400 bg-amber-50 dark:bg-amber-950" : `${darkMode ? "border-slate-700 opacity-50" : "border-slate-200 opacity-50"}`} `}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{unlocked ? a.icon : "🔒"}</span>
                        <div>
                          <p className={`font-medium text-sm ${unlocked ? "" : "text-slate-400"}`}>{a.name}</p>
                          <p className={`text-xs ${subC}`}>{a.desc}</p>
                        </div>
                        {unlocked && <CheckCircle2 size={16} className="text-amber-500 ml-auto" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── VIRTUAL KEYBOARD (always visible) ─── */}
        <div className={`rounded-xl border ${cardC} p-4 mt-6`}>
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><Keyboard size={16} className="text-emerald-500" /> Keyboard — {language.charAt(0).toUpperCase() + language.slice(1)}</h3>
          <div className="flex flex-col items-center gap-1.5">
            {kbLayout.map((row, ri) => (
              <div key={ri} className="flex gap-1" style={{ marginLeft: ri === 1 ? "16px" : ri === 2 ? "28px" : ri === 3 ? "44px" : "0" }}>
                {row.map((key) => {
                  const isNext = key.code === nextKeyCode;
                  const isPressed = key.code === pressedCode;
                  const fi = fingerMapCode[key.code] ?? 0;
                  const fc = fingerColors[fi];
                  return (
                    <button key={key.code}
                      onClick={() => handleVirtualKey(key.code)}
                      className={`h-10 min-w-[30px] px-1 rounded-lg flex flex-col items-center justify-center text-xs font-medium border-2 transition-all duration-75 cursor-pointer select-none ${
                        isNext ? "border-emerald-400 bg-emerald-100 text-emerald-800 ring-2 ring-emerald-300 scale-110 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-600" :
                        isPressed ? "border-slate-400 bg-slate-200 scale-95 dark:bg-slate-700 dark:border-slate-500" :
                        darkMode ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                      style={!isNext && !isPressed ? { borderBottomColor: fc, borderBottomWidth: "3px" } : undefined}
                    >
                      <span className="font-bold">{key.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}
            {/* Space bar row */}
            <div className="flex gap-1 mt-1">
              <button onClick={() => handleVirtualKey("Backspace")}
                className={`h-10 w-16 rounded-lg flex items-center justify-center text-xs font-medium ${darkMode ? "bg-slate-800 border border-slate-700 text-slate-500 hover:bg-slate-700" : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100"} `}>
                ⌫
              </button>
              <button onClick={() => handleVirtualKey("Space")}
                className={`h-10 w-64 rounded-lg flex items-center justify-center text-xs font-medium ${nextKeyCode === "Space" ? "border-emerald-400 bg-emerald-100 ring-2 ring-emerald-300 dark:bg-emerald-900 dark:border-emerald-600" : darkMode ? "bg-slate-800 border border-slate-700 text-slate-500 hover:bg-slate-700" : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100"} `}>
                Space
              </button>
            </div>
          </div>
          {/* Finger guide */}
          <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
            <span className={`text-xs ${subC}`}>Fingers:</span>
            {fingerColors.map((c, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full border-2 border-white shadow" style={{ background: c }} />
                <span className={`text-xs ${subC}`}>{fingerNames[i]}</span>
              </div>
            ))}
          </div>
          {/* Next key hint */}
          {nextChar && (
            <div className={`mt-3 text-center text-sm ${subC}`}>
              Next key: <span className="font-bold text-emerald-600 text-base">{nextChar}</span>
              <span className="ml-2 text-xs">(look for the highlighted key above — click it or press it on your keyboard)</span>
            </div>
          )}
        </div>
      </div>

      {showCert && <Certificate wpm={stats.bestWpm} language={language.charAt(0).toUpperCase() + language.slice(1)} onClose={() => setShowCert(false)} />}
    </div>
  );
}
