import { motion } from 'framer-motion';

const StatCard = ({ name, value, change, iconColor, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className="bg-white overflow-hidden shadow rounded-lg flex flex-col items-center justify-center text-center"
  >
    <div className="p-6 w-full flex flex-col items-center justify-center">
      <dl className="w-full">
        <dt className="text-sm font-medium text-gray-500 truncate">{name}</dt>
        <dd className="mt-1 text-2xl font-bold text-gray-900">{value}</dd>
      </dl>
    </div>
    <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 text-sm text-green-600 w-full">{change}</div>
  </motion.div>
);

export default StatCard;
