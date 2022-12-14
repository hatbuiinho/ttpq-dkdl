import { Box, Button, Heading, Radio, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react';
import FadeInUp from '~/components/Animation/FadeInUp';
import FloatingLabel from '~/components/Form/FloatingLabel/FloatingLabel';
import Radios from '~/components/Form/Radios';
import { CertificateRegistry } from '~/dtos/Enums/CertificateRegistry.enum';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import useCustomColorMode from '~/hooks/useColorMode';
import { fillDataPreview } from '~/slices/previewInfo';
import { StepProps } from '..';
import { fillForm } from '../../../slices/register';
import step5Schema from '../validationSchema/step5';

function Step5(props: StepProps) {
  const { nextStep, previousStep } = props;
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  const { register: previousStepData } = useAppSelector((state) => state.register.data);
  const {
    certificateRegistry: certificateRegistryInStore,
    companyNameVIE: companyNameVIEInStore,
    companyNameEN: companyNameENInStore,
  } = previousStepData || {};

  const {
    certificateRegistry: editCertificateRegistry,
    companyNameVIE: editCompanyNameVIE = '',
    companyNameEN: editCompanyNameEN = '',
  } = useAppSelector((state) => state.registerInfo.data);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      certificateRegistry:
        (certificateRegistryInStore != undefined &&
          CertificateRegistry.toEnum(certificateRegistryInStore)) ||
        (editCertificateRegistry != undefined &&
          CertificateRegistry.toEnum(editCertificateRegistry)) ||
        CertificateRegistry.YES,
      companyNameVIE: companyNameVIEInStore || editCompanyNameVIE,
      companyNameEN: companyNameENInStore || editCompanyNameEN,
    },
    validationSchema: step5Schema,
    onSubmit: (values) => {
      const { certificateRegistry } = values;
      let { companyNameVIE, companyNameEN } = values;

      if (certificateRegistry == CertificateRegistry.NO) {
        companyNameVIE = '';
        companyNameEN = '';
      }

      const certRegBool = CertificateRegistry.toBoolean(certificateRegistry);
      const fillData = {
        register: {
          ...previousStepData,
          certificateRegistry: certRegBool,
          companyNameVIE,
          companyNameEN,
        },
      };
      dispatch(fillForm(fillData));

      dispatch(
        fillDataPreview({
          certificateRegistry: certRegBool,
          companyNameVIE,
          companyNameEN,
        }),
      );
      nextStep();
    },
  });

  const { certificateRegistry } = formik.values;

  return (
    <FadeInUp delay={0}>
      <Stack spacing={4}>
        <Heading
          color={primaryColor}
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          ????ng K?? Nh???n Gi???y Ch???ng Nh???n T??nh Nguy???n Vi??n
        </Heading>
        {/* <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          Ch??a c?? c???p gi???y ch???ng nh???n cho H?? v??? ch??a c??ng qu??? c??c d???p l??? ???. H?? l?? sinh vi??n, chu???n
          b??? ??i xin vi???c, ho???c c?? nhu c???u l???y gi???y ch???ng nh???n th?? H?? ????ng k?? b??n d?????i nh?? ???.
        </Text> */}
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          Th???i gian nh???n gi???y ch???ng nh???n l?? 12h00 - 15h00 Th??? 6 ng??y 30/12/2022 t???i b??n Nh??n S??? ?????i
          L??? (S??n c??? g???n ph??ng B???o v??? - TTPQ)
        </Text>
      </Stack>
      <Box mt={10}>
        <FormikProvider value={formik}>
          <Form noValidate>
            <Stack spacing={4}>
              <Radios
                name='certificateRegistry'
                label='H?? c?? mu???n l???y gi???y ch???ng nh???n kh??ng ????'
                isRequired
              >
                <Radio value={CertificateRegistry.YES}>C??</Radio>
                <Radio value={CertificateRegistry.NO}>Kh??ng</Radio>
              </Radios>
              {certificateRegistry === CertificateRegistry.YES && (
                <>
                  <Text>T??n tr?????ng ho???c n??i c??ng t??c</Text>
                  <FloatingLabel name='companyNameVIE' label='Ti???ng Vi???t' isRequired />
                  <FloatingLabel name='companyNameEN' label='Ti???ng Anh' />
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
}

export default Step5;
