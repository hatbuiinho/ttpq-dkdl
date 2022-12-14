import { Stack, Heading, Button, Box, Text, Radio, SimpleGrid, Tag } from '@chakra-ui/react';
import _ from 'lodash';
import useCustomColorMode from '~/hooks/useColorMode';
import { StepProps } from '..';
import { Form, FormikProvider, useFormik } from 'formik';
import Radios from '~/components/Form/Radios';
import { fillDataPreview } from '~/slices/previewInfo';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { useEffect, useState } from 'react';
import { fillForm } from '../../../slices/register';
import step3Schema from '../validationSchema/step3_2';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import DateTimePicker from '~/components/Form/DatePicker';
import { LeaveTimeDto } from '~/dtos/TimeToLeaves/LeaveTimeDto.model';
import { StartTimeDto } from '~/dtos/StartTimes/StartTimeDto.model';
import { useRouteMatch } from 'react-router-dom';
import { convertToAppDateTime } from '~/utils/date';
import { StartAddressDto } from '~/dtos/Addresses/StartAddressDto.model';
import { LeaveAddressDto } from '~/dtos/LeaveAddresses/LeaveAddressDto.model';
import FadeInUp from '~/components/Animation/FadeInUp';
import { CarBookingType } from '~/dtos/Enums/CarBookingType.enum';
import OurSelect from '~/components/Form/MultiSelect';

type Time = StartTimeDto | LeaveTimeDto;
const mappingTime = (times: Time[]) => {
  if (!times) return [];
  return times.map((t) => {
    const { time, name } = t || {};
    return { ...t, name: `${name}, ${convertToAppDateTime(time)}` };
  });
};
type Address = StartAddressDto | LeaveAddressDto;
const mappingAddress = (addresses: Address[] | undefined) => {
  if (!addresses) return [];
  return addresses.map((addr) => {
    const { address, name } = addr || {};
    return { ...addr, name: `${name}, ${address}` };
  });
};

const Step3 = (props: StepProps) => {
  const { path } = useRouteMatch();
  const { nextStep, previousStep } = props;
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();
  const { data: registerPage } = useAppSelector((state) => state.registerPage);
  const { leaveAddresses, startAddresses, canMoveByPlane } = registerPage;

  const { register } = useAppSelector((state) => state.register.data);
  const {
    returnMoveType: editMoveType,
    leaveTimeId: editLeaveTimeId,
    otherLeaveAddress: editOtherLeaveAddress,
    otherLeaveTime: editOtherLeaveTime,
    returnPlaneCode: editReturnPlaneCode,
    leaveTime,
    //th??m field
    carBookingType: editCarBookingType,
  } = useAppSelector((state) => state.registerInfo.data);
  const { addressId: editLeaveAddressId } = leaveTime || {};
  const {
    returnMoveType: moveTypeInStore,
    leaveAddressId: leaveAddressIdInStore = '',

    leaveTimeId: leaveTimeIdInStore = '',

    returnPlaneCode = '',
    otherLeaveTime = '',
    otherLeaveAddress = '',
    // th??m field
    carBookingType: carBookingTypeInStore,
  } = register || {};

  const hasLeaveAddress = !!leaveAddresses?.length;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      returnMoveType:
        moveTypeInStore ||
        (!!editMoveType && editMoveType + '') ||
        (hasLeaveAddress ? MoveType.WithCTN : canMoveByPlane && MoveType.ByPlane) ||
        MoveType.Other,

      leaveAddressId: leaveAddressIdInStore || editLeaveAddressId,
      leaveTimeId: leaveTimeIdInStore || editLeaveTimeId,

      otherLeaveAddress: otherLeaveAddress || editOtherLeaveAddress,
      otherLeaveTime: otherLeaveTime || editOtherLeaveTime,
      returnPlaneCode: returnPlaneCode || editReturnPlaneCode,
      // th??m field
      carBookingType:
        carBookingTypeInStore ||
        (editCarBookingType ? editCarBookingType + '' : CarBookingType.Both),
    },
    validationSchema: step3Schema,
    onSubmit: (values) => {
      if (returnMoveType != MoveType.WithCTN) {
        // m??y bay
        values.leaveAddressId = undefined;
        values.leaveTimeId = undefined;

        if (returnMoveType == MoveType.Other) {
          // t??? t??c
          values.returnPlaneCode = '';
          // th??m field
          values.carBookingType = '';
        }
      } else {
        // with CTN
        values.otherLeaveAddress = '';
        values.otherLeaveTime = '';
        values.returnPlaneCode = '';
        // th??m field
        values.carBookingType = '';
      }
      dispatch(
        fillForm({
          register: { ...register, ...values },
        }),
      );
      mapTitle(values);
      nextStep();
    },
  });

  const { returnMoveType } = formik.values;

  // th???i gian kh???i h??nh theo ?????a ??i???m xu???t ph??t
  const { leaveAddressId } = formik.values;

  const [leaveTimes, setLeaveTimes] = useState<(LeaveTimeDto | undefined)[] | never[]>();

  useEffect(() => {
    const times = leaveAddresses
      ?.map((address) => {
        const newAddress = { ...address } as LeaveAddressDto;
        newAddress.times = address.times?.map((time) => {
          const newTime = { ...time };
          newTime.name = `${time.name} t???i ${address.name}`;
          return newTime;
        });
        return newAddress || [];
      })
      .flatMap((address) => address.times)
      .sort((t1, t2) => new Date(t1?.time || '').getTime() - new Date(t2?.time || '').getTime());
    setLeaveTimes(times);
  }, [leaveAddresses]);

  useEffect(() => {
    formik.setTouched({});
  }, [returnMoveType]);

  const mapTitle = (values) => {
    function filterTitle(array, id) {
      return _.get(
        _.find(array, (a) => a.id == id),
        'name',
        '',
      );
    }
    dispatch(
      fillDataPreview({
        ...values,
        leaveAddressId: `${filterTitle(leaveAddresses, values.leaveAddressId)}`,
        leaveTimeId: `${filterTitle(leaveTimes, values.leaveTimeId)}`,
      }),
    );
  };

  return (
    <FadeInUp delay={0}>
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          L???ch tr??nh
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          PL.2565 - DL.2022
        </Text>
      </Stack>
      <Box mt={10}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <Radios label='V??? l???i ?????a ph????ng' name='returnMoveType'>
                {hasLeaveAddress && (
                  <Radio value={MoveType.WithCTN}>{MoveType.toString(MoveType.WithCTN)}</Radio>
                )}
                {canMoveByPlane && (
                  <Radio value={MoveType.ByPlane}>{MoveType.toString(MoveType.ByPlane)}</Radio>
                )}
                <Radio value={MoveType.Other}>{MoveType.toString(MoveType.Other)}</Radio>
              </Radios>
              {returnMoveType == MoveType.WithCTN && hasLeaveAddress && (
                // WithCTN
                <>
                  {/* <OurSelect
                    name='leaveAddressId'
                    options={leaveAddresses}
                    label='?????a ??i???m tr??? v???'
                    placeholder='?????a ??i???m tr??? v???'
                    optionValue='id'
                    optionLabel='name'
                    onChange={() => {
                      formik.setFieldValue('leaveTimeId', '');
                    }}
                  /> */}
                  <OurSelect
                    name='leaveTimeId'
                    options={leaveTimes}
                    label='Th???i gian tr??? v???'
                    placeholder='Th???i gian tr??? v???'
                    optionValue='id'
                    optionLabel='name'
                    isRequired
                  />
                </>
              )}
              {returnMoveType !== MoveType.WithCTN && (
                // t???nh kh??c and t??? t??c
                <>
                  {/* <FloatingLabel name='otherLeaveAddress' label='N??i tr??? v???' /> */}
                  <DateTimePicker
                    name='otherLeaveTime'
                    label={returnMoveType === MoveType.ByPlane ? 'Ng??y gi??? bay v???' : 'Ng??y gi??? v???'}
                    isRequired
                  />
                  {canMoveByPlane && returnMoveType === MoveType.ByPlane && (
                    <>
                      <FloatingLabel name='returnPlaneCode' label='M?? chuy???n bay - Gi??? bay v???' />
                      {/* th??m field */}
                      <Radios
                        spacing={2}
                        direction='column'
                        label={
                          <Text>
                            ????ng k?? ?? t?? <Tag>H?? th?? k?? s??? x???p xe cho H?? n???u ????? s??? l?????ng ???</Tag>
                          </Text>
                        }
                        name='carBookingType'
                      >
                        <Radio value={CarBookingType.Both}>C??? 2 chi???u</Radio>
                        <Radio value={CarBookingType.Go}>Chi???u ??i (T??? T??n S??n Nh???t v??? Ch??a)</Radio>
                        <Radio value={CarBookingType.Return}>
                          Chi???u v??? (T??? ch??a ra T??n S??n Nh???t)
                        </Radio>
                        <Radio value={CarBookingType.ByYourSelf}>T??? t??c</Radio>
                      </Radios>
                    </>
                  )}
                </>
              )}
            </Stack>
            <SimpleGrid columns={{ base: 2 }} spacing={{ base: 4, lg: 8 }} mt={8} w={'full'}>
              <Button
                colorScheme='gray'
                flexGrow={1}
                fontFamily={'heading'}
                onClick={() => previousStep()}
              >
                Tr??? v???
              </Button>
              <Button flexGrow={1} type='submit' fontFamily={'heading'}>
                Ti???p theo
              </Button>
            </SimpleGrid>
          </Form>
        </FormikProvider>
      </Box>
    </FadeInUp>
  );
};

export default Step3;
