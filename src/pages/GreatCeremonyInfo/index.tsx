import {
  Box,
  Container,
  Heading,
  HStack,
  SimpleGrid,
  Square,
  Stack,
  VStack,
} from '@chakra-ui/layout';
import { Button, Text, Image } from '@chakra-ui/react';
import React from 'react';
import FadeInUp from '~/components/Animation/FadeInUp';
import AboutImage from '~/assets/about.jpg';
import useCustomColorMode from '~/hooks/useColorMode';

// type Props = {};

const GreatCeremonyInfo = () => {
  const { primaryColor } = useCustomColorMode();
  return (
    <Box bgColor={'darkBlue.800'} bgSize={'cover'} px={{ base: 10, md: 20, lg: 28 }} py={10}>
      <FadeInUp>
        <Heading
          as={'h6'}
          color={primaryColor}
          lineHeight={1.6}
          fontSize={{ base: 'sm', sm: 'md', md: 'xl' }}
          textTransform='uppercase'
          borderBottom={'2px'}
          borderColor='darkBlue.100'
          mb={10}
          display='inline-block'
        >
          Thông tin đại lễ
        </Heading>
      </FadeInUp>
      <Container
        as={SimpleGrid}
        maxW={'full'}
        columns={{ base: 1, lg: 2 }}
        gridGap={{ base: 10 }}
        alignItems='start'
        px={0}
        mb={10}
      >
        <VStack align={'start'}>
          <Box mb={{ base: 4, md: 0 }}>
            <FadeInUp>
              <Heading
                color={'white'}
                textTransform={'uppercase'}
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                mb={2}
              >
                Đại lễ Phật Thành Đạo
              </Heading>
            </FadeInUp>
            <FadeInUp>
              <Text color={'white'} textAlign='justify' mb={2}>
                Theo truyền thống, hằng năm kể từ ngày mồng 6 - 8/12 âm lịch, Thiền Tôn Phật Quang
                (Núi Dinh – BRVT) trang nghiêm trọng thể tổ chức kỷ niệm ngày Đức Phật Thích Ca Mâu
                Ni Thành Đạo, với một chương trình diễn ra bao gồm nhiều hoạt động thiết thực, đã
                giúp cho Lễ hội trở nên rất ý nghĩa, trong đó, tất cả Hội chúng được dịp hoài niệm
                ghi nhớ ngày đạo Phật được khai sinh trên toàn cõi năm châu bốn bể này.
              </Text>
            </FadeInUp>
            <FadeInUp>
              <Button mt={2}>Tìm hiểu thêm</Button>
            </FadeInUp>
          </Box>
        </VStack>
        <FadeInUp>
          <Image src={AboutImage} maxW='full' rounded={'md'} objectFit={'contain'} />
        </FadeInUp>
      </Container>

      {/* CONFERENCE DATE */}
      <FadeInUp>
        <Stack
          direction={['column', 'row']}
          spacing={[5, 10, 16, 32]}
          color='white'
          rounded='md'
          justifyContent={'center'}
        >
          <VStack justifyContent='center' alignItems={['center', 'start']} spacing={5}>
            <Text
              textTransform='uppercase'
              fontWeight='bold'
              fontSize={['xl', '2xl']}
              color={primaryColor}
            >
              Thời gian diễn ra
            </Text>
            <Text textTransform='uppercase'>Số ngày còn lại</Text>
          </VStack>
          <HStack spacing={5} justifyContent='center'>
            {new Array(4).fill('00').map((time, i) => {
              const times = ['Ngày', 'Giờ', 'Phút', 'Giây'];
              return (
                <Square key={i} border='1px' size={['14', '10', '32']} p={6}>
                  <VStack spacing={[1, 2, 3, 4]}>
                    <Text fontWeight={'bold'} fontSize={['xl', '2xl', '3xl', '4xl']}>
                      {time}
                    </Text>
                    <Text>{times[i]}</Text>
                  </VStack>
                </Square>
              );
            })}
          </HStack>
        </Stack>
      </FadeInUp>
    </Box>
  );
};

export default GreatCeremonyInfo;