import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Languages } from "lucide-react";
import calligraphyBg from "@/assets/calligraphy-bg.jpg";

export const NameTranslator = () => {
  const [name, setName] = useState("");
  const [translatedName, setTranslatedName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!name.trim()) return;
    
    setIsLoading(true);
    // TODO: Connect to your backend endpoint
    // For now, showing a placeholder
    setTimeout(() => {
      setTranslatedName("カタカナ変換待ち"); // Placeholder
      setIsLoading(false);
    }, 800);
  };

  return (
    <section id="name-translator" className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={calligraphyBg}
          alt="Japanese calligraphy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Languages className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Your Name in Japanese
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover how your name is written in Katakana
          </p>
        </div>

        <Card className="p-8 backdrop-blur-sm bg-card/80 border-2 border-primary/20 shadow-[0_8px_30px_hsl(351_100%_86%/0.2)]">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="h-12 text-lg border-2 border-primary/30 focus:border-primary"
                onKeyPress={(e) => e.key === "Enter" && handleTranslate()}
              />
            </div>

            <Button
              onClick={handleTranslate}
              disabled={isLoading || !name.trim()}
              size="lg"
              className="w-full"
            >
              {isLoading ? "Translating..." : "Translate to Japanese"}
            </Button>

            {translatedName && (
              <div className="p-6 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 animate-in fade-in duration-500">
                <p className="text-sm text-muted-foreground mb-2">Your name in Japanese:</p>
                <p className="text-4xl font-bold text-center py-4">{translatedName}</p>
              </div>
            )}
          </div>
        </Card>
        </div>
      </div>
    </section>
  );
};
