// import React from 'react';

// export const Button = ({ children, onClick }) => {
//   return (
//     <button onClick={onClick} className="px-6 py-4 bg-black text-white rounded">
//       {children}
//     </button>
//   );
// };

import React from 'react';

export const Button = ({ children, onClick, variant = 'default', size = 'medium', disabled = false }) => {
  const baseStyles = 'rounded transition duration-150 ease-in-out';
  
  const variants = {
    default: 'bg-black text-white hover:bg-gray-800',
    outline: 'border border-black text-black hover:bg-gray-200',
  };

  const sizes = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-4',
    large: 'px-8 py-4 text-lg',
  };

  const variantStyles = variants[variant] || variants.default;
  const sizeStyles = sizes[size] || sizes.medium;

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
