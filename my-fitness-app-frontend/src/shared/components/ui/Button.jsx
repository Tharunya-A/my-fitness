import { cn } from '../utils/cn';

export const Button = ({ className, children, ...props }) => (
  <button className={cn("px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors", className)} {...props}>
    {children}
  </button>
);