import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Calendar as CalendarIcon,
  CheckCircle,
  Wrench,
  Building,
} from 'lucide-react';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const mockEvents = [
  {
    id: '1',
    title: 'Assembleia Geral',
    type: 'meeting',
    date: '2024-12-17',
    startTime: '19:00',
    endTime: '21:00',
    location: 'Sala de Condomínio',
    attendees: 24,
  },
  {
    id: '2',
    title: 'Manutenção Elevadores',
    type: 'maintenance',
    date: '2024-12-17',
    startTime: '09:00',
    endTime: '12:00',
    vendor: 'ElevaTech',
  },
  {
    id: '3',
    title: 'Inspeção Gás',
    type: 'inspection',
    date: '2024-12-18',
    startTime: '10:00',
    endTime: '14:00',
    vendor: 'GásSeguro',
  },
  {
    id: '4',
    title: 'Limpeza Fachada',
    type: 'maintenance',
    date: '2024-12-19',
    startTime: '08:00',
    endTime: '17:00',
    vendor: 'CleanPro',
  },
  {
    id: '5',
    title: 'Reunião Fornecedores',
    type: 'meeting',
    date: '2024-12-20',
    startTime: '15:00',
    endTime: '16:00',
    location: 'Online',
    attendees: 3,
  },
];

const typeLabels: Record<string, string> = {
  meeting: 'Reunião',
  maintenance: 'Manutenção',
  inspection: 'Inspeção',
};

const typeColors: Record<string, string> = {
  meeting: 'bg-primary/20 text-primary border-primary/30',
  maintenance: 'bg-accent/20 text-accent border-accent/30',
  inspection: 'bg-warning/20 text-warning border-warning/30',
};

const typeIcons: Record<string, any> = {
  meeting: Users,
  maintenance: Wrench,
  inspection: Building,
};

export function ManagerSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 17));
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2024, 11, 17));

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const getEventsForDate = (day: number | null) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockEvents.filter(e => e.date === dateStr);
  };

  const selectedDateEvents = selectedDate 
    ? mockEvents.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  const todayEvents = mockEvents.filter(e => e.date === '2024-12-17');
  const meetingsCount = mockEvents.filter(e => e.type === 'meeting').length;
  const maintenanceCount = mockEvents.filter(e => e.type === 'maintenance').length;

  const days = getDaysInMonth(currentDate);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground mt-1">
            Assembleias, manutenções e eventos do condomínio
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Evento
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <CalendarIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{todayEvents.length}</p>
                <p className="text-sm text-muted-foreground">Eventos Hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{meetingsCount}</p>
                <p className="text-sm text-muted-foreground">Reuniões</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <Wrench className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{maintenanceCount}</p>
                <p className="text-sm text-muted-foreground">Manutenções</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{mockEvents.length}</p>
                <p className="text-sm text-muted-foreground">Total Este Mês</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const events = getEventsForDate(day);
                const isSelected = selectedDate && day === selectedDate.getDate() && 
                  currentDate.getMonth() === selectedDate.getMonth();
                const isToday = day === 17 && currentDate.getMonth() === 11 && currentDate.getFullYear() === 2024;

                return (
                  <div
                    key={index}
                    onClick={() => day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                    className={`min-h-[80px] p-1 border rounded-lg cursor-pointer transition-colors ${
                      day ? 'hover:bg-muted/50' : ''
                    } ${isSelected ? 'bg-primary/10 border-primary' : ''} ${isToday ? 'border-primary' : 'border-border'}`}
                  >
                    {day && (
                      <>
                        <p className={`text-sm font-medium ${isToday ? 'text-primary' : ''}`}>{day}</p>
                        <div className="space-y-1 mt-1">
                          {events.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded truncate border ${typeColors[event.type]}`}
                            >
                              {event.startTime} {event.title}
                            </div>
                          ))}
                          {events.length > 2 && (
                            <p className="text-xs text-muted-foreground">+{events.length - 2} mais</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Selected Day Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {selectedDate ? (
                <span>{selectedDate.getDate()} de {months[selectedDate.getMonth()]}</span>
              ) : (
                <span>Selecione um dia</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => {
                  const TypeIcon = typeIcons[event.type];
                  return (
                    <div key={event.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${typeColors[event.type]}`}>
                            <TypeIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              {typeLabels[event.type]}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                      {'location' in event && (
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      )}
                      {'vendor' in event && (
                        <p className="text-sm text-muted-foreground">Fornecedor: {event.vendor}</p>
                      )}
                      {'attendees' in event && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {event.attendees} participantes
                        </div>
                      )}
                      <Button variant="outline" size="sm" className="w-full">
                        Ver Detalhes
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Nenhum evento agendado</p>
                <Button variant="outline" size="sm" className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
