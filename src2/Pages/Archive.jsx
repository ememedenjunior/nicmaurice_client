import { FaFilePdf, FaSearch, FaCalendarAlt, FaUserGraduate } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AcademicArchive = () => {
  const archiveItems = [
    {
      id: 1,
      title: "ASSESSMENT OF ALTERATION IN PHYSIOLOGICAL FUNCTIONING",
      author: "AKON E. NDIOK, RN, RM, DPA, BSc (NURSING)",
      date: "May 2023",
      description: " The aim of this paper is to look at the assessment of alteration in physiological functioning.",
      type: "Research Paper",
      department: "Nursing",
      link: "https://www.dropbox.com/scl/fi/jyfnnzbmuzvqdz0nynfca/AASSESSMENT-OF-ALTERATION-IN-PHYSIOLOGICAL-FUNCTIONING.doc?rlkey=40shvmxn8jzuluz7170tr0965&st=r81k13tm&dl=0"
    },
    {
      id: 2,
      title: "AWARENESS AND ATTITUDE OF ADULTS TOWARDS VOLUNTARY BLOOD DONATION",
      author: "Okandeji-Barry Rume Oghenebrorue",
      date: "March 2023",
      description: "Blood is a vital component of the human body. Therefore, voluntary non-remunerated blood donation(VBD)has become an important source of blood donation in the health care system.",
      type: "Journal Article",
      department: "Nursing",
      link: "https://www.dropbox.com/scl/fi/7ykutgy2qpxmtj99dof43/Blood-donation-paper.doc?rlkey=n69sqeerbnbg45he8z6y5ea5i&st=s6skgwpn&dl=0"
    },
    {
      id: 3,
      title: "A CASE STUDY OF SUDDEN OCCURENCES OF HEALTH CONCERN TO THE PUBLIC HEALTH NURSE IN THE COMMUNITY",
      author: "Rose Ebieroba Ezonbodor-Akwagbe, RNM, RPHN, BSN, MED, PhD",
      date: "January 2023",
      description: "Literature has shown that accidents claim more lives of children ..",
      type: "Research Paper",
      department: "Nursing",
      link: "https://www.dropbox.com/scl/fi/255wz0xgdubeyax2plgkb/A-CASE-STUDY-OF-SUDDEN-OCCURENCES-OF-HEALTH-CONCERN-TO-THE-PUBLIC-HEALTH-NURSE-IN-THE-COMMUNITY.-2.doc?rlkey=f3pkb72s5nvnf7i7ixbet0ppn&st=0pg9rwyw&dl=0"
    },
    {
      id: 4,
      title: "A CASE STUDY OF A PATIENT WITH ADENOIDECTOMYFOR OBSTRUCTIVE ADENOID ENLARGEMENT",
      author: "IHEAGU ANDALYN IFEYINWARN, RM, RPN, B.Sc(NURSING)",
      date: "November 2022",
      description: "This case study is on a 3 year old female child with obstructive adenoid enlargement",
      type: "Research Paper",
      department: "Healh",
      link: "https://www.dropbox.com/scl/fi/pe5m1n73vqonwi019o48i/A-PATIENT-WITH-ADENOIDECTOMY.doc?rlkey=jabub86l80axrnz57m7ay9oli&st=riftxmn6&dl=0"
    },
    {
      id: 5,
      title: "Analysis of Sexual Protective Methods Adopted by young adults of a Selected University in Ibadan, Nigeria",
      author: "Ishola,A.G & Adelayi,P.",
      date: "September 2022",
      description: "The emergence of the concept of safe sex in the 1980s marked",
      type: "Research Paper",
      department: "Health",
      link: "https://www.dropbox.com/scl/fi/pgrzdu73exosbdgw1g9e5/Analysis-of-Sexual-Protective-Methods-Adopted.docx?rlkey=sdi00d8nm0ytb4zap676iknpe&st=dy860zzo&dl=0"
    },
    {
      id: 6,
      title: "CONSUMERS’ SATISFACTION WITH NURSING CARE IN AHMADU BELLO UNIVERSITY TEACHING HOSPITAL ZARIA, NIGERIA",
      author: "A.D Ajayi RN, B.Sc,PGDE,M.Sc;",
      date: "July 2022",
      description: "Ensuring quality nursing care is a challenge",
      type: "Research Paper",
      department: "NUrsing",
      link: "https://www.dropbox.com/scl/fi/nccvt4tqayym265mk5wnh/Consumers-satisfaction-with-nursing-care-in-ABUTH-Zaria-2.doc?rlkey=b7mjqbtfutijgsgs5lx5g66r2&st=k5c88uex&dl=0"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Research Publications and Scholarly Works</h2>
          <p className="text-gray-600 max-w-3xl">
            This archive contains a comprehensive collection of academic publications, research papers, 
            conference proceedings, and other scholarly works produced by our faculty and students.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search publications..."
              />
            </div>
            <select className="block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>All Departments</option>
            </select>
            <select className="block w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>All Types</option>
              <option>Research Paper</option>
              <option>Journal Article</option>
              <option>Conference Paper</option>
              <option>Book Chapter</option>
              <option>Technical Report</option>
            </select>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Filter
            </button>
          </div>
        </div>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {archiveItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="bg-indigo-50 h-48 flex items-center justify-center text-indigo-400">
                <FaFilePdf className="text-6xl" />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center text-xs text-gray-500">
                    <FaUserGraduate className="mr-1" /> {item.author}
                  </span>
                  {/* <span className="inline-flex items-center text-xs text-gray-500">
                    <FaCalendarAlt className="mr-1" /> {item.date}
                  </span> */}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {item.department}
                  </span>
                </div>
                <button className="w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <a href={item.link}>View Publication</a>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px">
            <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-indigo-600 hover:bg-gray-50">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </main>

      {/* Footer */}
     <Footer />
    </div>
  );
};

export default AcademicArchive;