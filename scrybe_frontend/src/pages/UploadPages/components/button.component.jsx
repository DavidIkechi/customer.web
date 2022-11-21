import React from 'react'
import style from '../UploadPages.module.scss'

export function PrimaryButton({ onClick, text = 'PrimaryButton' }) {
  return (<button className={style['primary-button']} onClick={() => onClick()}>{text}</button>)
}