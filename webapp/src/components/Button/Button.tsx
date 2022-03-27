import React, { FC, useState } from 'react';
import { Save, X } from 'react-feather';
import './Button.scss';

type ButtonType = 'save' | 'cancel' | 'select' | 'disabled';

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  value: string;
  buttontype: ButtonType;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <div>
      <button {...props} id={props.disabled ? 'disabled' : props.buttontype}>
        {props.buttontype === 'save' && <Save id="icon" />}
        {props.buttontype === 'cancel' && <X id="icon" />}

        {props.value}
      </button>
    </div>
  );
};

export default Button;
