import React from 'react';

interface Props {
  name: string;
  setSortBy: Function;
}

export default function FilterButtons(props: Props) {
    return (
      <button 
        type="button" 
        className="btn toggle-btn" 
        onClick={() => props.setSortBy(props.name)}
      >
        <span> {props.name} </span>
      </button>       
    );
}