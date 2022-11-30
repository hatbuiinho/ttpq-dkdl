import { Gender } from '../Enums/Gender.enum';
import { AddressDto } from '../AddressDto.model';
import { SkillForRegisterDto } from '../SkillForRegisters/SkillForRegisterDto.model';
import { EventExp } from '../Enums/EventExp.enum';
import { PhanLoaiThanhNien } from '../Enums/PhanLoaiThanhNien.enum';
import { EventRegistryDto } from '../EventRegistries/EventRegistryDto.model';

export type MemberDto = {
  id?: string;
  work?: string;
  email?: string;
  gender?: Gender;
  fullName?: string;
  avatarPath?: string;
  phoneNumber?: string;
  identityCard?: string;
  religiousName?: string;
  facebookAddress?: string;
  permanentAddress?: string;
  temporaryAddress?: string;
  identityCardImagePath?: string;
  exps?: EventExp;
  ctnType?: PhanLoaiThanhNien;
  dateOfBirth?: string;
  permanentWard?: AddressDto;
  temporaryWard?: AddressDto;
  permanentProvince?: AddressDto;
  permanentDistrict?: AddressDto;
  temporaryProvince?: AddressDto;
  temporaryDistrict?: AddressDto;
  organizationStructureId?: number;
  strongPoints?: SkillForRegisterDto[];
  register?: EventRegistryDto;
  workEnglish?: string;
};
