"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

export const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("token") ? true : false)
    }
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 sm:py-20 lg:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Master Competitive Programming
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join CPS Academy and unlock your potential in competitive programming with expert guidance, comprehensive courses, and hands-on practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoggedIn ? (
              <Link 
                href="/courses" 
                className="bg-gray-900 text-white px-8 py-4 rounded font-semibold text-lg hover:bg-gray-800 transition-colors"
              >
                Browse Courses
              </Link>
            ) : (
              <>
                <Link 
                  href="/signup" 
                  className="bg-gray-900 text-white px-8 py-4 rounded font-semibold text-lg hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </Link>
                <Link 
                  href="/login" 
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded font-semibold text-lg hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            What we offer
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Structured Courses</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Learn algorithms and data structures through carefully designed lessons that build on each other.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Practice Problems</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Solve problems from contests like ICPC and Codeforces with detailed explanations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Expert Guidance</h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Get help from experienced competitive programmers who know what it takes to succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics covered */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">
            Topics we cover
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-sm sm:text-base">
            <div className="p-4 bg-gray-50 rounded">Arrays & Strings</div>
            <div className="p-4 bg-gray-50 rounded">Sorting & Searching</div>
            <div className="p-4 bg-gray-50 rounded">Dynamic Programming</div>
            <div className="p-4 bg-gray-50 rounded">Graph Algorithms</div>
            <div className="p-4 bg-gray-50 rounded">Trees & Heaps</div>
            <div className="p-4 bg-gray-50 rounded">Number Theory</div>
            <div className="p-4 bg-gray-50 rounded">Greedy Algorithms</div>
            <div className="p-4 bg-gray-50 rounded">Contest Strategy</div>
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Course Highlights
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">100+</div>
              <div className="text-gray-600 text-sm sm:text-base">Live Classes</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">100+</div>
              <div className="text-gray-600 text-sm sm:text-base">Programming Contests</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">1000+</div>
              <div className="text-gray-600 text-sm sm:text-base">Practice Problems</div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Success */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Our Students' Success
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-gray-600 text-sm sm:text-base">Codeforces Expert</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">29</div>
              <div className="text-gray-600 text-sm sm:text-base">Codeforces Specialist</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">106</div>
              <div className="text-gray-600 text-sm sm:text-base">Codeforces Pupil</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">15</div>
              <div className="text-gray-600 text-sm sm:text-base">BD Big Tech</div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      {!isLoggedIn && (
        <section className="py-12 sm:py-16 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Join CPS Academy today and start improving your competitive programming skills.
            </p>
            <Link 
              href="/signup" 
              className="bg-gray-900 text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition-colors inline-block"
            >
              Create Account
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
