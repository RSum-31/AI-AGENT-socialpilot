import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ThumbsUp, Repeat2 } from 'lucide-react';
import type { GeneratedPost } from '@/lib/ai-engine';

interface PostPreviewProps {
  post: GeneratedPost;
  businessName: string;
}

export function PostPreview({ post, businessName }: PostPreviewProps) {
  const initials = businessName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  if (post.platform === 'Instagram') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card-elevated max-w-sm mx-auto overflow-hidden">
        <div className="flex items-center gap-3 p-3">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">{initials}</div>
          <span className="text-sm font-semibold text-foreground">{businessName.toLowerCase().replace(/\s+/g, '')}</span>
          <MoreHorizontal className="w-4 h-4 text-muted-foreground ml-auto" />
        </div>
        <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <span className="text-4xl">{post.emojis[0]}</span>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-4 mb-2">
            <Heart className="w-5 h-5 text-foreground" />
            <MessageCircle className="w-5 h-5 text-foreground" />
            <Share2 className="w-5 h-5 text-foreground" />
            <Bookmark className="w-5 h-5 text-foreground ml-auto" />
          </div>
          <p className="text-xs text-foreground leading-relaxed line-clamp-4">
            <span className="font-semibold">{businessName.toLowerCase().replace(/\s+/g, '')} </span>
            {post.caption.slice(0, 200)}...
          </p>
          <p className="text-xs text-primary mt-1">{post.hashtags.slice(0, 4).join(' ')}</p>
        </div>
      </motion.div>
    );
  }

  if (post.platform === 'LinkedIn') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card-elevated max-w-sm mx-auto p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">{initials}</div>
          <div>
            <p className="text-sm font-semibold text-foreground">{businessName}</p>
            <p className="text-[10px] text-muted-foreground">Just now · 🌐</p>
          </div>
        </div>
        <p className="text-xs text-foreground leading-relaxed mb-3 whitespace-pre-line line-clamp-6">{post.caption.slice(0, 300)}...</p>
        <div className="border-t border-border pt-2 flex justify-between">
          {[{ icon: ThumbsUp, label: 'Like' }, { icon: MessageCircle, label: 'Comment' }, { icon: Repeat2, label: 'Repost' }, { icon: Share2, label: 'Send' }].map(a => (
            <button key={a.label} className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
              <a.icon className="w-3.5 h-3.5" /> {a.label}
            </button>
          ))}
        </div>
      </motion.div>
    );
  }

  if (post.platform === 'Twitter') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card-elevated max-w-sm mx-auto p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">{initials}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-foreground">{businessName}</span>
              <span className="text-xs text-muted-foreground">@{businessName.toLowerCase().replace(/\s+/g, '')} · now</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed mt-1 whitespace-pre-line line-clamp-6">{post.caption.slice(0, 280)}</p>
            <div className="flex justify-between mt-3 max-w-[200px]">
              {[MessageCircle, Repeat2, Heart, Share2].map((Icon, i) => (
                <Icon key={i} className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Facebook
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card-elevated max-w-sm mx-auto p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">{initials}</div>
        <div>
          <p className="text-sm font-semibold text-foreground">{businessName}</p>
          <p className="text-[10px] text-muted-foreground">Just now · 🌐</p>
        </div>
      </div>
      <p className="text-sm text-foreground leading-relaxed whitespace-pre-line line-clamp-6 mb-3">{post.caption.slice(0, 300)}...</p>
      <div className="border-t border-border pt-2 flex justify-around">
        {[{ icon: ThumbsUp, label: '👍 Like' }, { icon: MessageCircle, label: '💬 Comment' }, { icon: Share2, label: '↗ Share' }].map(a => (
          <button key={a.label} className="text-xs text-muted-foreground hover:text-foreground transition-colors">{a.label}</button>
        ))}
      </div>
    </motion.div>
  );
}
