import React, { useState } from 'react';
import _ from 'lodash';
import cx from 'classnames';

import { Button, RangeInput } from '../../../../app/components';
import styles from './ProductFilters.module.scss';
import { Range } from 'react-input-range';
import { IProductFilters } from '../../../../app/models/product';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  defaultFilters,
  fetchProducts,
  selectFilters,
  setFilters,
  setPage,
} from '../../services/productsSlice';

interface Props {
  className?: string;
}

export default function ProductFilters({
  className,
}: Props): React.ReactElement<Props> {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  function handleApplyFilter(filtersValues: IProductFilters) {
    const filtersToSend: IProductFilters = _.cloneDeep({
      ...filtersValues,
      price: {
        min: filtersValues.price.min,
        max: Math.max(filtersValues.price.max!, filtersValues.price.min),
      },
    });

    dispatch(
      setFilters({
        ...filters,
        ...filtersToSend,
      })
    );
    dispatch(setPage(1));
    dispatch(fetchProducts());
  }

  function handleReset() {
    dispatch(setFilters(defaultFilters));
    dispatch(fetchProducts());
  }

  return (
    <div className={cx(styles['product-filters'], className)}>
      <div className={styles['product-filters__controls']}>
        <Button onClick={() => handleApplyFilter(filters)}> Apply </Button>
        <Button variant="light" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <RangeInput
        label="Price"
        value={filters.price}
        minValue={defaultFilters.price.min}
        maxValue={defaultFilters.price.max}
        onChange={(value) =>
          dispatch(
            setFilters({
              ...filters,
              price: {
                min: Math.max((value as Range).min, defaultFilters.price.min),
                max: Math.min((value as Range).max, defaultFilters.price.max),
              },
            })
          )
        }
        minLabelPrefix="$"
        maxLabelPrefix="$"
        maxLabelSuffix={`${
          filters.price.max === defaultFilters.price.max ? '+' : ''
        }`}
      />
    </div>
  );
}
