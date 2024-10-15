import { useEffect, useState, createContext, useContext } from "react";
import { useUser as useSupaUser, useSessionContext, User } from "@supabase/auth-helpers-react";
import { UserDetails, Subscription } from "@/types";

// Define the structure of the user context
type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

// Create the context with undefined as the default value
export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const { session, isLoading: isLoadingUser, supabaseClient: supabase } = useSessionContext();
  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsloadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // Fetch user details from Supabase
  const getUserDetails = () => supabase.from("users").select("*").single();
  // Fetch subscription details from Supabase
  const getSubscription = () => supabase
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsloadingData(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then((results) => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];
        if (userDetailsPromise.status === "fulfilled")
          setUserDetails(userDetailsPromise.value.data as UserDetails);
        if (subscriptionPromise.status === "fulfilled")
          setSubscription(subscriptionPromise.value.data as Subscription);
        setIsloadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};