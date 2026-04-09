/**
 * Card Component
 * Reusable card component for dashboard
 */

export const Card = ({ title, value, description, icon }) => {
  return (
    <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-blue-500 transition duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
          <p className="text-gray-500 text-xs mt-1">{description}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
};
