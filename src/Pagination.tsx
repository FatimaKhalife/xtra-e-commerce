
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="page-btns">
      <button
        className={currentPage > 1 ? "" : "dis"}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <FaArrowLeftLong />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? "page-btn" : ""}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={currentPage < totalPages ? "" : "dis"}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        <FaArrowRightLong />
      </button>
    </div>
  );
};

export default Pagination;
