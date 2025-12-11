import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchTeamMembers,
  selectTeamMembers,
  selectTeamMembersLoading,
  selectTeamMembersError,
  selectTeamMembersLastFetched,
  resetNeedsRefresh,
} from '@/store/slices/teamMembersSlice';

export const useTeamMembersRedux = (params = {}) => {
  const dispatch = useAppDispatch();
  const hasCheckedRef = useRef(false);
  const teamMembers = useAppSelector(selectTeamMembers);
  const loading = useAppSelector(selectTeamMembersLoading);
  const error = useAppSelector(selectTeamMembersError);
  const lastFetched = useAppSelector(selectTeamMembersLastFetched);

  useEffect(() => {
    if (hasCheckedRef.current) return;
    hasCheckedRef.current = true;

    if (lastFetched) {
      console.log('✅ Using cached team members, checking for updates...');
    } else {
      console.log('🔄 Fetching team members from API (no cache)...');
    }

    dispatch(fetchTeamMembers(params)).then(() => {
      dispatch(resetNeedsRefresh());
    }).catch(() => {});
  }, []);

  return {
    teamMembers,
    loading: !lastFetched ? loading : false,
    error,
  };
};

export default useTeamMembersRedux;

