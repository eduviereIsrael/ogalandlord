"use client"

import React, {useEffect} from 'react';
import { selectAllListings, setAllListings } from '@/lib/store/slices/listings.reducer';

import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';

const DataDispatch = ({data}) => {

  const dispatch = useAppDispatch()
  const allListings = useAppSelector(selectAllListings)

    useEffect(() => {
        if (!allListings.length){
          if(data.length > 0){
            dispatch(setAllListings(data))
          }
        }
      }, [data, dispatch, allListings.length])
  return (
    <></>
  )
}

export default DataDispatch