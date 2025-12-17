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
  Users,
  Wrench,
  Building,
  Megaphone,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockConversations = [
  {
    id: '1',
    name: 'João Silva',
    role: 'Condómino',
    unit: 'Fração A - 1º Esq',
    lastMessage: 'Obrigado pela informação sobre as obras.',
    timestamp: '10:30',
    unread: 0,
    online: true,
    type: 'resident',
  },
  {
    id: '2',
    name: 'Maria Santos',
    role: 'Condómina',
    unit: 'Fração B - 2º Dto',
    lastMessage: 'Quando é a próxima assembleia?',
    timestamp: 'Ontem',
    unread: 2,
    online: false,
    type: 'resident',
  },
  {
    id: '3',
    name: 'ElevaTech',
    role: 'Fornecedor',
    lastMessage: 'Manutenção do elevador concluída.',
    timestamp: '15 Dez',
    unread: 0,
    online: true,
    type: 'vendor',
  },
  {
    id: '4',
    name: 'Administração Central',
    role: 'Empresa',
    lastMessage: 'Relatório mensal aprovado.',
    timestamp: '14 Dez',
    unread: 1,
    online: true,
    type: 'company',
  },
  {
    id: '5',
    name: 'Todos os Condóminos',
    role: 'Grupo',
    lastMessage: 'Aviso: Obras na fachada iniciam segunda.',
    timestamp: '12 Dez',
    unread: 0,
    online: false,
    type: 'broadcast',
  },
];

const mockMessages = [
  {
    id: '1',
    senderId: 'other',
    content: 'Bom dia! Quando começam as obras na fachada?',
    timestamp: '09:15',
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Bom dia! As obras estão previstas para começar na próxima segunda-feira.',
    timestamp: '09:30',
  },
  {
    id: '3',
    senderId: 'other',
    content: 'E quanto tempo vão durar?',
    timestamp: '09:45',
  },
  {
    id: '4',
    senderId: 'me',
    content: 'A previsão é de 3 semanas, mas vamos mantendo informados sobre o progresso.',
    timestamp: '10:00',
  },
  {
    id: '5',
    senderId: 'other',
    content: 'Obrigado pela informação sobre as obras.',
    timestamp: '10:30',
  },
];

export function ManagerMessages() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setNewMessage('');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'resident':
        return <Users className="h-3 w-3" />;
      case 'vendor':
        return <Wrench className="h-3 w-3" />;
      case 'company':
        return <Building className="h-3 w-3" />;
      case 'broadcast':
        return <Megaphone className="h-3 w-3 text-primary" />;
      default:
        return null;
    }
  };

  const filteredConversations = activeTab === 'all' 
    ? mockConversations 
    : mockConversations.filter(c => c.type === activeTab);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Mensagens</h1>
          <p className="text-muted-foreground mt-1">
            Comunique com condóminos, fornecedores e administração
          </p>
        </div>
        <Button>
          <Megaphone className="h-4 w-4 mr-2" />
          Enviar Aviso
        </Button>
      </div>

      <Card className="h-[calc(100vh-220px)] flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Pesquisar conversas..." className="pl-10" />
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
                <TabsTrigger value="resident" className="flex-1">Condóminos</TabsTrigger>
                <TabsTrigger value="vendor" className="flex-1">Fornecedores</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="flex-1">
            {filteredConversations.map((conversation) => (
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
                    <AvatarFallback className={`${conversation.type === 'broadcast' ? 'bg-primary' : 'bg-primary'} text-primary-foreground`}>
                      {conversation.type === 'broadcast' ? <Megaphone className="h-4 w-4" /> : conversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && conversation.type !== 'broadcast' && (
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
                    {'unit' in conversation && conversation.unit && `${conversation.unit} • `}
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
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedConversation.type === 'broadcast' ? <Megaphone className="h-4 w-4" /> : selectedConversation.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {selectedConversation.online && selectedConversation.type !== 'broadcast' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                )}
              </div>
              <div>
                <p className="font-medium">{selectedConversation.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.type === 'broadcast' ? 'Comunicação em massa' : (selectedConversation.online ? 'Online' : 'Offline')} • {selectedConversation.role}
                  {'unit' in selectedConversation && selectedConversation.unit && ` • ${selectedConversation.unit}`}
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
    </>
  );
}
