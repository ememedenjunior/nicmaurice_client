import { useState, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Ipnj from "../assets/ipnj.jpeg";
import Irjmpc from "../assets/irjmpc.jpeg";
import Ijanr from "../assets/ijanr.jpeg";
import Irjmpch from "../assets/irjmpch.jpeg";
import Ijacn from "../assets/journal/ijacn.jpg";
import Maternal from "../assets/journal/maternal.jpg";
import Surgical from "../assets/journal/medical.jpg";
import Ijmri from "../assets/journal/innovations.jpg";

const Articles = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const journalData = [
    {
      id: "irjpch",
      title: "International Research Journal of Public and Community Health (IRJPCH)",
      category: "Public Health",
      articles: [
        { vol: "Vol 2 No. 1", link: "https://drive.google.com/file/d/11A4ct_shlliMyrVi00-LLl2l51bU2Sjy/view?usp=sharing", year: "2024" },
        { vol: "Vol 1 No. 1", link: "https://drive.google.com/file/d/1-y37ZKyNZLSP6OvATvUeCopBd2ojHcDa/view?usp=sharing", year: "2023" }
      ],
      icon: Irjmpch,
      color: "blue"
    },
    {
      id: "ijanr",
      title: "International Journal Of Advanced Nursing and Research (IJANR)",
      category: "Nursing",
      articles: [
        { vol: "Vol. 2 No. 1", link: "https://drive.google.com/file/d/1UXS9vTu51v21MCilhokOloR2f-BGqi85/view?usp=sharing", year: "2024" },
        { vol: "Vol. 1 No. 1", link: "https://drive.google.com/file/d/1G2Ny0EzrLYVIAMtLzTwvnl1L_q-q6tXO/view?usp=sharing", year: "2023" },
        { vol: " No. 013", link: "https://drive.google.com/file/d/1GnlHVApSoW8Fe3r9oFrpYrAEUxegOgfu/view?usp=drive_link", year: "2026" },
        { vol: " No. 014", link: "https://drive.google.com/file/d/1JlSmDpv2BfiaxAFDW25Y4MM7yevEhx6R/view?usp=drive_link", year: "2026" },
      ],
      icon: Ijanr,
      color: "green" 
    },
    {
      id: "ipnj",
      title: "International Professional Nursing Journal (IPNJ)",
      category: "Nursing",
      articles: [
        { vol: "Vol. 22 No. 2", link: "https://drive.google.com/file/d/1piWhbb-rL7lHnyzGvQc2huU1v5Xa7TMM/view?usp=sharing", year: "2024" },
        { vol: "Vol. 22 No. 1", link: "https://drive.google.com/file/d/1VRdQ86nlf7TdrUZMJ4QDVrLqt11XurCV/view?usp=sharing", year: "2024" },
        { vol: "Vol 21. No. 3", link: "https://drive.google.com/file/d/1JginAx_4QtBktAp6FEQo02PMdkzIbi5l/view?usp=sharing", year: "2023" },
        { vol: "Vol 21. No. 2", link: "https://drive.google.com/file/d/1aAkQ4r2TpzZw4Crtv9HuzwAMuHwp2L9S/view?usp=drive_link", year: "2023" },
        { vol: "Vol 21. No. 1", link: "https://drive.google.com/file/d/10JqO5Gei5rT24Wuyknd330bWimBqDk25/view?usp=sharing", year: "2023" },
        { vol: "Vol 18. No. 1", link: "https://drive.google.com/file/d/1DvKkwXAKxV6i2Szh7lXwD_dyObjXx895/view?usp=sharing", year: "2020" },
        { vol: "Ipnj 2015", link: "https://drive.google.com/file/d/1q0DcxQYRjbLo-DcGNge8lTDTuwVr5JZz/view?usp=sharing", year: "2015" },
        { vol: "Ipnj 2014", link: "https://drive.google.com/file/d/1XweEOJYeoM3Qi04bHFhjG6bA_tVfd7no/view?usp=sharing", year: "2014" },
        { vol: "Ipnj 2013", link: "https://drive.google.com/file/d/1RY3UD2FOpWa5NO6FUqdeAn59N3CbNhhw/view?usp=sharing", year: "2013" },
        { vol: "Ipnj 2012", link: "https://drive.google.com/file/d/1actsbvJyfAXDvrUujR7WktdT6r-m4M0s/view?usp=sharing", year: "2012" },
        { vol: "Ipnj 2011", link: "https://drive.google.com/file/d/1im2wILt9gu2GyDf5mjYIFElDaSOtllyM/view?usp=sharing", year: "2011" },
        { vol: "Ipnj 2026, No. 1000", link: "https://drive.google.com/file/d/11oQBSYH43ShjvWnlvzIi-UphGb1_9-Hj/view?usp=drive_link", year: "2026" },
        { vol: "Ipnj 2026, No. 1001", link: "https://drive.google.com/file/d/1fvDNn_74e_dHmaFBYQP4tZYiCodkqATg/view?usp=drive_link", year: "2026" }

      ],
      icon: Ipnj,
      color: "purple"
    },
    {
      id: "irjmpch",
      title: "International Research Journal of Multidisciplinary-Practices, Public and Community Health (IRJMPCH)",
      category: "Multidisciplinary",
      articles: [
        { vol: "Vol. 2 No. 2", link: "https://drive.google.com/file/d/1TJmz2k2WS2Dmho9wM6uhCmnPjlU4cN2q/view?usp=sharing", year: "2024" },
        { vol: "Vol. 2 No. 1", link: "https://drive.google.com/file/d/1klCCW_XPVd5bZtfIotpm6CEpyVUAeeOS/view?usp=sharing", year: "2024" },
        { vol: "Vol 1. No. 2", link: "https://drive.google.com/file/d/11TvBFjw4MH4SB9B3q5thHqn-3pkJFc2_/view?usp=sharing", year: "2023" },
        { vol: "Vol 1. No. 1", link: "https://drive.google.com/file/d/1c5a4Hb4xdyQGICmAvR_EYrmezPGve-iQ/view?usp=sharing", year: "2023" },
        { vol: "No. 26", link: "https://drive.google.com/file/d/1KRgZ4aKOUmV00uv5KdBB8cdCZsSnJ_jz/view?usp=drive_link", year: "2026" }

      ], 
      icon: Irjmpc,
      color: "orange"
    },
    {
      id: "ijmri",
      title: "The International Journal of Multidisciplinary Researches and Innovations (IJMRI)",
      category: "Innovation",
      articles: [
        { vol: "Vol 2 No. 1", link: "https://drive.google.com/file/d/1mi4K5LbymGHDLMI4DYk2h2uZu1a68nWW/view?usp=sharing", year: "2024" },
        { vol: "Art. 1 Vol. 2 No. 1 (Main work)", link: "https://drive.google.com/file/d/195sarNHLSMfx9MIYNaLoqHW98TxNNTGp/view?usp=drive_link", year: "2024" },
        { vol: "Art. 1 Vol. 2 No. 1 (Prelim)", link: "https://drive.google.com/file/d/1GWso94KesaGyoZnplTkb7UvB9ZOxPcbX/view?usp=drive_link", year: "2024" },
        { vol: "Art. 3 Vol. 2 No. 1", link: "https://drive.google.com/file/d/1kcKUDYsuEo0hPfYK4hdxp29orwJHo3px/view?usp=drive_link", year: "2024" },
        { vol: "Art. 4 Vol. 2 No. 1", link: "https://drive.google.com/file/d/1lXbAQ9F57pN4Y_I8K_9R9zg-1BIr-hqM/view?usp=drive_link", year: "2024" },
        { vol: "Art. 5 Vol. 2 No. 1", link: "https://drive.google.com/file/d/14BbWmdJjGjWKSHeFw39miOG572rPOjaY/view?usp=drive_link", year: "2024" },
        { vol: "Art. 6 Vol. 2 No. 1", link: "https://drive.google.com/file/d/1VF_3RUwzlMjQMXfQVoOhKFgT-rajcSb9/view?usp=drive_link", year: "2024" },
        { vol: "Art. 8 Vol. 2 No. 1", link: "https://drive.google.com/file/d/1wIGnNOA0tzvO1jw-ZFcUO7cPEdf-rWzO/view?usp=drive_link", year: "2024" }
      ],
      icon: Ijmri,
      color: "red"
    },
    {
      id: "ijacn",
      title: "International Specialty Journal of Advanced Clinical Nursing Research",
      category: "Clinical",
      articles: [
        { vol: "Vol 1 No. 1", link: "https://drive.google.com/file/d/1TUSnfyZ6jn8jgeau5yevkXrlpCFeR-GQ/view?usp=sharing", year: "2023" }
      ],
      icon: Ijacn,
      color: "teal"
    },
    {
      id: "maternal",
      title: "International Specialty Journal of Maternal and Child Health Nursing Research",
      category: "Maternal Health",
      articles: [
        { vol: "Vol 1 No. 1", link: "https://drive.google.com/file/d/1vjnS4Fn6uTyzLuZq7rZwD3pt0fIBVSGq/view?usp=sharing", year: "2023" }
      ],
      icon: Maternal,
      color: "pink"
    },
    {
      id: "surgical",
      title: "International Specialty Journal of Medical and Surgical Nursing Research",
      category: "Surgical",
      articles: [
        { vol: "Vol 1 No. 1", link: "https://drive.google.com/file/d/11fkYlw-HiJE9aJMh4F9PbKU3diPXEPGV/view?usp=sharing", year: "2023" }
      ],
      icon: Surgical,
      color: "amber"
    }
  ];

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ["all", ...new Set(journalData.map(j => j.category))];
    return cats;
  }, []);

  // Filter journals based on category
  const filteredJournals = useMemo(() => {
    if (selectedCategory === "all") return journalData;
    return journalData.filter(j => j.category === selectedCategory);
  }, [selectedCategory]);

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200 hover:border-blue-300",
      green: "bg-green-50 border-green-200 hover:border-green-300",
      purple: "bg-purple-50 border-purple-200 hover:border-purple-300",
      orange: "bg-orange-50 border-orange-200 hover:border-orange-300",
      red: "bg-red-50 border-red-200 hover:border-red-300",
      teal: "bg-teal-50 border-teal-200 hover:border-teal-300",
      pink: "bg-pink-50 border-pink-200 hover:border-pink-300",
      amber: "bg-amber-50 border-amber-200 hover:border-amber-300"
    };
    return colors[color] || "bg-gray-50 border-gray-200 hover:border-gray-300";
  };

  const ArticleCard = ({ article, icon, color }) => (
    <li className="flex items-center justify-center p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-200 hover:-translate-y-1 w-[110px] group">
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        <div className="relative">
          <img 
            src={icon} 
            alt="Journal cover" 
            className="w-12 h-12 mx-auto rounded-md group-hover:scale-110 transition-transform duration-200" 
          />
          {article.year && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-[8px] px-1.5 py-0.5 rounded-full">
              {article.year}
            </span>
          )}
        </div>
        <span className="text-[11px] mt-2 block text-center font-medium text-gray-700 group-hover:text-blue-600">
          {article.vol}
        </span>
      </a>
    </li>
  );

  const JournalSection = ({ journal }) => {
    const isExpanded = expandedSections[journal.id];
    const displayArticles = isExpanded ? journal.articles : journal.articles.slice(0, 6);
    const hasMoreArticles = journal.articles.length > 6;
    const colorClass = getColorClasses(journal.color);

    return (
      <div className="mb-10 animate-fadeIn">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
          <h2 className="text-lg lg:text-xl text-gray-800 font-bold flex items-center gap-2">
            <span className={`w-1 h-6 ${colorClass.split(' ')[0].replace('bg-', 'bg-')} rounded-full`}></span>
            {journal.title}
          </h2>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-3 py-1 rounded-full ${colorClass} text-gray-700 font-medium`}>
              {journal.category}
            </span>
            {journal.articles.length > 0 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {journal.articles.length} {journal.articles.length === 1 ? 'issue' : 'issues'}
              </span>
            )}
          </div>
        </div>

        <div className={`p-5 rounded-xl border ${colorClass.split(' ')[1]} transition-shadow duration-300`}>
          {journal.articles.length > 0 ? (
            <>
              <ul className="flex flex-wrap gap-3">
                {displayArticles.map((article, index) => (
                  <ArticleCard key={index} article={article} icon={journal.icon} color={journal.color} />
                ))}
              </ul>
              
              {hasMoreArticles && (
                <button
                  onClick={() => toggleSection(journal.id)}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 group"
                >
                  <span className="border-b border-blue-600 group-hover:border-blue-800">
                    {isExpanded ? 'Show less' : `Show ${journal.articles.length - 6} more issues`}
                  </span>
                  <span className="text-lg group-hover:translate-y-0.5 transition-transform">
                    {isExpanded ? '↑' : '↓'}
                  </span>
                </button>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-center py-8">No articles available at this time</p>
          )}
        </div>
      </div>
    );
  };

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return filteredJournals;
    
    return filteredJournals.map(journal => ({
      ...journal,
      articles: journal.articles.filter(article => 
        article.vol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.year?.includes(searchTerm)
      )
    })).filter(journal => journal.articles.length > 0);
  }, [searchTerm, filteredJournals]);

  return (
    <>
      <Header />
      
      <main className="container mx-auto px-4 lg:pl-[280px] lg:pr-8 py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 border-b-2 border-blue-600 pb-3 inline-block">
            Research Articles
          </h1>
          <p className="text-gray-600 mt-3 text-base lg:text-lg">
            Access our comprehensive collection of peer-reviewed research papers and articles
          </p>
        </div>

        {/* Stats Section with Icons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-600">{journalData.length}</div>
            <div className="text-xs uppercase tracking-wider text-gray-600 mt-1">Journals</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-600">
              {journalData.reduce((acc, journal) => acc + journal.articles.length, 0)}
            </div>
            <div className="text-xs uppercase tracking-wider text-gray-600 mt-1">Articles</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-purple-600">2011</div>
            <div className="text-xs uppercase tracking-wider text-gray-600 mt-1">Since</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl text-center">
            <div className="text-3xl font-bold text-orange-600">Limited</div>
            <div className="text-xs uppercase tracking-wider text-gray-600 mt-1">Access</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles by title, year..."
                className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Journals' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        {searchTerm && (
          <div className="mb-4 text-sm text-gray-600">
            Found {searchResults.reduce((acc, j) => acc + j.articles.length, 0)} articles matching "{searchTerm}"
          </div>
        )}

        {/* Journal Sections */}
        <div className="space-y-6">
          {searchResults.length > 0 ? (
            searchResults.map((journal) => (
              <JournalSection key={journal.id} journal={journal} />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
              <button 
                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Quick Access Section */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <a 
            href="#latest"
            className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
          >
            <div className="text-lg mb-1">📚</div>
            <div className="font-medium text-gray-800">Latest Issues</div>
            <div className="text-xs text-gray-500">2024 Publications</div>
          </a>
          <a 
            href="#popular"
            className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
          >
            <div className="text-lg mb-1">⭐</div>
            <div className="font-medium text-gray-800">Most Accessed</div>
            <div className="text-xs text-gray-500">Top Articles</div>
          </a>
          <a 
            href="#archive"
            className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
          >
            <div className="text-lg mb-1">📦</div>
            <div className="font-medium text-gray-800">Archive</div>
            <div className="text-xs text-gray-500">Back Issues</div>
          </a>
          <a 
            href="#submit"
            className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-center"
          >
            <div className="text-lg mb-1">✍️</div>
            <div className="font-medium text-gray-800">Submit Paper</div>
            <div className="text-xs text-gray-500">Author Guidelines</div>
          </a>
        </div>

        {/* Help Section */}
        {/* <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Need Help Accessing Articles?</h3>
              <p className="text-blue-100 text-sm">
                Our support team is here to assist you with any issues
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href="/contact" 
                className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                Contact Support
              </a>
              <a 
                href="/faq" 
                className="border border-white text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                FAQ
              </a>
            </div>
          </div>
        </div> */}
      </main>
      
      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Articles;