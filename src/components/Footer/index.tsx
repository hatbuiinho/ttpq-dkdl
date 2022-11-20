import {
  Box,
  chakra,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import {
  FaAndroid,
  FaAppStoreIos,
  FaBuilding,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import Logo from '../Logo';
import FadeInUp from '../Animation/FadeInUp';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box bg={'blue.600'} color={'white'}>
      <Container as={Stack} maxW={'6xl'} py={10} px={[3, 5, 16, 20, 0]}>
        <SimpleGrid templateColumns={{ sm: '1fr 1fr', md: '2fr 2fr 2fr 2fr' }} spacing={8}>
          <Stack spacing={6}>
            <HStack>
              <Logo />
              <Text>Thiền tôn Phật Quang</Text>
            </HStack>
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Facebook'} href={'https://www.facebook.com/THIENTONPQ'}>
                <FaFacebook />
              </SocialButton>

              <SocialButton label={'YouTube'} href={'https://www.youtube.com/@SenHongPhapQuang'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Tiktok'} href={'https://www.tiktok.com/@phapquang_senhong'}>
                <FaTiktok />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Phát hành</ListHeader>
            <Link href={'https://congtyphapquang.com/'}>
              <HStack>
                <FaBuilding /> <Text>Công ty Pháp Quang</Text>
              </HStack>
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Thời trang Homis</ListHeader>
            <Link href={'https://www.facebook.com/HOMISBuddhistfashion/'}>
              <HStack>
                <FaFacebook /> <Text>Facebook</Text>
              </HStack>
            </Link>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>App Pháp Quang - Sen Hồng</ListHeader>
            <Link href={'https://play.google.com/store/apps/details?id=com.pqsoft.phapquang&pli=1'}>
              <HStack>
                <FaAndroid /> <Text>Android</Text>
              </HStack>
            </Link>
            <Link href={'https://apps.apple.com/fr/app/ph%C3%A1p-quang/id1608669200'}>
              <HStack>
                <FaAppStoreIos /> <Text>IOS</Text>
              </HStack>
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
