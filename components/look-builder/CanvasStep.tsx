"use client";

import Image from "next/image";
import { EarModel } from "@/types/lookBuilder";

interface CanvasStepProps {
  models: EarModel[];
  selectedModelId: string | null;
  onSelectModel: (id: string) => void;
  onUseMyEar: () => void;
  cameraEnabled: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export function CanvasStep({
  models,
  selectedModelId,
  onSelectModel,
  onUseMyEar,
  cameraEnabled,
  videoRef
}: CanvasStepProps) {
  return (
    <section className="canvas-step">
      <h2>Choose your ear canvas</h2>
      <p>Pick a model photo or use your own ear with live camera preview.</p>

      <div className="model-grid">
        {models.map((model) => (
          <button
            key={model.id}
            className={`model-card ${selectedModelId === model.id ? "selected" : ""}`}
            onClick={() => onSelectModel(model.id)}
          >
            <Image src={model.image} alt={model.name} width={240} height={260} />
            <span>{model.name}</span>
          </button>
        ))}
      </div>

      <button className="button-primary" onClick={onUseMyEar}>
        Use My Ear (Live AR Video)
      </button>

      {cameraEnabled && (
        <div className="camera-preview">
          <video ref={videoRef} autoPlay muted playsInline />
          <div className="camera-overlay">Align your ear with the guide</div>
        </div>
      )}
    </section>
  );
}
