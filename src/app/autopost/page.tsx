"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Send, Clock, FileText, CheckCircle, XCircle, Loader2, Link2, RefreshCw,
  Sparkles, Trash2, Megaphone, Image as ImageIcon, BarChart3, Heart, MessageCircle, Share2, Eye, Save, Briefcase, History,
} from "lucide-react";

type PageInfo = {
  name: string;
  picture?: string;
};

type RecentPost = {
  id: string;
  message?: string;
  created_time: string;
  permalink_url?: string;
  link?: string;
};

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  url: string;
};

type GenerateResult = {
  content?: string;
  variations?: string[];
  hashtags?: string[];
  suggestedTimes?: { time: string; label: string; score: number }[];
  error?: string;
};

type StatsData = {
  success: boolean;
  stats?: {
    totalPosts: number;
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    totalEngagement: number;
    avgEngagementPerPost: number;
  };
  bestPost?: {
    message: string;
    likes: number;
    comments: number;
    shares: number;
    permalink_url?: string;
  } | null;
  bestTimes?: { hour: number; label: string; avgEngagement: number }[];
  posts?: { id: string; message: string; likes: number; comments: number; shares: number; created_time: string; permalink_url?: string }[];
  error?: string;
};

type TabKey = "manual" | "ai" | "blog" | "promo" | "hire" | "schedule" | "comments" | "history" | "stats" | "token";

type ExchangedPage = {
  id: string;
  name: string;
  access_token: string;
  tasks: string[];
  token_type: string;
  expires_at: number;
  is_valid: boolean;
  scopes: string[];
  is_permanent: boolean;
};

type ApiResponse = {
  connected: boolean;
  message?: string;
  page?: PageInfo;
  recentPosts?: RecentPost[];
};

type PostResult = {
  success: boolean;
  message?: string;
  error?: string;
  postId?: string;
};

export default function AutoPostPage() {
  const [status, setStatus] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [result, setResult] = useState<PostResult | null>(null);

  // Form state
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [useSchedule, setUseSchedule] = useState(false);

  // Blog posts
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogPosting, setBlogPosting] = useState(false);
  const [blogResult, setBlogResult] = useState<PostResult | null>(null);
  const [blogImageQuery, setBlogImageQuery] = useState("");
  const [blogImageResults, setBlogImageResults] = useState<{ url: string; description: string; source: string }[]>([]);
  const [blogSearchingImages, setBlogSearchingImages] = useState(false);

  // AI generate
  const [aiTopic, setAiTopic] = useState("");
  const [aiType, setAiType] = useState<"custom" | "blog">("custom");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<GenerateResult | null>(null);
  const [aiBlogTitle, setAiBlogTitle] = useState("");
  const [aiBlogDesc, setAiBlogDesc] = useState("");
  const [aiVariations, setAiVariations] = useState<string[]>([]);
  const [selectedVariation, setSelectedVariation] = useState(0);

  // AI suggest topics
  const [suggesting, setSuggesting] = useState(false);
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);

  // Image search
  const [imageQuery, setImageQuery] = useState("");
  const [imageResults, setImageResults] = useState<{ url: string; description: string; source: string }[]>([]);
  const [searchingImages, setSearchingImages] = useState(false);

  // Scheduled posts queue
  const [scheduledPosts, setScheduledPosts] = useState<{ id: string; message: string; scheduled_publish_time?: number; created_time: string }[]>([]);
  const [loadingScheduled, setLoadingScheduled] = useState(false);

  // Comments
  type Comment = { id: string; message: string; from?: { name: string; id: string }; created_time: string; like_count?: number; comment_count?: number };
  type PostWithComments = { id: string; message: string; created_time: string; permalink_url?: string; comments?: Comment[] };
  const [commentsData, setCommentsData] = useState<PostWithComments[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [aiReplying, setAiReplying] = useState<string | null>(null);
  const [editingReply, setEditingReply] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  // Photo
  const [photoUrl, setPhotoUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Stats
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Drafts
  const [drafts, setDrafts] = useState<{ id: string; message: string; link: string; date: string }[]>([]);

  // Multi-select blog
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  // Promo
  const [promoName, setPromoName] = useState("");
  const [promoDesc, setPromoDesc] = useState("");
  const [promoPosting, setPromoPosting] = useState(false);
  const [promoResult, setPromoResult] = useState<PostResult | null>(null);

  // Hire post
  const [hireType, setHireType] = useState("website");
  const [hireBudget, setHireBudget] = useState("");
  const [hireDetail, setHireDetail] = useState("");
  const [hirePosting, setHirePosting] = useState(false);
  const [hireResult, setHireResult] = useState<PostResult | null>(null);
  const [hireAiGenerating, setHireAiGenerating] = useState(false);
  const [hireVariations, setHireVariations] = useState<string[]>([]);
  const [hireSelectedVariation, setHireSelectedVariation] = useState(0);
  const [hireImageQuery, setHireImageQuery] = useState("");
  const [hireImageResults, setHireImageResults] = useState<{ url: string; description: string; source: string }[]>([]);
  const [hireSearchingImages, setHireSearchingImages] = useState(false);
  const [hirePhotoUrl, setHirePhotoUrl] = useState("");

  // Promo image
  const [promoImageQuery, setPromoImageQuery] = useState("");
  const [promoImageResults, setPromoImageResults] = useState<{ url: string; description: string; source: string }[]>([]);
  const [promoSearchingImages, setPromoSearchingImages] = useState(false);
  const [promoPhotoUrl, setPromoPhotoUrl] = useState("");
  const [promoBudget, setPromoBudget] = useState("");
  const [promoAiGenerating, setPromoAiGenerating] = useState(false);
  const [promoVariations, setPromoVariations] = useState<string[]>([]);
  const [promoSelectedVariation, setPromoSelectedVariation] = useState(0);

  // Delete
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Token exchange
  const [userTokenInput, setUserTokenInput] = useState("");
  const [exchanging, setExchanging] = useState(false);
  const [exchangeResult, setExchangeResult] = useState<{ success: boolean; pages: ExchangedPage[]; error?: string } | null>(null);
  const [copiedToken, setCopiedToken] = useState("");

  // Tab
  const [tab, setTab] = useState<TabKey>("manual");

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/facebook-post");
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus({ connected: false, message: "โหลดไม่ได้" });
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBlogPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/facebook-post/blog");
      const data = await res.json();
      setBlogPosts(data.posts || []);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    fetchBlogPosts();
    loadDrafts();
  }, [fetchStatus, fetchBlogPosts]);

  // Drafts — localStorage
  const loadDrafts = () => {
    try {
      const saved = localStorage.getItem("fb_drafts");
      if (saved) setDrafts(JSON.parse(saved));
    } catch {
      // ignore
    }
  };

  const saveDraft = () => {
    if (!message.trim()) return;
    const newDrafts = [
      { id: Date.now().toString(), message, link, date: new Date().toISOString() },
      ...drafts,
    ].slice(0, 10);
    setDrafts(newDrafts);
    localStorage.setItem("fb_drafts", JSON.stringify(newDrafts));
  };

  const loadDraft = (draft: { message: string; link: string }) => {
    setMessage(draft.message);
    setLink(draft.link);
    setTab("manual");
  };

  const deleteDraft = (id: string) => {
    const newDrafts = drafts.filter((d) => d.id !== id);
    setDrafts(newDrafts);
    localStorage.setItem("fb_drafts", JSON.stringify(newDrafts));
  };

  const fetchStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const res = await fetch("/api/facebook-post/stats");
      const data = await res.json();
      setStatsData(data);
    } catch {
      setStatsData({ success: false, error: "โหลดไม่ได้" });
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const handlePost = async () => {
    if (!message.trim()) return;
    setPosting(true);
    setResult(null);
    try {
      const body: Record<string, string> = { message };
      if (link.trim()) body.link = link.trim();
      if (useSchedule && scheduledTime) body.scheduledTime = scheduledTime;
      if (photoUrl.trim()) body.photoUrl = photoUrl.trim();

      const res = await fetch("/api/facebook-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setResult(data);
      if (data.success) {
        setMessage("");
        setLink("");
        setScheduledTime("");
        setUseSchedule(false);
        setPhotoUrl("");
        setShowPreview(false);
        fetchStatus();
      }
    } catch {
      setResult({ success: false, error: "ส่งไม่ได้" });
    } finally {
      setPosting(false);
    }
  };

  const handleAIGenerate = async () => {
    setAiGenerating(true);
    setAiResult(null);
    try {
      const body: Record<string, string> = { type: aiType };
      if (aiType === "custom") body.topic = aiTopic;
      if (aiType === "blog") {
        body.blogTitle = aiBlogTitle;
        body.blogDesc = aiBlogDesc;
      }

      const res = await fetch("/api/facebook-post/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setAiResult(data);
      if (data.variations?.length) {
        setAiVariations(data.variations);
        setSelectedVariation(0);
      } else if (data.content) {
        setAiVariations([data.content]);
        setSelectedVariation(0);
      }
    } catch {
      setAiResult({ error: "สร้างไม่ได้" });
    } finally {
      setAiGenerating(false);
    }
  };

  const handlePromoPost = async () => {
    if (!promoName.trim() || !promoDesc.trim()) return;
    setPromoPosting(true);
    setPromoResult(null);
    try {
      const budgetText = promoBudget.trim() ? `\nงบประมาณ: ${promoBudget.trim()}` : "";
      const msg = `${promoName}\n\n${promoDesc}${budgetText}\n\nสนใจทัก LINE ได้เลย\nเว็บ: https://dgkingshop.com`;
      const res = await fetch("/api/facebook-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, link: "https://dgkingshop.com", photoUrl: promoPhotoUrl.trim() || undefined }),
      });
      const data = await res.json();
      setPromoResult(data);
      if (data.success) {
        setPromoName("");
        setPromoDesc("");
        setPromoBudget("");
        setPromoPhotoUrl("");
        setPromoImageResults([]);
        setPromoVariations([]);
        fetchStatus();
      }
    } catch {
      setPromoResult({ success: false, error: "ส่งไม่ได้" });
    } finally {
      setPromoPosting(false);
    }
  };

  const handleHirePost = async () => {
    if (!hireDetail.trim()) return;
    setHirePosting(true);
    setHireResult(null);
    try {
      const typeLabels: Record<string, string> = {
        website: "รับทำเว็บไซต์",
        app: "รับทำแอพพลิเคชั่น",
        pos: "รับทำระบบ POS",
        seo: "รับทำ SEO",
        custom: "รับทำระบบตามสั่ง",
      };
      const typeLabel = typeLabels[hireType] || "รับทำเว็บไซต์";
      const budgetText = hireBudget.trim() ? `งบประมาณ: ${hireBudget.trim()}` : "งบประมาณ: ตามเรียลไทม์";
      const msg = `${typeLabel} — รับงานใหม่!\n\n${hireDetail}\n\n${budgetText}\n\nครบทุกฟีเจอร์ ส่งงานตรงเวลา ราคายุติธรรม\n\nสนใจทัก LINE: anucha1997w\nดูผลงานได้ที่: https://dgkingshop.com`;
      const res = await fetch("/api/facebook-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, link: "https://dgkingshop.com", photoUrl: hirePhotoUrl.trim() || undefined }),
      });
      const data = await res.json();
      setHireResult(data);
      if (data.success) {
        setHireDetail("");
        setHireBudget("");
        setHirePhotoUrl("");
        setHireImageResults([]);
        fetchStatus();
      }
    } catch {
      setHireResult({ success: false, error: "ส่งไม่ได้" });
    } finally {
      setHirePosting(false);
    }
  };

  const handleHireAiGenerate = async () => {
    setHireAiGenerating(true);
    setHireVariations([]);
    try {
      const typeLabels: Record<string, string> = {
        website: "เว็บไซต์", app: "แอพพลิเคชั่น", pos: "ระบบ POS", seo: "SEO", custom: "ระบบตามสั่ง",
      };
      const typeLabel = typeLabels[hireType] || "เว็บไซต์";
      const detailText = hireDetail.trim() || `รับทำ${typeLabel}`;
      const res = await fetch("/api/facebook-post/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "hire",
          serviceName: `รับทำ${typeLabel}`,
          serviceDesc: detailText,
          hireType: hireType,
          hireBudget: hireBudget,
        }),
      });
      const data = await res.json();
      if (data.variations && data.variations.length > 0) {
        const processed = data.variations.map((v: string) => {
          let generated = v;
          if (hireBudget.trim() && !generated.includes(hireBudget.trim())) {
            generated += `\n\nงบประมาณ: ${hireBudget.trim()}`;
          }
          return generated;
        });
        setHireVariations(processed);
        setHireSelectedVariation(0);
      }
    } catch {
      // ignore
    } finally {
      setHireAiGenerating(false);
    }
  };

  const handleUseHireVariation = (idx: number) => {
    setHireSelectedVariation(idx);
    setHireDetail(hireVariations[idx] || "");
  };

  const handleHireSearchImages = async () => {
    if (!hireImageQuery.trim()) return;
    setHireSearchingImages(true);
    setHireImageResults([]);
    try {
      const res = await fetch(`/api/facebook-post/images?query=${encodeURIComponent(hireImageQuery.trim())}`);
      const data = await res.json();
      if (data.images) setHireImageResults(data.images);
    } catch {
      // ignore
    } finally {
      setHireSearchingImages(false);
    }
  };

  const handlePromoAiGenerate = async () => {
    setPromoAiGenerating(true);
    setPromoVariations([]);
    try {
      const detailText = promoDesc.trim() || promoName.trim();
      const budgetText = promoBudget.trim() ? `\nงบประมาณ: ${promoBudget.trim()}` : "";
      const res = await fetch("/api/facebook-post/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "promo",
          serviceName: promoName.trim() || "บริการ",
          serviceDesc: `${detailText}${budgetText}`,
        }),
      });
      const data = await res.json();
      if (data.variations && data.variations.length > 0) {
        const processed = data.variations.map((v: string) => {
          let generated = v;
          if (promoBudget.trim() && !generated.includes(promoBudget.trim())) {
            generated += `\n\nงบประมาณ: ${promoBudget.trim()}`;
          }
          return generated;
        });
        setPromoVariations(processed);
        setPromoSelectedVariation(0);
      }
    } catch {
      // ignore
    } finally {
      setPromoAiGenerating(false);
    }
  };

  const handleUsePromoVariation = (idx: number) => {
    setPromoSelectedVariation(idx);
    setPromoDesc(promoVariations[idx] || "");
  };

  const handlePromoSearchImages = async () => {
    if (!promoImageQuery.trim()) return;
    setPromoSearchingImages(true);
    setPromoImageResults([]);
    try {
      const res = await fetch(`/api/facebook-post/images?query=${encodeURIComponent(promoImageQuery.trim())}`);
      const data = await res.json();
      if (data.images) setPromoImageResults(data.images);
    } catch {
      // ignore
    } finally {
      setPromoSearchingImages(false);
    }
  };

  const handleBlogSearchImages = async () => {
    if (!blogImageQuery.trim()) return;
    setBlogSearchingImages(true);
    setBlogImageResults([]);
    try {
      const res = await fetch(`/api/facebook-post/images?query=${encodeURIComponent(blogImageQuery.trim())}`);
      const data = await res.json();
      if (data.images) setBlogImageResults(data.images);
    } catch {
      // ignore
    } finally {
      setBlogSearchingImages(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("ลบโพสต์นี้จาก Facebook?")) return;
    setDeletingId(postId);
    try {
      const res = await fetch(`/api/facebook-post/delete?postId=${postId}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) {
        const isNotOwner = data.error?.includes("wasn't created by the application");
        alert(isNotOwner
          ? "ลบไม่ได้ — Facebook อนุญาตให้ลบเฉพาะโพสต์ที่สร้างจากแอปนี้เท่านั้น โพสต์นี้สร้างด้วยมือหรือจากแอปอื่น"
          : `ลบไม่สำเร็จ: ${data.error}`);
      } else {
        fetchStatus();
      }
    } catch {
      alert("ลบไม่สำเร็จ: ส่งคำขอไม่ได้");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUseVariation = (idx: number) => {
    setSelectedVariation(idx);
    const content = aiVariations[idx] || "";
    const tags = aiResult?.hashtags?.length ? "\n\n" + aiResult.hashtags.map((h) => `#${h}`).join(" ") : "";
    setMessage(content + tags);
    if (photoUrl) {
      // Keep photoUrl — it will be used when posting from manual tab
    }
    setTab("manual");
  };

  const handleMultiBlogPost = async () => {
    if (selectedSlugs.length === 0) return;
    setBlogPosting(true);
    setBlogResult(null);
    try {
      const results: PostResult[] = [];
      for (let i = 0; i < selectedSlugs.length; i++) {
        const slug = selectedSlugs[i];
        let data: PostResult = { success: false, error: "Unknown" };
        // Retry up to 2 times per post
        for (let attempt = 0; attempt < 2; attempt++) {
          const res = await fetch("/api/facebook-post/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
          });
          data = await res.json();
          if (data.success) break;
          // Wait 3s before retry
          if (attempt === 0) await new Promise((r) => setTimeout(r, 3000));
        }
        results.push(data);
        // Wait 5s between posts to avoid rate limit
        if (i < selectedSlugs.length - 1) {
          await new Promise((r) => setTimeout(r, 5000));
        }
      }
      const successCount = results.filter((r) => r.success).length;
      const failedTitles = results
        .filter((r) => !r.success)
        .map((r) => r.error)
        .join(", ");
      setBlogResult({
        success: successCount > 0,
        message: `โพสต์ ${successCount}/${selectedSlugs.length} บทความสำเร็จ`,
        error: successCount < selectedSlugs.length ? `บางบทความโพสต์ไม่สำเร็จ: ${failedTitles}` : undefined,
      });
      if (successCount > 0) {
        setSelectedSlugs([]);
        fetchStatus();
      }
    } catch {
      setBlogResult({ success: false, error: "ส่งไม่ได้" });
    } finally {
      setBlogPosting(false);
    }
  };

  const handleExchangeToken = async () => {
    if (!userTokenInput.trim()) return;
    setExchanging(true);
    setExchangeResult(null);
    try {
      const res = await fetch("/api/facebook-post/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userToken: userTokenInput.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setExchangeResult({ success: true, pages: data.pages });
      } else {
        setExchangeResult({ success: false, pages: [], error: data.error });
      }
    } catch {
      setExchangeResult({ success: false, pages: [], error: "เชื่อมต่อไม่ได้" });
    } finally {
      setExchanging(false);
    }
  };

  const handleCopyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(""), 2000);
  };

  const handleSuggestTopics = async (mode?: string) => {
    setSuggesting(true);
    setSuggestedTopics([]);
    try {
      const res = await fetch("/api/facebook-post/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: mode || "" }),
      });
      const data = await res.json();
      if (data.topics) {
        setSuggestedTopics(data.topics);
      }
    } catch {
      // ignore
    } finally {
      setSuggesting(false);
    }
  };

  const handleRandomTopics = async (mode?: string) => {
    setSuggesting(true);
    setSuggestedTopics([]);
    try {
      const res = await fetch(`/api/facebook-post/suggest?mode=${mode || "all"}&count=8`);
      const data = await res.json();
      if (data.topics) {
        setSuggestedTopics(data.topics);
      }
    } catch {
      // ignore
    } finally {
      setSuggesting(false);
    }
  };

  const handleSearchImages = async () => {
    if (!imageQuery.trim()) return;
    setSearchingImages(true);
    setImageResults([]);
    try {
      const res = await fetch(`/api/facebook-post/images?query=${encodeURIComponent(imageQuery.trim())}`);
      const data = await res.json();
      if (data.images) {
        setImageResults(data.images);
      }
    } catch {
      // ignore
    } finally {
      setSearchingImages(false);
    }
  };

  const fetchScheduledPosts = async () => {
    setLoadingScheduled(true);
    try {
      const res = await fetch("/api/facebook-post/scheduled");
      const data = await res.json();
      if (data.scheduled) {
        setScheduledPosts(data.scheduled);
      }
    } catch {
      // ignore
    } finally {
      setLoadingScheduled(false);
    }
  };

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await fetch("/api/facebook-post/comments");
      const data = await res.json();
      if (data.posts) {
        setCommentsData(data.posts);
      }
    } catch {
      // ignore
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAiReply = async (commentId: string, commentMessage: string, postMessage: string) => {
    setAiReplying(commentId);
    try {
      const res = await fetch("/api/facebook-post/comments/ai-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentMessage, postMessage, mode: "auto" }),
      });
      const data = await res.json();
      if (data.reply) {
        setEditingReply(commentId);
        setReplyText(data.reply);
      } else {
        alert(`AI ตอบไม่ได้: ${data.error}`);
      }
    } catch {
      alert("เชื่อมต่อ AI ไม่ได้");
    } finally {
      setAiReplying(null);
    }
  };

  const handleSendReply = async (commentId: string) => {
    if (!replyText.trim()) return;
    try {
      const res = await fetch("/api/facebook-post/comments/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, message: replyText.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setEditingReply(null);
        setReplyText("");
        fetchComments();
      } else {
        alert(`ส่งไม่ได้: ${data.error}`);
      }
    } catch {
      alert("ส่งไม่ได้");
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/auto%20post.png" alt="Auto Post" className="h-full w-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Facebook Auto Post</h1>
              <p className="text-sm text-slate-400">โพสต์อัตโนมัติไป Facebook Page</p>
            </div>
          </div>

          {/* Connection status */}
          <div className="mt-6">
            {loading ? (
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin" />
                กำลังเช็คการเชื่อมต่อ...
              </div>
            ) : status?.connected ? (
              <div className="flex items-center justify-between rounded-xl border border-green-800 bg-green-950/30 px-4 py-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-semibold text-green-300">
                      เชื่อมต่อแล้ว: {status.page?.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={fetchStatus}
                  className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="rounded-xl border border-orange-800 bg-orange-950/30 px-4 py-3">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-orange-400" />
                  <p className="font-semibold text-orange-300">ยังไม่ได้เชื่อมต่อ</p>
                </div>
                <p className="mt-2 text-sm text-orange-400/80">
                  {status?.message || "ตั้งค่า FB_PAGE_ACCESS_TOKEN และ FB_PAGE_ID ใน .env.local"}
                </p>
                <div className="mt-3 rounded-lg bg-slate-900 p-3 text-xs text-slate-400">
                  <p className="font-semibold text-slate-300">วิธีตั้งค่า:</p>
                  <ol className="mt-2 list-inside list-decimal space-y-1">
                    <li>ไป <span className="text-blue-400">developers.facebook.com</span> → Create App</li>
                    <li>เพิ่ม Product: Facebook Pages</li>
                    <li>ขอสิทธิ์ <code className="rounded bg-slate-800 px-1">pages_manage_posts</code></li>
                    <li>สร้างไฟล์ <code className="rounded bg-slate-800 px-1">.env.local</code> ในโปรเจค</li>
                    <li>ใส่ค่า:
                      <pre className="mt-1 rounded bg-slate-800 p-2 text-xs">{`FB_PAGE_ACCESS_TOKEN=your_token
FB_PAGE_ID=your_page_id`}</pre>
                    </li>
                    <li>Deploy ใหม่แล้วรีเฟรชหน้านี้</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid grid-cols-2 gap-1 border-b border-slate-800 pb-2">
          {([
            { key: "manual", label: "โพสต์เอง", icon: Send },
            { key: "ai", label: "AI สร้าง", icon: Sparkles },
            { key: "blog", label: "โพสต์บล็อก", icon: FileText },
            { key: "promo", label: "โปรโมท", icon: Megaphone },
            { key: "hire", label: "รับงาน", icon: Briefcase },
          ] as { key: TabKey; label: string; icon: typeof Send }[]).map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  tab === t.key
                    ? "bg-blue-950/40 text-blue-400 border border-blue-800"
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-1 pt-2 sm:grid-cols-5">
          {([
            { key: "schedule", label: "คิวโพสต์", icon: Clock },
            { key: "comments", label: "คอมเมนต์", icon: MessageCircle },
            { key: "history", label: "โพสต์ล่าสุด", icon: History },
            { key: "stats", label: "สถิติ", icon: BarChart3 },
            { key: "token", label: "ตั้งค่า Token", icon: Link2 },
          ] as { key: TabKey; label: string; icon: typeof Send }[]).map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  tab === t.key
                    ? "bg-blue-950/40 text-blue-400 border border-blue-800"
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Manual Post Tab */}
        {tab === "manual" && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                ข้อความโพสต์
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="พิมพ์ข้อความที่จะโพสต์..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-slate-500">{message.length} ตัวอักษร</p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                ลิงก์ (ไม่ใส่ก็ได้)
              </label>
              <div className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-slate-500" />
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://dgkingshop.com/..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                รูปภาพ URL (ไม่ใส่ก็ได้)
              </label>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-slate-500" />
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://dgkingshop.com/images/..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              {photoUrl && (
                <div className="mt-2 overflow-hidden rounded-xl border border-slate-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoUrl} alt="preview" className="max-h-40 w-full object-cover" />
                </div>
              )}
            </div>

            {/* Image search */}
            <div className="rounded-xl border border-cyan-800 bg-cyan-950/20 p-4">
              <div className="flex items-center gap-2 text-cyan-300">
                <ImageIcon className="h-5 w-5" />
                <p className="font-medium">หารูปใส่โพสต์ (ฟรี)</p>
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={imageQuery}
                  onChange={(e) => setImageQuery(e.target.value)}
                  placeholder="ค้นหารูป เช่น website, coding, business..."
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
                <button
                  onClick={handleSearchImages}
                  disabled={searchingImages || !imageQuery.trim()}
                  className="rounded-lg bg-cyan-700 px-4 py-2 text-sm text-white hover:bg-cyan-600 disabled:opacity-50"
                >
                  {searchingImages ? "ค้นหา..." : "ค้นหา"}
                </button>
              </div>
              {imageResults.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {imageResults.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPhotoUrl(img.url)}
                      className="group relative overflow-hidden rounded-lg border border-slate-700 hover:border-cyan-500"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={img.description} className="h-24 w-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs text-white">ใช้รูปนี้</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Schedule toggle */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useSchedule}
                  onChange={(e) => setUseSchedule(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800"
                />
                <span className="text-sm font-medium text-slate-300">ตั้งเวลาโพสต์</span>
              </label>
              {useSchedule && (
                <input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-white focus:border-blue-500 focus:outline-none"
                />
              )}
            </div>

            {/* Preview */}
            {showPreview && message && (
              <div className="rounded-xl border border-slate-700 bg-white p-4">
                <p className="mb-2 text-xs font-semibold text-slate-500">ตัวอย่างโพสต์</p>
                {photoUrl && (
                  <div className="mb-3 overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoUrl} alt="preview" className="max-h-60 w-full object-cover" />
                  </div>
                )}
                <p className="whitespace-pre-wrap text-sm text-slate-900">{message}</p>
                {link && (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="mt-2 block text-xs text-blue-600 hover:underline">
                    {link}
                  </a>
                )}
              </div>
            )}

            {/* Drafts */}
            {drafts.length > 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <p className="mb-2 text-sm font-medium text-slate-300">แบบร่างบันทึกไว้</p>
                <div className="space-y-2">
                  {drafts.map((d) => (
                    <div key={d.id} className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2">
                      <button onClick={() => loadDraft(d)} className="flex-1 text-left">
                        <p className="text-sm text-slate-300 line-clamp-1">{d.message}</p>
                        <p className="text-xs text-slate-500">{formatDate(d.date)}</p>
                      </button>
                      <button onClick={() => deleteDraft(d.id)} className="ml-2 text-red-400 hover:text-red-300">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Result */}
            {result && (
              <div
                className={`rounded-xl px-4 py-3 ${
                  result.success
                    ? "border border-green-800 bg-green-950/30 text-green-300"
                    : "border border-red-800 bg-red-950/30 text-red-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <p className="font-medium">{result.success ? result.message : result.error}</p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                disabled={!message.trim()}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 disabled:opacity-50"
              >
                <Eye className="h-5 w-5" />
                {showPreview ? "ซ่อนตัวอย่าง" : "ดูตัวอย่าง"}
              </button>
              <button
                onClick={saveDraft}
                disabled={!message.trim()}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition-all hover:bg-slate-800 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                บันทึกแบบร่าง
              </button>
              <button
                onClick={handlePost}
                disabled={posting || !message.trim() || !status?.connected}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1877F2] py-3 font-semibold text-white transition-all hover:bg-[#0d6cf2] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {posting ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> กำลังโพสต์...</>
                ) : useSchedule ? (
                  <><Clock className="h-5 w-5" /> ตั้งเวลาโพสต์</>
                ) : (
                  <><Send className="h-5 w-5" /> โพสต์เลย</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* AI Generate Tab */}
        {tab === "ai" && (
          <div className="mt-6 space-y-4">
            {/* AI Suggest Topics */}
            <div className="rounded-xl border border-amber-800 bg-amber-950/20 p-4">
              <div className="flex items-center gap-2 text-amber-300">
                <Sparkles className="h-5 w-5" />
                <p className="font-medium">คิดไม่ออก? สุ่มหัวข้อเลย หรือให้ AI คิดให้</p>
              </div>

              {/* Random from pool — instant */}
              <div className="mt-3">
                <p className="mb-1.5 text-xs text-amber-400/70">สุ่มจากตุ้ม (เร็วทันใจ)</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleRandomTopics("all")}
                    disabled={suggesting}
                    className="rounded-lg border border-amber-700 bg-amber-900/30 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-900/50 disabled:opacity-50"
                  >
                    สุ่มทั้งหมด
                  </button>
                  <button
                    onClick={() => handleRandomTopics("tips")}
                    disabled={suggesting}
                    className="rounded-lg border border-amber-700 bg-amber-900/30 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-900/50 disabled:opacity-50"
                  >
                    สุ่มความรู้
                  </button>
                  <button
                    onClick={() => handleRandomTopics("promo")}
                    disabled={suggesting}
                    className="rounded-lg border border-amber-700 bg-amber-900/30 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-900/50 disabled:opacity-50"
                  >
                    สุ่มโปรโมท
                  </button>
                  <button
                    onClick={() => handleRandomTopics("trending")}
                    disabled={suggesting}
                    className="rounded-lg border border-amber-700 bg-amber-900/30 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-900/50 disabled:opacity-50"
                  >
                    สุ่มเทรนด์
                  </button>
                  <button
                    onClick={() => handleRandomTopics("engagement")}
                    disabled={suggesting}
                    className="rounded-lg border border-amber-700 bg-amber-900/30 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-900/50 disabled:opacity-50"
                  >
                    สุ่มชวนคุย
                  </button>
                </div>
              </div>

              {/* AI generated — slower but more creative */}
              <div className="mt-3">
                <p className="mb-1.5 text-xs text-amber-400/70">AI คิดใหม่ให้ (สร้างสรรค์กว่า)</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSuggestTopics("")}
                    disabled={suggesting}
                    className="rounded-lg border border-purple-700 bg-purple-900/30 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-900/50 disabled:opacity-50"
                  >
                    {suggesting ? "กำลังคิด..." : "AI หัวข้อรวม"}
                  </button>
                  <button
                    onClick={() => handleSuggestTopics("tips")}
                    disabled={suggesting}
                    className="rounded-lg border border-purple-700 bg-purple-900/30 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-900/50 disabled:opacity-50"
                  >
                    AI ความรู้
                  </button>
                  <button
                    onClick={() => handleSuggestTopics("promo")}
                    disabled={suggesting}
                    className="rounded-lg border border-purple-700 bg-purple-900/30 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-900/50 disabled:opacity-50"
                  >
                    AI โปรโมท
                  </button>
                  <button
                    onClick={() => handleSuggestTopics("trending")}
                    disabled={suggesting}
                    className="rounded-lg border border-purple-700 bg-purple-900/30 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-900/50 disabled:opacity-50"
                  >
                    AI เทรนด์
                  </button>
                  <button
                    onClick={() => handleSuggestTopics("engagement")}
                    disabled={suggesting}
                    className="rounded-lg border border-purple-700 bg-purple-900/30 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-900/50 disabled:opacity-50"
                  >
                    AI ชวนคุย
                  </button>
                </div>
              </div>
              {suggestedTopics.length > 0 && (
                <div className="mt-3 space-y-2">
                  {suggestedTopics.map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setAiTopic(topic);
                        setAiType("custom");
                        setSuggestedTopics([]);
                      }}
                      className="block w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-left text-sm text-slate-300 hover:border-amber-600 hover:bg-amber-950/20"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Image Search */}
            <div className="rounded-xl border border-cyan-800 bg-cyan-950/20 p-4">
              <div className="flex items-center gap-2 text-cyan-300">
                <ImageIcon className="h-5 w-5" />
                <p className="font-medium">หารูปใส่โพสต์ (ฟรี)</p>
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={imageQuery}
                  onChange={(e) => setImageQuery(e.target.value)}
                  placeholder="ค้นหารูป เช่น website, coding, business..."
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
                <button
                  onClick={handleSearchImages}
                  disabled={searchingImages || !imageQuery.trim()}
                  className="rounded-lg bg-cyan-700 px-4 py-2 text-sm text-white hover:bg-cyan-600 disabled:opacity-50"
                >
                  {searchingImages ? "ค้นหา..." : "ค้นหา"}
                </button>
              </div>
              {imageResults.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {imageResults.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPhotoUrl(img.url);
                      }}
                      className="group relative overflow-hidden rounded-lg border border-slate-700 hover:border-cyan-500"
                    >
                      <img src={img.url} alt={img.description} className="h-24 w-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs text-white">ใช้รูปนี้</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {photoUrl && (
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-cyan-800 bg-cyan-950/20 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoUrl} alt="selected" className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-xs text-cyan-300">เลือกรูปแล้ว — รูปจะติดไปกับโพสต์เมื่อกด "ใช้แบบนี้"</p>
                    <button
                      onClick={() => setPhotoUrl("")}
                      className="mt-1 text-xs text-red-400 hover:text-red-300"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-purple-800 bg-purple-950/20 p-4">
              <div className="flex items-center gap-2 text-purple-300">
                <Sparkles className="h-5 w-5" />
                <p className="font-medium">AI สร้างคอนเทนต์ให้</p>
              </div>
              <p className="mt-1 text-sm text-purple-400/70">
                ใช้ AI เขียนแคปชั่นโพสต์ให้อัตโนมัติ พร้อม hashtag
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setAiType("custom")}
                className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  aiType === "custom"
                    ? "border-purple-500 bg-purple-950/30 text-purple-300"
                    : "border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                หัวข้ออิสระ
              </button>
              <button
                onClick={() => setAiType("blog")}
                className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  aiType === "blog"
                    ? "border-purple-500 bg-purple-950/30 text-purple-300"
                    : "border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                แชร์บทความ
              </button>
            </div>

            {aiType === "custom" ? (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  หัวข้อที่อยากโพสต์
                </label>
                <input
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="เช่น รับทำเว็บร้านอาหาร ราคาเริ่มต้น 3,000 บาท"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">ชื่อบทความ</label>
                  <input
                    value={aiBlogTitle}
                    onChange={(e) => setAiBlogTitle(e.target.value)}
                    placeholder="ชื่อบทความบล็อก"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-300">คำโปรย</label>
                  <input
                    value={aiBlogDesc}
                    onChange={(e) => setAiBlogDesc(e.target.value)}
                    placeholder="คำอธิบายสั้นๆ ของบทความ"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {aiResult?.error && (
              <div className="rounded-xl border border-red-800 bg-red-950/30 px-4 py-3 text-red-300">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  <p className="font-medium">{aiResult.error}</p>
                </div>
              </div>
            )}

            {/* AI Variations */}
            {aiVariations.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-purple-300">AI สร้างให้ {aiVariations.length} แบบ — เลือกแบบที่ชอบ</p>
                {aiVariations.map((variation, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 cursor-pointer transition-all ${
                      selectedVariation === idx
                        ? "border-purple-500 bg-purple-950/30"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                    }`}
                    onClick={() => setSelectedVariation(idx)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="mb-1 text-xs font-semibold text-purple-400">แบบที่ {idx + 1}</p>
                        <p className="whitespace-pre-wrap text-sm text-slate-200">{variation}</p>
                        {aiResult?.hashtags?.length && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {aiResult.hashtags.map((tag) => (
                              <span key={tag} className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleUseVariation(idx); }}
                        className="shrink-0 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700"
                      >
                        ใช้แบบนี้
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Suggested Times */}
            {aiResult?.suggestedTimes && aiResult.suggestedTimes.length > 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <p className="mb-3 text-sm font-medium text-slate-300">เวลาที่แนะนำให้โพสต์</p>
                <div className="space-y-2">
                  {aiResult.suggestedTimes.sort((a, b) => b.score - a.score).map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2">
                      <span className="text-sm text-slate-300">{t.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-700">
                          <div className="h-full rounded-full bg-purple-500" style={{ width: `${t.score}%` }} />
                        </div>
                        <span className="text-xs text-slate-400">{t.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAIGenerate}
              disabled={aiGenerating || (aiType === "custom" ? !aiTopic.trim() : !aiBlogTitle.trim())}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 font-semibold text-white transition-all hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {aiGenerating ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> AI กำลังเขียน...</>
              ) : (
                <><Sparkles className="h-5 w-5" /> {aiVariations.length > 0 ? "สร้างใหม่อีกครั้ง" : "สร้างโพสต์"}</>
              )}
            </button>
          </div>
        )}

        {/* Promo Tab */}
        {tab === "promo" && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-blue-800 bg-blue-950/20 p-4">
              <div className="flex items-center gap-2 text-blue-300">
                <Megaphone className="h-5 w-5" />
                <p className="font-medium">โพสต์โปรโมทบริการ</p>
              </div>
              <p className="mt-1 text-sm text-blue-400/70">
                สร้างโพสต์โปรโมทแบบรวดเร็ว พร้อมลิงก์และช่องติดต่อ
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">ชื่อบริการ</label>
              <input
                value={promoName}
                onChange={(e) => setPromoName(e.target.value)}
                placeholder="เช่น รับทำเว็บไซต์ร้านอาหาร"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">รายละเอียด</label>
              <textarea
                value={promoDesc}
                onChange={(e) => setPromoDesc(e.target.value)}
                rows={4}
                placeholder="เช่น ทำเว็บร้านอาหารครบทุกฟีเจอร์ ระบบสั่งอาหารออนไลน์ จองโต๊ะ พร้อมระบบหลังบ้าน"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">งบประมาณ (ไม่ใส่ก็ได้)</label>
              <input
                value={promoBudget}
                onChange={(e) => setPromoBudget(e.target.value)}
                placeholder="เช่น 5,000 - 20,000 บาท หรือ นั่งคุยกันได้"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* AI help */}
            <button
              onClick={handlePromoAiGenerate}
              disabled={promoAiGenerating}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-700 bg-purple-900/30 py-2.5 text-sm font-medium text-purple-300 transition-all hover:bg-purple-900/50 disabled:opacity-50"
            >
              {promoAiGenerating ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> AI กำลังเขียน...</>
              ) : (
                <><Sparkles className="h-4 w-4" /> ให้ AI ช่วยเขียนรายละเอียด</>
              )}
            </button>

            {/* AI Variations */}
            {promoVariations.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-purple-300">AI สร้างให้ {promoVariations.length} แบบ — เลือกแบบที่ชอบ</p>
                {promoVariations.map((variation, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 cursor-pointer transition-all ${
                      promoSelectedVariation === idx
                        ? "border-purple-500 bg-purple-950/30"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                    }`}
                    onClick={() => setPromoSelectedVariation(idx)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="mb-1 text-xs font-semibold text-purple-400">แบบที่ {idx + 1}</p>
                        <p className="whitespace-pre-wrap text-sm text-slate-200">{variation}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleUsePromoVariation(idx); }}
                        className="shrink-0 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700"
                      >
                        ใช้แบบนี้
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Image search */}
            <div className="rounded-xl border border-cyan-800 bg-cyan-950/20 p-4">
              <div className="flex items-center gap-2 text-cyan-300">
                <ImageIcon className="h-5 w-5" />
                <p className="font-medium">หารูปใส่โพสต์ (ฟรี)</p>
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  value={promoImageQuery}
                  onChange={(e) => setPromoImageQuery(e.target.value)}
                  placeholder="ค้นหารูป เช่น website, coding, business..."
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
                <button
                  onClick={handlePromoSearchImages}
                  disabled={promoSearchingImages || !promoImageQuery.trim()}
                  className="rounded-lg bg-cyan-700 px-4 py-2 text-sm text-white hover:bg-cyan-600 disabled:opacity-50"
                >
                  {promoSearchingImages ? "กำลังหา..." : "ค้นหา"}
                </button>
              </div>
              {promoImageResults.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {promoImageResults.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPromoPhotoUrl(img.url)}
                      className="group relative overflow-hidden rounded-lg border border-slate-700 hover:border-cyan-500"
                    >
                      <img src={img.url} alt={img.description} className="h-24 w-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs text-white">ใช้รูปนี้</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {promoPhotoUrl && (
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-cyan-800 bg-cyan-950/20 p-2">
                  <img src={promoPhotoUrl} alt="selected" className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-xs text-cyan-300">เลือกรูปแล้ว</p>
                    <button onClick={() => setPromoPhotoUrl("")} className="mt-1 text-xs text-red-400 hover:text-red-300">
                      ยกเลิก
                    </button>
                  </div>
                </div>
              )}
            </div>

            {promoResult && (
              <div
                className={`rounded-xl px-4 py-3 ${
                  promoResult.success
                    ? "border border-green-800 bg-green-950/30 text-green-300"
                    : "border border-red-800 bg-red-950/30 text-red-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {promoResult.success ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  <p className="font-medium">{promoResult.success ? promoResult.message : promoResult.error}</p>
                </div>
              </div>
            )}

            <button
              onClick={handlePromoPost}
              disabled={promoPosting || !promoName.trim() || !promoDesc.trim() || !status?.connected}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1877F2] py-3 font-semibold text-white transition-all hover:bg-[#0d6cf2] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {promoPosting ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> กำลังโพสต์...</>
              ) : (
                <><Megaphone className="h-5 w-5" /> โพสต์โปรโมท</>
              )}
            </button>
          </div>
        )}

        {/* Hire Tab */}
        {tab === "hire" && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-emerald-800 bg-emerald-950/20 p-4">
              <div className="flex items-center gap-2 text-emerald-300">
                <Briefcase className="h-5 w-5" />
                <p className="font-medium">โพสต์รับงานใหม่</p>
              </div>
              <p className="mt-1 text-sm text-emerald-400/70">
                ประกาศรับงานบน Facebook เพื่อให้ลูกค้ามาจ้าง
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">ประเภทงาน</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "website", label: "เว็บไซต์" },
                  { key: "app", label: "แอพ" },
                  { key: "pos", label: "POS" },
                  { key: "seo", label: "SEO" },
                  { key: "custom", label: "ระบบตามสั่ง" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setHireType(t.key)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      hireType === t.key
                        ? "border-emerald-500 bg-emerald-950/30 text-emerald-300"
                        : "border-slate-700 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">งบประมาณ (ไม่ใส่ก็ได้)</label>
              <input
                value={hireBudget}
                onChange={(e) => setHireBudget(e.target.value)}
                placeholder="เช่น 5,000 - 20,000 บาท หรือ นั่งคุยกันได้"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">รายละเอียดงาน</label>
              <textarea
                value={hireDetail}
                onChange={(e) => setHireDetail(e.target.value)}
                rows={4}
                placeholder="เช่น รับทำเว็บร้านอาหาร ครบทุกฟีเจอร์ ระบบสั่งอาหารออนไลน์ จองโต๊ะ ระบบหลังบ้าน ส่งงานภายใน 7 วัน"
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* AI help */}
            <button
              onClick={handleHireAiGenerate}
              disabled={hireAiGenerating}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-700 bg-purple-900/30 py-2.5 text-sm font-medium text-purple-300 transition-all hover:bg-purple-900/50 disabled:opacity-50"
            >
              {hireAiGenerating ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> AI กำลังเขียน...</>
              ) : (
                <><Sparkles className="h-4 w-4" /> ให้ AI ช่วยเขียนรายละเอียด</>
              )}
            </button>

            {/* AI Variations */}
            {hireVariations.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-purple-300">AI สร้างให้ {hireVariations.length} แบบ — เลือกแบบที่ชอบ</p>
                {hireVariations.map((variation, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 cursor-pointer transition-all ${
                      hireSelectedVariation === idx
                        ? "border-purple-500 bg-purple-950/30"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                    }`}
                    onClick={() => setHireSelectedVariation(idx)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="mb-1 text-xs font-semibold text-purple-400">แบบที่ {idx + 1}</p>
                        <p className="whitespace-pre-wrap text-sm text-slate-200">{variation}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleUseHireVariation(idx); }}
                        className="shrink-0 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700"
                      >
                        ใช้แบบนี้
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Image search */}
            <div className="rounded-xl border border-cyan-800 bg-cyan-950/20 p-4">
              <div className="flex items-center gap-2 text-cyan-300">
                <ImageIcon className="h-5 w-5" />
                <p className="font-medium">หารูปใส่โพสต์ (ฟรี)</p>
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  value={hireImageQuery}
                  onChange={(e) => setHireImageQuery(e.target.value)}
                  placeholder="ค้นหารูป เช่น website, coding, business..."
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
                <button
                  onClick={handleHireSearchImages}
                  disabled={hireSearchingImages || !hireImageQuery.trim()}
                  className="rounded-lg bg-cyan-700 px-4 py-2 text-sm text-white hover:bg-cyan-600 disabled:opacity-50"
                >
                  {hireSearchingImages ? "กำลังหา..." : "ค้นหา"}
                </button>
              </div>
              {hireImageResults.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {hireImageResults.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setHirePhotoUrl(img.url)}
                      className="group relative overflow-hidden rounded-lg border border-slate-700 hover:border-cyan-500"
                    >
                      <img src={img.url} alt={img.description} className="h-24 w-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs text-white">ใช้รูปนี้</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {hirePhotoUrl && (
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-cyan-800 bg-cyan-950/20 p-2">
                  <img src={hirePhotoUrl} alt="selected" className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-xs text-cyan-300">เลือกรูปแล้ว</p>
                    <button onClick={() => setHirePhotoUrl("")} className="mt-1 text-xs text-red-400 hover:text-red-300">
                      ยกเลิก
                    </button>
                  </div>
                </div>
              )}
            </div>

            {hireResult && (
              <div
                className={`rounded-xl px-4 py-3 ${
                  hireResult.success
                    ? "border border-green-800 bg-green-950/30 text-green-300"
                    : "border border-red-800 bg-red-950/30 text-red-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {hireResult.success ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  <p className="font-medium">{hireResult.success ? hireResult.message : hireResult.error}</p>
                </div>
              </div>
            )}

            <button
              onClick={handleHirePost}
              disabled={hirePosting || !hireDetail.trim() || !status?.connected}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-semibold text-white transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {hirePosting ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> กำลังโพสต์...</>
              ) : (
                <><Briefcase className="h-5 w-5" /> โพสต์รับงาน</>
              )}
            </button>
          </div>
        )}

        {/* Blog Post Tab */}
        {tab === "blog" && (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-slate-400">
              เลือกบทความบล็อกแล้วโพสต์ไป Facebook Page อัตโนมัติ พร้อมลิงก์และ hashtag — เลือกได้หลายบทความ
            </p>

            <div className="space-y-2">
              {blogPosts.map((post) => {
                const isSelected = selectedSlugs.includes(post.slug);
                return (
                  <button
                    key={post.slug}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedSlugs(selectedSlugs.filter((s) => s !== post.slug));
                      } else {
                        setSelectedSlugs([...selectedSlugs, post.slug]);
                      }
                    }}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-950/30"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        isSelected ? "border-blue-500 bg-blue-500" : "border-slate-600"
                      }`}>
                        {isSelected && <CheckCircle className="h-4 w-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{post.title}</p>
                        <p className="mt-1 text-sm text-slate-400 line-clamp-2">{post.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Image search */}
            <div className="rounded-xl border border-cyan-800 bg-cyan-950/20 p-4">
              <div className="flex items-center gap-2 text-cyan-300">
                <ImageIcon className="h-5 w-5" />
                <p className="font-medium">หารูปประกอบบทความ (ฟรี)</p>
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  value={blogImageQuery}
                  onChange={(e) => setBlogImageQuery(e.target.value)}
                  placeholder="ค้นหารูป เช่น technology, coding, business..."
                  className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
                <button
                  onClick={handleBlogSearchImages}
                  disabled={blogSearchingImages || !blogImageQuery.trim()}
                  className="rounded-lg bg-cyan-700 px-4 py-2 text-sm text-white hover:bg-cyan-600 disabled:opacity-50"
                >
                  {blogSearchingImages ? "ค้นหา..." : "ค้นหา"}
                </button>
              </div>
              {blogImageResults.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {blogImageResults.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPhotoUrl(img.url)}
                      className="group relative overflow-hidden rounded-lg border border-slate-700 hover:border-cyan-500"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={img.description} className="h-24 w-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-xs text-white">ใช้รูปนี้</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {photoUrl && (
                <div className="mt-3 flex items-center gap-3 rounded-lg border border-cyan-800 bg-cyan-950/20 p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoUrl} alt="selected" className="h-16 w-16 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-xs text-cyan-300">เลือกรูปแล้ว — รูปจะติดไปกับโพสต์</p>
                    <button onClick={() => setPhotoUrl("")} className="mt-1 text-xs text-red-400 hover:text-red-300">
                      ยกเลิก
                    </button>
                  </div>
                </div>
              )}
            </div>

            {blogResult && (
              <div
                className={`rounded-xl px-4 py-3 ${
                  blogResult.success
                    ? "border border-green-800 bg-green-950/30 text-green-300"
                    : "border border-red-800 bg-red-950/30 text-red-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {blogResult.success ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <p className="font-medium">
                    {blogResult.success ? blogResult.message : blogResult.error}
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleMultiBlogPost}
              disabled={blogPosting || selectedSlugs.length === 0 || !status?.connected}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1877F2] py-3 font-semibold text-white transition-all hover:bg-[#0d6cf2] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {blogPosting ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> กำลังโพสต์ ({selectedSlugs.length} บทความ)...</>
              ) : (
                <><FileText className="h-5 w-5" /> โพสต์ {selectedSlugs.length > 0 ? `${selectedSlugs.length} บทความ` : "บทความ"}</>
              )}
            </button>
          </div>
        )}

        {/* Schedule Queue Tab */}
        {tab === "schedule" && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">คิวโพสต์ที่ตั้งเวลาไว้ — ยังไม่ได้เผยแพร่</p>
              <button
                onClick={fetchScheduledPosts}
                disabled={loadingScheduled}
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
              >
                {loadingScheduled ? (
                  <><Loader2 className="h-3.5 w-3.5 animate-spin" /> กำลังโหลด...</>
                ) : (
                  <><RefreshCw className="h-3.5 w-3.5" /> โหลดคิว</>
                )}
              </button>
            </div>

            {scheduledPosts.length === 0 && !loadingScheduled && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
                <Clock className="mx-auto mb-2 h-8 w-8 text-slate-600" />
                <p className="text-sm text-slate-400">
                  ไม่มีคิวโพสต์ — ไปตั้งเวลาโพสต์ที่ tab "โพสต์เอง" ได้
                </p>
              </div>
            )}

            {scheduledPosts.map((post) => {
              const publishTime = post.scheduled_publish_time
                ? new Date(post.scheduled_publish_time * 1000).toLocaleString("th-TH", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "ไม่ระบุ";
              const now = Date.now();
              const isOverdue = post.scheduled_publish_time
                ? post.scheduled_publish_time * 1000 < now
                : false;

              return (
                <div key={post.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-white line-clamp-3 flex-1">{post.message || "(ไม่มีข้อความ)"}</p>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                      isOverdue
                        ? "bg-red-900/50 text-red-400"
                        : "bg-amber-900/50 text-amber-400"
                    }`}>
                      {isOverdue ? "เลยเวลาแล้ว" : "รอโพสต์"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>โพสต์เวลา: <b className="text-slate-300">{publishTime}</b></span>
                    </div>
                    <span className="text-xs text-slate-500">
                      สร้างเมื่อ {formatDate(post.created_time)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Comments Tab */}
        {tab === "comments" && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">คอมเมนต์ล่าสุด — AI ช่วยตอบให้</p>
              <button
                onClick={fetchComments}
                disabled={loadingComments}
                className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
              >
                {loadingComments ? (
                  <><Loader2 className="h-3.5 w-3.5 animate-spin" /> กำลังโหลด...</>
                ) : (
                  <><RefreshCw className="h-3.5 w-3.5" /> โหลดคอมเมนต์</>
                )}
              </button>
            </div>

            {commentsData.length === 0 && !loadingComments && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
                <MessageCircle className="mx-auto mb-2 h-8 w-8 text-slate-600" />
                <p className="text-sm text-slate-400">กดโหลดคอมเมนต์เพื่อดูคอมเมนต์ล่าสุด</p>
              </div>
            )}

            {commentsData.map((post) => (
              <div key={post.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
                {/* Post info */}
                <div>
                  <p className="text-sm text-white line-clamp-2">{post.message || "(ไม่มีข้อความ)"}</p>
                  <p className="mt-1 text-xs text-slate-500">{formatDate(post.created_time)}</p>
                </div>

                {/* Comments */}
                {post.comments && post.comments.length > 0 ? (
                  <div className="space-y-2 border-l-2 border-slate-700 pl-3">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="rounded-lg bg-slate-800/50 p-3 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-xs font-medium text-blue-400">
                              {comment.from?.name || "ผู้ใช้"}
                            </p>
                            <p className="mt-0.5 text-sm text-slate-300">{comment.message}</p>
                            <p className="mt-1 text-xs text-slate-500">{formatDate(comment.created_time)}</p>
                          </div>
                          {comment.like_count ? (
                            <span className="shrink-0 text-xs text-slate-500">ถูกใจ {comment.like_count}</span>
                          ) : null}
                        </div>

                        {/* Already replied badge */}
                        {comment.comment_count && comment.comment_count > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-lg bg-green-900/30 px-3 py-1.5 text-xs text-green-400">
                            ตอบแล้ว
                          </span>
                        ) : editingReply !== comment.id ? (
                          /* AI Reply button — only show if not yet replied */
                          <button
                            onClick={() => handleAiReply(comment.id, comment.message, post.message)}
                            disabled={aiReplying === comment.id}
                            className="flex items-center gap-1.5 rounded-lg border border-purple-700 bg-purple-900/30 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-900/50 disabled:opacity-50"
                          >
                            {aiReplying === comment.id ? (
                              <><Loader2 className="h-3.5 w-3.5 animate-spin" /> AI กำลังคิด...</>
                            ) : (
                              <><Sparkles className="h-3.5 w-3.5" /> AI ตอบให้</>
                            )}
                          </button>
                        ) : null}

                        {/* Edit & Send reply */}
                        {editingReply === comment.id && (
                          <div className="space-y-2">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows={2}
                              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSendReply(comment.id)}
                                disabled={!replyText.trim()}
                                className="rounded-lg bg-green-700 px-3 py-1.5 text-xs text-white hover:bg-green-600 disabled:opacity-50"
                              >
                                ส่งคำตอบ
                              </button>
                              <button
                                onClick={() => {
                                  setEditingReply(null);
                                  setReplyText("");
                                }}
                                className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                              >
                                ยกเลิก
                              </button>
                              <button
                                onClick={() => handleAiReply(comment.id, comment.message, post.message)}
                                disabled={aiReplying === comment.id}
                                className="rounded-lg border border-purple-700 px-3 py-1.5 text-xs text-purple-300 hover:bg-purple-900/30"
                              >
                                {aiReplying === comment.id ? "กำลังคิด..." : "เขียนใหม่"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 pl-3 border-l-2 border-slate-700">ไม่มีคอมเมนต์</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* History Tab */}
        {tab === "history" && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">โพสต์ล่าสุดจาก Facebook Page</p>
              <button
                onClick={fetchStatus}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
              >
                <RefreshCw className="h-3.5 w-3.5" /> รีเฟรช
              </button>
            </div>
            {status?.recentPosts && status.recentPosts.length > 0 ? (
              status.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-4"
                >
                  <p className="text-sm text-white line-clamp-3">
                    {post.message || "(ไม่มีข้อความ)"}
                  </p>
                  {post.link && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-xs text-blue-400 hover:underline"
                    >
                      {post.link}
                    </a>
                  )}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{formatDate(post.created_time)}</span>
                    <div className="flex items-center gap-3">
                      {post.permalink_url && (
                        <a
                          href={post.permalink_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:underline"
                        >
                          ดูบน Facebook →
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                      >
                        {deletingId === post.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                        ลบ
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500 py-8">ยังไม่มีโพสต์</p>
            )}
          </div>
        )}

        {/* Stats Tab */}
        {tab === "stats" && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">สถิติการมีส่วนร่วมของโพสต์</p>
              <button
                onClick={fetchStats}
                disabled={statsLoading}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${statsLoading ? "animate-spin" : ""}`} /> โหลด
              </button>
            </div>

            {statsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : statsData?.success && statsData.stats ? (
              <>
                {/* Summary cards */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <Heart className="mb-2 h-5 w-5 text-red-400" />
                    <p className="text-2xl font-bold text-white">{statsData.stats.totalLikes}</p>
                    <p className="text-xs text-slate-400">ไลค์</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <MessageCircle className="mb-2 h-5 w-5 text-blue-400" />
                    <p className="text-2xl font-bold text-white">{statsData.stats.totalComments}</p>
                    <p className="text-xs text-slate-400">คอมเมนต์</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <Share2 className="mb-2 h-5 w-5 text-green-400" />
                    <p className="text-2xl font-bold text-white">{statsData.stats.totalShares}</p>
                    <p className="text-xs text-slate-400">แชร์</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <BarChart3 className="mb-2 h-5 w-5 text-purple-400" />
                    <p className="text-2xl font-bold text-white">{statsData.stats.totalEngagement}</p>
                    <p className="text-xs text-slate-400">รวม engagement</p>
                  </div>
                </div>

                {/* Avg engagement */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-400">เฉลี่ยต่อโพสต์</p>
                  <p className="mt-1 text-xl font-bold text-white">
                    {statsData.stats.avgEngagementPerPost} การมีส่วนร่วม/โพสต์
                  </p>
                  <p className="mt-1 text-xs text-slate-500">จาก {statsData.stats.totalPosts} โพสต์ล่าสุด</p>
                </div>

                {/* Best post */}
                {statsData.bestPost && (
                  <div className="rounded-xl border border-green-800 bg-green-950/20 p-4">
                    <p className="mb-2 text-sm font-medium text-green-300">โพสต์ยอดนิยม</p>
                    <p className="text-sm text-white line-clamp-2">{statsData.bestPost.message}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-red-400" /> {statsData.bestPost.likes}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5 text-blue-400" /> {statsData.bestPost.comments}</span>
                      <span className="flex items-center gap-1"><Share2 className="h-3.5 w-3.5 text-green-400" /> {statsData.bestPost.shares}</span>
                    </div>
                    {statsData.bestPost.permalink_url && (
                      <a
                        href={statsData.bestPost.permalink_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block text-xs text-blue-400 hover:underline"
                      >
                        ดูบน Facebook →
                      </a>
                    )}
                  </div>
                )}

                {/* Best times from data */}
                {statsData.bestTimes && statsData.bestTimes.length > 0 && (
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <p className="mb-3 text-sm font-medium text-slate-300">ช่วงเวลาที่มี engagement สูง (จากข้อมูลจริง)</p>
                    <div className="space-y-2">
                      {statsData.bestTimes.map((t, idx) => (
                        <div key={idx} className="flex items-center justify-between rounded-lg bg-slate-800 px-3 py-2">
                          <span className="text-sm text-slate-300">{t.label} น.</span>
                          <span className="text-xs text-slate-400">เฉลี่ย {t.avgEngagement} การมีส่วนร่วม</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top posts with stats */}
                {statsData.posts && statsData.posts.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-300">โพสต์ล่าสุดพร้อมสถิติ</p>
                    {statsData.posts.map((post) => (
                      <div key={post.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                        <p className="text-sm text-white line-clamp-2">{post.message || "(ไม่มีข้อความ)"}</p>
                        <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-red-400" /> {post.likes}</span>
                          <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5 text-blue-400" /> {post.comments}</span>
                          <span className="flex items-center gap-1"><Share2 className="h-3.5 w-3.5 text-green-400" /> {post.shares}</span>
                          <span className="ml-auto">{formatDate(post.created_time)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
                <p className="text-sm text-slate-400">
                  {statsData?.error || "กดโหลดเพื่อดูสถิติ ต้องเชื่อมต่อ Facebook ก่อน"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Token Exchange Tab */}
        {tab === "token" && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-blue-800 bg-blue-950/20 p-4">
              <div className="flex items-center gap-2 text-blue-300">
                <Link2 className="h-5 w-5" />
                <h3 className="font-semibold">แปลง User Token เป็น Page Token ถาวร</h3>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                1. ไปที่ <a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Graph API Explorer</a>
                <br />
                2. เลือกแอป → ตั้ง &quot;User or Page&quot; เป็น <b>User</b>
                <br />
                3. ติ๊ก <code className="text-blue-300">pages_show_list</code>, <code className="text-blue-300">pages_manage_posts</code>, <code className="text-blue-300">pages_read_engagement</code>
                <br />
                4. กด Generate Access Token → คัดลอกมาวางด้านล่าง
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                User Token (short-lived)
              </label>
              <textarea
                value={userTokenInput}
                onChange={(e) => setUserTokenInput(e.target.value)}
                placeholder="วาง User Token ที่นี่..."
                rows={3}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleExchangeToken}
              disabled={exchanging || !userTokenInput.trim()}
              className="rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {exchanging ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  กำลังแปลง...
                </span>
              ) : (
                "แปลงเป็น Page Token ถาวร"
              )}
            </button>

            {exchangeResult?.error && (
              <div className="rounded-xl border border-red-800 bg-red-950/30 p-4">
                <div className="flex items-center gap-2 text-red-400">
                  <XCircle className="h-5 w-5" />
                  <p className="text-sm">{exchangeResult.error}</p>
                </div>
              </div>
            )}

            {exchangeResult?.success && exchangeResult.pages.length > 0 && (
              <div className="space-y-3">
                <div className="rounded-xl border border-green-800 bg-green-950/30 p-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <p className="text-sm font-medium">แปลง token สำเร็จ!</p>
                  </div>
                </div>

                {exchangeResult.pages.map((page) => (
                  <div key={page.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{page.name}</p>
                        <p className="text-xs text-slate-400">Page ID: {page.id}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {page.is_permanent && (
                          <span className="rounded-full bg-green-900/50 px-2 py-0.5 text-xs text-green-400">
                            ถาวร (ไม่หมดอายุ)
                          </span>
                        )}
                        <span className="rounded-full bg-blue-900/50 px-2 py-0.5 text-xs text-blue-400">
                          {page.token_type}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {page.scopes.map((scope) => (
                        <span key={scope} className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                          {scope}
                        </span>
                      ))}
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-slate-400">Page Token ถาวร:</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          readOnly
                          value={page.access_token}
                          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300"
                        />
                        <button
                          onClick={() => handleCopyToken(page.access_token)}
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800"
                        >
                          {copiedToken === page.access_token ? "คัดลอกแล้ว!" : "คัดลอก"}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-800/50 p-3 text-xs text-slate-400">
                      <p className="font-medium text-slate-300">วิธีใช้:</p>
                      <p>1. คัดลอก Page Token และ Page ID ด้านบน</p>
                      <p>2. ไปที่ Vercel → Project → Settings → Environment Variables</p>
                      <p>3. อัปเดต <code className="text-blue-300">FB_PAGE_ACCESS_TOKEN</code> และ <code className="text-blue-300">FB_PAGE_ID</code></p>
                      <p>4. Redeploy แล้วรีเฟรชหน้านี้</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
