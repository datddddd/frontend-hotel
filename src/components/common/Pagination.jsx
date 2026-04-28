import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
const getPages = () => {
let start = Math.max(1, currentPage - 2);
let end = Math.min(totalPages, currentPage + 2);
let pages = [];


for (let i = start; i <= end; i++) {
  pages.push(i);
}

return pages;


};

return ( <div className="flex justify-center mt-8 gap-2">

```
  <button
    disabled={currentPage === 1}
    onClick={() => onPageChange(currentPage - 1)}
    className="p-2 border rounded bg-white disabled:opacity-50"
  >
    <ChevronLeft size={18}/>
  </button>

  {getPages().map(p => (
    <button
      key={p}
      onClick={() => onPageChange(p)}
      className={`px-3 py-1 rounded ${
        currentPage === p
          ? "bg-indigo-600 text-white"
          : "bg-white border hover:bg-gray-50"
      }`}
    >
      {p}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => onPageChange(currentPage + 1)}
    className="p-2 border rounded bg-white disabled:opacity-50"
  >
    <ChevronRight size={18}/>
  </button>

</div>


);
};

export default Pagination;
