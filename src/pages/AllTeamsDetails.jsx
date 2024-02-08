import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../layout/DataTable";
import { fetchPeopleData } from "../redux/action/userAction";

const AllTeamsDetails = () => {
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  const peopleData = useSelector((state) => state?.user?.peopleData);
  const isLoading = useSelector((state) => state?.user?.loading);

  const [pageNo, setPageNo] = useState(0);
  const [countData, setCountData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  //   const [isLoading, setIsLoading] = useState(false);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(+event.target.value));
    setPageNo(0);
  };
  const debounce = useCallback((fn, delay) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(fn, delay);
  }, []);

  useEffect(() => {
    setCountData(peopleData?.count);
  }, [peopleData]);

  useEffect(() => {
    if (searchQuery?.length >= 3) {
      debounce(() => {
        dispatch(
          fetchPeopleData({
            page: pageNo + 1,
            searchQuery: searchQuery,
          })
        );
      }, 1000);
    } else if (searchQuery === "") {
      debounce(() => {
        dispatch(
          fetchPeopleData({
            page: pageNo + 1,
          })
        );
      }, 0);
    }
  }, [rowsPerPage, pageNo, searchQuery, debounce, dispatch]);

  const columns = [
    { id: "name", label: "Name" },
    { id: "height", label: "Height" },
    { id: "mass", label: "Mass" },
    { id: "hairColor", label: "Hair Color" },
    { id: "skinColor", label: "Skin Color" },
    { id: "gender", label: "Gender" },
  ];

  const rows = useMemo(() => {
    if (peopleData?.results) {
      return peopleData?.results?.map((item) => ({
        name: item?.name,
        height: item?.height,
        mass: item?.mass,
        hairColor: item?.hair_color,
        skinColor: item?.skin_color,
        gender: item?.gender,
      }));
    }
    return [];
  }, [peopleData]);

  return (
    <div>
      <DataTable
        columns={columns}
        rows={rows}
        page={pageNo}
        rowsPerPage={rowsPerPage}
        setPage={setPageNo}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        isLoading={isLoading}
        countData={countData}
        handleSearch={handleSearch}
        searchValue={searchQuery}
      />
    </div>
  );
};

export default AllTeamsDetails;
