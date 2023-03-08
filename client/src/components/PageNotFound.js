import React from 'react'

export default function PageNotFound() {
  return (
    // <div>PageNotFound</div>
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600">Oops! The page you are looking for could not be found.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8" onClick={() => window.history.back()}>Go Back</button>
    </div>
  )
}
