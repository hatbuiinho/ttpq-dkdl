import {
  Stack,
  Heading,
  Button,
  Box,
  Text,
  Textarea,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import React from 'react';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import * as Yup from 'yup';
import Select from '~/components/Form/CustomSelect';
import { Form, FormikProvider, useFormik } from 'formik';

// số lần công quả
const numberOfServingList = [
  { id: 0, name: 'Chưa có' },
  { id: 1, name: '1 lần' },
  { id: 2, name: '2 lần' },
  { id: 3, name: '3 lần' },
  { id: 4, name: 'Trên 3 lần' },
];

// danh sách ban
const departmentList = [
  { id: 0, code: 'chuaco', name: 'Chưa có' },
  { id: 1, code: 'BV', name: 'bảo vệ' },
  { id: 2, code: 'HD1', name: 'hanh duong 1' },
  { id: 3, code: 'HD2', name: 'hanh duong 2' },
];

// kỹ năng
const skillList = [
  { id: 0, code: 'Chưa có', name: 'Chưa có' },
  { id: 1, code: 'Cắm hoa', name: 'Cắm hoa' },
  { id: 2, code: 'Cắt tỉa trang trí món', name: 'Cắt tỉa trang trí món' },
  { id: 3, code: 'Chưng trái cây nghệ thuật', name: 'Chưng trái cây nghệ thuật' },
  { id: 4, code: 'Cơ khí', name: 'Cơ khí' },
  { id: 5, code: 'Cắt may cơ bản', name: 'Cắt may cơ bản' },
  { id: 6, code: 'Ngoại ngữ', name: 'Ngoại ngữ' },
];

// nơi nhận thẻ
const receiveCardLocationList = [
  {
    id: 1,
    code: 'HCMXL',
    name: '18h00 - 19h30, Thứ Tư (03/08/2022), Chùa Xá Lợi, 89 Bà Huyện Thanh Quan, P.7, Q.3',
  },
  {
    id: 2,
    code: 'HCMNL',
    name: '18h00 - 19h30, Thứ Năm (04/08/2021), Chùa Định Phước Di Đà, Gần khu chợ nhỏ ĐH. Nông Lâm, Q.Thủ Đức',
  },
  {
    id: 3,
    code: 'HCMBDT',
    name: '9h00 – 19h00, Thứ Sáu, Thứ Bảy, Chủ Nhật, Thứ Hai (05/08 - 08/08/2022) tại 47/96 Bùi Đình Túy - Q.Bình Thạnh',
  },
  { id: 999, code: 'BD', name: 'Gửi bưu điện' },
];

const Step4 = (props: StepProps) => {
  const { nextStep } = props;
  const { bgColor, primaryColor, formTextColor } = useCustomColorMode();
  const formik = useFormik({
    initialValues: {
      numberOfServing: '',
      skill: '',
      experienceDept: '',
      aspirationDept: '',
      receiveCardLocation: '',
      note: '',
    },
    validationSchema: Yup.object({
      numberOfServing: Yup.string().required('Xin hãy chọn số lần về chùa công quả'),
      skill: Yup.string().required('Xin hãy chọn kỹ năng, sở trường'),
      experienceDept: Yup.string().required('Xin hãy chọn ban có kinh nghiệm'),
      aspirationDept: Yup.string().required('Xin hãy chọn ban muốn tham gia'),
      receiveCardLocation: Yup.string().required('Xin hãy chọn nơi muốn nhận thẻ'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      nextStep();
    },
  });

  return (
    <Stack
      bg={bgColor}
      rounded={'xl'}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: 'lg' }}
      mx={{ base: 10, md: 20 }}
    >
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          Công việc
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          PL.2565 - DL.2022
        </Text>
      </Stack>
      <Box mt={10}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <Select
                name='numberOfServing'
                data={numberOfServingList}
                label='Số lần về chùa công quả'
                placeholder='Chọn số lần về chùa công quả'
                isRequired
              />
              <Select
                name='skill'
                data={skillList}
                label='Kỹ năng, sở trường'
                placeholder='Chọn kỹ năng, sở trường'
                isRequired
              />
              <Select
                name='experienceDept'
                data={departmentList}
                label='Kinh nghiệm ở ban'
                placeholder='Chọn ban'
                isRequired
              />
              <Select
                name='aspirationDept'
                data={departmentList}
                label='Nguyện vọng vào ban'
                placeholder='Chọn ban'
                isRequired
              />
              <Select
                name='receiveCardLocation'
                data={receiveCardLocationList}
                label='Nơi nhận thẻ'
                placeholder='Chọn nơi nhận thẻ'
                isRequired
              />
              <FormControl name='avatar' as='fieldset' border={1}>
                <FormLabel as='legend' color={formTextColor}>
                  Hình thẻ
                </FormLabel>
                thẻ
              </FormControl>
              <FormControl name='note' as='fieldset' border={1}>
                <FormLabel as='legend' color={formTextColor}>
                  Ghi chú
                </FormLabel>
                <Textarea placeholder='Huynh đệ có thắc mắc gì không ạ?' size='sm' />
              </FormControl>
            </Stack>
            <Button type='submit' fontFamily={'heading'} mt={8} w={'full'}>
              Tiếp theo
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </Stack>
  );
};

export default Step4;
