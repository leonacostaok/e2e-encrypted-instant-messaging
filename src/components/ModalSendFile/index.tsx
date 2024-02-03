import React, {useState} from 'react';
import ModalChat from "../ModalChat";
import {ButtonSecondary} from "../Button";
import styled from "styled-components";
import IconPortal from "../IconPortal";
import IconDocument from '../../assets/icons/icon-document2.svg';
import {TextMedium} from "../Typhography";

interface PropsTypeModalSendFile {
    onDismiss: () => void;
    visible: boolean;
    file: any;
}

const ModalSendFile = ({onDismiss, visible, file}: PropsTypeModalSendFile) => {
    const [htmlContent, setHtmlContent] = useState<string>('')
    const handleSend = () => {
        onDismiss()
    }
    const handleChangeHTML = (evt: any) => {
        if (!evt) {
            return
        }
        setHtmlContent(evt.target.value);
    };
    return (
        <ModalChat onDismiss={onDismiss} visible={visible} title={'Send file'}>
            <ModalChild>
                {
                    file && <InformationFile>
                        <IconPortal srcIcon='IconDocument' widthIcon={'32px'} heightIcon={'32px'}/>
                        <Detail>
                            <TextMedium>{file.name}</TextMedium>
                        </Detail>
                    </InformationFile>
                }
                <BoxInputMessageMain>
                    <input
                        className="editable"
                        value={htmlContent} // innerHTML of the editable div
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

    button {
        flex: 0 0 70px;
        max-width: 70px;
        height: 36px;
    }

    .editable {
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
`
const Detail = styled.div``
export default ModalSendFile;
