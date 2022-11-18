import {
  Stack,
  Heading,
  Button,
  Box,
  Text,
  Textarea,
  FormControl,
  FormLabel,
  SimpleGrid,
  Radio,
} from '@chakra-ui/react';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import Select from '~/components/Form/CustomSelect';
import _ from 'lodash';
import { Form, FormikProvider, useFormik } from 'formik';
// import UploadFile from '~/components/Form/UploadFile';
import Radios from '~/components/Form/Radios';
import API from '~/apis/constants';
import { formatUrl } from '~/utils/functions';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import step4Schema from '../validationSchema/step4';
import { fillDataPreview } from '~/slices/previewInfo';
import UploadFile from '~/components/Form/UploadFile';
import MultiSelect from '~/components/Form/MultiSelect';
import useAxios from '~/hooks/useAxios';
import { EventExp } from '~/dtos/Enums/EventExp.enum';
import { fillForm } from '~/slices/register';
import FormInput from '~/components/Form/FormInput';

const Step4 = (props: StepProps) => {
  const { nextStep, previousStep } = props;
  const { primaryColor, formTextColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  // lấy kĩ năng sở trường
  let { data: strongPointList } = useAxios(
    {
      method: 'get',
      url: API.GET_STRONG_POINT,
      transformResponse: ({ data }) => data,
    },
    [],
  );

  const { data: registerPage } = useAppSelector((state) => state.registerPage);
  const { departments } = registerPage;

  // lấy nơi nhận thẻ
  const { data: receiveCardLocationList } = useAxios({
    method: 'get',
    url: formatUrl(API.GET_RECEIVE_CARD_ADDRESSES_BY_EVENT, { id: 1 }),
    transformResponse: ({ data }) => data,
  });

  const previousStepData = useAppSelector((state) => state.register.data);

  const { eventId, id, type, ctnId } = useAppSelector((state) => state.registerPage.data);
  const { strongPointIds, avatarPath, exps } = previousStepData;
  const { expDepartmentIds, wishDepartmentIds, receiveCardAddressId, note } =
    previousStepData.register;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      exps: exps || EventExp.ChuaTungThamGia,
      strongPointIds: strongPointIds || [],
      expDepartmentIds: expDepartmentIds || [],
      wishDepartmentIds: wishDepartmentIds?.[0] || '',
      receiveCardAddressId: receiveCardAddressId || '',
      avatarPath: avatarPath || '',
      note: note || '',
    },
    validationSchema: step4Schema,
    onSubmit: (values) => {
      const {
        strongPointIds,
        expDepartmentIds,
        avatarPath,
        exps,
        wishDepartmentIds,
        receiveCardAddressId,
        note,
      } = values;
      let fillData = {
        strongPointIds,
        exps,
        avatarPath,
        register: {
          ...previousStepData.register,
          expDepartmentIds,
          note,
          receiveCardAddressId,
          wishDepartmentIds: [wishDepartmentIds],
          eventId,
          eventRegistryPageId: id,
          ctnId,
          type,
        },
      };
      dispatch(fillForm(fillData));
      mapMultiTitle({
        avatarPath,
        note,
        type,
        exps,
        strongPointIds,
        expDepartmentIds,
        wishDepartmentIds,
        receiveCardAddressId,
      });
      nextStep();
    },
  });

  const mapMultiTitle = ({
    avatarPath,
    note,
    type,
    exps,
    strongPointIds,
    expDepartmentIds,
    wishDepartmentIds,
    receiveCardAddressId,
  }) => {
    function mapName(array, ids) {
      return _.map(
        _.filter(array, function (p) {
          return _.includes(ids, p.id);
        }),
        (a) => a.name,
      ).join(', ');
    }
    dispatch(
      fillDataPreview({
        note,
        type,
        avatarPath,
        exps,
        strongPointIds: mapName(strongPointList, strongPointIds),
        expDepartmentIds: mapName(departments, expDepartmentIds),
        wishDepartmentIds: mapName(departments, wishDepartmentIds),
        receiveCardAddressId: mapName(receiveCardLocationList, receiveCardAddressId),
      }),
    );
  };

  return (
    <>
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
              <Radios name='exps' label='Số lần về chùa công quả'>
                <Radio value={EventExp.ChuaTungThamGia}>Lần đầu tiên</Radio>
                <Radio value={EventExp.Duoi3Lan}>Dưới 3 lần</Radio>
                <Radio value={EventExp.Tren3Lan}>Trên 3 lần</Radio>
              </Radios>
              <MultiSelect
                name='strongPointIds'
                options={strongPointList}
                label='Kỹ năng, sở trường'
                valueField='id'
                labelField='name'
              />
              <MultiSelect
                name='expDepartmentIds'
                options={departments}
                label='Kinh nghiệm ở ban'
                valueField='id'
                labelField='name'
              />
              <Select
                name='wishDepartmentIds'
                data={departments}
                label='Nguyện vọng vào ban'
                placeholder='Chọn ban'
                isRequired
              />
              <Select
                name='receiveCardAddressId'
                data={receiveCardLocationList}
                label='Nơi nhận thẻ'
                placeholder='Chọn nơi nhận thẻ'
                isRequired
              />
              <FormControl name='avatarPath' as='fieldset' border={1}>
                <FormLabel as='legend' color={formTextColor}>
                  Hình thẻ
                </FormLabel>
                <UploadFile name='avatarPath' />
              </FormControl>
              <FormInput
                name='note'
                label='Ghi chú'
                as={Textarea}
                placeholder='Huynh đệ có thắc mắc gì không ạ?'
              />
            </Stack>
            <SimpleGrid columns={{ base: 2 }} spacing={{ base: 4, lg: 8 }} mt={8} w={'full'}>
              <Button colorScheme='gray' flexGrow={1} fontFamily={'heading'} onClick={previousStep}>
                Trở về
              </Button>
              <Button flexGrow={1} type='submit' fontFamily={'heading'}>
                Tiếp theo
              </Button>
            </SimpleGrid>
          </Form>
        </FormikProvider>
      </Box>
    </>
  );
};

export default Step4;
