import { useState, useEffect } from "react";
import romanCat from "@/assets/roman-cat.jpg";

const catMessages = [
  { japanese: "こんにちは！猫のローマンです", english: "Hello, I'm Roman the cat!" },
  { japanese: "日本語を学ぶのはとてもクールです", english: "Learning Japanese is really cool!" },
  { japanese: "一緒に勉強しましょう", english: "Let's study together" },
  { japanese: "頑張りましょう", english: "Let's do our best!" },
  { japanese: "私も日本語を勉強しています", english: "I'm also studying Japanese" },
];

interface CatMascotProps {
  position?: "left" | "right";
  delay?: number;
}

export const CatMascot = ({ position = "right", delay = 0 }: CatMascotProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowBubble(true);
    }, delay);

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % catMessages.length);
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, [delay]);

  const message = catMessages[currentMessageIndex];
  const isLeft = position === "left";

  return (
    <div
      className={`fixed bottom-8 ${
        isLeft ? "left-8" : "right-8"
      } z-40 animate-in fade-in slide-in-from-bottom-8 duration-1000`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Speech Bubble */}
      {showBubble && (
        <div
          className={`absolute bottom-full mb-4 ${
            isLeft ? "left-0" : "right-0"
          } animate-in fade-in slide-in-from-bottom-4 duration-500`}
        >
          <div className="relative bg-card/95 backdrop-blur-sm border-2 border-primary/30 rounded-2xl p-4 shadow-lg max-w-md">
            <div className="space-y-2">
              <p className="text-lg font-bold text-primary">{message.japanese}</p>
              <p className="text-sm text-muted-foreground">{message.english}</p>
            </div>
            {/* Speech bubble tail */}
            <div
              className={`absolute top-full ${
                isLeft ? "left-8" : "right-8"
              } w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-primary/30`}
            />
            <div
              className={`absolute top-full ${
                isLeft ? "left-8" : "right-8"
              } w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-card/95 translate-y-[-2px]`}
            />
          </div>
        </div>
      )}

      {/* Cat Image */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/40 shadow-[0_8px_30px_hsl(351_100%_86%/0.3)] bg-card">
        <img
          src={romanCat}
          alt="Roman the cat"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
