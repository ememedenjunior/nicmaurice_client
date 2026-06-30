import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CommonwealthPage = () => {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Background Image */}
      <header className="relative bg-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="United community"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Commonwealth of Independent Citizens and Communities
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
            A society built on freedom, self-determination, and unity
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Setting Section */}
        <section className="mb-16 bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start">
            <div className="bg-blue-600 p-3 rounded-lg mr-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-400">The Setting</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                The Commonwealth exists in a world where individuals and communities have the freedom to choose their own paths, free from oppressive governments or controlling forces. Our society thrives in diverse environments, from urban centers to rural collectives, all united by shared values of autonomy and mutual support.
              </p>
            </div>
          </div>
        </section>

        {/* Leader Section */}
        <section className="mb-16 bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start">
            <div className="bg-blue-600 p-3 rounded-lg mr-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-400">The Leader</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A visionary figure with a strong sense of justice, resilience, and strategic thinking. Our leader guides the Commonwealth not through authoritarian rule, but by inspiring collective action and facilitating consensus. They embody the principles of servant leadership while maintaining the courage to make difficult decisions when necessary.
              </p>
            </div>
          </div>
        </section>

        {/* Citizens & Communities Section */}
        <section className="mb-16 bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start">
            <div className="bg-blue-600 p-3 rounded-lg mr-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-400">Citizens & Communities</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                A diverse society where artists, scientists, farmers, and activists unite to build a better future. Each citizen contributes their unique talents and perspectives through:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Local assemblies that make grassroots decisions",
                  "Skill-sharing networks that empower all members",
                  "Cultural exchanges that celebrate diversity",
                  "Innovation hubs that solve community challenges",
                  "Mutual aid systems that ensure no one is left behind",
                  "Ecological stewardship programs"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Conflict Section */}
        <section className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-start">
            <div className="bg-blue-600 p-3 rounded-lg mr-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-blue-400">The Conflict</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                The Commonwealth faces significant challenges that test our values and resilience:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "External Threats",
                    content: "Powerful adversaries seek to undermine our independence through economic sanctions, misinformation campaigns, and covert operations."
                  },
                  {
                    title: "Moral Dilemmas",
                    content: "Balancing individual freedoms with collective needs, determining our stance toward less progressive neighboring societies."
                  },
                  {
                    title: "Resource Challenges",
                    content: "Maintaining sustainability and equitable distribution as our population grows and climate changes."
                  },
                  {
                    title: "Internal Divisions",
                    content: "Resolving disagreements between communities with different interpretations of our core principles."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-bold text-blue-400 mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Commonwealth</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Become part of a society that values your freedom, respects your contributions, and works together for a better future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition duration-200">
              Learn More
            </button>
            <button className="bg-transparent border-2 border-blue-500 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-medium text-lg transition duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default CommonwealthPage;