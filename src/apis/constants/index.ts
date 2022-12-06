const API_PREFIX = process.env.TTPQ_API_PREFIX;
const api = (api: string) => `${API_PREFIX}${api}`;

const UPDATE_REGISTER = api('/EventRegistry/Update/:id');
const LOGIN = api('/Auth/login');
const GET_LOGGEDIN_MEMBER = api('/Auth/member');

const GET_STRONG_POINT = api('/SkillForRegisters/GetAll');
const GET_DEPARTMENT_BY_EVENT = api('/Department/get-all');
const GET_RECEIVE_CARD_ADDRESSES_BY_EVENT = api('/ReceiveCardAddresses/Event/:id');
const SEARCH_LEADER = api('/EventRegistry/search-leader');
const GET_REGISTER_PAGE = api('/EventRegistryPages/GetById/:shortUri');
const GET_START_ADDRESS_BY_EVENT = api('/StartAddresses/event/:id');
const GET_LEAVE_ADDRESS_BY_EVENT = api('/LeaveAddresses/event/:id');
const GET_REGISTER_INFO = api('/EventRegistry/GetById/:id');
const GET_MEMBER_IN_GROUP = api('/EventRegistry/group/:leaderId');
const LOGIN_MEMBER = api('/Auth/login-member');
const GET_MEMBER_BY_ID = api('/Member/get-by-id/:id');
const UPDATE_MEMBER = api('/Member/update/:id');
const REGISTER = api('/Member/add');
const SEARCH_MEMBER = api('/Member/search');

/* API from app Nhân sự */
const GET_PROVINCE = 'https://ctnpq.com/apis/address/Province';
const GET_DISTRICT = 'https://ctnpq.com/apis/address/District';
const GET_WARD = 'https://ctnpq.com/apis/address/Ward';
const UPLOAD_PHOTO = 'https://ctnpq.com/apis/photo/upload';
const GET_CTN = 'https://ctnpq.com/api/ctn/list';
const GET_PHOTO = `https://ctnpq.com/apis/photo?key=:key`;

const API = {
  REGISTER,
  LOGIN,
  SEARCH_MEMBER,
  GET_PROVINCE,
  GET_DISTRICT,
  GET_WARD,
  GET_STRONG_POINT,
  GET_DEPARTMENT_BY_EVENT,
  GET_RECEIVE_CARD_ADDRESSES_BY_EVENT,
  GET_CTN,
  SEARCH_LEADER,
  GET_REGISTER_PAGE,
  GET_START_ADDRESS_BY_EVENT,
  GET_LEAVE_ADDRESS_BY_EVENT,
  GET_REGISTER_INFO,
  GET_MEMBER_IN_GROUP,
  LOGIN_MEMBER,
  GET_MEMBER_BY_ID,
  UPDATE_REGISTER,
  UPDATE_MEMBER,
  UPLOAD_PHOTO,
  GET_PHOTO,
  GET_LOGGEDIN_MEMBER,
};

export default API;
