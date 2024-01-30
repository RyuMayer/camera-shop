import { useEffect, useRef, useState } from 'react';

import { SearchItem } from '../search-item/search-item';
import { useKeyPress } from '../../hooks/use-key-press';
import { useClickOutside } from '../../hooks/use-click-outside';
import { TFoundCameras } from '../../types/search';

type TSearchList = {
  foundCameras: TFoundCameras[];
};

export function SearchList({ foundCameras }: TSearchList) {
  const [cursor, setCursor] = useState(-1);
  const cursorRef = useRef(cursor);

  const refList = useClickOutside<HTMLUListElement>(() => setCursor(-1));

  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');

  const onFocus = (idx: number) => {
    setCursor(idx);
  };

  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  useEffect(() => {
    if (arrowUpPressed && cursorRef.current > 0) {
      setCursor(cursorRef.current - 1);
    }
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed && cursorRef.current < foundCameras.length - 1) {
      setCursor(cursorRef.current + 1);
    }
  }, [arrowDownPressed, foundCameras.length]);

  return (
    <ul ref={refList} className="form-search__select-list scroller">
      {foundCameras.map((camera, idx) => (
        <SearchItem
          key={camera.id}
          id={camera.id}
          name={camera.name}
          inFocus={cursor === idx}
          onFocus={onFocus}
          idx={idx}
        />
      ))}
    </ul>
  );
}
