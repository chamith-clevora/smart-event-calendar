const useAuth = () => {
  const isLoggedIn: boolean = !!localStorage.getItem("clevoraUser");
  return { isLoggedIn };
};

export default useAuth;
