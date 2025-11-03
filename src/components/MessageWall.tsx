import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import sakuraLakeBg from "@/assets/sakura-lake-bg.jpg";

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
}

// Mock messages for demonstration
const initialMessages: Message[] = [
  { id: "1", name: "Maria", message: "Learning Japanese has been my dream! This site is amazing 🌸", timestamp: new Date() },
  { id: "2", name: "Anonymous", message: "頑張ってください! (Ganbatte kudasai!)", timestamp: new Date() },
  { id: "3", name: "Carlos", message: "Can't wait to visit Japan someday!", timestamp: new Date() },
];

export const MessageWall = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please write a message before posting.",
        variant: "destructive",
      });
      return;
    }

    if (message.length > 200) {
      toast({
        title: "Message too long",
        description: "Please keep your message under 200 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // TODO: Connect to your backend endpoint
    // For now, adding locally
    const newMessage: Message = {
      id: Date.now().toString(),
      name: name.trim() || "Anonymous",
      message: message.trim(),
      timestamp: new Date(),
    };

    setMessages([newMessage, ...messages]);
    setName("");
    setMessage("");
    
    toast({
      title: "Message posted! 🌸",
      description: "Your message has been added to the wall.",
    });
    
    setIsSubmitting(false);
  };

  // Rotate messages slightly for a more organic look
  const getRotation = (index: number) => {
    const rotations = [-2, 1, -1, 2, -3, 1.5, -1.5];
    return rotations[index % rotations.length];
  };

  return (
    <section id="message-wall" className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={sakuraLakeBg}
          alt="Sakura lake scenery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
              <MessageCircle className="w-8 h-8 text-secondary" />
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent leading-tight pb-2">
              Message Wall
            </h2>
            <p className="text-muted-foreground text-lg">
              Share your thoughts about learning Japanese
            </p>
          </div>

          {/* Message Form */}
          <Card className="p-6 mb-12 backdrop-blur-sm bg-card/90 border-2 border-primary/20 shadow-[0_8px_30px_hsl(351_100%_86%/0.2)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Your Name <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Leave blank for anonymous"
                    maxLength={50}
                    className="border-2 border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-2 block">
                    Your Message
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here... (max 200 characters)"
                    maxLength={200}
                    className="resize-none border-2 border-primary/30 focus:border-primary"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.length}/200 characters
                  </p>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                size="lg"
                className="w-full md:w-auto"
              >
                {isSubmitting ? "Posting..." : "Post Message"}
              </Button>
            </form>
          </Card>

          {/* Messages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto p-4 scroll-smooth scrollbar-hide">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className="animate-in fade-in duration-500"
                style={{
                  animationDelay: `${index * 100}ms`,
                  transform: `rotate(${getRotation(index)}deg)`,
                }}
              >
                <Card
                  className="p-6 bg-yellow-100 dark:bg-yellow-200 border-none shadow-[4px_4px_8px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.15)] transition-all duration-200 hover:scale-105 min-h-[180px] flex flex-col"
                  style={{
                    fontFamily: "'Indie Flower', cursive, sans-serif",
                  }}
                >
                  <p className="text-gray-800 text-base mb-4 flex-1 leading-relaxed">
                    {msg.message}
                  </p>
                  <div className="pt-3 border-t border-gray-400/30">
                    <p className="text-sm font-medium text-gray-700">
                      — {msg.name}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
