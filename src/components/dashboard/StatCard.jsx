import { motion } from 'framer-motion';

const StatCard = ({ name, value, change, iconColor, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className="bg-white overflow-hidden shadow rounded-lg"
  >
    <div className="p-6 flex items-center">
      <div className={`flex-shrink-0 p-2 rounded-full ${iconColor} bg-blue-50`}>
        <span className="material-icons text-white">school</span>
      </div>
      <div className="ml-5 flex-1">
        <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">{name}</dt>
          <dd className="mt-1 text-2xl font-bold text-gray-900">{value}</dd>
        </dl>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 text-sm text-green-600">{change}</div>
  </motion.div>
);

export default StatCard;
