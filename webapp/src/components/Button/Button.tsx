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
  buttonType: ButtonType;
}

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <div>
      <button {...props} id={props.disabled ? 'disabled' : props.buttonType}>
        {props.buttonType === 'save' && <Save id="icon" />}
        {props.buttonType === 'cancel' && <X id="icon" />}

        {props.value}
      </button>
    </div>
  );
};

export default Button;
