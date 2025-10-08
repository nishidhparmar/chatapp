"use client";

import { Clock, MessageCircle, Search } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "../layout/dashboard-layout";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");

  const suggestions = [
    "Show me open invoices for Acme Corp due this month",
    "Show open invoices by customer",
    "Show sales by region this month",
    "Show top 10 overdue accounts",
    "Show cash flow by week for the next 60 days",
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center px-8 py-12 h-full">
        <div className="max-w-3xl w-full">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-900 mb-3">
              Ask anything about your data
            </h1>
            <p className="text-gray-600">
              From finance to inventory, ask and get the answers you need to
              make decisions faster.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("search")}
              className={`pb-3 px-1 relative ${
                activeTab === "search"
                  ? "text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <Search size={18} />
                Search mode
              </div>
              {activeTab === "search" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("conversation")}
              className={`pb-3 px-1 relative ${
                activeTab === "conversation"
                  ? "text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageCircle size={18} />
                Conversation mode
              </div>
              {activeTab === "conversation" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask a question..."
                className="w-full px-6 py-4 pr-14 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-start gap-3"
              >
                {index === 0 && (
                  <Clock
                    size={18}
                    className="text-gray-400 mt-0.5 flex-shrink-0"
                  />
                )}
                <span className="text-gray-700">
                  <span className="font-medium">Show</span>
                  {suggestion.substring(4)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default HomePage;
