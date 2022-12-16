import AlertModal from "components/common/AlertModal/index";
import GlobalStyle from "style/GlobalStyle";

function App() {
  function handleLogoutButton() {
    console.log("로그아웃 되었습니다.");
  }
  function handleCancleButton() {
    console.log("취소 되었습니다.");
  }

  return (
    <>
      <GlobalStyle />
      <AlertModal text="로그아웃 하시겠어요?">
        <AlertModal.Button handleModalButton={handleCancleButton}>
          취소
        </AlertModal.Button>
        <AlertModal.Button handleModalButton={handleLogoutButton}>
          로그아웃
        </AlertModal.Button>
      </AlertModal>
    </>
  );
}

export default App;
