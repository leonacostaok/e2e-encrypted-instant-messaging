import React, { useState } from 'react'
import styled from 'styled-components/macro'
import IconUserDefault from '../../assets/icons/icon-user-default.svg'
interface IMediaUpload {
  nameInput: string;
  setFieldValue?:  any | undefined;
  initialSrc:string;
}

const MediaUpload = (props: IMediaUpload) => {
  const { nameInput,setFieldValue,initialSrc } = props
  const [srcMedia, setSrcMedia] = useState<string>(initialSrc)
  const handleChangeMedia = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', async () => {
      setSrcMedia(String(reader.result))
      setFieldValue && setFieldValue(nameInput,file)
    })
  }
  return (
    <MediaUploadWrapper>
      <AvatarBoxEdit>
        <input
          type={'file'}
          accept="image/*"
          id={nameInput}
          hidden={true}
          name={nameInput}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeMedia(event)
          }}
        />
        <AvatarBox>
          <Avatar src={initialSrc !== '' ? srcMedia : IconUserDefault} alt={'user-default'} />
        </AvatarBox>
        <TextUpload htmlFor={nameInput}>Upload</TextUpload>
      </AvatarBoxEdit>
    </MediaUploadWrapper>
  )
}
const MediaUploadWrapper = styled.div`
  width: 100%;
  height: 100%;
`
const AvatarBoxEdit = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  ${({theme}) => theme.flexRowCenterVertical};
  gap: 16px;
`
const AvatarBox = styled.div`
  width: 56px;
  height: 56px;
  position: relative;
`
const Avatar = styled.img`
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
`
const TextUpload = styled.label`
  color: ${({theme}) => theme.mainLightTheme};
  cursor: pointer;
  font-size: ${({theme}) => theme.fontSizeText3};
  line-height: 1.142;
  font-weight: 700;
`
export default MediaUpload
