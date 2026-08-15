import React from 'react';

export const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};