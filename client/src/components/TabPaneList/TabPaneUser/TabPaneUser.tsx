import React, {useEffect, useState} from 'react';
import HeaderSection from "../../HeaderSection";
import {DividerTab, TabPaneWrapper} from "../commonStyle";
import {FormikValues, useFormik} from "formik";
import styled from "styled-components";
import FormInput from "../../FormInput";
import {FormLabel,FormGroup} from "../../FormGroup";
import {ButtonPrimary, ButtonSecondary} from "../../Button";
import * as Yup from 'yup'
import {ErrorText} from "../../Typhography";
import MediaUpload from "../../MediaUpload";
import axios from "axios";
import {UserType} from "../../../types/user.type";
import HTTP_STATUS_FE from "../../../constants/httpStatus";
import {BaseURL} from "../../../constants/baseURL";
const TabPaneUser = () => {
  const [user,setUser] = useState<UserType | undefined>(undefined)
  const formikUser = useFormik({
    enableReinitialize: true,
    initialValues: {
      image:user?.image ? user.image : '',
      name: user?.name ? user.name : '',
      status: user?.status ? user.status : '',
      phoneNumber:user?.phoneNumber ? user.phoneNumber : '',
      alias: user?.alias ? user.alias : ''
    },
    validationSchema:Yup.object().shape({
      phoneNumber: Yup.string()
        .matches(
          /\+?(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)?\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/,
          'Enter a valid phone number'
        ),
      alias: Yup
        .string()
        .matches(
          /^(?=[a-zA-Z0-9_-]*$)/,
          'Alias should not space',
        )
    }),
    onSubmit: ((values:FormikValues) => {
      const {image,name,status,phoneNumber,alias} = values;
      if(!user){
        return
      }
      (async () => {
        try{
          let linkAvatar = undefined
          if(image !== ''){
            // const bodyFormData = new FormData();
            // bodyFormData.append('image', image);
            const resultAvatar = await axios.post(`${BaseURL}/medias/upload-image`,{image:image},{
              headers:{
                "Content-Type":'multipart/form-data'
              }
            })
            linkAvatar = resultAvatar.data.result[0]
          }
          const objFk = linkAvatar ? {
              name,
              status,
              phoneNumber,
              alias,
              image:linkAvatar
            }:{
            name,
            status,
            phoneNumber,
            alias
          }
          for (const [key, value] of Object.entries(objFk)) {
            if(value === (user as any)[key] || value === ''){
              delete (objFk as any)[key]
            }
          }
          const res = await axios.patch(`http://localhost:9876/user/update-user`,{
            id:1,
            ...objFk,
          },{
            headers: {
              'Content-Type': 'application/json',
            }
          })
          console.log(res,'res')
        }catch (e) {
          console.log('Update information error',e)
        }
      })()
    })
  })
  const {values,handleChange,handleSubmit,handleReset,errors,setFieldValue} = formikUser
  useEffect(() => {
    (async () => {
      try{
        const response = await axios.get(`${BaseURL}/user/1`)
        const data = response.data
        const {status} = data
        if(status === HTTP_STATUS_FE.OK){
          setUser(data.user)
        }
      }catch (e:any){
        console.log('Error')
      }
    })()
  },[])
  return (
    <TabPaneWrapper>
      <HeaderSection title={'Profile'}/>
      <DividerTab/>
      <FormUser onSubmit={handleSubmit}>
        <FormAvatar>
          <MediaUpload nameInput={'image'} setFieldValue={setFieldValue} initialSrc={values.image ?? ''}/>
        </FormAvatar>
        <FormWrap>
          <FormGroup>
            <FormLabel>Public name</FormLabel>
            <FormInput
              placeholder={'What should we call you?'}
              id={'name'}
              name={'name'}
              value={values.name || ''}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Status</FormLabel>
            <FormInput
              placeholder={'How you feeling?'}
              id={'status'}
              name={'status'}
              value={values.status || ''}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Phone number</FormLabel>
            <FormInput
              placeholder={'Wanna share your phone?'}
              id={'phoneNumber'}
              name={'phoneNumber'}
              value={values.phoneNumber || ''}
              onChange={handleChange}
            />
            {errors.phoneNumber && values.phoneNumber && (
              <ErrorText> {errors.phoneNumber} </ErrorText>
            )}
          </FormGroup>
          <FormGroup>
            <FormLabel>Alias</FormLabel>
            <FormInput
              placeholder={'How should we find you?'}
              id={'alias'}
              name={'alias'}
              value={values.alias || ''}
              onChange={handleChange}
            />
            {errors.alias && values.alias && (
              <ErrorText> {errors.alias} </ErrorText>
            )}
          </FormGroup>
        </FormWrap>
        <FormCtaGroup>
          <ButtonPrimary onClick={handleReset}>
            Cancel
          </ButtonPrimary>
          <ButtonSecondary>
            Update
          </ButtonSecondary>
        </FormCtaGroup>
      </FormUser>
    </TabPaneWrapper>
  );
};
const FormUser = styled.form`
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

export default TabPaneUser;
