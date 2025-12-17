import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  Info,
  Home,
  Wrench,
} from 'lucide-react';

const mockConversations = [
  {
    id: '1',
    name: 'Maria Santos',
    role: 'Proprietária',
    property: 'T2 Chiado',
    lastMessage: 'O canalizador vai amanhã entre as 10h e 12h.',
    timestamp: '10:30',
    unread: 2,
    online: true,
    type: 'owner',
  },
  {
    id: '2',
    name: 'Pedro Costa',
    role: 'Agente',
    lastMessage: 'Posso mostrar-lhe o apartamento sexta-feira?',
    timestamp: 'Ontem',
    unread: 1,
    online: false,
    type: 'agent',
  },
  {
    id: '3',
    name: 'TecniServ',
    role: 'Manutenção',
    property: 'T2 Chiado',
    lastMessage: 'Confirmamos a visita para amanhã às 10h.',
    timestamp: '15 Dez',
    unread: 0,
    online: true,
    type: 'vendor',
  },
  {
    id: '4',
    name: 'Suporte Hestio',
    role: 'Suporte',
    lastMessage: 'O seu pedido foi resolvido com sucesso.',
    timestamp: '14 Dez',
    unread: 0,
    online: true,
    type: 'support',
  },
];

const mockMessages = [
  {
    id: '1',
    senderId: 'other',
    content: 'Bom dia! Recebi o seu pedido sobre a torneira da casa de banho.',
    timestamp: '09:15',
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Bom dia! Sim, está a pingar há alguns dias.',
    timestamp: '09:30',
  },
  {
    id: '3',
    senderId: 'other',
    content: 'Vou contactar o canalizador para resolver o mais rápido possível.',
    timestamp: '09:45',
  },
  {
    id: '4',
    senderId: 'me',
    content: 'Obrigado! Estou disponível amanhã de manhã se for possível.',
    timestamp: '10:00',
  },
  {
    id: '5',
    senderId: 'other',
    content: 'Perfeito! O canalizador vai amanhã entre as 10h e 12h.',
    timestamp: '10:30',
  },
];

export function TenantMessages() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'owner':
        return <Home className="h-3 w-3" />;
      case 'vendor':
        return <Wrench className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Mensagens</h1>
        <p className="text-muted-foreground mt-1">
          Comunique com o seu senhorio, agentes e serviços de manutenção
        </p>
      </div>

      <Card className="glass-card h-[calc(100vh-220px)] flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r border-border/50 flex flex-col">
          <div className="p-4 border-b border-border/50">
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
                    ? 'bg-primary/10'
                    : 'hover:bg-muted/30'
                }`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {conversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">{conversation.name}</p>
                      {getTypeIcon(conversation.type)}
                    </div>
                    <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {'property' in conversation && conversation.property && `${conversation.property} • `}
                    {conversation.lastMessage}
                  </p>
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
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
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
                  {'property' in selectedConversation && selectedConversation.property && ` • ${selectedConversation.property}`}
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
                const isOwn = message.senderId === 'me';
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        isOwn
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted/50 backdrop-blur-sm rounded-bl-sm'
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
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border/50">
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
    </div>
  );
}
