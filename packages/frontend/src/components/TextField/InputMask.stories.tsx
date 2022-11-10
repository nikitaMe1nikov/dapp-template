import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import TextMaskInput from './InputMask'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from 'components/Button'

export const Inputs: Story = () => {
  const initialValues = {
    text: '',
  }

  const validationSchema = Yup.object({
    text: Yup.string().required('Text is required'),
  })

  const { handleSubmit, values, touched, errors, handleBlur, handleChange } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => console.log('done'),
  })

  return (
    <form onSubmit={handleSubmit}>
      <TextMaskInput
        value={values.text}
        onChange={handleChange}
        onBlur={handleBlur}
        name='text'
        fullWidth
        label='text'
        error={Boolean(touched.text && errors.text)}
        helperText={touched.text && errors.text}
        mask={Number}
        max={10_000}
        scale={4}
      />
      <Button type='submit'>Submit</Button>
    </form>
  )
}

export default {
  title: 'Components/Inputs/InputMask',
}
