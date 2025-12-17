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
  Building,
  Megaphone,
  Landmark,
  FileText,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mockConversations = [
  {
    id: '1',
    name: 'João Silva',
    role: 'Candidato',
    district: 'Lisboa',
    application: 'CAND-2024-1234',
    lastMessage: 'Obrigado pela informação sobre o processo.',
    timestamp: '10:30',
    unread: 0,
    online: true,
    type: 'applicant',
  },
  {
    id: '2',
    name: 'Maria Santos',
    role: 'Inquilina Social',
    district: 'Lisboa',
    property: 'Bloco A - Marvila',
    lastMessage: 'Quando posso regularizar a renda?',
    timestamp: 'Ontem',
    unread: 2,
    online: false,
    type: 'tenant',
  },
  {
    id: '3',
    name: 'Câmara Municipal',
    role: 'Entidade',
    district: 'Porto',
    lastMessage: 'Protocolo de cooperação assinado.',
    timestamp: '15 Dez',
    unread: 0,
    online: true,
    type: 'entity',
  },
  {
    id: '4',
    name: 'IHRU',
    role: 'Instituto',
    lastMessage: 'Novo programa de financiamento disponível.',
    timestamp: '14 Dez',
    unread: 1,
    online: true,
    type: 'entity',
  },
  {
    id: '5',
    name: 'Comunicação Geral',
    role: 'Todos os Inquilinos',
    lastMessage: 'Informação sobre atualização de rendas 2025.',
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
    content: 'Bom dia! Gostaria de saber o estado da minha candidatura.',
    timestamp: '09:15',
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Bom dia! A sua candidatura está em análise. O processo demora cerca de 30 dias.',
    timestamp: '09:30',
  },
  {
    id: '3',
    senderId: 'other',
    content: 'Preciso de entregar mais algum documento?',
    timestamp: '09:45',
  },
  {
    id: '4',
    senderId: 'me',
    content: 'Não, a documentação está completa. Será notificado assim que houver uma decisão.',
    timestamp: '10:00',
  },
  {
    id: '5',
    senderId: 'other',
    content: 'Obrigado pela informação sobre o processo.',
    timestamp: '10:30',
  },
];

export function GovernmentMessages() {
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
      case 'applicant':
        return <FileText className="h-3 w-3" />;
      case 'tenant':
        return <Users className="h-3 w-3" />;
      case 'entity':
        return <Landmark className="h-3 w-3" />;
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
            Comunique com candidatos, inquilinos sociais e entidades
          </p>
        </div>
        <Button>
          <Megaphone className="h-4 w-4 mr-2" />
          Comunicação Oficial
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
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por distrito" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Distritos</SelectItem>
                <SelectItem value="lisboa">Lisboa</SelectItem>
                <SelectItem value="porto">Porto</SelectItem>
                <SelectItem value="faro">Faro</SelectItem>
              </SelectContent>
            </Select>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
                <TabsTrigger value="applicant" className="flex-1">Candidatos</TabsTrigger>
                <TabsTrigger value="tenant" className="flex-1">Inquilinos</TabsTrigger>
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
                    <AvatarFallback className="bg-primary text-primary-foreground">
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
                    {'application' in conversation && conversation.application && (
                      <span className="text-primary">{conversation.application} • </span>
                    )}
                    {'district' in conversation && conversation.district && `${conversation.district} • `}
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
                  {selectedConversation.role}
                  {'district' in selectedConversation && selectedConversation.district && ` • ${selectedConversation.district}`}
                  {'property' in selectedConversation && selectedConversation.property && ` • ${selectedConversation.property}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {'application' in selectedConversation && selectedConversation.application && (
                <Badge variant="outline" className="mr-2">
                  <FileText className="h-3 w-3 mr-1" />
                  {selectedConversation.application}
                </Badge>
              )}
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
