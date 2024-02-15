import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function AdminTeamsTable({ manager, players }) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Username</TableCell>
            {players && <TableCell align="right">Game</TableCell>}
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Discord</TableCell>
          </TableRow>
        </TableHead>
        {manager && (
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {manager.id}
              </TableCell>
              <TableCell align="right">{manager.firstName}</TableCell>
              <TableCell align="right">{manager.lastName}</TableCell>
              <TableCell align="right">{manager.username}</TableCell>
              <TableCell align="right">{manager.email}</TableCell>
              <TableCell align="right">{manager.discord}</TableCell>
            </TableRow>
          </TableBody>
        )}
        {players && (
          <TableBody>
            {players.map((player) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={player.id}
              >
                <TableCell component="th" scope="row">
                  {player.id}
                </TableCell>
                <TableCell align="right">{player.firstName}</TableCell>
                <TableCell align="right">{player.lastName}</TableCell>
                <TableCell align="right">{player.username}</TableCell>
                <TableCell align="right">{player.assignedGame.name}</TableCell>
                <TableCell align="right">{player.email}</TableCell>
                <TableCell align="right">{player.discord}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export default AdminTeamsTable;
