import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Eye, Heart, Lightbulb } from 'lucide-react';

const followerData = [
  { month: 'Jul', followers: 1200 }, { month: 'Aug', followers: 1450 },
  { month: 'Sep', followers: 1800 }, { month: 'Oct', followers: 2100 },
  { month: 'Nov', followers: 2600 }, { month: 'Dec', followers: 3200 },
  { month: 'Jan', followers: 3900 }, { month: 'Feb', followers: 4800 },
];

const engagementData = [
  { day: 'Mon', posts: 3, engagement: 4.2 }, { day: 'Tue', posts: 5, engagement: 5.1 },
  { day: 'Wed', posts: 2, engagement: 3.8 }, { day: 'Thu', posts: 4, engagement: 6.2 },
  { day: 'Fri', posts: 6, engagement: 7.5 }, { day: 'Sat', posts: 3, engagement: 4.0 },
  { day: 'Sun', posts: 1, engagement: 3.2 },
];

const contentTypeData = [
  { name: 'Reels', value: 42, color: 'hsl(168, 80%, 36%)' },
  { name: 'Carousel', value: 28, color: 'hsl(262, 60%, 55%)' },
  { name: 'Static', value: 18, color: 'hsl(38, 92%, 50%)' },
  { name: 'Stories', value: 12, color: 'hsl(210, 100%, 52%)' },
];

const insights = [
  { text: 'Reels perform 32% better than static posts. Consider increasing Reel content in your strategy.', type: 'success' as const },
  { text: 'Friday posts generate the highest engagement (7.5%). Schedule your best content for Fridays.', type: 'info' as const },
  { text: 'Your follower growth rate increased by 23% this month. Keep up the consistent posting schedule.', type: 'success' as const },
  { text: 'Carousel posts have the highest save rate. Use them for educational content to boost algorithmic reach.', type: 'info' as const },
];

const stats = [
  { label: 'Total Followers', value: '4,800', change: '+23%', icon: Users },
  { label: 'Avg. Engagement', value: '5.1%', change: '+12%', icon: Heart },
  { label: 'Monthly Reach', value: '28.4K', change: '+34%', icon: Eye },
  { label: 'Growth Rate', value: '18%', change: '+5%', icon: TrendingUp },
];

const Analytics = () => {
  const { profile } = useBusinessProfile();
  const navigate = useNavigate();

  if (!profile) { navigate('/'); return null; }

  return (
    <Layout title="Analytics">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card-elevated p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <s.icon className="w-4 h-4 text-primary" />
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-success/10 text-success font-medium">{s.change}</span>
              </div>
              <p className="text-xl font-display font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card-elevated p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Follower Growth</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={followerData}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(168, 80%, 36%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(168, 80%, 36%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="followers" stroke="hsl(168, 80%, 36%)" fillOpacity={1} fill="url(#colorFollowers)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card-elevated p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Engagement</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="engagement" fill="hsl(168, 80%, 36%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Content Type Breakdown + Insights */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card-elevated p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Content Performance</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={contentTypeData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                    {contentTypeData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {contentTypeData.map(c => (
                  <div key={c.name} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-xs text-foreground">{c.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass-card-elevated p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-warning" /> AI Insights
            </h3>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className={`text-xs leading-relaxed p-2.5 rounded-lg ${
                  insight.type === 'success' ? 'bg-success/10 text-success' : 'bg-info/10 text-info'
                }`}>
                  {insight.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
