import { PrintStatus } from '../Enums/PrintStatus.enum';
import { ReceiveCardStatus } from '../Enums/ReceiveCardStatus.enum';
import { ContactStatusType } from '../Enums/ContactStatusType.enum';
import { PositionType } from '../Enums/PositionType.enum';

export type UpSertDKDaiLeDto = {
  memberId: number;
  greatCeremonyId: number;
  maSo: string;
  ghiChu: string;
  maChuyenBayVe: string;
  maChuyenBayDen: string;
  diaDiemTroVeKhac: string;
  thoiDiemVeChuaKhac: string;
  greatCeremonyRegistrationId: string;
  areaId: number;
  groupId: number;
  position: PositionType;
  trangThai: ContactStatusType;
  ngayBatDau: string;
  trangThaiIn: PrintStatus;
  ngayKetThuc: string;
  idNoiNhanThe: number;
  positionInGroup: PositionType;
  idBanKinhNghiem: number;
  idBanNguyenVong: number;
  idThoiDiemVeChua: number;
  trangThaiNhanThe: ReceiveCardStatus;
  idThoiDiemRoiChua: number;
  thoiGianVeChuaKhac: string;
  departmentDetailId: number;
  thoiGianRoiChuaKhac: string;
};
