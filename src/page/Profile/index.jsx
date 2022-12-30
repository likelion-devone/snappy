import { useContext } from "react";

import PageDetails from "component/Profile/PageDetails/index";
import { TopNavElement } from "component/common/Navbar/TopNav/index";
import { AlertModal, DropdownModal } from "component/common/Modal";

import { AuthContext } from "lib/auth/AuthProvider"

import useAuthInfo from "hook/useAuthInfo";
import useTopNavSetter from "hook/useTopNavSetter";
import useDropdownModal from "hook/useDropdownModal";
import useModal from "hook/useModal";

function ProfilePage() {
  const { accountname } = useAuthInfo();
  const { handleLogout } = useContext(AuthContext);
  const [isProfileMoreModalOpened, openProfileMoreModal, closeProfileMoreModal] = useDropdownModal();
  const [isLogoutAlertModalOpened, openLogoutAlertModal, closeLogoutAlertModal, confirmLogoutAlertModal] = useModal(handleLogout);

  useTopNavSetter({
    left: <TopNavElement.GoBackButton />,
    right: (
      <TopNavElement.MoreButton onClick={openProfileMoreModal} />
    )
  })

  return (
    <>
      <PageDetails accountname={accountname} $isMyProfile={true} />
      <DropdownModal dropDown={closeProfileMoreModal} isDroppedUp={isProfileMoreModalOpened}>
        <DropdownModal.Button onClick={openLogoutAlertModal}>
          로그아웃
        </DropdownModal.Button>
      </DropdownModal>
      <AlertModal isModalOpened={isLogoutAlertModalOpened}>
        <AlertModal.Content>로그아웃 하시겠스내피? 📷</AlertModal.Content>
        <AlertModal.Cancle handleModalButton={closeLogoutAlertModal}>취소</AlertModal.Cancle>
        <AlertModal.ConfirmButton handleModalButton={confirmLogoutAlertModal}>로그아웃</AlertModal.ConfirmButton>
      </AlertModal>
    </>
  )
}

export default ProfilePage;
