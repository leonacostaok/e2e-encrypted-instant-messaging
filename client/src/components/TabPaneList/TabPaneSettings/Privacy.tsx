import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {LabelOption} from "./components/LabelOption";
import {TextSmallOption} from "./components/TextSmallOption";
import ToggleSwitch from "../../ToggleSwitch";

import SelectSingleCs from "../../SelectSingleCs";
import {optionStatus} from "../../../constants/options";
import {ButtonSecondary} from "../../Button";
import {FormikValues, useFormik} from "formik";
import axios from "axios/index";
import {PrivacyType} from "../../../types/user.type";
import HTTP_STATUS_FE from "../../../constants/httpStatus";
import {BaseURL} from "../../../constants/baseURL";
const optionDefault = optionStatus[1]
const Privacy = () => {
  const [privacy,setPrivacy] = useState<PrivacyType| null>(null)
  const formikPrivacy = useFormik({
    enableReinitialize: true,
    initialValues: {
      autoAcceptContacts:privacy ? privacy.autoAcceptContacts : true,
      phoneSearch: privacy ? privacy.phoneSearch : true,
      aliasSearch: privacy ? privacy.aliasSearch : true,
      phoneShare: privacy ? {value:privacy.phoneShare,label:privacy.phoneShare}:optionDefault,
      emojiShare: privacy ? {value:privacy.emojiShare,label:privacy.emojiShare}:optionDefault,
      nameShare: privacy ? {value:privacy.nameShare,label:privacy.nameShare}:optionDefault,
      imageShare: privacy ? {value:privacy.imageShare,label:privacy.imageShare}:optionDefault,
      statusShare: privacy ? {value:privacy.statusShare,label:privacy.statusShare}:optionDefault,
    },
    onSubmit: ((values:FormikValues) => {
      const {autoAcceptContacts,phoneSearch,aliasSearch,phoneShare,emojiShare,nameShare,imageShare,statusShare} = values;
      (async () => {
        try{
          await axios.post(`${BaseURL}/user/privacy`,{
            userId:1,
            autoAcceptContacts,
            phoneSearch,
            aliasSearch,
            phoneShare:phoneShare.value,
            emojiShare:emojiShare.value,
            nameShare:nameShare.value,
            imageShare:imageShare.value,
            statusShare:statusShare.value,
          })
        }catch (e){
          console.log('Update Privacy Error')
        }
      })()
    })
  })
  const {values,handleSubmit,setFieldValue} = formikPrivacy

  useEffect(() => {
    ;(async () => {
      try {
        const responsePrivacy = await axios.get(`${BaseURL}/user/privacy/1`)
        const {status} = responsePrivacy.data
        if(status === HTTP_STATUS_FE.OK){
          setPrivacy((prevState => {
            return {
              ...prevState,
              ...responsePrivacy.data.data
            }
          }))
        }
      }catch (e) {
        console.log('Get privacy error')
      }
    })()
  },[])
  return (
    <PrivacyWrapper>
      <FormPrivacy onSubmit={handleSubmit}>
        <PrivacyList>
          <PrivacyItem>
            <DivFlexRowCenter>
              <LabelOption>Auto accept new contacts</LabelOption>
              <ToggleSwitch enable={values.autoAcceptContacts} name={'autoAcceptContacts'} setFieldValue={setFieldValue}/>
            </DivFlexRowCenter>
          </PrivacyItem>
          <PrivacyItem>
            <DivFlexRowCenter>
              <LabelOption>Read receipts</LabelOption>
              <ToggleSwitch enable={true}/>
            </DivFlexRowCenter>
            <DivChild>
              <TextSmallOption>Allow others to be notified when you have read their messages</TextSmallOption>
            </DivChild>
          </PrivacyItem>
          <PrivacyItem>
            <DivFlexRowCenter>
              <LabelOption>Searching</LabelOption>
            </DivFlexRowCenter>
            <DivChild>
              <DivFlexRowCenter>
                <TextSmallOption>Phone number</TextSmallOption>
                <ToggleSwitch enable={values.phoneSearch} name={'phoneSearch'} setFieldValue={setFieldValue}/>
              </DivFlexRowCenter>
              <DivFlexRowCenter>
                <TextSmallOption>Alias</TextSmallOption>
                <ToggleSwitch enable={values.aliasSearch} name={'aliasSearch'} setFieldValue={setFieldValue}/>
              </DivFlexRowCenter>
            </DivChild>
          </PrivacyItem>
          <PrivacyItem>
            <DivFlexRowCenter>
              <LabelOption>Sharing</LabelOption>
            </DivFlexRowCenter>
            <DivChild>
              <DivChildRow>
                <TextSmallOption>Phone number</TextSmallOption>
                <SelectSingleCs options={optionStatus} nameField={'phoneShare'} initialSelected={values.phoneShare} setFieldValue={setFieldValue}/>
              </DivChildRow>
            </DivChild>
            <DivChild>
              <DivChildRow>
                <TextSmallOption>Emoji</TextSmallOption>
                <SelectSingleCs options={optionStatus} nameField={'emojiShare'} initialSelected={values.emojiShare} setFieldValue={setFieldValue}/>
              </DivChildRow>
            </DivChild>
            <DivChild>
              <DivChildRow>
                <TextSmallOption>Name</TextSmallOption>
                <SelectSingleCs options={optionStatus} nameField={'nameShare'} initialSelected={values.nameShare} setFieldValue={setFieldValue}/>
              </DivChildRow>
            </DivChild>
            <DivChild>
              <DivChildRow>
                <TextSmallOption>Images</TextSmallOption>
                <SelectSingleCs options={optionStatus} nameField={'imageShare'} initialSelected={values.imageShare} setFieldValue={setFieldValue}/>
              </DivChildRow>
            </DivChild>
            <DivChild>
              <DivChildRow>
                <TextSmallOption>Status</TextSmallOption>
                <SelectSingleCs options={optionStatus} nameField={'statusShare'} initialSelected={values.statusShare} setFieldValue={setFieldValue}/>
              </DivChildRow>
            </DivChild>
          </PrivacyItem>
        </PrivacyList>
        <CtaUpdate>
          <ButtonSecondary type={'submit'}>
            Update
          </ButtonSecondary>
        </CtaUpdate>
      </FormPrivacy>
    </PrivacyWrapper>
  );
};
const PrivacyWrapper = styled.div``
const FormPrivacy = styled.form`
  width: 100%;
`
const PrivacyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const PrivacyItem = styled.div``
const DivFlexRowCenter = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  justify-content: space-between;
`
const DivChild = styled.div`
  margin-top: 8px;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const DivChildRow = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  justify-content: space-between;
`
const CtaUpdate= styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`
export default Privacy;
