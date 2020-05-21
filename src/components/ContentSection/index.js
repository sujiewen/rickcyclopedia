import React, { useContext } from "react";
import SelectedFilters from "../SelectedFilters";
import SearchAndSort from "../SearchAndSort";
import ResultsSection from "../ResultsSection";
import NoResults from "../../core-components/NoResults";
import ReactPaginate from "react-paginate";
import { store } from "../../config/store";

const ContentSection = ({ fetchData }) => {
  const state = useContext(store).state;
  const { data } = state;

  const handlePageChange = (e) => {
    let pageUrl = `?page=${e.selected + 1}`;
    fetchData(pageUrl);
  };

  return (
    <div className="content-section">
      <SelectedFilters />
      <SearchAndSort />
      {data && data.results && data.results.length > 0 ? (
        <>
          <ResultsSection />
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={data.info.pages || 0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </>
      ) : (
        <NoResults message="No results found!" />
      )}
    </div>
  );
};

export default ContentSection;
