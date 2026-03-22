import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import ResultDisplay from '../components/ResultDisplay';
import { BarChart3, MessageSquareText } from 'lucide-react';
import axios from 'axios';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (text) => {
    if (!text.trim()) {
      setError("Please enter a review first!");
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8000/analyze', {
        review: text
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze text. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 pt-12">
      {/* Header */}
      <header className="mb-12 text-center space-y-4">
        <div className="flex items-center justify-center gap-3 text-teal-600 mb-2">
          <MessageSquareText size={48} />
          <BarChart3 size={48} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800">
          Explainable <span className="text-teal-600">ABSA</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg pt-2">
          Aspect-Based Sentiment Analyzer. Discover how customers truly feel about specific parts of your product.
        </p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column */}
        <div className="lg:col-span-5 w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
          <InputBox onAnalyze={handleAnalyze} isLoading={loading} error={error} />
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 w-full">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
              <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium">Analyzing neural pathways...</p>
            </div>
          ) : result ? (
            <ResultDisplay result={result} />
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center space-y-4 rounded-2xl bg-white border border-slate-100 p-8 text-center shadow-sm">
              <div className="w-20 h-20 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center">
                <BarChart3 size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-700">Awaiting Input</h3>
                <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">Enter a product review on the left and click analyze to uncover detailed sentiment metrics.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
