import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Info,
} from 'lucide-react';

const mockConversations = [
  {
    id: '1',
    name: 'Maria Santos',
    role: 'Proprietária',
    lastMessage: 'Obrigada pela informação. Vou verificar.',
    timestamp: '10:30',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Pedro Costa',
    role: 'Agente',
    lastMessage: 'Tenho uma nova propriedade que pode interessar.',
    timestamp: 'Ontem',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Suporte Hestio',
    role: 'Suporte',
    lastMessage: 'O seu pedido foi resolvido com sucesso.',
    timestamp: '15 Dez',
    unread: 0,
    online: true,
  },
];

const mockMessages = [
  {
    id: '1',
    senderId: '2',
    content: 'Bom dia! Queria informar que a torneira da casa de banho está a pingar.',
    timestamp: '09:15',
  },
  {
    id: '2',
    senderId: '1',
    content: 'Bom dia João! Obrigada por avisar. Vou contactar o canalizador para resolver.',
    timestamp: '09:30',
  },
  {
    id: '3',
    senderId: '2',
    content: 'Perfeito, obrigado! Está disponível amanhã de manhã?',
    timestamp: '09:45',
  },
  {
    id: '4',
    senderId: '1',
    content: 'Sim, pode ser amanhã entre as 10h e as 12h?',
    timestamp: '10:00',
  },
  {
    id: '5',
    senderId: '2',
    content: 'Está ótimo. Estarei em casa nesse horário.',
    timestamp: '10:15',
  },
  {
    id: '6',
    senderId: '1',
    content: 'Obrigada pela informação. Vou verificar.',
    timestamp: '10:30',
  },
];

export default function Messages() {
  const { user, isAuthenticated } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // In a real app, this would send the message
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground">Mensagens</h1>
          <p className="text-muted-foreground mt-1">
            Comunique com proprietários, inquilinos e agentes
          </p>
        </div>

        <Card className="h-[calc(100vh-220px)] flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-80 border-r flex flex-col">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Pesquisar conversas..." className="pl-10" />
              </div>
            </div>

            <ScrollArea className="flex-1">
              {mockConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                    selectedConversation.id === conversation.id
                      ? 'bg-muted'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conversation.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{conversation.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedConversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{selectedConversation.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.online ? 'Online' : 'Offline'} • {selectedConversation.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => {
                  const isOwn = message.senderId === '2';
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          isOwn
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-muted rounded-bl-sm'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Escreva uma mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
}
