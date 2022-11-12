import { ReduxState } from '~/apis/common/type';
import { EventRegistryPageDto } from '~/dtos/EventRegistryPages/EventRegistryPageDto.model';
import { createAsyncRequest } from '../common/action';
import createAppSlice from '../common/slice';

type RegisterPageState = ReduxState<EventRegistryPageDto>;
const initialState: RegisterPageState = {
  data: {},
};

export const getRegisterPage = createAsyncRequest<string>('registerPage/get', {
  method: 'get',
});

const registerPage = createAppSlice<RegisterPageState>('auth', initialState, {}, [
  {
    //@ts-ignore
    action: getRegisterPage,
    onFullfilled: (_, action) => {
      return { ...action.payload.data };
    },
  },
]);

const registerPageReducer = registerPage.reducer;
export default registerPageReducer;
