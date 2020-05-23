import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [rows, setRow] = useState([]);
  // console.log(props.problemList);
  // console.log(rows);
  // console.log(
  //   props.problemList.map(({ problemCode, successfulSubmissions }) => ({
  //     problemCode,
  //     successfulSubmissions,
  //   }))
  // );
  useEffect(() => {
    setRow(
      props.problemList.map(({ problemCode, successfulSubmissions }) => ({
        problemCode,
        successfulSubmissions,
      }))
    );
  }, []);

  return (
    <TableContainer component={Paper} size="small">
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Problem Code</StyledTableCell>
            <StyledTableCell align="right">
              Successful Submissions
            </StyledTableCell>
            {
              //<StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
              //<StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
              //<StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.problemCode}>
              <StyledTableCell component="th" scope="row">
                <Link
                  href={
                    "/contestpage/" +
                    props.contestCode +
                    "/problems/" +
                    row.problemCode
                  }
                >
                  {row.problemCode}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.successfulSubmissions}
              </StyledTableCell>
              {
                //<StyledTableCell align="right">{row.fat}</StyledTableCell>
                //<StyledTableCell align="right">{row.carbs}</StyledTableCell>
                //<StyledTableCell align="right">{row.protein}</StyledTableCell>
              }
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
