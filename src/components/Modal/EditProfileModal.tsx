import React, { useState } from 'react'
import Modal from './index'
import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'

interface EditProfileModalProps {
  isOpen: boolean
  onDismiss: () => void
}

const EditProfileModal = ({ isOpen, onDismiss }: EditProfileModalProps) => {
  const methods = useForm()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      alias: '',
      phoneNumber: '',
      name: '',
      emoji: '',
      status: '',
      image: ''
    }
  })
  const [error, setError] = useState<string | undefined>(undefined)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} title={'Edit Profile'}>
      <FormProvider {...methods}>
        <form onSubmit={(e) => e.preventDefault()} noValidate autoComplete="off" className="container">
          <NormalInput
            autoComplete="off"
            placeholder="Name..."
            type="text"
            {...register('name', { required: true, minLength: 5, maxLength: 30 })}
          />
          <NormalInput
            autoComplete="off"
            placeholder="Alias..."
            type="text"
            {...register('alias', { required: true, minLength: 5, maxLength: 30 })}
          />
          <ButtonSubmit onClick={onSubmit} type={'submit'}>
            Edit
          </ButtonSubmit>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      </FormProvider>
    </Modal>
  )
}

export default EditProfileModal

const NormalInput = styled.input`
  width: 100%;
`

const ButtonSubmit = styled.button`
  width: 100%;
`

const ErrorMessage = styled.p`
  color: red;
`
