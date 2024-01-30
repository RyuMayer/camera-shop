import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

import './search-item.css';

import { AppRoute } from '../../const';

type TSearchItemProps = {
  id: number;
  name: string;
  inFocus: boolean;
  onFocus: (idx: number) => void;
  idx: number;
};

export function SearchItem({
  id,
  name,
  inFocus,
  onFocus,
  idx,
}: TSearchItemProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (inFocus && linkRef.current) linkRef.current.focus();
  }, [inFocus]);

  return (
    <li>
      <Link
        ref={linkRef}
        to={`${AppRoute.Product}/${id}`}
        className="form-search__select-item"
        style={{ display: 'block' }}
        onFocus={() => onFocus(idx)}
      >
        {name}
      </Link>
    </li>
  );
}
