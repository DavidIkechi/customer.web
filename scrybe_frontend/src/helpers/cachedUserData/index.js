import { useFetchUserQuery } from "../../redux/user/rtkquery/authApiSlice";

export const useCachedUserData = () => {
  const { data, isLoading } = useFetchUserQuery();
  const activeUser = data?.detail || null;
  return { activeUser, isLoading };
};
