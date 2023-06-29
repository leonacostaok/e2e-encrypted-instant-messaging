import React from 'react';
import styled from "styled-components";
import {useFormik} from "formik";
import MediaUpload from "../../MediaUpload";
import {FormGroup, FormLabel} from "../../FormGroup";
import FormInput from "../../FormInput";
import {ButtonPrimary, ButtonSecondary} from "../../Button";
import {useCreateGroup} from "../../../hooks/useCreateGroup";
import {TextSmall} from "../../Typhography";

const FormCreateGroup = () => {
  const {count} = useCreateGroup()
  const formikCreateGroup = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatarGroup:'',
      groupName: '',
      detail: '',
    },
    onSubmit: (values => {
      console.log(values)
    })
  })
  const {values,handleChange,handleSubmit,handleReset,setFieldValue} = formikCreateGroup
  return (
    <FormCreateGroupBox>
      {
        count !== 0 &&  <TextSelected>{count} contact(s) selected</TextSelected>
      }
      <FormBox onSubmit={handleSubmit}>
        <FormAvatar>
          <MediaUpload nameInput={'avatarGroup'} setFieldValue={setFieldValue} initialSrc={values.avatarGroup ?? ''}/>
        </FormAvatar>
        <FormWrap>
          <FormGroup>
            <FormLabel>Group name</FormLabel>
            <FormInput
              placeholder={'What should we call you?'}
              id={'groupName'}
              name={'groupName'}
              value={values.groupName || ''}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Detail</FormLabel>
            <FormInput
              placeholder={'How you feeling?'}
              id={'detail'}
              name={'detail'}
              value={values.detail || ''}
              onChange={handleChange}
            />
          </FormGroup>
        </FormWrap>
        <FormCtaGroup>
          <ButtonPrimary onClick={handleReset}>
            Cancel
          </ButtonPrimary>
          <ButtonSecondary>
            Create
          </ButtonSecondary>
        </FormCtaGroup>
      </FormBox>
    </FormCreateGroupBox>
  );
};
const FormCreateGroupBox = styled.div``
const FormBox = styled.form`
  width: 100%;
  padding: 24px 16px;
`
const FormAvatar = styled.div`
  ${({theme}) => theme.flexRowCenterVertical};
  gap: 16px;
  margin-bottom: 24px;
`
const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const FormCtaGroup = styled.div`
  margin-top: 20px;
  ${({theme}) => theme.flexRowCenterVertical};
  justify-content: flex-end;
  gap: 10px;
`

const TextSelected = styled(TextSmall)`
  letter-spacing: 0.1px;
  color: ${({theme}) => theme.mainLightTheme};
  padding: 0 16px;
`
export default FormCreateGroup;
