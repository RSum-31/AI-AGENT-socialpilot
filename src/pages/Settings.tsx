import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
import { usePostHistory } from '@/hooks/usePostHistory';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Trash2, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { BusinessProfile } from '@/lib/ai-engine';

const industries = [
  'Technology', 'E-commerce', 'Healthcare', 'Education', 'Real Estate',
  'Food & Beverage', 'Fashion', 'Finance', 'Fitness', 'Travel',
  'Marketing Agency', 'SaaS', 'Consulting', 'Entertainment', 'Non-Profit'
];

const tones = ['Professional', 'Fun', 'Bold', 'Minimal'] as const;

const SettingsPage = () => {
  const { profile, setProfile, clearProfile } = useBusinessProfile();
  const { posts } = usePostHistory();
  const navigate = useNavigate();

  const [form, setForm] = useState<BusinessProfile>(profile || {
    businessName: '', industry: '', targetAudience: '', brandTone: 'Professional'
  });
  const [saved, setSaved] = useState(false);

  if (!profile) { navigate('/'); return null; }

  const handleSave = () => {
    setProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    clearProfile();
    navigate('/');
  };

  return (
    <Layout title="Settings">
      <div className="max-w-lg mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card-elevated p-6 space-y-5">
          <h3 className="text-sm font-display font-semibold text-foreground">Brand Profile</h3>

          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Business Name</Label>
              <Input value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))} className="h-10" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Industry</Label>
              <Select value={form.industry} onValueChange={v => setForm(f => ({ ...f, industry: v }))}>
                <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {industries.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Target Audience</Label>
              <Input value={form.targetAudience} onChange={e => setForm(f => ({ ...f, targetAudience: e.target.value }))} className="h-10" />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1.5 block">Brand Tone</Label>
              <div className="grid grid-cols-4 gap-2">
                {tones.map(t => (
                  <button
                    key={t}
                    onClick={() => setForm(f => ({ ...f, brandTone: t }))}
                    className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                      form.brandTone === t ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full h-10 gradient-primary text-primary-foreground">
            <Save className="w-4 h-4 mr-2" /> {saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4">
          <p className="text-xs text-muted-foreground mb-2">Data: {posts.length} posts generated</p>
          <Button variant="ghost" size="sm" onClick={handleReset} className="text-destructive hover:text-destructive text-xs">
            <RotateCcw className="w-3 h-3 mr-1" /> Reset All Data
          </Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
