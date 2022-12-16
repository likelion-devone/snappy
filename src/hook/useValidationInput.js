import { useState, useEffect, useRef, useCallback } from "react";

export default function useValidationInput({ checkValidation }) {
  const inputRef = useRef(null);
  const errorMessageCache = useRef("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleValidation = useCallback(() => {
    const {
      current: { value },
    } = inputRef;

    const errorMessageCalculated = checkValidation(value);

    setErrorMessage(errorMessageCalculated);
    errorMessageCache.current = errorMessageCalculated;
  }, [checkValidation]);

  const clearErrorMessage = useCallback(() => setErrorMessage(""), []);
  const loadErrorMessage = useCallback(
    () => setErrorMessage(errorMessageCache.current),
    []
  );

  const addFocusListeners = useCallback(() => {
    inputRef.current.addEventListener("focusout", clearErrorMessage);
    inputRef.current.addEventListener("focusin", loadErrorMessage);
  }, [clearErrorMessage, loadErrorMessage]);

  const removeFocusListeners = useCallback(() => {
    inputRef.current.removeEventListener("focusout", clearErrorMessage);
    inputRef.current.removeEventListener("focusin", loadErrorMessage);
  }, [clearErrorMessage, loadErrorMessage]);

  useEffect(() => {
    if (inputRef.current) {
      addFocusListeners();

      return removeFocusListeners;
    }
  }, [addFocusListeners, removeFocusListeners]);

  return { inputRef, handleValidation, errorMessage };
}
