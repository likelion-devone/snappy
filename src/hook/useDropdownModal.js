import useModal from "hook/useModal";

export default function useDropdownModal() {
  const [isDroppedUp, dropUp, dropDown, _] = useModal();
  return [isDroppedUp, dropUp, dropDown];
}
