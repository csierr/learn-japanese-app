import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import libraryBg from "@/assets/library-bg.jpg";

export const TextTranslator = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [romajiText, setRomajiText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setTranslatedText("");
    setRomajiText("");

    try {
      const apiUrl = ""; // Use relative path for API calls
      const response = await fetch(`${apiUrl}/api/translate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
      setRomajiText(data.romajiText);
    } catch (error) {
      console.error("Failed to translate:", error);
      setTranslatedText("Failed to translate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="text-translator" className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={libraryBg}
          alt="Japanese library"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
            <MessageSquare className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Text Translator
          </h2>
          <p className="text-muted-foreground text-lg">
            Translate phrases and texts between English and Japanese
          </p>
        </div>

        <Card className="p-8 backdrop-blur-sm bg-card/80 border-2 border-primary/20 shadow-[0_8px_30px_hsl(351_100%_86%/0.2)]">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Your language</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your text here..."
                className="min-h-[200px] resize-none border-2 border-primary/30 focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">日本語 (Japanese)</label>
              <div className="min-h-[200px] px-3 py-2 rounded-md bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20">
                {translatedText ? (
                  <>
                    <p className="text-sm leading-normal">{translatedText}</p>
                    <p className="text-sm text-muted-foreground italic mt-2">{romajiText}</p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Translation will appear here...</p>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleTranslate}
            disabled={isLoading || !text.trim()}
            size="lg"
            className="w-full mt-6"
            variant="secondary"
          >
            {isLoading ? "Translating..." : "Translate"}
          </Button>
        </Card>
        </div>
      </div>
    </section>
  );
};
