import React, { useState } from 'react';
import InputBox from '../components/InputBox';
import ResultDisplay from '../components/ResultDisplay';
import ProductSearch from '../components/ProductSearch';
import ProductList from '../components/ProductList';
import SentimentChart from '../components/SentimentChart';
import EmotionChart from '../components/EmotionChart';
import KPISection from '../components/KPISection';
import InsightBox from '../components/InsightBox';
import AspectTable from '../components/AspectTable';
import ComplaintsPraises from '../components/ComplaintsPraises';
import SummaryCard from '../components/SummaryCard';
import { BarChart3, MessageSquareText, Layers, Clock } from 'lucide-react';
import axios from 'axios';

export default function Home() {
  const [activeTab, setActiveTab] = useState('review'); 
  
  // Single Review State
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);
  const [reviewError, setReviewError] = useState('');

  // Product Search State
  const [productLoading, setProductLoading] = useState(false);
  const [productResult, setProductResult] = useState(null);
  const [productError, setProductError] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');

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
    setCurrentQuery(query);
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
    <div className="max-w-7xl mx-auto p-4 md:p-8 pt-12 pb-24">
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
            : "Market Intelligence Dashboard. Analyze bulk simulated insights powered by advanced NLP models."}
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
            AI Review Intelligence
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
          
          {/* Dashboard Header Bar Component containing search and meta */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
            <div className="w-full md:w-1/2">
               <ProductSearch onSearch={handleAnalyzeProduct} isLoading={productLoading} error={productError} />
            </div>
            {productResult && !productLoading && (
               <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 pl-0 md:pl-8">
                  <h2 className="text-3xl font-bold text-slate-800 leading-tight">
                    Market Sentiment for <span className="text-teal-600 capitalize block mt-1">{currentQuery}</span>
                  </h2>
                  <p className="text-slate-500 text-sm mt-3 flex items-center justify-center md:justify-end gap-2">
                     Analyzed from {productResult.kpis.total_reviews}+ customer reviews using leading NLP models
                  </p>
                  <p className="text-slate-400 text-xs mt-4 flex items-center gap-1 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                     <Clock size={14} /> Last Updated: Just now
                  </p>
               </div>
            )}
            {(!productResult || productLoading) && (
               <div className="w-full md:w-1/2 flex flex-col items-center justify-center opacity-40 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 min-h-[150px]">
                  <Layers size={48} className="text-slate-300 mb-3" />
                  <p className="text-slate-400 font-medium text-sm">Dashboard waiting for neural input...</p>
               </div>
            )}
          </div>

          {productLoading && <LoadingState message="Analyzing 300+ reviews using AI... Fetching Intelligence..." className="w-full mx-auto" />}

          {productResult && !productLoading && (
            <div className="space-y-6 animate-in fade-in duration-700">
              
              {/* DASHBOARD TOP: Product References */}
              <div className="mb-6">
                 <ProductList products={productResult.products} />
              </div>

              {/* DASHBOARD TOP: KPIs */}
              <KPISection data={productResult.kpis} />

              {/* DASHBOARD MIDDLE: Exec Summary & Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SummaryCard summary={productResult.summary} />
                </div>
                <div className="lg:col-span-1">
                    <InsightBox insights={productResult.insights} />
                </div>
              </div>

              {/* DASHBOARD CHARTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Customer Sentiment Distribution</h3>
                  <div className="h-64"><SentimentChart data={productResult.sentiment_distribution} /></div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Emotion Analysis Matrix</h3>
                  <div className="h-64"><EmotionChart data={productResult.emotion_distribution} /></div>
                </div>
              </div>

              {/* DASHBOARD BOTTOM: NLP Data Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                  <ComplaintsPraises content={productResult} />
                  <AspectTable aspects={productResult.aspects} />
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
