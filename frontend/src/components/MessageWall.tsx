import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import wallBg from "@/assets/sakura-lake-bg.jpg";

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export const MessageWall = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      toast({
        title: "Message required",
        description: "Please write a message before posting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, message: newMessage }),
      });

      if (response.ok) {
        setNewMessage("");
        // Keep name for convenience
        fetchMessages(); // Refresh messages
        toast({
          title: "Message posted! 🌸",
          description: "Your message has been added to the wall.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to post message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to post message:", error);
      toast({
        title: "Error",
        description: "An error occurred while posting your message.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          src={wallBg}
          alt="Message wall"
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
                    Your Name{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
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
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write your message here... (max 280 characters)"
                    maxLength={280}
                    className="resize-none border-2 border-primary/30 focus:border-primary"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {newMessage.length}/280 characters
                  </p>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading || !newMessage.trim()}
                size="lg"
                className="w-full md:w-auto"
              >
                {isLoading ? "Posting..." : "Post Message"}
              </Button>
            </form>
          </Card>

          {/* Messages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    fontFamily: "'Indie Flower', cursive",
                  }}
                >
                  <p className="text-gray-800 text-base mb-4 flex-1 leading-relaxed">
                    {msg.message}
                  </p>
                  <div className="pt-3 border-t border-gray-400/30 text-right">
                    <p className="text-sm font-medium text-gray-700">
                      — {msg.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(msg.created_at).toLocaleDateString()}
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
