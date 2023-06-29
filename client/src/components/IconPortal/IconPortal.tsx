import React from 'react'
import styled from 'styled-components/macro'

interface Props {
  widthIcon?: string
  heightIcon?: string
  srcIcon: string
}
const IconPortalWrap = styled.div<{ widthIcon?:string;heightIcon?:string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({widthIcon}) => widthIcon || '24px'};
  height: ${({heightIcon}) => heightIcon || '24px'};
`
const ImageIcon = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  object-fit: contain;
`
const IconPortal = (props: Props) => {
  const { srcIcon, widthIcon, heightIcon } = props
  return (
    <IconPortalWrap widthIcon={widthIcon} heightIcon={heightIcon}>
       <ImageIcon src={srcIcon} alt={'Image_icon'} />
    </IconPortalWrap>
  )
}

export default IconPortal
