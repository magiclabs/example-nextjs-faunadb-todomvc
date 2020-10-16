import React from 'react'
import classNames from 'classnames'

export default function Button(props) {
  const { className, isActive, ...otherProps } = props

  return (<>
    <button className={classNames(className, isActive && 'active')} {...otherProps} />

    <style jsx>{`
      button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background: #fff;
        border: 1px solid #bdbdbd;
        border-radius: 4px;
        box-shadow: 0 0 0 3px transparent;
        transition: all 0.2s;
      }

      button:hover {
        border-color: #6851ff;
      }

      button:focus {
        outline: none;
        border-color: #6851ff;
        box-shadow: 0 0 0 3px #e2dcff;
      }

      button:active,
      button.active {
        outline: none;
        border-color: #6851ff;
        box-shadow: 0 0 0 3px #a796ff;
      }

      button:disabled {
        pointer-events: none;
      }
    `}</style>
  </>)
}
