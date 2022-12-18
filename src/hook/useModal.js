import { useState } from "react";

/**
 * 모달 사용시 필요한 Custom Hook
 *
 * @typedef {boolean} isModalOpened
 * @typedef {() => void} handlerCallback
 * @typedef {handlerCallback} openModal
 * @typedef {handlerCallback} closeModal
 * @typedef {handlerCallback} confirmModal
 *
 * @param {() => void} handleModalConfirm
 * @returns {[isModalOpened, openModal, closeModal, confirmModal]} [isModalOpened, openModal, closeModal, confirmModal]
 */
export default function useModal(handleModalConfirm) {
  const [isModalOpened, setIsOpened] = useState(false);

  /**
   * 모달을 열때 호출
   */
  const openModal = () => setIsOpened(true);

  /**
   * 모달을 닫을때 호출
   */
  const closeModal = () => setIsOpened(false);

  /**
   * 모달 Confirm시 호출
   */
  const confirmModal = () => {
    handleModalConfirm();
    setIsOpened(false);
  };

  return [isModalOpened, openModal, closeModal, confirmModal];
}
