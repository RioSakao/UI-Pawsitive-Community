'use client'
import React from 'react';

interface CheckBoxProps {
    label: string;
}

const Checkbox: React.FC<CheckBoxProps> = ({ label }) => {
    return (
      <div className="checkbox-wrapper">
        <label>
          <input type="checkbox" />
          <span>{label}</span>
        </label>
      </div>
    );
  };
  export default Checkbox;