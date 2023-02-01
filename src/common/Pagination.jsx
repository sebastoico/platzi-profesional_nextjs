import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({ setOffset, pageProducts, totalProducts }) {
  const pages = 2;
  const [currentPage, setPage] = useState(1);
  const itemsArray = [];
  const totalPages = Math.ceil(totalProducts / pageProducts);

  const final = Math.min(Math.max(pages * 2 + 2, pages + currentPage + 1), totalPages);
  const initial = Math.min(Math.max(final - (pages * 2 + 1), 1), Math.max(currentPage - pages, 1));

  const getShade = (i) => {
    return i === currentPage ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';
  };

  const prevButton = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
      setOffset((currentPage - 2) * pageProducts);
    }
  };

  const nextButton = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
      setOffset(currentPage * pageProducts);
    }
  };

  for (let i = initial; i < final; i++) {
    itemsArray.push(
      <Link
        key={`Page-${i}`}
        onClick={() => {
          setPage(i);
          setOffset((i - 1) * pageProducts);
        }}
        href="#"
        aria-current="page"
        className={`${getShade(i)} relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
      >
        {i}
      </Link>
    );
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 flex-row items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{pageProducts * (currentPage - 1) + 1}</span> to{' '}
            <span className="font-medium">{currentPage * pageProducts < totalProducts ? currentPage * pageProducts : totalProducts}</span> of <span className="font-medium">{totalProducts}</span>{' '}
            results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Link
              href="#"
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={prevButton}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            {itemsArray}
            <Link
              href="#"
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={nextButton}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
