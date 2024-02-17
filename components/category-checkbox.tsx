'use client'
import React from 'react';

interface CheckBoxProps {
  label: string;
  checked: boolean;
  name: string;
  onChange: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckBoxProps> = ({ label, name, checked, onChange }) => {
  return (
    <div className="checkbox-wrapper">
      <label>
        <input type="checkbox" name={name} checked={checked} onChange={()=>onChange(!checked)} />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;