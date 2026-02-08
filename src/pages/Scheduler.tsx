import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { usePostHistory } from '@/hooks/usePostHistory';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
import { CalendarDays, Clock, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '12:00 PM', '1:00 PM', '3:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const Scheduler = () => {
  const { profile } = useBusinessProfile();
  const { posts, scheduledPosts, schedulePost, removePost } = usePostHistory();
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState('');
  const [selectedTime, setSelectedTime] = useState('7:00 PM');

  if (!profile) { navigate('/'); return null; }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const unscheduledPosts = posts.filter(p => !p.scheduledDate);

  const getPostsForDay = (day: number) => {
    return scheduledPosts.filter(p => {
      const d = new Date(p.scheduledDate!);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });
  };

  const handleSchedule = () => {
    if (!selectedDay || !selectedPostId) return;
    const date = new Date(year, month, selectedDay);
    schedulePost(selectedPostId, date, selectedTime);
    setSelectedPostId('');
    setSelectedDay(null);
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  return (
    <Layout title="Scheduler">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-display font-bold text-foreground">{monthName}</h2>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={prevMonth}><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" onClick={nextMonth}><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="glass-card-elevated overflow-hidden">
          <div className="grid grid-cols-7">
            {daysOfWeek.map(d => (
              <div key={d} className="p-2 text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border">
                {d}
              </div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`e-${i}`} className="p-2 min-h-[80px] border-b border-r border-border bg-muted/30" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayPosts = getPostsForDay(day);
              const isSelected = selectedDay === day;
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

              return (
                <motion.div
                  key={day}
                  whileHover={{ backgroundColor: 'hsl(var(--muted) / 0.5)' }}
                  onClick={() => setSelectedDay(day)}
                  className={`p-2 min-h-[80px] border-b border-r border-border cursor-pointer transition-colors ${
                    isSelected ? 'bg-primary/5 ring-1 ring-primary' : ''
                  }`}
                >
                  <span className={`text-xs font-medium ${isToday ? 'w-5 h-5 rounded-full gradient-primary text-primary-foreground flex items-center justify-center' : 'text-foreground'}`}>
                    {day}
                  </span>
                  {dayPosts.map(p => (
                    <div key={p.id} className="mt-1 px-1.5 py-0.5 rounded text-[9px] bg-primary/10 text-primary truncate">
                      {p.platform} · {p.scheduledTime}
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Schedule Form */}
        {selectedDay && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card-elevated p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Schedule post for {monthName.split(' ')[0]} {selectedDay}</h3>
            {unscheduledPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No unscheduled posts. <button onClick={() => navigate('/studio')} className="text-primary hover:underline">Generate content first</button>.</p>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={selectedPostId} onValueChange={setSelectedPostId}>
                  <SelectTrigger className="flex-1 h-10"><SelectValue placeholder="Select a post" /></SelectTrigger>
                  <SelectContent>
                    {unscheduledPosts.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.platform} · {p.contentType} — {p.caption.slice(0, 40)}...</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="w-32 h-10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button onClick={handleSchedule} disabled={!selectedPostId} className="h-10 gradient-primary text-primary-foreground">
                  <CalendarDays className="w-4 h-4 mr-2" /> Schedule
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {/* Scheduled Posts List */}
        {scheduledPosts.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Upcoming Posts</h3>
            <div className="space-y-2">
              {scheduledPosts.map(p => (
                <div key={p.id} className="glass-card p-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{p.platform} · {p.contentType}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(p.scheduledDate!).toLocaleDateString()} at {p.scheduledTime}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removePost(p.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Scheduler;
