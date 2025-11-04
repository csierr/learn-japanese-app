import { useState } from "react";
import { NameTranslator } from "@/components/NameTranslator";
import { TextTranslator } from "@/components/TextTranslator";
import { StudyResources } from "@/components/StudyResources";
import { MessageWall } from "@/components/MessageWall";
import { Header } from "@/components/Header";
import { CatMascot } from "@/components/CatMascot";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import heroImage from "@/assets/hero-sakura.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <main className="min-h-screen">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Home Tab */}
        <TabsContent value="home" className="mt-0">
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={heroImage}
                alt="Japanese sakura temple"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
            </div>

            {/* Floating Sakura Petals Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-10%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${10 + Math.random() * 10}s`,
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full bg-primary/30 blur-sm"
                    style={{
                      transform: `rotate(${Math.random() * 360}deg)`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700 cursor-default">
                      <span className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                        日本語の世界へようこそ〜
                        {/* にほんごの せかいへ ようこそ〜 */}
                        {/* 日本語の世界へようこそ */}
                      </span>
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Nihongo no sekai e yōkoso</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <p className="text-xl md:text-2xl mb-4 text-foreground/90 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                Welcome to the World of Japanese
              </p>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-200">
                Hi! I'm Catalina (カタリナ), a Chilean learning Japanese. 
                Learning the language has been so fulfilling and challenging that I built this app to share that excitement with others!
              </p>
            </div>

            <div className="absolute bottom-10 inset-x-0 flex justify-center animate-bounce z-20">
              <a
                href="#writing-systems"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#writing-systems')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-sm">Japanese Writing System Overview</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </a>
            </div>
          </section>

          {/* Writing Systems Section */}
          <section id="writing-systems" className="py-20 px-4 bg-background/95">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
                The Three Japanese Writing Systems
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Japanese uses three main writing systems: Kanji, Hiragana, and Katakana. Each has a unique role.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="p-6 rounded-lg border border-primary/20 bg-primary/5 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2 text-primary">Kanji (漢字)</h3>
                  <p className="text-muted-foreground">
                    Kanji are Chinese characters adapted for Japanese. They represent ideas or words and are used for nouns, verb stems, and adjectives. For example, <span className="font-bold text-secondary">猫</span> means "cat."
                  </p>
                </div>
                <div className="p-6 rounded-lg border border-primary/20 bg-primary/5 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2 text-primary">Hiragana (ひらがな)</h3>
                  <p className="text-muted-foreground">
                    Hiragana is a phonetic script where each character represents a syllable. It's used for grammatical particles, verb endings, and native Japanese words not covered by Kanji. For example, <span className="font-bold text-secondary">ねこ</span> (ne-ko) is "cat."
                  </p>
                </div>
                <div className="p-6 rounded-lg border border-primary/20 bg-primary/5 transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2 text-primary">Katakana (カタカナ)</h3>
                  <p className="text-muted-foreground">
                    Katakana is also a phonetic script, mainly used for foreign words, names, onomatopoeia, and for emphasis. This is why your translated name will appear in Katakana. For example, <span className="font-bold text-secondary">ネコ</span> (ne-ko) is also "cat."
                  </p>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>

        {/* Name Translator Tab */}
        <TabsContent value="name-translator" className="mt-0">
          <NameTranslator />
        </TabsContent>

        {/* Text Translator Tab */}
        <TabsContent value="text-translator" className="mt-0">
          <TextTranslator />
        </TabsContent>

        {/* Study Tab */}
        <TabsContent value="study" className="mt-0">
          <StudyResources />
        </TabsContent>

        {/* Message Wall Tab */}
        <TabsContent value="message-wall" className="mt-0">
          <MessageWall />
        </TabsContent>
      </Tabs>

      {/* Cat Mascot */}
      <CatMascot position="right" delay={2000} />

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-t from-primary/5 to-background border-t border-primary/20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            Made with ❤️ by Catalina for anyone interested in learning Japanese.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            頑張りましょう (Let's do our best!)
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
