import {
  Box,
  Divider,
  Grid,
  GridItem,
  Avatar,
  Flex,
  Stack,
  Button,
  Tag,
  TagLeftIcon,
  TagLabel,
  HStack,
  Link,
} from '@chakra-ui/react';
import { Heading, Text, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Table, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { MdPhone, MdDepartureBoard, MdLocationCity, MdFacebook, MdVerified } from 'react-icons/md';
import { FaUserSecret, FaUserTie } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { formatUrl, getImageSrc, mapReceiverCardAddressDetail } from '~/utils/functions';
import API from '~/apis/constants';
import { useParams } from 'react-router-dom';
import useAxios from '~/hooks/useAxios';
import { getRegisterInfo } from '~/slices/registerInfo';
import { Gender } from '~/dtos/Enums/Gender.enum';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import { convertToAppDateTime } from '~/utils/date';
import { EDIT_REGISTER_PATH } from '~/routes';
import useCustomColorMode from '~/hooks/useColorMode';
import LoginPopup from '~/components/LoginPopup';
import { AuthContext } from '~/providers/auth';
import { ClothingSize } from '~/dtos/Enums/ClothingSize.enum';
import { get } from 'lodash';
import { CarBookingType } from '~/dtos/Enums/CarBookingType.enum';
import { PositionType } from '~/dtos/Enums/PositionType.enum';
import { EventExp } from '~/dtos/Enums/EventExp.enum';
import { nanoid } from '@reduxjs/toolkit';
// type Props = {};

const RegisterInfo = () => {
  const history = useHistory();
  const { primaryColor } = useCustomColorMode();
  const dispatch = useAppDispatch();

  const { id, shortUri } = useParams<any>();
  const {
    isOpen: isOpenLoginModal,
    onOpen: onOpenLoginModal,
    onClose: onCloseLoginModal,
  } = useDisclosure();
  const { member: authMember } = useContext(AuthContext);

  const { data } = useAppSelector((state) => state.registerInfo);
  const { registeredDays } = data || {};
  const { receiveVolunteeCert } = useAppSelector((state) => state.registerPage.data);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      getRegisterInfo({
        method: 'get',
        url: formatUrl(API.GET_REGISTER_INFO, { id }),
      }),
    );
  }, []);
  const member = data?.member;
  const note = data?.note;
  const leaderId = data?.leaderId;
  const moveType = data?.moveType?.toString();
  const returnMoveType = data?.returnMoveType?.toString();
  const organizationStructureId = member?.organizationStructureId;
  const receiveCardAddress = mapReceiverCardAddressDetail(data?.receiveCardAddress);
  const expDepartments = data?.expDepartments || [];
  const wishDepartment = data?.wishDepartment;
  const isArrived = data?.isArrived;
  const arrivedAt = data?.arrivedAt;
  const department = get(data, 'departmentDetail.department.name');
  const roles = get(data, 'departmentDetail.roles', []);
  const manager = roles.find((item) => item.position === PositionType.Manager);

  const carBookingType = data?.carBookingType?.toString();
  const clothingSize = data?.clothingSize;
  const certificateRegistry = data?.certificateRegistry;
  const companyNameEN = data?.companyNameEN;
  const companyNameVIE = data?.companyNameVIE;

  const permanent =
    member?.permanentAddress ||
    [
      [member?.permanentWard?.pre, member?.permanentWard?.name].join(' '),
      member?.permanentDistrict?.name,
      member?.permanentProvince?.name,
    ]
      .filter((e) => !!e)
      .join(', ');
  const temporary =
    member?.temporaryAddress ||
    [
      [member?.temporaryWard?.pre, member?.temporaryWard?.name].join(' '),
      member?.temporaryDistrict?.name,
      member?.temporaryProvince?.name,
    ]
      .filter((e) => !!e)
      .join(', ');

  const { data: groupData, cancel: groupToken } = useAxios(
    {
      method: 'post',
      url: formatUrl(API.GET_MEMBER_IN_GROUP, { leaderId }),
    },
    [leaderId],
  );
  if (!leaderId) {
    groupToken.cancel();
  }

  const { data: ctnInfo, cancel: ctnToken } = useAxios(
    {
      method: 'get',
      url: API.GET_CTN,
      params: { CTNGroupId: organizationStructureId },
      transformResponse: ({ data }) => data,
    },
    [organizationStructureId],
  );
  if (!organizationStructureId) {
    ctnToken.cancel();
  }

  const tableInfo = [
    { title: 'Gi???i t??nh', value: member?.gender == Gender.FEMALE ? 'N???' : 'Nam' },
    {
      title: 'N??m sinh',
      value: member?.dateOfBirth?.split('-').length ? member?.dateOfBirth.split('-')[0] : '',
    },
    { title: 'C??n c?????c', value: member?.identityCard },
    { title: '??i???n tho???i', value: member?.phoneNumber },
    { title: 'Th?? ??i???n t???', value: member?.email },
  ];

  const tableInfoRight = [
    { title: 'Ph??p Danh', value: member?.religiousName },
    {
      title: 'N??i sinh ho???t',
      value: ctnInfo?.find((ctn) => ctn.id === organizationStructureId).name,
    },
    { title: '?????a ch??? th?????ng tr??', value: permanent },
    { title: '?????a ch??? t???m tr??', value: temporary },
    { title: 'K??? n??ng', value: member?.strongPoints || [] },
  ];

  const schedule = {
    go: { address: '', time: '', flight_code: '' },
    return: {
      address: '',
      time: '',
      flight_code: '',
    },
  };

  const contactStatusMap = {
    '-1': 'H???y',
    '0': 'Ch??a li??n h???',
    '1': 'Ch??a ch???c ch???n',
    '2': 'Ch???c ch???n tham gia',
  };

  const startAddress = data.startTime?.address;
  const leaveAddress = data.leaveTime?.address;
  const contactStatus = data.contactStatus?.toString();
  if (moveType == MoveType.WithCTN) {
    schedule.go.address = startAddress?.name || startAddress?.address || '';
    schedule.go.time = data.startTime?.name || convertToAppDateTime(data.startTime?.time) || '';
  } else {
    schedule.go.time = convertToAppDateTime(data.otherStartTime) || '';
    if (moveType == MoveType.ByPlane) {
      schedule.go.flight_code = data.startPlaneCode || '';
    }
  }

  if (returnMoveType == MoveType.WithCTN) {
    schedule.return.time = data.leaveTime?.name || convertToAppDateTime(data.leaveTime?.time) || '';
    schedule.return.address = leaveAddress?.name || leaveAddress?.address || '';
  } else {
    schedule.return.time = convertToAppDateTime(data.otherLeaveTime) || '';
    if (returnMoveType == MoveType.ByPlane) {
      schedule.return.flight_code = data.returnPlaneCode || '';
    }
  }

  const groupMembers = groupData?.data || [];
  const isOwner = authMember?.register?.id === data.id;

  const handleUpdateInfo = () => {
    if (isOwner) {
      history.push(formatUrl(EDIT_REGISTER_PATH, { shortUri }));
    } else {
      onOpenLoginModal();
    }
  };
  ``;
  return (
    <Box
      pt={24}
      pb={12}
      px={{ base: '3%', sm: '18%', md: '3%', xl: '10%' }}
      backgroundImage={'radial-gradient(150% 100% at 120% 0%, #fcaf17 0%, #0c4da2 100%)'}
      backgroundSize={'auto 240px'}
      backgroundRepeat={'no-repeat'}
    >
      <Grid
        templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(12, 1fr)' }}
        pt={10}
        gap={{ base: 5, xl: 10 }}
      >
        <GridItem colSpan={{ base: 3, md: 5, lg: 4 }}>
          <Box
            w={'full'}
            h={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            py={6}
            boxShadow={'2xl'}
            rounded={'lg'}
            textAlign={'center'}
          >
            <Avatar
              size={'2xl'}
              src={getImageSrc(member?.avatarPath, 120)}
              mb={4}
              pos={'relative'}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              <Flex justify='center' gap={2}>
                {member?.fullName}{' '}
                {isArrived && (
                  <Tooltip hasArrow rounded='md' label='???? v??? ch??a'>
                    <span>
                      <MdVerified color='green' />
                    </span>
                  </Tooltip>
                )}
              </Flex>
            </Heading>
            <Text fontWeight={600} color={'gray.500'} mt={2} mb={5}>
              {member?.facebookAddress && (
                <Button
                  size='sm'
                  onClick={() => {
                    window.open(member?.facebookAddress, '_blank');
                  }}
                  leftIcon={<MdFacebook />}
                  colorScheme='facebook'
                  variant='solid'
                >
                  Facebook
                </Button>
              )}
            </Text>
            <TableContainer>
              <Table variant='simple' colorScheme={'gray'}>
                <Tbody borderTop={'1px solid var(--chakra-colors-chakra-border-color)'}>
                  {tableInfo.map((ele, idx) => (
                    <Tr key={idx}>
                      <Td pr={0} pl={{ base: 5, sm: 7, md: 5 }}>
                        <Text as='b'>{ele.title}</Text>
                      </Td>
                      <Td pl={0} pr={{ base: 5, sm: 7, md: 5 }}>
                        {ele.value}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>

            <Flex px={6} pt={5} textAlign={'center'} alignItems='center' direction='column'>
              <Text as='b' color={primaryColor}>
                T??nh tr???ng x??c nh???n
              </Text>
              <Tag mt={3} textAlign='center' colorScheme={'blue'} borderRadius='full'>
                {contactStatusMap[contactStatus ? contactStatus : 0]}
              </Tag>

              {isArrived && (
                <>
                  <Text mt={5} as='b' color={primaryColor}>
                    ???? v??? ch??a l??c
                  </Text>
                  <Tag
                    mt={3}
                    textAlign='center'
                    colorScheme={isArrived ? 'green' : 'blue'}
                    borderRadius='full'
                  >
                    {isArrived ? convertToAppDateTime(arrivedAt) : '??ang C???p Nh???t'}
                  </Tag>
                </>
              )}
              {/* <Text as='b' color={primaryColor}>
                ???????ng d???n v??o nh??m
              </Text>
              <InputGroup size='md'>
                <Input
                  colorScheme={'red'}
                  isReadOnly={true}
                  variant='filled'
                  pr='2.5rem'
                  type='text'
                  value='https://invitelink.com/abcdadfad'
                />
                <InputRightElement width='2.5rem'>
                  <IconButton size='sm' aria-label='Copy Link' icon={<MdContentCopy />} />
                </InputRightElement>
              </InputGroup> */}
            </Flex>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 7, lg: 8 }}>
          <Box
            w={'full'}
            h={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            p={6}
            rounded={'lg'}
          >
            <Stack pb={6}>
              <HStack>
                <Text w={'full'} as='b' color={primaryColor} fontSize='xl'>
                  Th??ng tin
                </Text>
                {shortUri && (
                  <Button onClick={handleUpdateInfo} size='sm'>
                    C???p nh???t
                  </Button>
                )}
                <LoginPopup
                  title={'X??c th???c th??ng tin'}
                  isOpen={isOpenLoginModal}
                  onClose={onCloseLoginModal}
                  onSuccess={() => {
                    dispatch(
                      getRegisterInfo({
                        method: 'get',
                        url: formatUrl(API.GET_REGISTER_INFO, { id }),
                      }),
                    ).then(() => {
                      history.push(
                        formatUrl(EDIT_REGISTER_PATH, { shortUri: data.eventRegistryPageId }),
                      );
                    });
                  }}
                />
              </HStack>

              <Divider borderBottomWidth={'2px'} />

              <TableContainer whiteSpace={'break-spaces'}>
                <Table variant='unstyled' size='sm'>
                  <Tbody>
                    {tableInfoRight.map((ele, idx) => (
                      <Tr key={idx}>
                        <Td minW={'120px'} px={0}>
                          <Text as='b'>{ele.title}</Text>
                        </Td>
                        <Td px={0}>
                          {Array.isArray(ele.value)
                            ? ele.value.map((item, idx2) => {
                                return (
                                  <Tag
                                    key={idx2}
                                    colorScheme={'blue'}
                                    mr={2}
                                    mb={1}
                                    borderRadius='full'
                                  >
                                    {item.name}
                                  </Tag>
                                );
                              })
                            : ele.value}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>

            <Tabs isFitted variant='enclosed'>
              <TabList>
                <Tab>Ban</Tab>
                <Tab>C??ng qu???</Tab>
                <Tab>L???ch tr??nh</Tab>
                <Tab>Kh??c</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>Tr?????ng Ban </Text>
                      <Box mt={2}>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          {manager?.religiousName || manager?.fullName || '??ang c???p nh???t'}
                        </Tag>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          <TagLeftIcon boxSize='12px' as={MdPhone} />
                          {manager?.phoneNumber ? (
                            <Link href={`tel:${manager?.phoneNumber}`}>{manager?.phoneNumber}</Link>
                          ) : (
                            '??ang c???p nh???t'
                          )}
                        </Tag>
                      </Box>
                    </Box>

                    <Box>
                      <Text as='b'>Ban ???? ???????c ph??n </Text>
                      <Box mt={2}>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          {department || '??ang c???p nh???t'}
                        </Tag>
                      </Box>
                    </Box>
                    <Box>
                      <Text as='b'>Kinh nghi???m l??m vi???c t???i c??c ban</Text>
                      <Box mt={2}>
                        {expDepartments.map((ele, idx) => (
                          <Tag key={idx} colorScheme={'blue'} mr={2} mb={1} borderRadius='full'>
                            {ele.name}
                          </Tag>
                        ))}
                      </Box>
                    </Box>
                    <Box>
                      <Text as='b'>Nguy???n v???ng l??m vi???c t???i ban</Text>
                      <Box mt={2}>
                        {wishDepartment && (
                          <Tag colorScheme={'pink'} mr={2} mb={1} borderRadius='full'>
                            {wishDepartment.name}
                          </Tag>
                        )}
                      </Box>
                    </Box>
                  </Stack>
                </TabPanel>

                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>S??? l???n ???? v??? ch??a</Text>
                      <Box mt={2}>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          {EventExp.toString(member?.exps + '')}
                        </Tag>
                      </Box>
                    </Box>
                    {!!registeredDays?.length && (
                      <Box>
                        <Text as='b'>Ng??y c??ng qu??? t???i ch??a</Text>
                        <Flex flexWrap='wrap' gap={2} mt={2}>
                          {registeredDays?.map((day) => (
                            <Tag
                              key={nanoid()}
                              colorScheme={[
                                'blue',
                                'cyan',
                                'green',
                                'orange',
                                'pink',
                                'purple',
                                'teal',
                              ].at(registeredDays?.indexOf?.(day) % 7 || 0)}
                            >
                              {day.name}
                            </Tag>
                          ))}
                        </Flex>
                      </Box>
                    )}
                    {receiveCardAddress && (
                      <Box mt='2'>
                        <Text as='b'>N??i nh???n th???</Text>{' '}
                        {receiveCardAddress && <Text>{receiveCardAddress.name}</Text>}
                      </Box>
                    )}
                    {clothingSize && (
                      <Box mt='2'>
                        <Text as='b'>Size ??o</Text>{' '}
                        <Tag colorScheme={'pink'} mr={2} mb={1} borderRadius='full'>
                          {ClothingSize.toString(clothingSize)}
                        </Tag>
                      </Box>
                    )}
                  </Stack>
                </TabPanel>

                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>V??? ch??a</Text>
                      <Box mt='2'>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          {MoveType.toString(moveType)}
                        </Tag>
                      </Box>
                    </Box>
                    <Box>
                      <HStack>
                        <MdLocationCity />
                        <Text as='b'>N??i xu???t ph??t</Text>
                      </HStack>
                      <Text>{schedule && schedule?.go.address}</Text>
                    </Box>
                    <Box>
                      <HStack>
                        <MdDepartureBoard />
                        <Text as='b'>Th???i gian xu???t ph??t</Text>
                      </HStack>
                      <Box mt={2}>
                        <Tag mr={2} mb={1} colorScheme={'blue'}>
                          {schedule && schedule.go.time}
                        </Tag>
                        {moveType == MoveType.ByPlane && schedule && schedule.go.flight_code && (
                          <Tag mr={2} mb={1} colorScheme={'blue'}>
                            M?? chuy???n bay: {schedule.go.flight_code}
                          </Tag>
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <Text as='b'>V??? l???i ?????a ph????ng</Text>
                      <Box mt='2'>
                        <Tag colorScheme={'green'} mr={2} mb={1} borderRadius='full'>
                          {MoveType.toString(returnMoveType)}
                        </Tag>
                      </Box>
                    </Box>

                    <Box>
                      <HStack>
                        <MdDepartureBoard />
                        <Text as='b'>Th???i gian tr??? v???</Text>
                      </HStack>
                      <Box mt={2}>
                        <Tag mr={2} mb={1} colorScheme={'pink'}>
                          {schedule && schedule.return.time}
                        </Tag>
                        {returnMoveType == MoveType.ByPlane &&
                          schedule &&
                          schedule.return.flight_code && (
                            <Tag mr={2} mb={1} colorScheme={'pink'}>
                              M?? chuy???n bay: {schedule.return.flight_code}
                            </Tag>
                          )}
                      </Box>
                    </Box>
                    {schedule.return.address && returnMoveType == MoveType.WithCTN && (
                      <>
                        <Box>
                          <HStack>
                            <MdLocationCity />
                            <Text as='b'>{MoveType.toString(returnMoveType)}</Text>
                          </HStack>
                          <Text>{schedule && schedule.return.address}</Text>
                        </Box>
                      </>
                    )}

                    {(moveType == MoveType.ByPlane || returnMoveType == MoveType.ByPlane) && (
                      <Box>
                        <HStack>
                          <MdDepartureBoard />
                          <Text as='b'>????ng k?? ?? t??</Text>
                        </HStack>
                        {carBookingType && (
                          <Tag mt={2} mr={2} mb={1} colorScheme={'green'}>
                            {CarBookingType.toString(carBookingType)}
                          </Tag>
                        )}
                      </Box>
                    )}
                  </Stack>
                </TabPanel>

                <TabPanel px={0}>
                  <Stack spacing='30px'>
                    <Box>
                      <Text as='b'>Th??nh vi??n nh??m</Text>
                      {groupMembers?.length === 0 ? (
                        <Box mt='2'>
                          <Tag mr={2} mb={1} colorScheme={'blue'}>
                            Ch??a c?? nh??m
                          </Tag>
                        </Box>
                      ) : (
                        <TableContainer whiteSpace={'break-spaces'} maxW={'400px'}>
                          <Table variant='unstyled' size='sm'>
                            <Tbody>
                              {groupMembers &&
                                groupMembers.length &&
                                groupMembers.map((ele, idx) => (
                                  <Tr key={idx}>
                                    <Td py={1} px={0}>
                                      <Text>{ele?.religiousName || ele?.fullName}</Text>
                                    </Td>
                                    <Td>
                                      {ele.role == 1 && (
                                        <Tooltip label='Tr?????ng nh??m'>
                                          <span>
                                            <FaUserSecret />
                                          </span>
                                        </Tooltip>
                                      )}
                                      {ele.role == 2 && (
                                        <Tooltip label='Ph?? nh??m'>
                                          <span>
                                            <FaUserTie />
                                          </span>
                                        </Tooltip>
                                      )}
                                    </Td>
                                    <Td py={1} px={0}>
                                      <Tag colorScheme={'blue'}>
                                        <TagLeftIcon boxSize='12px' as={MdPhone} />
                                        <TagLabel>{ele.phoneNumber}</TagLabel>
                                      </Tag>
                                    </Td>
                                  </Tr>
                                ))}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      )}
                    </Box>

                    {receiveVolunteeCert && (
                      <Box>
                        <Text as='b'>????ng K?? Nh???n Gi???y Ch???ng Nh???n TNV</Text>
                        <Box mt='2'>
                          <Tag mr={2} mb={1} colorScheme={certificateRegistry ? 'green' : 'pink'}>
                            {certificateRegistry ? 'C??' : 'Kh??ng'}
                          </Tag>
                        </Box>
                      </Box>
                    )}
                    {certificateRegistry && (
                      <Box>
                        <Text as='b'>T??n tr?????ng ho???c n??i c??ng t??c</Text>
                        <Box mt='2'>
                          <Tag mr={2} mb={1} colorScheme={'blue'}>
                            Ti???ng Vi???t: {companyNameVIE}
                          </Tag>

                          {companyNameEN && (
                            <Box mt='2'>
                              <Tag mr={2} mb={1} colorScheme={'blue'}>
                                Ti???ng Anh: {companyNameEN}
                              </Tag>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    )}

                    <Box>
                      <Text as='b'>Ghi ch??</Text>
                      <Text>{note}</Text>
                    </Box>
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default RegisterInfo;
