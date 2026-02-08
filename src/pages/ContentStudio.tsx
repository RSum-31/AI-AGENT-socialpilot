import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { useBusinessProfile } from '@/hooks/useBusinessProfile';
import { usePostHistory } from '@/hooks/usePostHistory';
import { generateStrategy } from '@/lib/ai-engine';
import { PostPreview } from '@/components/PostPreview';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Copy, Check, Brain, Clock, Hash, Lightbulb, Eye } from 'lucide-react';
import type { GeneratedPost } from '@/lib/ai-engine';
import { useNavigate } from 'react-router-dom';

const platforms = ['Instagram', 'LinkedIn', 'Twitter', 'Facebook'];
const contentTypes = ['Post', 'Reel Idea', 'Carousel', 'Thread'];
const goals = ['Awareness', 'Sales', 'Engagement'];

const ContentStudio = () => {
  const { profile } = useBusinessProfile();
  const { addPost } = usePostHistory();
  const navigate = useNavigate();

  const [platform, setPlatform] = useState('Instagram');
  const [contentType, setContentType] = useState('Post');
  const [goal, setGoal] = useState('Awareness');
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  if (!profile) {
    navigate('/');
    return null;
  }

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowPreview(false);
    setTimeout(() => {
      const post = generateStrategy(profile, goal, platform, contentType);
      setGeneratedPost(post);
      addPost(post);
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopy = () => {
    if (!generatedPost) return;
    const text = `${generatedPost.caption}\n\n${generatedPost.hashtags.join(' ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout title="Content Studio">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card-elevated p-5 space-y-4">
              <h3 className="text-sm font-display font-semibold text-foreground">Generate Content</h3>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Platform</Label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Content Type</Label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {contentTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {goals.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full h-11 gradient-primary text-primary-foreground hover:opacity-90">
                {isGenerating ? (
                  <span className="flex items-center gap-2"><span className="animate-spin">⚡</span> Generating...</span>
                ) : (
                  <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Generate Content</span>
                )}
              </Button>
            </motion.div>

            {/* Brand Context */}
            <div className="glass-card p-4">
              <p className="text-xs text-muted-foreground">
                Generating for <span className="font-medium text-foreground">{profile.businessName}</span> · {profile.industry} · {profile.brandTone} tone
              </p>
            </div>
          </div>

          {/* Generated Content */}
          <div className="lg:col-span-3 space-y-4">
            <AnimatePresence mode="wait">
              {isGenerating && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card-elevated p-8 flex flex-col items-center justify-center min-h-[300px]"
                >
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 animate-pulse">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">AI Agent is thinking...</p>
                  <p className="text-xs text-muted-foreground mt-1">Analyzing your brand profile and optimizing content</p>
                </motion.div>
              )}

              {!isGenerating && generatedPost && (
                <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  {/* Caption */}
                  <div className="glass-card-elevated p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-foreground">Generated Caption</h4>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)} className="text-xs h-7">
                          <Eye className="w-3 h-3 mr-1" /> Preview
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs h-7">
                          {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                          {copied ? 'Copied' : 'Copy'}
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{generatedPost.caption}</p>
                  </div>

                  {/* Preview */}
                  {showPreview && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <h4 className="text-sm font-semibold text-foreground mb-3">Platform Preview</h4>
                      <PostPreview post={generatedPost} businessName={profile.businessName} />
                    </motion.div>
                  )}

                  {/* Meta */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="w-3.5 h-3.5 text-primary" />
                        <h5 className="text-xs font-medium text-foreground">Hashtags</h5>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {generatedPost.hashtags.map(h => (
                          <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{h}</span>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-3.5 h-3.5 text-info" />
                        <h5 className="text-xs font-medium text-foreground">Best Time</h5>
                      </div>
                      <p className="text-lg font-display font-bold text-foreground">{generatedPost.bestTime}</p>
                    </div>
                  </div>

                  {/* Posting Tip */}
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-3.5 h-3.5 text-warning" />
                      <h5 className="text-xs font-medium text-foreground">Posting Tip</h5>
                    </div>
                    <p className="text-sm text-muted-foreground">{generatedPost.postingTip}</p>
                  </div>

                  {/* Strategy Reasoning */}
                  <div className="glass-card-elevated p-4 border-l-4 border-l-accent">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-3.5 h-3.5 text-accent" />
                      <h5 className="text-xs font-medium text-foreground">AI Strategy Reasoning</h5>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{generatedPost.reason}</p>
                  </div>

                  {/* Emojis */}
                  <div className="glass-card p-4">
                    <h5 className="text-xs font-medium text-foreground mb-2">Suggested Emojis</h5>
                    <div className="flex gap-2 text-xl">
                      {generatedPost.emojis.map((e, i) => <span key={i}>{e}</span>)}
                    </div>
                  </div>
                </motion.div>
              )}

              {!isGenerating && !generatedPost && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-12 flex flex-col items-center justify-center text-center min-h-[300px]"
                >
                  <Sparkles className="w-10 h-10 text-muted-foreground/30 mb-4" />
                  <p className="text-sm text-muted-foreground">Select your options and click generate to create AI-powered content</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContentStudio;
