import React,{ MouseEvent, ReactElement, ReactNode } from 'react';
interface Props {
  children?:ReactNode;
  buttonStyle?:string;
  onPress?:(e:MouseEvent)=>void;
  disabled?:boolean;
}

export default function Button({
  children,
  buttonStyle = '',
  onPress = () => {},
  disabled = false,
}:Props): ReactElement{
  return (
    <button
      onClick={(e) => onPress(e)}
      className={`${buttonStyle} btn`}
      disabled={disabled}>
      {children}
    </button>
  );
}
