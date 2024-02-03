import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import {ChatExpandType} from "../../../types/chat.type";
import {ChatExpandEnum} from "../../../constants/chat";
import ExpandMain from "./ExpandMain";
import ExpandSearch from "../component/ExpandSearch";
interface PropsTypeExpand{
  onHide: () => void;
}
const Expand = ({onHide}:PropsTypeExpand) => {
  const [chosen,setChosen] = useState<ChatExpandType | null>(null)
  const onChosen = useCallback((chosenValue:ChatExpandType | null) => {
    setChosen(chosenValue)
  },[])
  const renderContent = useCallback(() => {
    switch (chosen) {
      case ChatExpandEnum.SEARCH:
        return <ExpandSearch onChosen={onChosen}/>
      default:
        return <ExpandMain onHide={onHide} onChosen={onChosen} />
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chosen,onChosen])
  return (
    <ExpandBox>
      {
        renderContent()
      }
    </ExpandBox>
  );
};
const ExpandBox = styled.div`
  width: 100%;
  height: 100%;
`

export default Expand;
