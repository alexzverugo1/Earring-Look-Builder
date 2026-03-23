import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import { BottomSheet } from "./components/BottomSheet";
import { SmartImage } from "./components/SmartImage";
import { AVIF, EAR } from "./data/publicImages";
import { slotLabels, modelCanvases, pickerProducts, recommendedProducts, slotOrder, upsellProducts, newArrivals } from "./data/products";
import { inspirationStacks } from "./data/stacks";
import { AROverlay } from "./screens/AROverlay";
import { BuilderScreen } from "./screens/BuilderScreen";
import { CanvasScreen } from "./screens/CanvasScreen";
import { CartDrawer } from "./screens/CartDrawer";
import { QuizLoading } from "./screens/QuizLoading";
import { QuizQuestion } from "./screens/QuizQuestion";
import { QuizResults } from "./screens/QuizResults";
import { ReviewScreen } from "./screens/ReviewScreen";
import { AppState, Product, SlotKey } from "./types";

const initialSlots = { lobe: null, secondLobe: null, helix: null, flat: null, tragus: null };

const initialState: AppState = {
  overlay: "none",
  quizAnswers: { piercings: "", vibe: "", metal: "", budget: "" },
  selectedCanvas: null,
  slots: initialSlots,
  cartItems: [],
  activeSlot: null,
  pickerFilter: "all",
  arProductId: null,
  selectedFromResults: [],
  toastMessage: null
};

const styleCategories = [
  { label: "STUDS", image: EAR.EarA },
  { label: "HOOPS", image: EAR.EarB },
  { label: "FLAT BACKS", image: EAR.EarC },
  { label: "SETS", image: EAR.EarD },
  { label: "HUGGIES", image: EAR.EarE },
  { label: "DROP", image: EAR.EarF }
];

const materialCategories = [
  { label: "GOLD", image: AVIF.V20611403 },
  { label: "SILVER", image: AVIF.V15429467 },
  { label: "DIAMOND", image: AVIF.V20601390 },
  { label: "GOLD PLATED", image: AVIF.V20600298 },
  { label: "GOLD BONDED", image: AVIF.V20611436 },
  { label: "CZ", image: AVIF.V20589595 }
];

const trendCategories = [
  { label: "MIXED METAL", image: EAR.EarG },
  { label: "QUIET LUXURY", image: EAR.EarH },
  { label: "ICONS", image: EAR.EarA },
  { label: "MAXIMALIST", image: EAR.EarB },
  { label: "MISMATCHED", image: EAR.EarC }
];

const QUIZ_STEPS = ["1", "2", "3", "4", "loading"] as const;

function LandingPage() {
  const navigate = useNavigate();

  const renderCategoryRow = (items: { label: string; image: string }[]) => (
    <div className="scroll-row px-6 md:px-12 lg:px-20">
      {items.map((cat) => (
        <div key={cat.label} className="category-chip">
          <SmartImage alt={cat.label} sources={[cat.image]} className="h-[100px] w-[100px] rounded-full object-cover md:h-[120px] md:w-[120px]" />
          <span>{cat.label}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="desktop-page">
      <div className="promo-bar">
        Free shipping on orders $50+ &nbsp;|&nbsp; <a href="#">LEARN MORE</a>
      </div>

      <header className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-3 md:px-12 lg:px-20">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="font-serif text-xl tracking-[0.15em] transition-opacity hover:opacity-75 md:text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            aria-label="Banter — Home"
          >
            BANTER
          </Link>
          <nav className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-600 md:flex">
            <span className="cursor-pointer hover:text-black">Get Pierced</span>
            <span className="cursor-pointer hover:text-black">Trending</span>
            <span className="cursor-pointer border-b-2 border-black pb-0.5 text-black">Earrings</span>
            <span className="cursor-pointer hover:text-black">Necklaces</span>
            <span className="cursor-pointer hover:text-black">Bracelets</span>
            <span className="cursor-pointer hover:text-black">Rings</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer text-neutral-500 hover:text-black">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer text-neutral-500 hover:text-black">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
          </svg>
          <div className="relative cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500 hover:text-black">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
        </div>
      </header>

      <section className="px-6 py-12 md:px-12 md:py-16 lg:px-20">
        <p className="text-[11px] font-medium tracking-wide text-neutral-400">Home &nbsp;/ &nbsp;Earrings Landing</p>
        <h1 className="mt-6 font-serif text-5xl font-bold tracking-tight md:text-7xl">EARRINGS</h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-neutral-600">
          Shop the perfect hoops, studs, and diamond earrings for her, him, and them.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => navigate("/quiz/1")} className="btn-primary">
            Start with a Quiz
          </button>
          <button type="button" className="btn-secondary">
            Shop All Earrings
          </button>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="py-10">
        <h2 className="section-heading px-6 md:px-12 lg:px-20">Shop by Style</h2>
        {renderCategoryRow(styleCategories)}
      </section>

      <hr className="section-divider" />

      <section className="py-10">
        <h2 className="section-heading px-6 md:px-12 lg:px-20">Shop by Material</h2>
        {renderCategoryRow(materialCategories)}
      </section>

      <hr className="section-divider" />

      <section className="relative overflow-hidden bg-[#f5f0eb] px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-bold md:text-5xl">COME GET PIERCED</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
              A new piercing is always the right move. Explore your options and book an appointment with one of our piercing professionals.
            </p>
            <button type="button" onClick={() => navigate("/quiz/1")} className="btn-primary mt-6">
              LEARN ABOUT PIERCING
            </button>
          </div>
          <div className="flex justify-center md:justify-end">
            <SmartImage
              alt="Get pierced"
              sources={[EAR.EarD, EAR.EarE, AVIF.V20611403]}
              className="h-[280px] w-[280px] rounded-2xl object-cover shadow-lg md:h-[340px] md:w-[340px]"
            />
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="py-10">
        <h2 className="section-heading px-6 md:px-12 lg:px-20">Shop by Trend</h2>
        {renderCategoryRow(trendCategories)}
      </section>

      <hr className="section-divider" />

      <section className="py-10 px-6 md:px-12 lg:px-20">
        <h2 className="section-heading">New Arrivals</h2>
        <p className="mb-6 -mt-3 text-sm text-neutral-500">Explore our latest drop of new earring styles.</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5">
          {newArrivals.map((item) => (
            <article key={item.id} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-lg bg-[#f9f8f6]">
                <SmartImage
                  alt={item.name}
                  sources={item.imageUrls}
                  className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-[13px] leading-snug text-neutral-800">{item.name}</p>
              <p className="mt-0.5 text-[13px] font-semibold">${item.price}.00</p>
            </article>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      <section className="py-10 px-6 md:px-12 lg:px-20">
        <h2 className="section-heading">Best of Banter</h2>
        <p className="mb-6 -mt-3 text-sm text-neutral-500">Your perfect pair is right here. Explore our most-loved earrings.</p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-xl bg-[#f5f0eb]">
            <SmartImage
              alt="Best selling earrings"
              sources={[EAR.EarF, EAR.EarG, AVIF.V20596175]}
              className="h-[240px] w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-[300px]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-white">Best Selling Earrings</p>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl bg-[#f5f0eb]">
            <SmartImage
              alt="Top rated earrings"
              sources={[EAR.EarH, EAR.EarA, AVIF.V15429467]}
              className="h-[240px] w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-[300px]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-white">Top-Rated Earrings</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="bg-[#1a1a1a] px-6 py-16 text-white md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-serif text-4xl font-bold md:text-5xl">READY TO STACK?</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-neutral-300">
            Explore our new virtual ear stacking tool. Try on different earring styles or get inspo for your next piercing.
          </p>
          <button type="button" onClick={() => navigate("/quiz/1")} className="mt-8 inline-flex items-center gap-2 bg-white px-8 py-4 text-[13px] font-semibold uppercase tracking-wider text-black transition-colors hover:bg-neutral-100">
            TRY IT OUT
          </button>
        </div>
      </section>

      <section className="py-10 px-6 md:px-12 lg:px-20">
        <h2 className="section-heading">Beyond Earrings</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-5">
          {upsellProducts.map((item) => (
            <article key={item.id} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-lg bg-[#f9f8f6]">
                <SmartImage
                  alt={item.name}
                  sources={item.imageUrls}
                  className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-[13px] leading-snug text-neutral-800">{item.name}</p>
              <p className="mt-0.5 text-[13px] font-semibold">${item.price}.00</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#e5e5e5] bg-[#fafafa] px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl gap-8 text-xs text-neutral-500 md:grid-cols-4">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-black">Customer Service</p>
            <p>Contact Us</p>
            <p>Return & Exchange Policy</p>
            <p>Order Status</p>
            <p>Shipping Information</p>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-black">About Us</p>
            <p>Careers</p>
            <p>About Banter</p>
            <p>Our Brands</p>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-black">Education</p>
            <p>Ear Piercing</p>
            <p>Body Piercing</p>
            <p>Jewelry Care</p>
          </div>
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-black">Payment Options</p>
            <p>Banter Credit Card</p>
            <p>Affirm</p>
            <p>Gift Cards</p>
          </div>
        </div>
        <p className="mt-8 text-center text-[10px] text-neutral-400">© BANTER.COM 2024 &nbsp;|&nbsp; Privacy Policy &nbsp;|&nbsp; Terms and Conditions</p>
      </footer>
    </div>
  );
}

type QuizRouteProps = {
  state: AppState;
  setState: Dispatch<SetStateAction<AppState>>;
  activeItems: Product[];
};

function QuizRoute({ state, setState, activeItems }: QuizRouteProps) {
  const { step } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (step !== "loading") return;
    const t = window.setTimeout(() => navigate("/results", { replace: true }), 1800);
    return () => window.clearTimeout(t);
  }, [step, navigate]);

  if (!step || !QUIZ_STEPS.includes(step as (typeof QUIZ_STEPS)[number])) {
    return <Navigate to="/quiz/1" replace />;
  }

  if (step === "loading") {
    return <QuizLoading />;
  }

  const stepNum = Number(step);
  if (stepNum < 1 || stepNum > 4) {
    return <Navigate to="/quiz/1" replace />;
  }

  const navigateBack = () => {
    if (stepNum <= 1) navigate("/");
    else navigate(`/quiz/${stepNum - 1}`);
  };

  const closeQuizToCanvas = () => navigate("/canvas");

  const autoAdvance = (nextStep: number) => {
    window.setTimeout(() => navigate(`/quiz/${nextStep}`), 300);
  };

  return (
    <div className="flow-shell-wrap">
      <div className="flow-shell">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            {stepNum === 1 && (
              <QuizQuestion
                step={1}
                value={state.quizAnswers.piercings}
                cartCount={activeItems.length}
                onBack={navigateBack}
                onClose={closeQuizToCanvas}
                onSelect={(value) => {
                  setState((prev) => ({ ...prev, quizAnswers: { ...prev.quizAnswers, piercings: value } }));
                  autoAdvance(2);
                }}
              />
            )}
            {stepNum === 2 && (
              <QuizQuestion
                step={2}
                value={state.quizAnswers.vibe}
                cartCount={activeItems.length}
                onBack={navigateBack}
                onClose={closeQuizToCanvas}
                onSelect={(value) => {
                  setState((prev) => ({ ...prev, quizAnswers: { ...prev.quizAnswers, vibe: value } }));
                  autoAdvance(3);
                }}
              />
            )}
            {stepNum === 3 && (
              <QuizQuestion
                step={3}
                value={state.quizAnswers.metal}
                cartCount={activeItems.length}
                onBack={navigateBack}
                onClose={closeQuizToCanvas}
                onContinue={() => navigate("/quiz/4")}
                onSelect={(value) => setState((prev) => ({ ...prev, quizAnswers: { ...prev.quizAnswers, metal: value } }))}
              />
            )}
            {stepNum === 4 && (
              <QuizQuestion
                step={4}
                value={state.quizAnswers.budget}
                cartCount={activeItems.length}
                onBack={navigateBack}
                onClose={closeQuizToCanvas}
                onSelect={(value) => {
                  setState((prev) => ({ ...prev, quizAnswers: { ...prev.quizAnswers, budget: value } }));
                  window.setTimeout(() => navigate("/quiz/loading"), 300);
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

type FlowScreenProps = {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  activeItems: Product[];
  builderCanvasImageUrls: string[];
  subtotal: number;
};

function ResultsPage({ state, setState, activeItems }: Pick<FlowScreenProps, "state" | "setState" | "activeItems">) {
  const navigate = useNavigate();
  return (
    <div className="flow-shell-wrap">
      <div className="flow-shell">
        <AnimatePresence mode="wait">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            <QuizResults
              products={recommendedProducts}
              selectedIds={state.selectedFromResults}
              cartCount={activeItems.length}
              onTryOn={(id) => setState((prev) => ({ ...prev, arProductId: id, overlay: "ar_overlay" }))}
              onBuild={() => {
                setState((prev) => ({
                  ...prev,
                  slots: {
                    lobe: recommendedProducts[0],
                    secondLobe: recommendedProducts[1],
                    helix: recommendedProducts[2],
                    flat: recommendedProducts[3],
                    tragus: recommendedProducts[0]
                  }
                }));
                navigate("/builder");
              }}
              onScratch={() => navigate("/canvas")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CanvasPage({ state, setState, activeItems }: Pick<FlowScreenProps, "state" | "setState" | "activeItems">) {
  const navigate = useNavigate();
  return (
    <div className="flow-shell-wrap">
      <div className="flow-shell">
        <AnimatePresence mode="wait">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <CanvasScreen
              selected={state.selectedCanvas}
              models={modelCanvases}
              cartCount={activeItems.length}
              onSelect={(value) => setState((prev) => ({ ...prev, selectedCanvas: value }))}
              onUseOwnEar={() => setState((prev) => ({ ...prev, overlay: "ar_overlay", arProductId: recommendedProducts[0].id }))}
              onContinue={() => navigate("/builder")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function BuilderPage({ state, setState, activeItems, builderCanvasImageUrls, subtotal }: FlowScreenProps) {
  const navigate = useNavigate();
  return (
    <div className="flow-shell-wrap">
      <div className="flow-shell">
        <AnimatePresence mode="wait">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <BuilderScreen
              slots={state.slots}
              canvasImageUrls={builderCanvasImageUrls}
              cartCount={activeItems.length}
              total={subtotal}
              filledCount={activeItems.length}
              onOpenSlot={(slot) => setState((prev) => ({ ...prev, activeSlot: slot, overlay: "product_picker" }))}
              onOpenInspiration={() => setState((prev) => ({ ...prev, overlay: "inspiration" }))}
              onTryOn={() => {
                const firstSelected =
                  state.slots.lobe ??
                  state.slots.secondLobe ??
                  state.slots.helix ??
                  state.slots.flat ??
                  state.slots.tragus ??
                  recommendedProducts[0];
                setState((prev) => ({ ...prev, arProductId: firstSelected.id, overlay: "ar_overlay" }));
              }}
              onContinue={() => navigate("/review")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ReviewPage({ state, setState, activeItems, subtotal }: Omit<FlowScreenProps, "builderCanvasImageUrls">) {
  const navigate = useNavigate();
  return (
    <div className="flow-shell-wrap">
      <div className="flow-shell">
        <AnimatePresence mode="wait">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <ReviewScreen
              slots={state.slots}
              cartCount={activeItems.length}
              subtotal={subtotal}
              upsells={upsellProducts}
              onEdit={(slot) => {
                setState((prev) => ({ ...prev, activeSlot: slot, overlay: "product_picker" }));
                navigate("/builder");
              }}
              onEditStack={() => navigate("/builder")}
              onAddUpsell={(product) => setState((prev) => ({ ...prev, cartItems: [...prev.cartItems, product] }))}
              onAddAllToBag={() => setState((prev) => ({ ...prev, overlay: "cart_drawer" }))}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [state, setState] = useState<AppState>(initialState);

  const activeItems = useMemo(() => Object.values(state.slots).filter(Boolean) as Product[], [state.slots]);
  const builderCanvasImageUrls = useMemo(() => {
    const m = modelCanvases.find((c) => c.id === state.selectedCanvas);
    return m?.imageUrls ?? modelCanvases[0].imageUrls;
  }, [state.selectedCanvas]);
  const subtotal = useMemo(
    () => [...activeItems, ...state.cartItems].reduce((sum, item) => sum + item.price, 0),
    [activeItems, state.cartItems]
  );

  const assignToSlot = (product: Product) => {
    setState((prev) => ({
      ...prev,
      slots: { ...prev.slots, [prev.activeSlot as SlotKey]: product },
      overlay: "none"
    }));
  };

  const flowProps: FlowScreenProps = {
    state,
    setState,
    activeItems,
    builderCanvasImageUrls,
    subtotal
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<Navigate to="/quiz/1" replace />} />
        <Route path="/quiz/:step" element={<QuizRoute state={state} setState={setState} activeItems={activeItems} />} />
        <Route path="/results" element={<ResultsPage state={state} setState={setState} activeItems={activeItems} />} />
        <Route path="/canvas" element={<CanvasPage state={state} setState={setState} activeItems={activeItems} />} />
        <Route path="/builder" element={<BuilderPage {...flowProps} />} />
        <Route path="/review" element={<ReviewPage {...flowProps} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AnimatePresence>
        {state.overlay === "ar_overlay" && (
          <AROverlay
            products={recommendedProducts}
            currentId={state.arProductId}
            onClose={() => setState((prev) => ({ ...prev, overlay: "none" }))}
            onBack={() => setState((prev) => ({ ...prev, overlay: "none" }))}
            onPrev={() =>
              setState((prev) => {
                const idx = Math.max(0, recommendedProducts.findIndex((item) => item.id === prev.arProductId));
                const next = (idx - 1 + recommendedProducts.length) % recommendedProducts.length;
                return { ...prev, arProductId: recommendedProducts[next].id };
              })
            }
            onNext={() =>
              setState((prev) => {
                const idx = Math.max(0, recommendedProducts.findIndex((item) => item.id === prev.arProductId));
                const next = (idx + 1) % recommendedProducts.length;
                return { ...prev, arProductId: recommendedProducts[next].id };
              })
            }
            onAdd={() =>
              setState((prev) => ({
                ...prev,
                overlay: "none",
                selectedFromResults: prev.arProductId ? Array.from(new Set([...prev.selectedFromResults, prev.arProductId])) : prev.selectedFromResults
              }))
            }
          />
        )}

        {state.overlay === "product_picker" && state.activeSlot && (
          <BottomSheet onClose={() => setState((prev) => ({ ...prev, overlay: "none" }))}>
            <h3 className="font-serif text-2xl">{slotLabels[state.activeSlot]} Earrings</h3>
            <div className="mt-3 flex gap-2 text-xs">
              {(["all", "gold", "silver"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setState((prev) => ({ ...prev, pickerFilter: filter }))}
                  className={`px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors ${state.pickerFilter === filter ? "bg-black text-white" : "border border-neutral-200 bg-white text-neutral-600 hover:border-black"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 overflow-y-auto md:grid-cols-4">
              {pickerProducts
                .filter((product) => product.slotKeys.includes(state.activeSlot as SlotKey))
                .filter((product) => state.pickerFilter === "all" || product.metals.includes(state.pickerFilter))
                .map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => assignToSlot(product)}
                    className="group rounded-lg border border-neutral-100 bg-white p-2 text-left transition-colors hover:border-black"
                  >
                    <div className="aspect-square overflow-hidden rounded bg-[#f9f8f6]">
                      <SmartImage alt={product.name} sources={product.imageUrls} className="h-full w-full object-contain p-2 transition-transform group-hover:scale-105" />
                    </div>
                    <p className="mt-1.5 truncate text-[11px] text-neutral-700">{product.name}</p>
                    <p className="text-[11px] font-semibold">${product.price}</p>
                  </button>
                ))}
            </div>
          </BottomSheet>
        )}

        {state.overlay === "inspiration" && (
          <BottomSheet heightClass="h-[60%]" onClose={() => setState((prev) => ({ ...prev, overlay: "none" }))}>
            <h3 className="font-serif text-2xl">Trending Stacks</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {inspirationStacks.map((stack) => (
                <article key={stack.id} className="overflow-hidden rounded-xl border border-neutral-100">
                  <SmartImage alt={stack.name} sources={stack.imageUrls} className="h-28 w-full object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-semibold">{stack.name}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{stack.priceLabel}</p>
                    <button
                      type="button"
                      className="btn-primary mt-3 w-full py-2 text-[10px]"
                      onClick={() =>
                        setState((prev) => {
                          const slots = { ...prev.slots };
                          slotOrder.forEach((slot) => {
                            const productId = stack.assignments[slot];
                            slots[slot] = pickerProducts.find((item) => item.id === productId) ?? null;
                          });
                          return { ...prev, slots, overlay: "none" };
                        })
                      }
                    >
                      LOAD THIS STACK
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </BottomSheet>
        )}

        {state.overlay === "cart_drawer" && (
          <CartDrawer
            items={[...activeItems, ...state.cartItems]}
            subtotal={subtotal}
            upsells={upsellProducts}
            onClose={() => setState((prev) => ({ ...prev, overlay: "none" }))}
            onAddUpsell={(item) => setState((prev) => ({ ...prev, cartItems: [...prev.cartItems, item] }))}
            onContinueShopping={() => {
              setState((prev) => ({ ...prev, overlay: "none" }));
              navigate("/builder");
            }}
            onCheckout={() => {
              setState((prev) => ({ ...prev, overlay: "none", toastMessage: "Order placed!" }));
              setTimeout(() => setState((prev) => ({ ...prev, toastMessage: null })), 1600);
            }}
          />
        )}
      </AnimatePresence>

      {state.toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 bg-black px-6 py-3 text-sm font-medium text-white shadow-lg"
        >
          {state.toastMessage}
        </motion.div>
      )}
    </div>
  );
}
