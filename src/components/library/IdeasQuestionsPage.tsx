/**
 * Ideas & Questions Planet Page
 * Simple form for users to submit ideas/questions for Coji
 * Auto-captures email from login, stores in Supabase
 * Mobile-first, lightweight design
 */

'use client';

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function IdeasQuestionsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>('');
  const [ideaText, setIdeaText] = useState('');
  const [category, setCategory] = useState<'feature_request' | 'question' | 'feedback' | 'bug_report' | 'other'>('other');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Get user email on mount
  useEffect(() => {
    async function getUserEmail() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    }
    getUserEmail();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ideaText.trim()) {
      setErrorMessage('Please enter your idea or question');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setErrorMessage('Please sign in to submit ideas');
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('ideas_and_questions')
        .insert({
          user_id: user.id,
          email: userEmail,
          idea_text: ideaText.trim(),
          category: category,
          status: 'new'
        });

      if (error) throw error;

      setSubmitStatus('success');
      setIdeaText('');
      setCategory('other');

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);

    } catch (error) {
      console.error('Error submitting idea:', error);
      setErrorMessage('Failed to submit. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />

      {/* Twinkling stars */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 md:py-12 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors mb-6 group"
          style={{ minHeight: '44px' }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-base md:text-lg">Back to Library</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="text-6xl md:text-7xl mb-4 animate-float">💡</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Ideas & Questions
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Help shape Coji's future. Share your ideas, ask questions, or tell us what would make Coji more helpful for you.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-indigo-500 border-opacity-30 rounded-2xl p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Display (read-only) */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Your Email
              </label>
              <div className="bg-slate-900 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-3 text-slate-400">
                {userEmail || 'Not signed in'}
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                What type of submission is this?
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as typeof category)}
                className="w-full bg-slate-900 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                style={{ minHeight: '44px' }}
              >
                <option value="feature_request">Feature Request</option>
                <option value="question">Question</option>
                <option value="feedback">Feedback</option>
                <option value="bug_report">Bug Report</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Idea/Question Text */}
            <div>
              <label htmlFor="idea_text" className="block text-sm font-medium text-slate-300 mb-2">
                Your Idea or Question
              </label>
              <textarea
                id="idea_text"
                value={ideaText}
                onChange={(e) => setIdeaText(e.target.value)}
                placeholder="Tell us what you're thinking... Be as detailed as you like."
                rows={6}
                className="w-full bg-slate-900 bg-opacity-50 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
                style={{ lineHeight: '1.6' }}
                required
              />
              <p className="text-xs text-slate-400 mt-2">
                Your submission helps us understand what matters most to you.
              </p>
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="flex items-start gap-2 p-4 bg-red-900 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-300">{errorMessage}</p>
              </div>
            )}

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="flex items-start gap-2 p-4 bg-green-900 bg-opacity-20 border border-green-500 border-opacity-30 rounded-lg animate-fade-in">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-300">
                  Thank you! Your submission has been received. We read every idea and question.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !ideaText.trim()}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-semibold py-3 md:py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              style={{ minHeight: '48px' }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 bg-opacity-30 border border-indigo-500 border-opacity-20 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-slate-200 mb-1">Feature Requests</h3>
            <p className="text-sm text-slate-400">Suggest new tools or improvements</p>
          </div>
          <div className="bg-slate-800 bg-opacity-30 border border-purple-500 border-opacity-20 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">❓</div>
            <h3 className="font-semibold text-slate-200 mb-1">Questions</h3>
            <p className="text-sm text-slate-400">Ask us anything about Coji</p>
          </div>
          <div className="bg-slate-800 bg-opacity-30 border border-pink-500 border-opacity-20 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold text-slate-200 mb-1">Feedback</h3>
            <p className="text-sm text-slate-400">Tell us what's working or not</p>
          </div>
        </div>
      </div>
    </div>
  );
}
