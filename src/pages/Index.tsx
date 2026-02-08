import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
import { usePostHistory } from '@/hooks/usePostHistory';
import { getInsight } from '@/lib/ai-engine';
import { BusinessSetup } from '@/components/BusinessSetup';
import { PenSquare, CalendarDays, BarChart3, Sparkles, TrendingUp, Clock, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { profile, setProfile, isSetup } = useBusinessProfile();
  const { posts, scheduledPosts, recentPosts } = usePostHistory();
  const navigate = useNavigate();

  if (!isSetup) {
    return <BusinessSetup onComplete={setProfile} />;
  }

  const insight = getInsight(posts);

  const stats = [
    { label: 'Posts Generated', value: posts.length, icon: PenSquare, color: 'text-primary' },
    { label: 'Scheduled', value: scheduledPosts.length, icon: CalendarDays, color: 'text-info' },
    { label: 'Avg. Engagement', value: '4.2%', icon: TrendingUp, color: 'text-success' },
    { label: 'Best Time', value: '7 PM', icon: Clock, color: 'text-warning' },
  ];

  const quickActions = [
    { label: 'Generate Post', icon: PenSquare, path: '/studio', desc: 'Create AI-powered content' },
    { label: 'View Schedule', icon: CalendarDays, path: '/scheduler', desc: 'Manage your calendar' },
    { label: 'Analytics', icon: BarChart3, path: '/analytics', desc: 'Track performance' },
  ];

  return (
    <Layout title="Dashboard">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Welcome back, {profile!.businessName} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Your AI agent is ready to create optimized content.</p>
        </motion.div>

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
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-xl font-display font-bold text-foreground">{s.value}</span>
              </div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* AI Insight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-elevated p-4 border-l-4 border-l-primary"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">AI Insight</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{insight}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {quickActions.map((a, i) => (
              <motion.button
                key={a.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                onClick={() => navigate(a.path)}
                className="glass-card p-4 text-left hover:border-primary/40 transition-all group"
              >
                <a.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium text-foreground">{a.label}</p>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Learning History</h3>
            <div className="space-y-2">
              {recentPosts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {p.platform} · {p.contentType} · {p.goal}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{p.caption.slice(0, 80)}...</p>
                  </div>
                  {p.scheduledDate && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">Scheduled</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
