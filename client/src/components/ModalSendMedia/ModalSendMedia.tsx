import React, {useEffect, useState} from 'react';
import ModalChat from "../ModalChat";
import {ButtonSecondary} from "../Button";
import styled from "styled-components";
import ContentEditable from "react-contenteditable";
import IconPortal from "../IconPortal";
import IconDocument from '../../assets/icons/icon-document2.svg';
interface PropsTypeModalSendMedia{
  onDismiss:() => void;
  visible:boolean;
  file:FileList | null;
}
const ModalSendMedia = ({onDismiss,visible,file}:PropsTypeModalSendMedia) => {
  const [htmlContent,setHtmlContent] = useState<string>('');
  const [srcMedias,setSrcMedias] = useState<any[]>([])
  const handleSend=() => {
    onDismiss()
  }
  const handleChangeHTML = (evt:any) => {
    if(!evt){
      return
    }
    setHtmlContent(evt.target.value);
  };
  useEffect(() => {
    if(!file){
      return
    }
    for (const [, value] of Object.entries(file)) {
      const file = value
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', async () => {
        setSrcMedias(prevState => [...prevState,String(reader.result)])
      })
    }
  },[file])
  return (
    <ModalChat onDismiss={onDismiss} visible={visible} title={'Send media'}>
      <ModalChild>
        {
          srcMedias.length !== 0 && <InformationFile>
            {
              srcMedias.map((item,index) => {
                return  <Detail key={index}>
                  <img src={item} alt={'img-send'} className={'img-send'}/>
                </Detail>
              })
            }
          </InformationFile>
        }
        <BoxInputMessageMain>
          <ContentEditable
            className="editable"
            tagName="pre"
            html={htmlContent} // innerHTML of the editable div
            onChange={handleChangeHTML} // handle innerHTML change
          />
          <ButtonSecondary onClick={() => handleSend()}>Send</ButtonSecondary>
        </BoxInputMessageMain>
      </ModalChild>
    </ModalChat>
  );
};
const ModalChild = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 380px;
`
const BoxInputMessageMain = styled.div`
  display: flex;
  align-items: center;
  button{
    flex: 0 0 70px;
    max-width: 70px;
    height: 36px;
  }
  .editable{
    background-color: ${({theme}) => theme.inputBgLight};
    outline: none;
    font-size: ${({theme}) => theme.fontSizeText2};
    line-height: 1.5;
    color: ${({theme}) => theme.tertiaryEleLight};
    margin-right: 10px;
    margin-top: 0;
    margin-bottom: 0;
    height: max-content;
    padding: 6px;
    white-space: break-spaces;
    flex: 0 0 calc(100% - 80px);
    max-width: calc(100% - 80px);
  }
`
const InformationFile = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`
const Detail = styled.div`
  .img-send{
    width: 120px;
    height: 80px;
    display: block;
    object-fit: cover;
    vertical-align: middle;
  }
`
export default ModalSendMedia;

