import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {IWorkspaceEmployeeList} from '../../redux/Order/tables/employees/GetEmployeeList.thunk';

export type ProfileParamList = {
  SingleEmployee: {employee: IWorkspaceEmployeeList};
  ProfileHome: undefined;
};

export type ProfileNavigation = StackNavigationProp<
  ProfileParamList,
  'SingleEmployee'
>;
export type ProfileNavigationProps = StackScreenProps<
  ProfileParamList,
  'SingleEmployee'
>;
