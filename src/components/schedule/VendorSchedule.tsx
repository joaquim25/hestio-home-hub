import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Wrench,
  Calendar as CalendarIcon,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const mockEvents = [
  {
    id: '1',
    title: 'Manutenção Elevador',
    client: 'Edifício Aurora',
    location: 'Av. da República, 50',
    date: '2024-12-17',
    startTime: '09:00',
    endTime: '12:00',
    status: 'confirmed',
    type: 'maintenance',
    workOrder: 'WO-2024-089',
  },
  {
    id: '2',
    title: 'Inspeção AVAC',
    client: 'Edifício Belém',
    location: 'Rua de Belém, 100',
    date: '2024-12-17',
    startTime: '14:00',
    endTime: '16:00',
    status: 'confirmed',
    type: 'inspection',
    workOrder: 'WO-2024-090',
  },
  {
    id: '3',
    title: 'Reparação Urgente',
    client: 'Condomínio Tejo',
    location: 'Parque das Nações',
    date: '2024-12-18',
    startTime: '08:00',
    endTime: '10:00',
    status: 'pending',
    type: 'emergency',
    workOrder: 'WO-2024-091',
  },
  {
    id: '4',
    title: 'Manutenção Preventiva',
    client: 'Edifício Aurora',
    location: 'Av. da República, 50',
    date: '2024-12-19',
    startTime: '10:00',
    endTime: '13:00',
    status: 'confirmed',
    type: 'maintenance',
    workOrder: 'WO-2024-092',
  },
  {
    id: '5',
    title: 'Revisão Sistema Elétrico',
    client: 'Edifício Cascais',
    location: 'Cascais Centro',
    date: '2024-12-20',
    startTime: '09:00',
    endTime: '17:00',
    status: 'confirmed',
    type: 'maintenance',
    workOrder: 'WO-2024-093',
  },
];

const typeColors: Record<string, string> = {
  maintenance: 'bg-primary/20 text-primary border-primary/30',
  inspection: 'bg-accent/20 text-accent border-accent/30',
  emergency: 'bg-destructive/20 text-destructive border-destructive/30',
};

const statusLabels: Record<string, string> = {
  confirmed: 'Confirmado',
  pending: 'Pendente',
  completed: 'Concluído',
};

const statusVariants: Record<string, 'success' | 'warning' | 'secondary'> = {
  confirmed: 'success',
  pending: 'warning',
  completed: 'secondary',
};

export function VendorSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 17)); // December 2024
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
  const weekEvents = mockEvents.length;
  const pendingEvents = mockEvents.filter(e => e.status === 'pending').length;

  const days = getDaysInMonth(currentDate);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Agenda</h1>
          <p className="text-muted-foreground mt-1">
            Gestão de trabalhos agendados e disponibilidade
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
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
                <p className="text-sm text-muted-foreground">Trabalhos Hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-accent/10">
                <Wrench className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{weekEvents}</p>
                <p className="text-sm text-muted-foreground">Esta Semana</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-warning/10">
                <AlertCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{pendingEvents}</p>
                <p className="text-sm text-muted-foreground">Por Confirmar</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <Clock className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">32h</p>
                <p className="text-sm text-muted-foreground">Horas Agendadas</p>
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
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.client}</p>
                      </div>
                      <Badge variant={statusVariants[event.status]}>
                        {event.status === 'confirmed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {statusLabels[event.status]}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Badge variant="outline" className="text-xs">
                        {event.workOrder}
                      </Badge>
                      <Button variant="outline" size="sm" className="ml-auto">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Nenhum trabalho agendado</p>
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
