"use client";

import { TablePagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  total: number;
};

export default function Pagination({ total }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rowsPerPage = searchParams.get("per_page") || 5;
  const page = searchParams.get("page") || 0;

  const handleChangePage = (_event: unknown, newPage: number) => {
    router.push(`?page=${newPage}&per_page=${rowsPerPage}`);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPerPage = event.target.value;
    router.push(`?page=0&per_page=${newPerPage}`);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 50]}
      component="div"
      count={total}
      rowsPerPage={Number(rowsPerPage)}
      page={Number(page)}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
