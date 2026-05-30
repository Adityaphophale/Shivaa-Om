import React from 'react';

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & { className?: string };

export const Label: React.FC<Props> = ({ children, className, ...rest }) => {
  return (
    <label className={className} {...rest}>
      {children}
    </label>
  );
};

export default Label;
