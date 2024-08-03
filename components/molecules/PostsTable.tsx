import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Post } from "@prisma/client";
import Image from "next/image";
import Pagination from "../atoms/Pagination";

type Props = {
  posts: Post[];
  total: number;
};

export default async function PostsTable({ posts, total }: Props) {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Content</TableCell>
              <TableCell align="right">Image</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {post.id}
                </TableCell>
                <TableCell align="right">{post.title}</TableCell>
                <TableCell align="right">{post.content}</TableCell>
                <TableCell align="right">
                  <Image
                    className="rounded"
                    width={80}
                    height={50}
                    src={post.image}
                    alt="image"
                  />
                </TableCell>
                <TableCell align="right">{post.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination total={total} />
    </Paper>
  );
}
