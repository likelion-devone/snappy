import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { useRef, useEffect, useState, useCallback } from "react";

import {
  TopNavElement,
  TopNavWrapper,
} from "component/common/Navbar/TopNav/index";
import ResultCard from "./ResultCard/index";
import useAPI from "hook/useAPI";
import { req } from "lib/api/index";

import {
  FONT_SIZE,
  GLOBAL_NAVBAR_HEIGHT,
  TOP_NAVBAR_HEIGHT,
} from "constant/style";

const DEBOUNCE_DELAY = 300;

const cssResultBox = css`
  background-color: ${({ theme }) => theme.snWhite};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
`;

const SearchBarWrapper = styled(TopNavWrapper)`
  top: ${({ $isSearchOpened }) =>
    $isSearchOpened ? 0 : "-" + TOP_NAVBAR_HEIGHT};

  transition: all 0.5s ease;
`;

const ResultListWrapper = styled.ul`
  position: fixed;
  left: 20px;
  right: 20px;

  margin: -2px 0;
  padding: 0 15px;

  ${cssResultBox}

  max-height: min(80%, calc(100vh - ${TOP_NAVBAR_HEIGHT} - ${GLOBAL_NAVBAR_HEIGHT} - 10px));
  overflow: auto;

  z-index: 20;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  top: ${({ visible }) => (visible ? TOP_NAVBAR_HEIGHT : `max(-80%, calc(-100vh + ${TOP_NAVBAR_HEIGHT} + ${GLOBAL_NAVBAR_HEIGHT} + 10px))`)};
  transition: all 0.3s ease;
`;

const SearchInput = styled.input`
  flex: 1;
  margin-left: 20px;
  padding: 7px 16px;
  height: 32px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.snGreyExtraLight};

  font-weight: 400;
  font-size: ${FONT_SIZE.BASE};
  line-height: 18px;

  ::placeholder {
    color: ${({ theme }) => theme.snGreyLight};
  }

  :focus {
    outline-color: ${({ theme }) => theme.snBlue};
  }
`;

const LoadingIndicator = styled.p`
  position: fixed;
  left: 0;
  right: 0;
  top: ${({ visible }) => (visible ? TOP_NAVBAR_HEIGHT : "-100px")};
  height: 40px;

  text-align: center;
  line-height: 40px;

  ${cssResultBox}

  color: ${({ theme }) => theme.snGreyLight};

  transition: all 0.3s ease;
  z-index: 10;
`;

export default function SearchBar({ handleClose, $isSearchOpened }) {
  const inpSearchRef = useRef(null);
  const debounceRef = useRef(null);
  const [shouldShowResults, setShouldShowResults] = useState(true);
  const [isInputExists, setIsInputExists] = useState(false);

  const [isSearching, searchResult, _searchError, search] = useAPI(
    req.search.user
  );

  const isSearchResultExists = searchResult ? searchResult.length !== 0 : false;

  const showResults = useCallback(() => {
    setShouldShowResults(true);
  }, []);
  const hideResults = useCallback(() => {
    setShouldShowResults(false);
  }, []);

  useEffect(() => {
    if ($isSearchOpened) {
      const inputRefSnapshot = inpSearchRef.current;
      const timeoutId = setTimeout(() => {
        inputRefSnapshot.focus();
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, [$isSearchOpened]);

  useEffect(() => {
    const inputRefSnapshot = inpSearchRef.current;

    inputRefSnapshot.addEventListener("focusin", showResults);

    return () => {
      inputRefSnapshot.removeEventListener("focusin", showResults);
    };
  }, [showResults]);

  const handleSearchInput = () => {
    if (isInputExists && !inpSearchRef.current.value) {
      setIsInputExists(false);
    } else if (!isInputExists && inpSearchRef.current.value) {
      setIsInputExists(true);
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (inpSearchRef.current.value) {
        search({ keyword: inpSearchRef.current.value });
      }
    }, DEBOUNCE_DELAY);
  };

  const handleCloseWithHidingResult = useCallback(() => {
    handleClose();
    hideResults();
  }, [handleClose, hideResults]);

  return (
    <>
      <SearchBarWrapper as="div" $isSearchOpened={$isSearchOpened}>
        <TopNavElement.GoBackButton
          onClick={handleCloseWithHidingResult}
          title="계정 검색바 닫기"
        />
        <label htmlFor="serch-input" className="sr-only">
          계정 검색바
        </label>
        <SearchInput
          id="serch-input"
          ref={inpSearchRef}
          type="text"
          placeholder="계정 검색"
          autoComplete="off"
          spellCheck={false}
          onChange={handleSearchInput}
        />
      </SearchBarWrapper>
      <LoadingIndicator visible={isSearching}>검색중...</LoadingIndicator>
      {isSearchResultExists && (
        <ResultListWrapper visible={shouldShowResults && isInputExists}>
          {searchResult.slice(0, 20).map((result) => (
            <ResultCard key={result._id} {...result} />
          ))}
        </ResultListWrapper>
      )}
    </>
  );
}

SearchBar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  $isSearchOpened: PropTypes.bool.isRequired,
};
