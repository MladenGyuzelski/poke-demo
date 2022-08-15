
type Props = {
  pageCount: number;
  currentPage: number;
  onChangePage: (page: number) => void;
}

const Pagination = (props: Props) => {
  const {
    pageCount,
    currentPage,
    onChangePage
  } = props;

  const pages = new Array(pageCount).fill(0).map((_, index) => index + 1);

  return (
    <div className="btn-group flex flex-wrap justify-center">
      {pages.map((label, index) => (
        <button
          className={`btn btn-xs ${index === currentPage ? 'btn-active' : ''}`}
          key={index}
          onClick={() => onChangePage(index)}>
            {label}
          </button>
      )) }
    </div>
  );
};

export default Pagination;