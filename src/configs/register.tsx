import _ from 'lodash';
import { MoveType } from '~/dtos/Enums/MoveType.enum';
import { EventExp } from '~/dtos/Enums/EventExp.enum';
import { CarBookingType } from '~/dtos/Enums/CarBookingType.enum';
import { ClothingSize } from '~/dtos/Enums/ClothingSize.enum';
import { CertificateRegistry } from '~/dtos/Enums/CertificateRegistry.enum';

const MOVE_TYPE_TITLE = {
  [MoveType.WithCTN]: 'Đi cùng xe CTN',
  [MoveType.Other]: 'Tự túc',
  [MoveType.ByPlane]: 'Máy bay',
};

const EVENT_EXP_TITLE = {
  [EventExp.ChuaTungThamGia]: 'Lần đầu tiên',
  [EventExp.Duoi3Lan]: 'Dưới 3 lần',
  [EventExp.Tren3Lan]: 'Trên 3 lần',
};

const CAR_BOOKING_TYPE_TITLE = {
  [CarBookingType.Go]: 'Chiều đi',
  [CarBookingType.Return]: 'Chiều về',
  [CarBookingType.Both]: 'Cả hai chiều',
  [CarBookingType.ByYourSelf]: 'Tự túc',
};

const CLOTHING_SIZE_TITLE = {
  [ClothingSize.S]: 'S',
  [ClothingSize.M]: 'M',
  [ClothingSize.L]: 'L',
  [ClothingSize.XL]: 'XL',
  [ClothingSize.XXL]: 'XXL',
  [ClothingSize.XXXL]: '3XL',
};

const CERTIFICATE_REGISTRY_TITLE = {
  [CertificateRegistry.NO]: 'Không',
  [CertificateRegistry.YES]: 'Có',
};

const REGISTER_INFO_TITLE = {
  fullName: 'Họ Và Tên',
  religiousName: 'Pháp danh',
  gender: 'Giới tính',
  dateOfBirth: 'Ngày sinh',
  phoneNumber: 'Số điện thoại',
  email: 'Email',
  identityCard: 'Căn cước',
  organizationStructureId: 'Địa điểm tu tập',
  permanentAddress: 'Địa chỉ thường trú',
  temporaryAddress: 'Địa chỉ tạm trú',
  // schedules
  moveType: 'Hình thức di chuyển',
  startAddressId: 'Nơi xuất phát',
  startTimeId: 'Nơi xuất phát',
  leaveTimeId: 'Thời gian trở về',
  otherStartAddress: 'Nơi xuất phát',
  otherStartTime: 'Ngày giờ đi',
  otherLeaveTime: 'Ngày giờ về',
  startPlaneCode: 'Mã chuyến bay đi',
  returnPlaneCode: 'Mã chuyến bay về',
  carBookingType: 'Đăng ký ô tô',
  // jobs
  exps: 'Số lần về chùa',
  strongPointIds: 'Kỹ năng, sở trường',
  expDepartmentIds: 'Kinh nghiệm ở ban',
  wishDepartmentId: 'Nguyện vọng vào ban',
  receiveCardAddressId: 'Nơi nhận thẻ',
  clothingSize: 'Size áo',
  note: 'Ghi chú',
  // certificate registry
  certificateRegistry: 'Lấy giấy chứng nhận',
  companyNameVIE: 'Bằng tiếng Việt',
  companyNameEN: 'Bằng tiếng Anh',
};

export {
  REGISTER_INFO_TITLE,
  MOVE_TYPE_TITLE,
  EVENT_EXP_TITLE,
  CAR_BOOKING_TYPE_TITLE,
  CLOTHING_SIZE_TITLE,
  CERTIFICATE_REGISTRY_TITLE,
};
