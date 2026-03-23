"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  baseSlotState,
  curatedStacks,
  earModels,
  earSlots,
  earrings,
  finalUpsells,
  quizQuestions
} from "@/lib/lookBuilderData";
import { SlotType } from "@/types/lookBuilder";
import { StepProgress } from "@/components/look-builder/StepProgress";
import { QuizEntry } from "@/components/look-builder/QuizEntry";
import { CanvasStep } from "@/components/look-builder/CanvasStep";
import { BuildStep } from "@/components/look-builder/BuildStep";
import { ProductPickerSheet } from "@/components/look-builder/ProductPickerSheet";
import { InspirationDrawer } from "@/components/look-builder/InspirationDrawer";
import { ReviewStep } from "@/components/look-builder/ReviewStep";
import { CartSheet } from "@/components/look-builder/CartSheet";

export default function LookBuilderPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(earModels[0].id);
  const [slotAssignments, setSlotAssignments] =
    useState<Record<SlotType, string | null>>(baseSlotState);
  const [selectedSlot, setSelectedSlot] = useState<SlotType | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [inspirationOpen, setInspirationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const quizComplete = quizIndex >= quizQuestions.length;

  const recommended = useMemo(() => {
    if (!quizComplete) return earrings.slice(0, 3);

    const selectedTags = quizQuestions
      .map((question) => {
        const option = question.options.find((item) => item.id === quizAnswers[question.id]);
        return option?.tags ?? [];
      })
      .flat();

    const scored = earrings.map((item) => {
      const match = item.earringStyle ? selectedTags.filter((tag) => tag === item.earringStyle).length : 0;
      return { item, match };
    });

    return scored
      .sort((a, b) => b.match - a.match)
      .map((entry) => entry.item)
      .slice(0, 5);
  }, [quizAnswers, quizComplete]);

  const selectedModel = earModels.find((item) => item.id === selectedModelId) ?? earModels[0];

  const slotProducts = useMemo(() => {
    return Object.fromEntries(
      (Object.entries(slotAssignments) as [SlotType, string | null][]).map(([slot, productId]) => [
        slot,
        earrings.find((item) => item.id === productId) ?? null
      ])
    ) as Record<SlotType, (typeof earrings)[number] | null>;
  }, [slotAssignments]);

  const assignedItems = useMemo(() => {
    return (Object.entries(slotProducts) as [SlotType, (typeof earrings)[number] | null][])
      .filter((entry): entry is [SlotType, (typeof earrings)[number]] => Boolean(entry[1]));
  }, [slotProducts]);

  const subtotal = assignedItems.reduce((sum, [, item]) => sum + item.price, 0);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video?.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleQuizSelect = (questionId: string, optionId: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    setQuizIndex((prev) => prev + 1);
  };

  const restartQuiz = () => {
    setQuizAnswers({});
    setQuizIndex(0);
  };

  const handleUseMyEar = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraEnabled(true);
    } catch (error) {
      setCameraEnabled(false);
      alert("Camera permission is required for live preview.");
      console.error(error);
    }
  };

  const openSlot = (slotId: SlotType) => {
    setSelectedSlot(slotId);
    setPickerOpen(true);
  };

  const pickerProducts = selectedSlot
    ? earrings.filter((item) => item.slotTypes?.includes(selectedSlot))
    : [];

  const assignProduct = (productId: string) => {
    if (!selectedSlot) return;
    setSlotAssignments((prev) => ({ ...prev, [selectedSlot]: productId }));
    setPickerOpen(false);
  };

  const applyCuratedStack = (stackId: string) => {
    const stack = curatedStacks.find((item) => item.id === stackId);
    if (!stack) return;
    setSlotAssignments(stack.slotAssignments);
    setInspirationOpen(false);
  };

  return (
    <main className="builder-page">
      <header className="builder-top">
        <h1>Earring Look Builder</h1>
        <StepProgress step={step} />
      </header>

      <section className="quiz-wrap">
        <QuizEntry
          questions={quizQuestions}
          currentIndex={quizIndex}
          onSelect={handleQuizSelect}
          onRestart={restartQuiz}
          answers={quizAnswers}
          isComplete={quizComplete}
        />
        {quizComplete && (
          <div className="recommended-panel">
            <h3>Your 3-5 recommendations</h3>
            <div className="recommended-list">
              {recommended.map((item) => (
                <article key={item.id} className="recommended-item">
                  <Image src={item.image} alt={item.name} width={240} height={240} />
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                </article>
              ))}
            </div>
            <button className="button-primary" onClick={() => setStep(1)}>
              Start Building
            </button>
          </div>
        )}
      </section>

      {step === 1 && (
        <CanvasStep
          models={earModels}
          selectedModelId={selectedModelId}
          onSelectModel={setSelectedModelId}
          onUseMyEar={handleUseMyEar}
          cameraEnabled={cameraEnabled}
          videoRef={videoRef}
        />
      )}

      {step === 2 && (
        <BuildStep
          baseImage={selectedModel.image}
          slots={earSlots}
          selectedSlot={selectedSlot}
          slotProducts={slotProducts}
          onOpenSlot={openSlot}
          onOpenInspiration={() => setInspirationOpen(true)}
        />
      )}

      {step === 3 && (
        <ReviewStep
          items={assignedItems}
          subtotal={subtotal}
          upsells={finalUpsells}
          onEdit={(slot) => {
            setStep(2);
            openSlot(slot);
          }}
          onAddAll={() => setCartOpen(true)}
        />
      )}

      <div className="step-controls">
        <button className="button-secondary" disabled={step === 1} onClick={() => setStep((step - 1) as 1 | 2 | 3)}>
          Back
        </button>
        <button className="button-primary" disabled={step === 3} onClick={() => setStep((step + 1) as 1 | 2 | 3)}>
          Next
        </button>
      </div>

      <ProductPickerSheet
        open={pickerOpen}
        title={selectedSlot ? `Choose for ${selectedSlot}` : "Choose Earring"}
        products={pickerProducts}
        onClose={() => setPickerOpen(false)}
        onSelect={assignProduct}
      />

      <InspirationDrawer
        open={inspirationOpen}
        stacks={curatedStacks}
        onApply={applyCuratedStack}
        onClose={() => setInspirationOpen(false)}
      />

      <CartSheet
        open={cartOpen}
        items={assignedItems.map(([, item]) => item)}
        upsells={finalUpsells}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
      />
    </main>
  );
}
