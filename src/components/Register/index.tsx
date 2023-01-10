import {
  Stack,
  Heading,
  Box,
  Text,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Alert,
  Divider,
  Th,
  Thead,
  AccordionItem,
} from '@chakra-ui/react';
import _ from 'lodash';
import { Card, CardBody } from '@chakra-ui/card';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { getImageSrc } from '~/utils/functions';

const TableComponent = (infos, mapTitles): JSX.Element => {
  return (
    <TableContainer>
      <Table variant='simple' colorScheme={'gray'}>
        <Tbody>
          {_.map(infos, (info, key) => {
            return (
              <Tr key={key}>
                <Td w={{ base: '120px', sm: '200px', md: '300px' }} p={0}>
                  <Text as='b' fontSize={{ base: 14, sm: 16 }}>
                    {mapTitles[key]}
                  </Text>
                </Td>
                <Td fontSize={{ base: 14, sm: 16 }}> {info}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const LeaderComponent = (leader): JSX.Element => {
  const { fullName, religiousName, avatarPath, phoneNumber } = leader;
  return (
    <AccordionItem>
      <Alert status='info'>
        <InfoOutlineIcon />
        <Heading p={2} as='h5' size='md'>
          Trưởng nhóm
        </Heading>
      </Alert>
      <Card direction={{ base: 'row' }} overflow='hidden' variant='outline' pt={5} pl={2}>
        <Image
          boxSize={{ base: '60px', sm: '70px', md: '100px' }}
          objectFit='cover'
          src={getImageSrc(avatarPath)}
          alt={fullName}
        />
        <Stack>
          <CardBody>
            <Box pl={{ base: '10px', sm: '10px', md: '30px' }}>
              <Heading size={{ base: 'sm', sm: 'md' }}>{fullName}</Heading>
              <Divider />
              <Text fontSize={{ base: '14px', sm: '16px' }}>{religiousName}</Text>
              <Text fontSize={{ base: '14px', sm: '16px' }}>{phoneNumber}</Text>
            </Box>
          </CardBody>
        </Stack>
      </Card>
    </AccordionItem>
  );
};

const OtherInfo = ({ isLeader, title, subTitle }) => {
  return (
    <AccordionItem>
      <Card direction={{ base: 'column', sm: 'column' }} overflow='hidden' pr={5}>
        <TableContainer>
          <Table variant='simple' colorScheme={'gray'} size='md'>
            <Thead>
              <Tr>
                <Th pl={1}>{isLeader ? 'Nhóm trưởng' : 'Thông tin khác'}</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td fontSize={{ base: 'xs', sm: 'md', md: 'lg' }} pl={1}>
                  {isLeader ? '' : 'Pháp danh: '} {title}
                </Td>
              </Tr>
              <Tr>
                <Td fontSize={{ base: 'xs', sm: 'md', md: 'lg' }} pl={1}>
                  {isLeader ? '' : 'Nơi tu tập: '}
                  {subTitle}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Card>
    </AccordionItem>
  );
};

export { LeaderComponent, TableComponent, OtherInfo };
