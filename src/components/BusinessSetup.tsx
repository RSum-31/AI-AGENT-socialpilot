import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { BusinessProfile } from '@/lib/ai-engine';

const industries = [
  'Technology', 'E-commerce', 'Healthcare', 'Education', 'Real Estate',
  'Food & Beverage', 'Fashion', 'Finance', 'Fitness', 'Travel',
  'Marketing Agency', 'SaaS', 'Consulting', 'Entertainment', 'Non-Profit'
];

const tones = ['Professional', 'Fun', 'Bold', 'Minimal'] as const;

interface BusinessSetupProps {
  onComplete: (profile: BusinessProfile) => void;
}

export function BusinessSetup({ onComplete }: BusinessSetupProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    businessName: '',
    industry: '',
    targetAudience: '',
    brandTone: '' as BusinessProfile['brandTone']
  });

  const canProceed = () => {
    if (step === 0) return form.businessName.trim().length > 0;
    if (step === 1) return !!form.industry;
    if (step === 2) return form.targetAudience.trim().length > 0;
    if (step === 3) return !!form.brandTone;
    return false;
  };

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1);
    else onComplete(form as BusinessProfile);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">Welcome to SocialPilot AI</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Let's set up your brand profile to personalize your AI agent.</p>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {[0,1,2,3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
          ))}
        </div>

        <div className="glass-card-elevated p-6">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
            {step === 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">What's your business name?</Label>
                <Input
                  placeholder="e.g., Acme Studios"
                  value={form.businessName}
                  onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                  className="h-11"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && canProceed() && handleNext()}
                />
              </div>
            )}
            {step === 1 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">What industry are you in?</Label>
                <Select value={form.industry} onValueChange={v => setForm(f => ({ ...f, industry: v }))}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select industry" /></SelectTrigger>
                  <SelectContent>
                    {industries.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Who is your target audience?</Label>
                <Input
                  placeholder="e.g., Small business owners aged 25-45"
                  value={form.targetAudience}
                  onChange={e => setForm(f => ({ ...f, targetAudience: e.target.value }))}
                  className="h-11"
                  autoFocus
                  onKeyDown={e => e.key === 'Enter' && canProceed() && handleNext()}
                />
              </div>
            )}
            {step === 3 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Choose your brand tone</Label>
                <div className="grid grid-cols-2 gap-2">
                  {tones.map(t => (
                    <button
                      key={t}
                      onClick={() => setForm(f => ({ ...f, brandTone: t }))}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        form.brandTone === t
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-primary/40'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full mt-6 h-11 gradient-primary text-primary-foreground hover:opacity-90"
          >
            {step < 3 ? 'Continue' : 'Launch AI Agent'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
