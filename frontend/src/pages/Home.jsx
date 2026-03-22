import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import ResultDisplay from '../components/ResultDisplay';
import ProductSearch from '../components/ProductSearch';
import ProductList from '../components/ProductList';
import SentimentChart from '../components/SentimentChart';
import EmotionChart from '../components/EmotionChart';
import { BarChart3, MessageSquareText, Layers } from 'lucide-react';
import axios from 'axios';

export default function Home() {
  const [activeTab, setActiveTab] = useState('review'); // 'review' or 'product'
  
  // Single Review State
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const [reviewError, setReviewError] = useState('');

  // Product Search State
  const [productLoading, setProductLoading] = useState(false);
  const [productResult, setProductResult] = useState(null);
  const [productError, setProductError] = useState('');

  const handleAnalyzeReview = async (text) => {
    if (!text.trim()) { setReviewError("Please enter a review first!"); return; }
    setReviewLoading(true); setReviewError('');
    try {
      const response = await axios.post('http://localhost:8000/analyze', { review: text });
      setReviewResult(response.data);
    } catch (err) {
      setReviewError("Failed to analyze text. Please ensure the backend is running.");
      console.error(err);
    } finally { setReviewLoading(false); }
  };

  const handleAnalyzeProduct = async (query) => {
    if (!query.trim()) { setProductError("Please enter a product name first!"); return; }
    setProductLoading(true); setProductError('');
    setProductResult(null); 
    try {
      const response = await axios.post('http://localhost:8000/analyze-product', { query });
      setProductResult(response.data);
    } catch (err) {
      setProductError("Failed to fetch product intel. Ensure backend is running.");
      console.error(err);
    } finally { setProductLoading(false); }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 pt-12 pb-24">
      {/* Header */}
      <header className="mb-10 text-center space-y-4">
        <div className="flex items-center justify-center gap-3 text-teal-600 mb-2">
          {activeTab === 'review' ? <MessageSquareText size={48} /> : <Layers size={48} />}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800">
          Explainable <span className="text-teal-600">ABSA</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg pt-2">
          {activeTab === 'review' 
            ? "Aspect-Based Sentiment Analyzer. Discover how customers truly feel about specific parts of your product."
            : "Market Intelligence. Analyze bulk simulated insights directly connected to live Google Shopping data."}
        </p>
      </header>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-slate-200/50 p-1.5 rounded-full flex gap-1">
          <button 
            onClick={() => setActiveTab('review')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'review' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Single Review Analysis
          </button>
          <button 
            onClick={() => setActiveTab('product')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === 'product' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Product Market Search
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'review' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-5 w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
            <InputBox onAnalyze={handleAnalyzeReview} isLoading={reviewLoading} error={reviewError} />
          </div>
          <div className="lg:col-span-7 w-full">
            {reviewLoading ? (
               <LoadingState message="Analyzing neural pathways..." />
            ) : reviewResult ? (
              <ResultDisplay result={reviewResult} />
            ) : (
              <EmptyState title="Awaiting Input" message="Enter a local review to uncover insights." />
            )}
          </div>
        </div>
      )}

      {activeTab === 'product' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
            <ProductSearch onSearch={handleAnalyzeProduct} isLoading={productLoading} error={productError} />
          </div>

          {productLoading && <LoadingState message="Fetching live SerpAPI references & running robust NLP arrays..." className="max-w-2xl mx-auto" />}

          {productResult && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <ProductList products={productResult.products} />
              
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <div className="bg-teal-50 p-2 rounded-lg text-teal-600">
                        <Layers size={24} />
                    </div>
                    Aggregated Intelligence
                  </h2>
                  <span className="bg-slate-100 border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest hidden sm:inline-block">
                    Based on {productResult.analysis.total_reviews} Simulated Reviews
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Global Sentiment Distribution</h3>
                    <div className="h-48">
                      <SentimentChart data={productResult.analysis.sentiment_distribution} />
                    </div>
                  </div>
                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 text-center">Emotion Detection Matrix</h3>
                    <div className="h-48">
                      <EmotionChart data={productResult.analysis.emotion_distribution} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helpers
function LoadingState({ message, className = '' }) {
  return (
    <div className={`h-64 flex flex-col items-center justify-center space-y-4 rounded-2xl bg-white border border-slate-100 shadow-sm ${className}`}>
      <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium text-sm md:text-base animate-pulse">{message}</p>
    </div>
  );
}

function EmptyState({ title, message }) {
  return (
    <div className="h-full min-h-[300px] flex flex-col items-center justify-center space-y-4 rounded-2xl bg-white border border-slate-100 p-8 text-center shadow-sm">
      <div className="w-20 h-20 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center">
        <BarChart3 size={32} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
        <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">{message}</p>
      </div>
    </div>
  );
}
