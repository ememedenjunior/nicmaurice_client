import { NicmauriceLogo } from "./Header"

const Footer = () => {
  return (
    <>
    {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-3 mb-6 lg:mb-0">
              <NicmauriceLogo />
              <div>
                <div className="text-white font-bold text-lg">
                  Nicmaurice Nursing Academy
                </div>
                <div className="text-sm">Accredited Nursing Education</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-white font-medium mb-3">Programs</div>
                <div className="space-y-2 text-sm">
                  <div>BSN Programs</div>
                  <div>MSN Programs</div>
                  <div>Certifications</div>
                </div>
              </div>
              <div>
                <div className="text-white font-medium mb-3">Resources</div>
                <div className="space-y-2 text-sm">
                  <div>NCLEX Prep</div>
                  <div>Career Services</div>
                  <div>Library</div>
                </div>
              </div>
              <div>
                <div className="text-white font-medium mb-3">Admissions</div>
                <div className="space-y-2 text-sm">
                  <div>Requirements</div>
                  <div>Tuition</div>
                  <div>Apply Now</div>
                </div>
              </div>
              <div>
                <div className="text-white font-medium mb-3">Contact</div>
                <div className="space-y-2 text-sm">
                  <div>admissions@nicmaurice.edu</div>
                  <div>(555) 123-4567</div>
                  <div>Hours: Mon-Fri 9-5</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 Nicmaurice Nursing Academy. All rights reserved.</p>
            <p className="mt-2">
              Accredited by the Commission on Collegiate Nursing Education
              (CCNE)
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
