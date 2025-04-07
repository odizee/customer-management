"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="icon"
        onClick={() => onPageChange(1)}
        className="w-8 h-8"
      >
        1
      </Button>
    );

    // Calculate range of pages to show
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push(
        <span key="ellipsis1" className="px-2">
          ...
        </span>
      );
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(i)}
          className="w-8 h-8"
        >
          {i}
        </Button>
      );
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push(
        <span key="ellipsis2" className="px-2">
          ...
        </span>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(totalPages)}
          className="w-8 h-8"
        >
          {totalPages}
        </Button>
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {renderPageNumbers()}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
