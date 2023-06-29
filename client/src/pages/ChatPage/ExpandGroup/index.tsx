import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import {ChatExpandGroupType} from "../../../types/chat.type";
import {ChatExpandEnum} from "../../../constants/chat";
import ExpandSearch from "../component/ExpandSearch";
import ExpandGroupMain from "./ExpandGroupMain";
interface PropsTypeExpandGroup{
  onHide:() => void;
}
const ExpandGroup = ({onHide}:PropsTypeExpandGroup) => {
  const [chosen,setChosen] = useState<ChatExpandGroupType | null>(null)
  const onChosen = useCallback((chosenValue:ChatExpandGroupType | null) => {
    setChosen(chosenValue)
  },[])
  const renderContent = useCallback(() => {
    switch (chosen) {
      case ChatExpandEnum.SEARCH:
        return <ExpandSearch onChosen={onChosen}/>
      default:
        return <ExpandGroupMain onHide={onHide} onChosen={onChosen} />
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chosen,onChosen])
  return (
    <ExpandGroupBox>
      {renderContent()}
    </ExpandGroupBox>
  );
};
const ExpandGroupBox = styled.div`
  width: 100%;
  height: 100%;
`
export default ExpandGroup;
