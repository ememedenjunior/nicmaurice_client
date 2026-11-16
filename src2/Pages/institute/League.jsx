import React from "react";
import LeagueImg from "../../assets/institute/LEAGUE.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { MdKeyboardArrowRight } from "react-icons/md";

const League = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Invitation to Join the Nic Maurice League (NML)
          </h1>
          {/* <div className="w-full max-w-4xl mx-auto mt-8 rounded-xl overflow-hidden shadow-xl">
            <img
              src={LeagueImg}
              alt="Nic Maurice League"
              className="w-full h-auto object-cover"
            />
          </div> */}
        </div>

        {/* Letter Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-xl font-semibold text-blue-700 mb-6 border-b pb-2">
            Dear Esteemed Editors, Reviewers, and Proofreaders,
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            We are delighted to introduce the Nic Maurice League (NML), a platform designed to foster collaboration, recognition, and growth among our dedicated team of editors, reviewers, and proofreaders. Your tireless efforts have been instrumental in shaping our journals into beacons of academic excellence.
          </p>

          {/* League Aims */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Nic Maurice League aims to:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Facilitate knowledge sharing and best practices",
                "Provide training and development opportunities",
                "Recognize outstanding contributions",
                "Foster a sense of community and belonging"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">
            We invite you to join this prestigious group, as we strive to advance academic publishing together. Please find attached a detailed brochure outlining the benefits and features of NML. We look forward to your participation and valuable contributions.
          </p>

          <div className="text-gray-700">
            <p>Best regards,</p>
            <p className="font-semibold mt-2">League of Editors, Reviewers, International Advisory Board, and Proofreaders</p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-8">Member Benefits</h2>
          
          {/* Benefit Categories */}
          <div className="space-y-10">
            {[
              {
                title: "Recognition",
                items: [
                  "Induction into the prestigious Nic Maurice League",
                  "Certificate of excellence in editorial services",
                  "Public recognition on our website and social media channels"
                ]
              },
              {
                title: "Networking Opportunities",
                items: [
                  "Access to a global network of editors, reviewers, and proofreaders",
                  "Opportunities for collaboration and knowledge sharing",
                  "Invitations to exclusive webinars and workshops"
                ]
              },
              {
                title: "Professional Development",
                items: [
                  "Free training and development resources",
                  "Access to exclusive workshops and conferences",
                  "Opportunities for mentorship and career advancement"
                ]
              },
              {
                title: "Visibility and Credibility",
                items: [
                  "Enhanced credibility in the academic community",
                  "Increased visibility for your work and expertise",
                  "Opportunities for guest blogging and thought leadership"
                ]
              },
              {
                title: "Exclusive Rewards",
                items: [
                  "Discounts on publishing services and courses",
                  "Free subscription to our journals and publications",
                  "Special discounts on partner services and events"
                ]
              },
              {
                title: "Community Engagement",
                items: [
                  "Access to a private online community for discussion and collaboration",
                  "Opportunities for feedback and support from peers",
                  "Regular updates on industry trends and best practices"
                ]
              },
              {
                title: "Leadership Opportunities",
                items: [
                  "Opportunities to take on leadership roles within the League",
                  "Chance to contribute to the development of the League and its activities",
                  "Recognition as a leader in your field"
                ]
              }
            ].map((category, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-blue-700 mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-gray-700 mt-8 leading-relaxed">
            These benefits are designed to support the growth and development of our members, while also recognizing their outstanding contributions to academic publishing.
          </p>
        </div>

        {/* Membership Growth Strategies */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-8">Membership Growth Strategies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Referral Incentives",
                items: [
                  "Discounts on publishing services or courses",
                  "Free access to exclusive webinars or workshops",
                  "Additional recognition on the League's website or social media channels"
                ]
              },
              {
                title: "League Ambassador Program",
                items: [
                  "Customizable invitation templates",
                  "Exclusive Ambassador badges or certificates",
                  "Recognition on the League's website and social media channels"
                ]
              },
              {
                title: "Member Testimonials",
                items: [
                  "Testimonials for the website or social media channels",
                  "Case studies or success stories",
                  "Video or audio testimonials"
                ]
              },
              {
                title: "Social Media Sharing",
                description: "Encourage members to share League-related content on their social media platforms, using branded hashtags and tagging the League's accounts."
              },
              {
                title: "Personalized Invitations",
                description: "Provide members with personalized invitation templates, allowing them to invite colleagues and peers directly."
              },
              {
                title: "Recognition for Referrals",
                items: [
                  "'Referrer of the Month' or 'Referrer of the Year' awards",
                  "Special badges or certificates",
                  "Featured interviews or spotlights on the League's website or social media channels"
                ]
              }
            ].map((strategy, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">{strategy.title}</h3>
                {strategy.items ? (
                  <ul className="space-y-2">
                    {strategy.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{strategy.description}</p>
                )}
              </div>
            ))}
          </div>

          <p className="text-gray-700 mt-8 leading-relaxed">
            By implementing these strategies, you can encourage members to invite and recommend others to join the Nic Maurice League, fostering growth and engagement within the community.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6">Join the Nic Maurice League Today</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Become part of this prestigious community of academic publishing professionals and enjoy exclusive benefits while contributing to the advancement of scholarly communication.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition duration-200 flex items-center mx-auto">
            For enquiries, Call us now
            <MdKeyboardArrowRight className="ml-2" />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default League;