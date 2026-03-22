import React, { useState } from 'react';
import { Send, Wand2 } from 'lucide-react';

export default function InputBox({ onAnalyze, isLoading, error }) {
  const [text, setText] = useState('');

  const SAMPLE_TEXT = "The delivery was extremely fast, but the product quality is quite bad and the price is far too high for what you get.";

  const handleSample = () => {
    setText(SAMPLE_TEXT);
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex items-center justify-between">
        <label htmlFor="review" className="text-sm font-semibold text-slate-700">Your Customer Review</label>
        <button 
          onClick={handleSample}
          className="text-xs flex items-center gap-1 text-teal-600 hover:text-teal-700 font-medium transition-colors bg-teal-50 px-2 py-1 rounded-md"
        >
          <Wand2 size={12} />
          Try Sample
        </button>
      </div>

      <textarea
        id="review"
        rows={8}
        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-50 focus:outline-none transition-all duration-200 text-sm md:text-base leading-relaxed"
        placeholder="Paste a customer review here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      {error && (
        <p className="text-rose-500 text-sm font-medium bg-rose-50 p-3 rounded-lg border border-rose-100">{error}</p>
      )}

      <button
        disabled={isLoading}
        onClick={() => onAnalyze(text)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-sm font-semibold text-white shadow-md hover:bg-teal-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed transition-all active:scale-[0.98]"
      >
        <Send size={18} />
        {isLoading ? 'Processing Analytics...' : 'Analyze Review'}
      </button>
    </div>
  );
}
