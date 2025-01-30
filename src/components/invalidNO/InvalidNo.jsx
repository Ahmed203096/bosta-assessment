import React from 'react'
import "./invalidNo.css"

export default function InvalidNo({lang}) {
  return (
    <div className='d-flex flex-column align-items-center gap-3 my-5 py-5'>
        <h1 className='heading'>NOT FOUND</h1>
        <h3 className="c-text">Looks like you enterd an invalid tracking number</h3>
        <h3 className="c-text">Please try valid tracking number</h3>
      
    </div>
  )
}
