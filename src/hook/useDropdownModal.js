import useModal from "hook/useModal";

/**
 * 드롭다운 모달 사용시 필요한 Custom Hook
 *
 * @returns {[isDroppedUp: boolean, dropUp: () => void, dropDown: () => void]}
 */
export default function useDropdownModal() {
  const [isDroppedUp, dropUp, dropDown, _] = useModal();
  return [isDroppedUp, dropUp, dropDown];
}
